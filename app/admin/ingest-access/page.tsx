import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getAdminCookieName, verifyAdminSession } from "@/lib/admin-auth";
import {
  listIngestAccess,
  listIngestAccessRequests,
} from "@/lib/ingest-access-data";
import IngestAccessClient from "./ingest-access-client";

export default async function AdminIngestAccessPage() {
  const cookieStore = await cookies();
  const session = verifyAdminSession(
    cookieStore.get(getAdminCookieName())?.value
  );
  if (!session) {
    redirect("/admin/login");
  }

  const [allowed, requests] = await Promise.all([
    listIngestAccess(),
    listIngestAccessRequests(),
  ]);

  return (
    <div className="relative min-h-screen text-foreground">
      <main className="px-6 py-12 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm text-zinc-500">
            <Link href="/admin/submissions" className="text-emerald-400/90 hover:underline">
              ← Audit submissions
            </Link>
          </p>
          <h1 className="section-title mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            WavOps Ingest access
          </h1>
          <p className="mt-2 text-zinc-300">
            Signed in as {session.email}. Control which emails can open the ingest workspace.
          </p>

          <form action="/api/admin/logout" method="post" className="mt-4">
            <button
              type="submit"
              className="rounded-full border border-zinc-700 bg-zinc-900 px-5 py-2 text-sm text-zinc-200 transition hover:bg-zinc-800"
            >
              Log out
            </button>
          </form>

          <IngestAccessClient allowed={allowed} requests={requests} />
        </div>
      </main>
    </div>
  );
}
