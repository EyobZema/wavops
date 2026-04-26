"use client";

import Link from "next/link";
import { useState } from "react";

const sectionLinks = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "Process", href: "#process" },
  { label: "Value", href: "#value" },
];

const pageLinks = [
  { label: "Dataset Problems", href: "/audio-dataset-problems" },
  { label: "How WavOps Works", href: "/how-wavops-works" },
  { label: "WavOps Ingest", href: "/ingest" },
];

function MenuIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={props.className} aria-hidden>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 mt-3 px-3 sm:px-6 lg:mt-6 lg:px-10">
      <div className="surface-glow mx-auto max-w-6xl overflow-hidden rounded-2xl border border-zinc-700/60 bg-zinc-950/75 backdrop-blur-md">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_-20%,rgb(16_185_129/0.14),transparent_40%),radial-gradient(circle_at_100%_0%,rgb(80_90_255/0.12),transparent_38%)]"
          aria-hidden
        />

        <div className="relative flex min-h-14 w-full items-center justify-between gap-2.5 px-3 py-2.5 sm:px-5 lg:px-6">
          <a
            href="https://wavops.io"
            className="shrink-0 text-base font-semibold tracking-tight text-white transition hover:text-emerald-300 sm:text-lg"
          >
            WavOps
          </a>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-2 md:flex">
            {sectionLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-zinc-300 transition hover:bg-zinc-900/80 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <span className="mx-1 h-5 w-px bg-zinc-700/80" aria-hidden />
            {pageLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-zinc-700/70 bg-zinc-900/60 px-3 py-1.5 text-sm font-medium text-zinc-200 transition hover:-translate-y-0.5 hover:border-zinc-500 hover:bg-zinc-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/audit"
              className="hidden shrink-0 rounded-full border border-emerald-400/20 bg-gradient-to-b from-emerald-400/90 to-emerald-500/90 px-4 py-2 text-sm font-semibold text-zinc-950 shadow-[0_8px_24px_rgba(16,185,129,0.28)] transition hover:-translate-y-0.5 hover:from-emerald-300/95 hover:to-emerald-500/90 sm:inline-flex"
            >
              Get Free Dataset Audit
            </Link>
            <Link
              href="/audit"
              className="shrink-0 rounded-full border border-emerald-400/20 bg-gradient-to-b from-emerald-400/90 to-emerald-500/90 px-2.5 py-1.5 text-[11px] font-semibold text-zinc-950 sm:hidden"
            >
              Audit
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="rounded-lg border border-zinc-700/80 bg-zinc-900/70 p-1.5 text-zinc-200 transition hover:border-zinc-500 hover:text-white md:hidden"
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              <MenuIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="relative border-t border-zinc-700/70 bg-zinc-950/85 px-3 py-2.5 md:hidden">
            <nav className="grid gap-2">
              {sectionLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-sm font-medium text-zinc-200"
                >
                  {link.label}
                </a>
              ))}
              {pageLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-sm font-medium text-zinc-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
