"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
type IngestAccessRow = {
  email: string;
  active: boolean;
  grantedAt: string;
};

type IngestRequestRow = {
  id: string;
  email: string;
  createdAt: string;
  status: string;
};

type Props = {
  allowed: IngestAccessRow[];
  requests: IngestRequestRow[];
};

export default function IngestAccessClient({ allowed, requests }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function post(
    action: "grant" | "revoke" | "dismiss",
    data: { email?: string; requestId?: string }
  ) {
    setBusy(true);
    setMsg("");
    try {
      const res = await fetch("/api/admin/ingest-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...data }),
      });
      const j = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        setMsg(j?.error || "Request failed.");
        return;
      }
      router.refresh();
    } catch {
      setMsg("Request failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-8 space-y-10">
      <section>
        <h2 className="text-lg font-semibold text-zinc-100">Grant access by email</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Add a Firestore document so that address can sign in at /ingest/login.
        </p>
        <div className="mt-3 flex max-w-md flex-col gap-2 sm:flex-row">
          <input
            type="email"
            className="min-w-0 flex-1 rounded-lg border border-zinc-700 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            disabled={busy}
          />
          <button
            type="button"
            disabled={busy || !email.trim()}
            onClick={() => void post("grant", { email: email.trim() })}
            className="rounded-full border border-emerald-400/20 bg-gradient-to-b from-emerald-400/90 to-emerald-500/90 px-4 py-2 text-sm font-semibold text-zinc-950 disabled:opacity-50"
          >
            Grant
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-zinc-100">Access requests</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Users can request access from the ingest login page. Approve by granting the same email, then
          dismiss the row.
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-zinc-700/80">
          <table className="min-w-full divide-y divide-zinc-800 text-left text-sm text-zinc-200">
            <thead className="bg-zinc-900/60 text-xs uppercase tracking-wide text-zinc-400">
              <tr>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2"> </th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td className="px-4 py-4 text-zinc-500" colSpan={4}>
                    No requests.
                  </td>
                </tr>
              ) : (
                requests.map((r) => (
                  <tr key={r.id} className="border-t border-zinc-800">
                    <td className="whitespace-nowrap px-4 py-2 text-zinc-400">
                      {r.createdAt ? new Date(r.createdAt).toLocaleString() : "-"}
                    </td>
                    <td className="px-4 py-2 font-mono text-xs">{r.email}</td>
                    <td className="px-4 py-2">{r.status}</td>
                    <td className="px-4 py-2 text-right">
                      <div className="flex flex-wrap justify-end gap-2">
                        <button
                          type="button"
                          disabled={busy}
                          className="rounded-full border border-zinc-600 bg-zinc-800 px-3 py-1 text-xs"
                          onClick={() => {
                            setEmail(r.email);
                            void post("grant", { email: r.email });
                          }}
                        >
                          Grant
                        </button>
                        <button
                          type="button"
                          disabled={busy}
                          className="rounded-full border border-zinc-600 bg-zinc-900 px-3 py-1 text-xs"
                          onClick={() => void post("dismiss", { requestId: r.id })}
                        >
                          Dismiss
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-zinc-100">Allowed emails</h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-zinc-700/80">
          <table className="min-w-full divide-y divide-zinc-800 text-left text-sm text-zinc-200">
            <thead className="bg-zinc-900/60 text-xs uppercase tracking-wide text-zinc-400">
              <tr>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Granted</th>
                <th className="px-4 py-2">Active</th>
                <th className="px-4 py-2"> </th>
              </tr>
            </thead>
            <tbody>
              {allowed.length === 0 ? (
                <tr>
                  <td className="px-4 py-4 text-zinc-500" colSpan={4}>
                    None yet. Grant an email above.
                  </td>
                </tr>
              ) : (
                allowed.map((r) => (
                  <tr key={r.email} className="border-t border-zinc-800">
                    <td className="px-4 py-2 font-mono text-xs">{r.email}</td>
                    <td className="px-4 py-2 text-zinc-400">
                      {r.grantedAt ? new Date(r.grantedAt).toLocaleString() : "-"}
                    </td>
                    <td className="px-4 py-2">{r.active ? "yes" : "no"}</td>
                    <td className="px-4 py-2 text-right">
                      {r.active ? (
                        <button
                          type="button"
                          disabled={busy}
                          className="rounded-full border border-amber-500/40 bg-zinc-900 px-3 py-1 text-xs text-amber-200"
                          onClick={() => void post("revoke", { email: r.email })}
                        >
                          Revoke
                        </button>
                      ) : null}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {msg ? <p className="text-sm text-amber-200">{msg}</p> : null}
    </div>
  );
}
