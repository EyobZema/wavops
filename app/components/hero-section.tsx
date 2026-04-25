import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="top"
      className="animate-fade-up px-4 pb-10 pt-10 sm:px-6 lg:px-10 lg:pb-20 lg:pt-24"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 inline-flex rounded-full border border-zinc-600/50 bg-zinc-900/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted sm:px-4 sm:py-1.5 sm:text-xs">
          Audio Data Intelligence for AI Systems
        </p>
        <h1 className="section-title max-w-5xl text-[1.8rem] font-semibold tracking-tight text-foreground sm:text-4xl md:text-6xl lg:text-7xl">
          Musician-driven audio dataset QA for AI systems
        </h1>
        <p className="mt-4 max-w-4xl text-base leading-7 text-muted sm:mt-6 sm:text-lg sm:leading-8 md:text-xl">
          WavOps combines automated analysis with trained musicians to detect
          labeling errors, artifacts, and edge cases models miss.
        </p>
        <div className="mt-5 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
          <Link
            href="/audit"
            className="rounded-full bg-zinc-100 px-5 py-2.5 text-center text-sm font-semibold text-zinc-950 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_30px_rgba(255,255,255,0.12)] sm:px-7 sm:py-3"
          >
            Get Free Dataset Audit
          </Link>
          <a
            href="/how-wavops-works"
            className="rounded-full border border-zinc-700 bg-zinc-900/80 px-5 py-2.5 text-center text-sm font-medium text-zinc-200 transition hover:-translate-y-0.5 hover:border-zinc-500 hover:bg-zinc-800/80 sm:px-7 sm:py-3"
          >
            See How It Works
          </a>
        </div>
        <div className="mt-5 flex flex-col gap-2 text-sm text-zinc-300 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-4">
          <Link href="/audio-dataset-problems" className="underline decoration-zinc-600 underline-offset-4 hover:text-zinc-100">
            Explore audio dataset problems
          </Link>
          <Link href="/how-wavops-works" className="underline decoration-zinc-600 underline-offset-4 hover:text-zinc-100">
            Learn the WavOps QA workflow
          </Link>
        </div>
      </div>
    </section>
  );
}
