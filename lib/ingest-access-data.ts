import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

const COLLECTION = "ingestAccess";
const REQUESTS = "ingestAccessRequests";

export function normalizeIngestEmail(email: string) {
  return email.toLowerCase().trim();
}

export async function isIngestAccessGranted(
  email: string
): Promise<boolean> {
  if (!adminDb) return false;
  const id = normalizeIngestEmail(email);
  if (!id || !id.includes("@")) return false;
  const snap = await adminDb.collection(COLLECTION).doc(id).get();
  if (!snap.exists) return false;
  const d = snap.data();
  if (d && d.active === false) return false;
  return true;
}

export async function grantIngestAccess(
  email: string,
  grantedBy?: string
): Promise<void> {
  if (!adminDb) throw new Error("Database not configured.");
  const id = normalizeIngestEmail(email);
  if (!id.includes("@")) throw new Error("Invalid email.");
  await adminDb
    .collection(COLLECTION)
    .doc(id)
    .set(
      {
        email: id,
        grantedAt: FieldValue.serverTimestamp(),
        grantedBy: grantedBy ?? null,
        active: true,
      },
      { merge: true }
    );
}

export async function revokeIngestAccess(email: string): Promise<void> {
  if (!adminDb) throw new Error("Database not configured.");
  const id = normalizeIngestEmail(email);
  await adminDb.collection(COLLECTION).doc(id).set(
    {
      email: id,
      active: false,
      revokedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
}

export async function recordIngestAccessRequest(
  email: string
): Promise<void> {
  if (!adminDb) throw new Error("Database not configured.");
  const id = normalizeIngestEmail(email);
  if (!id.includes("@")) throw new Error("Invalid email.");
  await adminDb.collection(REQUESTS).add({
    email: id,
    createdAt: FieldValue.serverTimestamp(),
    status: "pending",
  });
}

export type IngestAccessRow = {
  email: string;
  active: boolean;
  grantedAt: string;
};

export type IngestRequestRow = {
  id: string;
  email: string;
  createdAt: string;
  status: string;
};

export async function listIngestAccess(): Promise<IngestAccessRow[]> {
  if (!adminDb) return [];
  const snap = await adminDb.collection(COLLECTION).limit(200).get();
  const rows: IngestAccessRow[] = snap.docs.map((doc) => {
    const data = doc.data();
    const granted = data?.grantedAt?.toDate?.();
    return {
      email: doc.id,
      active: data?.active !== false,
      grantedAt: granted ? granted.toISOString() : "",
    };
  });
  return rows.sort((a, b) => b.grantedAt.localeCompare(a.grantedAt));
}

export async function listIngestAccessRequests(): Promise<IngestRequestRow[]> {
  if (!adminDb) return [];
  const snap = await adminDb.collection(REQUESTS).limit(100).get();
  const rows: IngestRequestRow[] = snap.docs.map((d) => {
    const data = d.data();
    const created = data?.createdAt?.toDate?.();
    return {
      id: d.id,
      email: typeof data?.email === "string" ? data.email : "",
      createdAt: created ? created.toISOString() : "",
      status: typeof data?.status === "string" ? data.status : "pending",
    };
  });
  return rows.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function dismissIngestRequest(requestId: string) {
  if (!adminDb) throw new Error("Database not configured.");
  await adminDb.collection(REQUESTS).doc(requestId).update({
    status: "dismissed",
  });
}
