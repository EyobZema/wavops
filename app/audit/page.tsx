"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type LeadDraft = {
  name: string;
  workEmail: string;
  company: string;
  datasetType?: string;
};

export default function AuditPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const payload: LeadDraft = {
      name: String(formData.get("name") || ""),
      workEmail: String(formData.get("workEmail") || ""),
      company: String(formData.get("company") || ""),
      datasetType: String(formData.get("datasetType") || ""),
    };

    localStorage.setItem("auditLeadDraft", JSON.stringify(payload));
    router.push("/workspace");
  }

  return (
    <div className="relative min-h-screen text-foreground">
      <video
        className="pointer-events-none fixed inset-0 z-0 h-screen w-screen object-cover opacity-[0.12]"
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
        <div className="mx-auto w-full max-w-3xl rounded-3xl border border-zinc-700/80 bg-zinc-950 p-8 text-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.45)] lg:p-10">
          <h1 className="section-title text-3xl font-semibold tracking-tight md:text-4xl">
            Get Free Dataset Audit
          </h1>
          <p className="mt-3 text-sm text-zinc-400 md:text-base">
            Tell us a few details and we will set up your secure workspace.
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-zinc-100 px-7 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-white disabled:opacity-70"
            >
              {isSubmitting ? "Continuing..." : "Continue"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
