export default function HeroSection() {
  return (
    <section
      id="top"
      className="animate-fade-up relative isolate overflow-hidden px-6 pt-20 pb-20 lg:px-10 lg:pt-32"
    >
      <video
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover opacity-30"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/65 via-black/70 to-background"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl">
        <p className="mb-5 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-muted">
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
            href="#cta"
            className="rounded-full bg-white px-7 py-3 text-center text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(255,255,255,0.18)]"
          >
            Request Dataset Audit
          </a>
          <a
            href="#process"
            className="rounded-full border border-border bg-surface px-7 py-3 text-center text-sm font-medium transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5"
          >
            See How It Works
          </a>
        </div>
      </div>
    </section>
  );
}
