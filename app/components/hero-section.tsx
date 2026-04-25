import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="top"
      className="animate-fade-up px-6 pb-16 pt-16 lg:px-10 lg:pb-20 lg:pt-24"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 inline-flex rounded-full border border-zinc-600/50 bg-zinc-900/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-muted">
          Audio Data Intelligence for AI Systems
        </p>
        <h1 className="section-title max-w-5xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Musician-driven audio dataset QA for AI systems
        </h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-muted md:text-xl">
          WavOps combines automated analysis with trained musicians to detect
          labeling errors, artifacts, and edge cases models miss.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="mailto:contact@wavops.io"
            className="rounded-full bg-zinc-100 px-7 py-3 text-center text-sm font-semibold text-zinc-950 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_30px_rgba(255,255,255,0.12)]"
          >
            Get Free Dataset Audit
          </a>
          <a
            href="/how-wavops-works"
            className="rounded-full border border-zinc-700 bg-zinc-900/80 px-7 py-3 text-center text-sm font-medium text-zinc-200 transition hover:-translate-y-0.5 hover:border-zinc-500 hover:bg-zinc-800/80"
          >
            See How It Works
          </a>
        </div>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-zinc-300">
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

