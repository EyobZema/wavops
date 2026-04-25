"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

function ArrowIcon(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={props.className}
      aria-hidden
    >
      <path
        d="M4 10h12m0 0-4-4m4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CtaSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") || ""),
      workEmail: String(formData.get("workEmail") || ""),
      company: "Website lead",
      datasetType: String(formData.get("datasetType") || ""),
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
      setStatusMessage(data?.error || "Could not submit right now.");
      setIsSubmitting(false);
      return;
    }

    (event.currentTarget as HTMLFormElement).reset();
    setStatusMessage("Submission received. We will reach out soon.");
    setIsSubmitting(false);
  }

  return (
    <section
      id="cta"
      className="animate-fade-up px-4 py-10 sm:px-6 lg:px-10 lg:py-16"
    >
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-zinc-600/50 bg-zinc-950/90 px-5 py-8 text-zinc-100 shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:px-8 sm:py-12 lg:px-12 lg:py-12">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgb(16_185_129/0.12),transparent),radial-gradient(ellipse_60%_40%_at_100%_0%,rgb(80_90_255/0.08),transparent),radial-gradient(ellipse_50%_40%_at_0%_100%,rgb(255_255_255/0.04),transparent)]"
          aria-hidden
        />
        <div className="relative grid gap-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-400/80">
              Next step
            </p>
            <h2 className="section-title mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              Get Free Dataset Audit
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">
              Submit your dataset -&gt; receive audit -&gt; review findings.
            </p>
            <a
              href="mailto:contact@wavops.io"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-zinc-200 underline decoration-zinc-600 underline-offset-4 transition hover:text-zinc-100"
            >
              Email us directly: contact@wavops.io
              <ArrowIcon className="h-4 w-4" />
            </a>
          </div>

          <form
            className="rounded-2xl border border-zinc-700/80 bg-zinc-900/60 p-4 sm:p-5"
            onSubmit={handleSubmit}
          >
            <label className="mb-3 block text-sm">
              <span className="mb-1.5 block text-zinc-300">Name</span>
              <input
                required
                name="name"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-zinc-500"
                placeholder="Your name"
              />
            </label>
            <label className="mb-3 block text-sm">
              <span className="mb-1.5 block text-zinc-300">Email</span>
              <input
                required
                type="email"
                name="workEmail"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-zinc-500"
                placeholder="you@company.com"
              />
            </label>
            <label className="mb-3 block text-sm">
              <span className="mb-1.5 block text-zinc-300">Dataset type</span>
              <input
                name="datasetType"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-zinc-500"
                placeholder="Speech, music, podcasts"
              />
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-gradient-to-b from-emerald-400/90 to-emerald-500/90 px-5 py-2.5 text-sm font-semibold text-zinc-950 shadow-[0_8px_32px_rgba(16,185,129,0.25)] transition hover:-translate-y-0.5 hover:from-emerald-300/95 hover:to-emerald-500/90 disabled:opacity-70"
              >
                {isSubmitting ? "Submitting..." : "Get Free Dataset Audit"}
                <ArrowIcon className="h-4 w-4" />
              </button>
              <Link
                href="/audit"
                className="text-sm text-zinc-300 underline decoration-zinc-600 underline-offset-4 hover:text-zinc-100"
              >
                Open full form
              </Link>
            </div>
            {statusMessage ? (
              <p className="mt-3 text-sm text-zinc-300">{statusMessage}</p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
