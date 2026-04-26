import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  createIngestSession,
  getIngestCookieName,
  getIngestSessionMaxAge,
} from "@/lib/ingest-access-auth";
import { isIngestAccessGranted, normalizeIngestEmail } from "@/lib/ingest-access-data";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const payload = (await request.json()) as { email?: string };
  const raw = typeof payload.email === "string" ? payload.email.trim() : "";
  if (!raw || !EMAIL.test(raw)) {
    return NextResponse.json({ error: "Enter a valid work email address." }, { status: 400 });
  }
  const email = normalizeIngestEmail(raw);
  if (!(await isIngestAccessGranted(email))) {
    return NextResponse.json(
      { error: "This email is not approved for WavOps Ingest yet." },
      { status: 403 }
    );
  }
  const session = createIngestSession(email);
  if (!session) {
    return NextResponse.json(
      { error: "Ingest session could not be created. Is INGEST_SESSION_SECRET or ADMIN_SESSION_SECRET set?" },
      { status: 500 }
    );
  }
  const maxAge = getIngestSessionMaxAge();
  const cookieStore = await cookies();
  cookieStore.set(getIngestCookieName(), session, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });
  return NextResponse.json({ ok: true });
}
