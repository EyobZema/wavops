export default function CtaSection() {
  return (
    <section id="cta" className="animate-fade-up px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/80 bg-white px-8 py-12 text-center text-black shadow-[0_24px_60px_rgba(0,0,0,0.4)] backdrop-blur-sm lg:px-12">
        <h2 className="section-title text-3xl font-semibold tracking-tight md:text-4xl">
          Find out what&apos;s really inside your dataset
        </h2>
        <a
          href="mailto:contact@waveops.ai?subject=Request%20Free%20Audit"
          className="mt-8 inline-block rounded-full bg-black px-8 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black/90"
        >
          Request Free Audit
        </a>
      </div>
    </section>
  );
}
