import {
  IconBarDrift,
  IconFileLabelMismatch,
  IconMic,
  IconWaveform,
} from "./section-icons";

const problems = [
  {
    text: "File names do not guarantee correct labels",
    icon: IconFileLabelMismatch,
  },
  {
    text: "Studio recordings still contain artifacts",
    icon: IconMic,
  },
  { text: "Noise is more than just white noise", icon: IconWaveform },
  {
    text: "Inconsistent data reduces model accuracy",
    icon: IconBarDrift,
  },
] as const;

export default function ProblemSection() {
  return (
    <section
      id="problem"
      className="animate-fade-up px-4 py-10 sm:px-6 lg:px-10 lg:py-16"
    >
      <div className="surface-glow mx-auto max-w-6xl rounded-3xl border border-zinc-700/80 bg-zinc-950 p-5 text-zinc-100 sm:p-8 lg:p-10">
        <h2 className="section-title text-2xl sm:text-3xl font-semibold tracking-tight md:text-4xl">
          The Hidden Problem in Audio Datasets
        </h2>
        <ul className="mt-6 grid list-none grid-cols-1 gap-4 sm:grid-cols-2">
          {problems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.text}>
                <div className="interactive-card group relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 p-5">
                  <div
                    className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[radial-gradient(circle_at_center,rgb(16_185_129/0.12),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  />
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-700/80 bg-zinc-950/80 text-emerald-400/95 shadow-inner">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="min-w-0 pt-0.5 text-base font-medium leading-relaxed text-zinc-100">
                      {item.text}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
