import { NextResponse } from "next/server";
import { recordIngestAccessRequest, normalizeIngestEmail } from "@/lib/ingest-access-data";
import { adminDb } from "@/lib/firebase-admin";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!adminDb) {
    return NextResponse.json(
      { error: "Requests are not available (database not configured)." },
      { status: 503 }
    );
  }
  const payload = (await request.json()) as { email?: string };
  const raw = typeof payload.email === "string" ? payload.email.trim() : "";
  if (!raw || !EMAIL.test(raw)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  const email = normalizeIngestEmail(raw);
  try {
    await recordIngestAccessRequest(email);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Request failed.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
