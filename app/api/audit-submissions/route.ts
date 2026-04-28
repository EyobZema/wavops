import { FieldValue } from "firebase-admin/firestore";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

type SubmissionPayload = {
  name?: string;
  workEmail?: string;
  company?: string;
  datasetType?: string;
  datasetLink?: string;
  folderAccessConfirmed?: boolean;
};

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

type EmailSendResult = {
  smtpConfigured: boolean;
  teamEmailSent: boolean;
  submitterEmailSent: boolean;
  error?: string;
};

async function sendSubmissionEmails(params: {
  name: string;
  workEmail: string;
  company: string;
  datasetType: string;
  datasetLink: string;
  folderAccessConfirmed: boolean;
}): Promise<EmailSendResult> {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secure = String(process.env.SMTP_SECURE || "false") === "true";
  const rawFrom = process.env.SMTP_FROM || user;
  const teamTo = process.env.AUDIT_TEAM_EMAIL || "contact@webops.io";
  if (!host || !user || !pass || !rawFrom) {
    return {
      smtpConfigured: false,
      teamEmailSent: false,
      submitterEmailSent: false,
      error: "SMTP is not fully configured.",
    };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
  const from = rawFrom.includes("<")
    ? rawFrom
    : `"WavOps Team" <${rawFrom}>`;

  const lines = [
    `Name: ${params.name}`,
    `Work email: ${params.workEmail}`,
    `Company: ${params.company}`,
    `Dataset type: ${params.datasetType || "-"}`,
    `Dataset link: ${params.datasetLink}`,
    `Folder access confirmed: ${params.folderAccessConfirmed ? "yes" : "no"}`,
  ];

  let teamEmailSent = false;
  let submitterEmailSent = false;

  const errors: string[] = [];

  try {
    await transporter.sendMail({
      from,
      to: teamTo,
      subject: "New WavOps free audit request",
      text: lines.join("\n"),
      html: `<p>${lines.map((l) => l.replace(/</g, "&lt;")).join("<br/>")}</p>`,
      replyTo: params.workEmail,
    });
    teamEmailSent = true;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown SMTP error";
    errors.push(`Team email failed: ${message}`);
  }

  const confirmationText = [
    `Hi ${params.name},`,
    "",
    "Thanks for submitting your free dataset audit request to WavOps.",
    "We received your details and our team will review your dataset and follow up soon.",
    "",
    "Submission summary:",
    `- Company: ${params.company}`,
    `- Dataset type: ${params.datasetType || "-"}`,
    `- Dataset link: ${params.datasetLink}`,
    "",
    "Free audit disclaimer: up to 500 audio files are included in the free review.",
    "",
    "Best,",
    "WavOps",
  ].join("\n");

  try {
    await transporter.sendMail({
      from,
      to: params.workEmail,
      subject: "WavOps audit request received",
      text: confirmationText,
      html: `<p>${confirmationText
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/\n/g, "<br/>")}</p>`,
    });
    submitterEmailSent = true;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown SMTP error";
    errors.push(`Submitter email failed: ${message}`);
  }

  return {
    smtpConfigured: true,
    teamEmailSent,
    submitterEmailSent,
    error: errors.length > 0 ? errors.join(" | ") : undefined,
  };
}

export async function POST(request: Request) {
  let payload: SubmissionPayload;

  try {
    payload = (await request.json()) as SubmissionPayload;
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const name = getString(payload.name);
  const workEmail = getString(payload.workEmail);
  const company = getString(payload.company);
  const datasetType = getString(payload.datasetType);
  const datasetLink = getString(payload.datasetLink);
  const folderAccessConfirmed = payload.folderAccessConfirmed === true;

  if (!name || !workEmail || !company) {
    return NextResponse.json(
      { error: "Name, email, and company are required." },
      { status: 400 }
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(workEmail)) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }
  if (!datasetLink) {
    return NextResponse.json(
      { error: "Drive or Dropbox dataset link is required." },
      { status: 400 }
    );
  }
  if (!folderAccessConfirmed) {
    return NextResponse.json(
      { error: "Please confirm folder access is enabled for review." },
      { status: 400 }
    );
  }

  let id = "";
  if (adminDb) {
    const ref = await adminDb.collection("auditSubmissions").add({
      name,
      workEmail: workEmail.toLowerCase(),
      company,
      datasetType,
      datasetLink,
      folderAccessConfirmed,
      status: "new",
      source: "website",
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    id = ref.id;
  }

  const emailResult = await sendSubmissionEmails({
    name,
    workEmail: workEmail.toLowerCase(),
    company,
    datasetType,
    datasetLink,
    folderAccessConfirmed,
  });

  if (emailResult.error) {
    console.error("[audit-submissions] email delivery issue:", emailResult.error);
    if (!adminDb) {
      return NextResponse.json(
        {
          error: "Email delivery failed and database storage is unavailable.",
          emailResult,
        },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({
    ok: true,
    id,
    savedToFirestore: Boolean(id),
    emailResult,
  });
}
