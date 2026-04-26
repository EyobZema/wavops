import crypto from "node:crypto";

const COOKIE_NAME = "wavops_ingest_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

type IngestSessionPayload = {
  email: string;
  exp: number;
  role: "ingest";
};

function getSecret() {
  return (
    process.env.INGEST_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET || null
  );
}

function encode(payload: IngestSessionPayload) {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

function sign(encodedPayload: string, secret: string) {
  return crypto
    .createHmac("sha256", secret)
    .update(encodedPayload)
    .digest("base64url");
}

export function getIngestCookieName() {
  return COOKIE_NAME;
}

export function createIngestSession(email: string) {
  const secret = getSecret();
  if (!secret) return null;
  const normalized = email.toLowerCase().trim();
  const payload: IngestSessionPayload = {
    email: normalized,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
    role: "ingest",
  };
  const encoded = encode(payload);
  return `${encoded}.${sign(encoded, secret)}`;
}

export function verifyIngestSession(token?: string | null) {
  if (!token) return null;
  const secret = getSecret();
  if (!secret) return null;
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;
  if (sign(encodedPayload, secret) !== signature) return null;
  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    ) as IngestSessionPayload;
    if (payload.role !== "ingest" || !payload.email || !payload.exp) return null;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export function getIngestSessionMaxAge() {
  return SESSION_TTL_SECONDS;
}
