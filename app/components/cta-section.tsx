import Link from "next/link";

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
  return (
    <section id="cta" className="animate-fade-up px-6 py-20 lg:px-10 lg:py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-zinc-600/50 bg-zinc-950/90 px-8 py-14 text-center text-zinc-100 shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-sm lg:px-16 lg:py-16">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgb(16_185_129/0.12),transparent),radial-gradient(ellipse_60%_40%_at_100%_0%,rgb(80_90_255/0.08),transparent),radial-gradient(ellipse_50%_40%_at_0%_100%,rgb(255_255_255/0.04),transparent)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl"
          aria-hidden
        />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-400/80">
            Next step
          </p>
          <h2 className="section-title mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            Find out what&apos;s really inside your dataset
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-400">
            WavOps identifies hidden labeling errors, noise artifacts, and
            inconsistencies that reduce AI model performance.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <Link
              href="/audit"
              className="group inline-flex w-full min-w-[220px] items-center justify-center gap-2 rounded-full border border-emerald-400/20 bg-gradient-to-b from-emerald-400/90 to-emerald-500/90 px-8 py-3.5 text-sm font-semibold text-zinc-950 shadow-[0_8px_32px_rgba(16,185,129,0.25)] transition hover:-translate-y-0.5 hover:from-emerald-300/95 hover:to-emerald-500/90 hover:shadow-[0_12px_40px_rgba(16,185,129,0.35)] sm:w-auto"
            >
              Get Free Dataset Audit
              <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#process"
              className="text-sm font-medium text-zinc-400 underline decoration-zinc-600 underline-offset-4 transition hover:text-zinc-200"
            >
              How it works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
