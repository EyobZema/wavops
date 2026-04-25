import {
  IconPipeline,
  IconShieldCheck,
  IconUsersSound,
  IconWaveform,
} from "./section-icons";

const solutions = [
  {
    lead: "Intelligent audio analysis",
    rest: "for noise, silence, and clipping",
    icon: IconWaveform,
  },
  {
    lead: "Structured validation pipeline",
    rest: "to standardize quality checks",
    icon: IconPipeline,
  },
  {
    lead: "Human QA plus expert review",
    rest: "from trained musicians",
    icon: IconUsersSound,
  },
  {
    lead: "Agreement-based quality control",
    rest: "to reduce subjectivity",
    icon: IconShieldCheck,
  },
] as const;

export default function SolutionSection() {
  return (
    <section
      id="solution"
      className="animate-fade-up px-4 py-10 sm:px-6 lg:px-10 lg:py-16"
    >
      <div className="surface-glow mx-auto max-w-6xl rounded-3xl border border-zinc-700/80 bg-zinc-950 p-6 text-zinc-100 sm:p-8 lg:p-10">
        <h2 className="section-title text-3xl font-semibold tracking-tight md:text-4xl">
          How WavOps Fixes It
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-muted">
          We combine automated analysis with structured human review so you can
          trust your training data before it reaches production.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {solutions.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.lead}
                className="interactive-card group relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 p-6"
              >
                <div
                  className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[radial-gradient(circle_at_center,rgb(16_185_129/0.12),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                />
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-700/80 bg-zinc-950/80 text-emerald-400/95 shadow-inner">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 space-y-1.5">
                    <p className="text-base font-semibold leading-snug text-zinc-100">
                      {item.lead}
                    </p>
                    <p className="text-sm leading-7 text-zinc-400">
                      {item.rest}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
