import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

type SubmissionPayload = {
  name?: string;
  workEmail?: string;
  company?: string;
  datasetType?: string;
};

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  if (!adminDb) {
    return NextResponse.json(
      { error: "Server is missing Firebase admin credentials." },
      { status: 500 }
    );
  }

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

  const ref = await adminDb.collection("auditSubmissions").add({
    name,
    workEmail: workEmail.toLowerCase(),
    company,
    datasetType,
    status: "new",
    source: "website",
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });

  return NextResponse.json({ ok: true, id: ref.id });
}
