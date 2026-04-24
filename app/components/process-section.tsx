const steps = [
  "Upload or connect dataset",
  "Automated audio analysis",
  "Smart routing for QA",
  "Multi-review agreement system",
  "Final structured dataset output",
];

export default function ProcessSection() {
  return (
    <section id="process" className="animate-fade-up px-6 py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title text-3xl font-semibold tracking-tight md:text-4xl">
          How It Works
        </h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-5">
          {steps.map((step, index) => (
            <li
              key={step}
              className="interactive-card rounded-2xl border border-white/80 bg-white p-5 text-black"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/60">
                Step {index + 1}
              </p>
              <p className="mt-2 text-sm leading-7 text-black">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
