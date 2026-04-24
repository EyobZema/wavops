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
    <section id="problem" className="animate-fade-up px-6 py-16 lg:px-10 lg:py-20">
      <div className="surface-glow mx-auto max-w-6xl rounded-3xl border border-zinc-700/80 bg-zinc-950 p-8 text-zinc-100 lg:p-10">
        <h2 className="section-title text-3xl font-semibold tracking-tight md:text-4xl">
          The Hidden Problem in Audio Datasets
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {problems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.text}
                className="interactive-card group relative overflow-hidden rounded-2xl border border-amber-950/30 bg-gradient-to-br from-zinc-900/80 to-zinc-950/95 p-6 lg:col-span-6"
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[radial-gradient(circle_at_center,rgb(251_191_36/0.12),transparent_68%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                />
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-900/50 bg-amber-950/40 text-amber-300/90 shadow-inner">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="min-w-0 self-center text-[15px] font-medium leading-7 text-zinc-200">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
