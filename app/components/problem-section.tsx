const problems = [
  "File names do not guarantee correct labels",
  "Studio recordings still contain artifacts",
  "Noise is more than just white noise",
  "Inconsistent data reduces model accuracy",
];

export default function ProblemSection() {
  return (
    <section id="problem" className="animate-fade-up px-6 py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-6xl rounded-3xl border border-border bg-surface/90 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.35)] lg:p-10">
        <h2 className="section-title text-3xl font-semibold tracking-tight md:text-4xl">
          The Hidden Problem in Audio Datasets
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {problems.map((item) => (
            <div
              key={item}
              className="interactive-card rounded-2xl border border-border bg-background p-5 text-muted"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
