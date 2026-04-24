const values = [
  "Cleaner datasets",
  "More reliable model training",
  "Reduced labeling errors",
  "Higher confidence in data quality",
];

export default function ValueSection() {
  return (
    <section id="value" className="animate-fade-up px-6 py-16 lg:px-10 lg:py-20">
      <div className="surface-glow mx-auto max-w-6xl rounded-3xl border border-zinc-700/80 bg-zinc-950 p-8 text-zinc-100 lg:p-10">
        <h2 className="section-title text-3xl font-semibold tracking-tight md:text-4xl">
          What You Get
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {values.map((item) => (
            <div
              key={item}
              className="interactive-card rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5"
            >
              <p className="text-zinc-100">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
