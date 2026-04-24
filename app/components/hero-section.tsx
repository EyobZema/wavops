export default function HeroSection() {
  return (
    <section id="top" className="animate-fade-up px-6 pt-20 pb-20 lg:px-10 lg:pt-32">
      <div className="mx-auto max-w-6xl">
        <p className="mb-5 inline-flex rounded-full border border-zinc-600/50 bg-zinc-900/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-muted">
          Audio Data Intelligence for AI Systems
        </p>
        <h1 className="section-title max-w-4xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Your audio dataset is not as clean as you think.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted md:text-xl">
          WavOps identifies hidden labeling errors, noise artifacts, and
          inconsistencies that reduce AI model performance.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="/audit"
            className="rounded-full bg-zinc-100 px-7 py-3 text-center text-sm font-semibold text-zinc-950 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_30px_rgba(255,255,255,0.12)]"
          >
            Get Free Dataset Audit
          </a>
          <a
            href="#process"
            className="rounded-full border border-zinc-700 bg-zinc-900/80 px-7 py-3 text-center text-sm font-medium text-zinc-200 transition hover:-translate-y-0.5 hover:border-zinc-500 hover:bg-zinc-800/80"
          >
            See How It Works
          </a>
        </div>
      </div>
    </section>
  );
}
