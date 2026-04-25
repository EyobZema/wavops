import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { adminDb } from "@/lib/firebase-admin";
import { getAdminCookieName, verifyAdminSession } from "@/lib/admin-auth";

type Submission = {
  id: string;
  name: string;
  workEmail: string;
  company: string;
  datasetType: string;
  status: string;
  createdAt: string;
};

async function readSubmissions(): Promise<Submission[]> {
  if (!adminDb) return [];

  const snapshot = await adminDb
    .collection("auditSubmissions")
    .orderBy("createdAt", "desc")
    .limit(200)
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    const createdAt = data.createdAt?.toDate?.();

    return {
      id: doc.id,
      name: typeof data.name === "string" ? data.name : "",
      workEmail: typeof data.workEmail === "string" ? data.workEmail : "",
      company: typeof data.company === "string" ? data.company : "",
      datasetType:
        typeof data.datasetType === "string" ? data.datasetType : "",
      status: typeof data.status === "string" ? data.status : "new",
      createdAt: createdAt ? createdAt.toISOString() : "",
    };
  });
}

export default async function AdminSubmissionsPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(getAdminCookieName())?.value;
  const session = verifyAdminSession(sessionToken);

  if (!session) {
    redirect("/admin/login");
  }

  const submissions = await readSubmissions();

  return (
    <div className="relative min-h-screen text-foreground">
      <main className="px-6 py-12 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <h1 className="section-title text-3xl font-semibold tracking-tight md:text-4xl">
            Audit Submissions
          </h1>
          <p className="mt-2 text-zinc-300">Signed in as {session.email}</p>

          <form action="/api/admin/logout" method="post" className="mt-4">
            <button
              type="submit"
              className="rounded-full border border-zinc-700 bg-zinc-900 px-5 py-2 text-sm text-zinc-200 transition hover:bg-zinc-800"
            >
              Log out
            </button>
          </form>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-zinc-700/80 bg-zinc-950">
            <table className="min-w-full divide-y divide-zinc-800 text-left text-sm text-zinc-200">
              <thead className="bg-zinc-900/60 text-xs uppercase tracking-wide text-zinc-400">
                <tr>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Dataset</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {submissions.map((submission) => (
                  <tr key={submission.id}>
                    <td className="whitespace-nowrap px-4 py-3 text-zinc-400">
                      {submission.createdAt
                        ? new Date(submission.createdAt).toLocaleString()
                        : "-"}
                    </td>
                    <td className="px-4 py-3">{submission.name || "-"}</td>
                    <td className="px-4 py-3">{submission.workEmail || "-"}</td>
                    <td className="px-4 py-3">{submission.company || "-"}</td>
                    <td className="px-4 py-3">{submission.datasetType || "-"}</td>
                    <td className="px-4 py-3">{submission.status || "new"}</td>
                  </tr>
                ))}
                {submissions.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-zinc-400" colSpan={6}>
                      No submissions yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
