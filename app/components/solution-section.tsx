const solutions = [
  "Intelligent audio analysis for noise, silence, and clipping",
  "Structured validation pipeline to standardize quality checks",
  "Human QA plus expert review from trained musicians",
  "Agreement-based quality control to reduce subjectivity",
];

export default function SolutionSection() {
  return (
    <section id="solution" className="animate-fade-up px-6 py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title text-3xl font-semibold tracking-tight md:text-4xl">
          How WaveOps Fixes It
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-muted">
          We combine automated analysis with structured human review so you can
          trust your training data before it reaches production.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {solutions.map((item) => (
            <div
              key={item}
              className="interactive-card rounded-2xl border border-border bg-surface p-6 text-muted"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
