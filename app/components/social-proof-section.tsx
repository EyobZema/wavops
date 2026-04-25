export default function SocialProofSection() {
  const proofItems = [
    "Case study coming soon",
    "Dataset accuracy improved by XX%",
    "XX% labeling errors detected",
  ];

  return (
    <section className="animate-fade-up px-6 py-12 lg:px-10 lg:py-16">
      <div className="surface-glow mx-auto max-w-6xl rounded-3xl border border-zinc-700/80 bg-zinc-950 p-8 text-zinc-100 lg:p-10">
        <h2 className="section-title text-3xl font-semibold tracking-tight md:text-4xl">
          Proof, not promises
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {proofItems.map((item) => (
            <article
              key={item}
              className="interactive-card rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6"
            >
              <p className="text-base font-medium text-zinc-100">{item}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

