import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getAdminCookieName, verifyAdminSession } from "@/lib/admin-auth";
import {
  dismissIngestRequest,
  grantIngestAccess,
  revokeIngestAccess,
} from "@/lib/ingest-access-data";

type Body = {
  action?: "grant" | "revoke" | "dismiss";
  email?: string;
  requestId?: string;
};

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = verifyAdminSession(
    cookieStore.get(getAdminCookieName())?.value
  );
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (body.action === "grant") {
    const email = typeof body.email === "string" ? body.email.trim() : "";
    if (!email) {
      return NextResponse.json({ error: "email required." }, { status: 400 });
    }
    try {
      await grantIngestAccess(email, session.email);
      return NextResponse.json({ ok: true });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed.";
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  }

  if (body.action === "revoke") {
    const email = typeof body.email === "string" ? body.email.trim() : "";
    if (!email) {
      return NextResponse.json({ error: "email required." }, { status: 400 });
    }
    try {
      await revokeIngestAccess(email);
      return NextResponse.json({ ok: true });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed.";
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  }

  if (body.action === "dismiss") {
    const id = typeof body.requestId === "string" ? body.requestId : "";
    if (!id) {
      return NextResponse.json({ error: "requestId required." }, { status: 400 });
    }
    try {
      await dismissIngestRequest(id);
      return NextResponse.json({ ok: true });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed.";
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
