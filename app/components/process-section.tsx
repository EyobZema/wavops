import {
  IconCpu,
  IconPackage,
  IconRoute,
  IconUpload,
  IconUsersRound,
} from "./section-icons";

const steps = [
  { text: "Upload or connect dataset", icon: IconUpload },
  { text: "Automated audio analysis", icon: IconCpu },
  { text: "Smart routing for QA", icon: IconRoute },
  { text: "Multi-review agreement system", icon: IconUsersRound },
  { text: "Final structured dataset output", icon: IconPackage },
] as const;

function StepConnector() {
  return (
    <div className="flex w-4 shrink-0 items-center self-center" aria-hidden>
      <div className="h-px w-full min-w-2 bg-gradient-to-r from-zinc-600/40 via-zinc-500/35 to-zinc-600/40" />
      <svg
        className="-ml-0.5 h-3 w-3 shrink-0 text-zinc-500"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M3 1.5 9 6 3 10.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="animate-fade-up px-6 py-12 lg:px-10 lg:py-16"
    >
      <div className="surface-glow mx-auto max-w-6xl rounded-3xl border border-zinc-700/80 bg-zinc-950 p-8 text-zinc-100 lg:p-10">
        <h2 className="section-title text-3xl font-semibold tracking-tight md:text-4xl">
          How It Works
        </h2>

        <ol className="relative mt-8 md:hidden">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            return (
              <li
                key={step.text}
                className="relative flex gap-4 pb-8 pl-0 last:pb-0"
              >
                {!isLast && (
                  <div
                    className="absolute left-5 top-12 bottom-0 w-px bg-gradient-to-b from-emerald-500/30 via-zinc-600/35 to-transparent"
                    aria-hidden
                  />
                )}
                <div className="relative z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-700/80 bg-zinc-900/90 text-emerald-400/90 shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                    Step {index + 1}
                  </p>
                  <p className="mt-1.5 text-sm leading-7 text-zinc-200">
                    {step.text}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <ol className="mt-8 hidden list-none p-0 md:flex md:min-w-0 md:items-stretch">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            return (
              <li
                key={step.text}
                className="flex min-w-0 flex-1 items-stretch"
              >
                <div className="interactive-card flex min-h-0 min-w-0 flex-1 flex-col rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 text-left">
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700/70 bg-zinc-950/60 text-emerald-400/90">
                    <Icon className="h-[18px] w-[18px]" />
                  </div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                    Step {index + 1}
                  </p>
                  <p className="mt-1.5 text-sm font-medium leading-snug text-zinc-100">
                    {step.text}
                  </p>
                </div>
                {!isLast && <StepConnector />}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
