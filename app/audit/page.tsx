"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LegalAgreementField } from "@/components/upload";

type LeadDraft = {
  name: string;
  workEmail: string;
  company: string;
  datasetType?: string;
  datasetLink: string;
  folderAccessConfirmed: boolean;
};

export default function AuditPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!agreed) {
      setError("Please accept the Terms of Service to submit your audit request.");
      return;
    }
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload: LeadDraft = {
      name: String(formData.get("name") || ""),
      workEmail: String(formData.get("workEmail") || ""),
      company: String(formData.get("company") || ""),
      datasetType: String(formData.get("datasetType") || ""),
      datasetLink: String(formData.get("datasetLink") || ""),
      folderAccessConfirmed: formData.get("folderAccessConfirmed") === "on",
    };

    const response = await fetch("/api/audit-submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;
      setError(data?.error || "Could not submit right now.");
      setIsSubmitting(false);
      return;
    }

    router.push("/confirmation");
  }

  return (
    <div className="relative min-h-screen text-foreground">
      <video
        className="pointer-events-none fixed inset-0 z-0 h-screen w-screen object-cover opacity-[0.2]"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none fixed inset-0 z-10 bg-black/25" aria-hidden="true" />

      <main className="relative z-20 px-6 py-16 lg:px-10 lg:py-20">
        <div className="surface-glow mx-auto w-full max-w-3xl rounded-3xl border border-zinc-700/80 bg-zinc-950 p-8 text-zinc-100 lg:p-10">
          <h1 className="section-title text-3xl font-semibold tracking-tight md:text-4xl">
            Get Free Dataset Audit
          </h1>
          <p className="mt-3 text-sm text-zinc-300 md:text-base">
            Tell us a few details and we will review your dataset.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Name</span>
              <input
                name="name"
                type="text"
                required
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-zinc-500"
                placeholder="Jane Doe"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">Work email</span>
              <input
                name="workEmail"
                type="email"
                required
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-zinc-500"
                placeholder="jane@company.com"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">Company</span>
              <input
                name="company"
                type="text"
                required
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-zinc-500"
                placeholder="Acme AI"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">
                Dataset type (optional)
              </span>
              <input
                name="datasetType"
                type="text"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-zinc-500"
                placeholder="Speech, music, podcasts, multilingual..."
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium">
                Drive or Dropbox link to your dataset
              </span>
              <input
                name="datasetLink"
                type="url"
                required
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-zinc-500"
                placeholder="https://drive.google.com/... or https://dropbox.com/..."
              />
            </label>
            <label className="flex items-start gap-2 text-sm text-zinc-300">
              <input
                name="folderAccessConfirmed"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 rounded border-zinc-600 bg-zinc-900 accent-emerald-500"
              />
              <span>I confirm this folder is shared and viewable for review access.</span>
            </label>
            <p className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-xs text-zinc-400">
              Free audit disclaimer: up to 500 audio files are included in the free review.
            </p>

            <LegalAgreementField
              variant="audit"
              agreed={agreed}
              onAgreedChange={setAgreed}
              disabled={isSubmitting}
              className="mt-1"
            />

            {error ? <p className="text-sm text-red-400">{error}</p> : null}

            <button
              type="submit"
              disabled={isSubmitting || !agreed}
              className="rounded-full bg-zinc-100 px-7 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : "Submit audit request"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
