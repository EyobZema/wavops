import {
  IconBullseye,
  IconCheckCircle,
  IconSparkles,
  IconTrendingUp,
} from "./section-icons";

const values = [
  {
    text: "Cleaner datasets",
    icon: IconSparkles,
  },
  {
    text: "More reliable model training",
    icon: IconTrendingUp,
  },
  {
    text: "Reduced labeling errors",
    icon: IconCheckCircle,
  },
  {
    text: "Higher confidence in data quality",
    icon: IconBullseye,
  },
] as const;

export default function ValueSection() {
  return (
    <section id="value" className="animate-fade-up px-4 py-10 sm:px-6 lg:px-10 lg:py-16">
      <div className="surface-glow mx-auto max-w-6xl rounded-3xl border border-zinc-700/80 bg-zinc-950 p-6 text-zinc-100 sm:p-8 lg:p-10">
        <h2 className="section-title text-3xl font-semibold tracking-tight md:text-4xl">
          What You Get
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {values.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.text}
                className="interactive-card group relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 p-6"
              >
                <div
                  className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[radial-gradient(circle_at_center,rgb(16_185_129/0.1),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                />
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-700/80 bg-zinc-950/80 text-emerald-400/95 shadow-inner">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="pt-0.5 text-base font-semibold leading-relaxed text-zinc-100">
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
