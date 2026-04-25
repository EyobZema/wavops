import crypto from "node:crypto";

const COOKIE_NAME = "wavops_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;

type AdminSessionPayload = {
  email: string;
  exp: number;
};

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return null;
  return secret;
}

function encode(payload: AdminSessionPayload) {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

function sign(encodedPayload: string, secret: string) {
  return crypto
    .createHmac("sha256", secret)
    .update(encodedPayload)
    .digest("base64url");
}

export function getAdminCookieName() {
  return COOKIE_NAME;
}

export function createAdminSession(email: string) {
  const secret = getSecret();
  if (!secret) return null;

  const payload: AdminSessionPayload = {
    email,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };

  const encodedPayload = encode(payload);
  const signature = sign(encodedPayload, secret);

  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSession(token?: string | null) {
  if (!token) return null;

  const secret = getSecret();
  if (!secret) return null;

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;

  const expectedSignature = sign(encodedPayload, secret);
  if (signature !== expectedSignature) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    ) as AdminSessionPayload;

    if (!payload.email || !payload.exp) return null;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;

    return payload;
  } catch {
    return null;
  }
}
