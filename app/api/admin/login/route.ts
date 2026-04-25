import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createAdminSession, getAdminCookieName } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const adminEmail = process.env.ADMIN_LOGIN_EMAIL;
  const adminPassword = process.env.ADMIN_LOGIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return NextResponse.json(
      { error: "Admin credentials not configured." },
      { status: 500 }
    );
  }

  const payload = (await request.json()) as {
    email?: string;
    password?: string;
  };

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const password =
    typeof payload.password === "string" ? payload.password : "";

  if (
    email.toLowerCase() !== adminEmail.toLowerCase() ||
    password !== adminPassword
  ) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const session = createAdminSession(adminEmail.toLowerCase());

  if (!session) {
    return NextResponse.json(
      { error: "Admin session secret is missing." },
      { status: 500 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(getAdminCookieName(), session, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return NextResponse.json({ ok: true });
}
