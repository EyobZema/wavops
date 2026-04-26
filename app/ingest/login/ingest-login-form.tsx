"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

function safeNext(s: string | null) {
  if (!s) return "/ingest";
  if (!s.startsWith("/") || s.startsWith("//")) return "/ingest";
  return s;
}

export default function IngestLoginForm() {
  const sp = useSearchParams();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [okRequest, setOkRequest] = useState(false);
  const next = safeNext(sp.get("next"));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    setOkRequest(false);
    try {
      const res = await fetch("/api/ingest-access/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = (await res.json().catch(() => null)) as
        | { error?: string }
        | { ok: true }
        | null;
      if (res.ok && data && "ok" in data) {
        window.location.assign(next);
        return;
      }
      setErr(
        typeof (data as { error?: string })?.error === "string"
          ? (data as { error: string }).error
          : "Sign-in failed."
      );
    } catch {
      setErr("Network error.");
    } finally {
      setBusy(false);
    }
  }

  async function onRequest() {
    setBusy(true);
    setErr("");
    setOkRequest(false);
    try {
      const res = await fetch("/api/ingest-access/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = (await res.json().catch(() => null)) as { error?: string } | { ok: true } | null;
      if (res.ok && data && "ok" in data) {
        setOkRequest(true);
        return;
      }
      setErr(
        typeof (data as { error?: string })?.error === "string"
          ? (data as { error: string }).error
          : "Could not record request."
      );
    } catch {
      setErr("Network error.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-6 space-y-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="ingest-email" className="block text-sm font-medium text-zinc-400">
            Email
          </label>
          <input
            id="ingest-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={busy}
            placeholder="you@company.com"
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-full border border-emerald-400/20 bg-gradient-to-b from-emerald-400/90 to-emerald-500/90 py-2.5 text-sm font-semibold text-zinc-950 disabled:opacity-50"
        >
          {busy ? "Checking…" : "Continue to WavOps Ingest"}
        </button>
        {err ? <p className="text-sm text-amber-200">{err}</p> : null}
        {okRequest ? (
          <p className="text-sm text-emerald-300/90">
            Request recorded. A team member can approve you from the admin area.
          </p>
        ) : null}
      </form>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 text-sm text-zinc-500">
        <p className="text-zinc-400">Not approved yet?</p>
        <p className="mt-1">
          Submit the same address so we can see your request, then a team member will add access.
        </p>
        <button
          type="button"
          disabled={busy || !email.trim()}
          onClick={() => void onRequest()}
          className="mt-2 text-emerald-400/90 underline decoration-emerald-500/30 underline-offset-2 hover:text-emerald-300 disabled:opacity-50"
        >
          Request access
        </button>
      </div>
    </div>
  );
}
