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

async function sendSubmissionEmail(params: {
  name: string;
  workEmail: string;
  company: string;
  datasetType: string;
  datasetLink: string;
  folderAccessConfirmed: boolean;
}) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secure = String(process.env.SMTP_SECURE || "false") === "true";
  const from = process.env.SMTP_FROM || user;
  const to = "contact@webops.io";
  if (!host || !user || !pass || !from) {
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const lines = [
    `Name: ${params.name}`,
    `Work email: ${params.workEmail}`,
    `Company: ${params.company}`,
    `Dataset type: ${params.datasetType || "-"}`,
    `Dataset link: ${params.datasetLink}`,
    `Folder access confirmed: ${params.folderAccessConfirmed ? "yes" : "no"}`,
  ];

  await transporter.sendMail({
    from,
    to,
    subject: "New WavOps free audit request",
    text: lines.join("\n"),
    html: `<p>${lines.map((l) => l.replace(/</g, "&lt;")).join("<br/>")}</p>`,
    replyTo: params.workEmail,
  });
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

  try {
    await sendSubmissionEmail({
      name,
      workEmail: workEmail.toLowerCase(),
      company,
      datasetType,
      datasetLink,
      folderAccessConfirmed,
    });
  } catch {
    if (!adminDb) {
      return NextResponse.json(
        { error: "Email delivery failed and database storage is unavailable." },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ ok: true, id });
}
