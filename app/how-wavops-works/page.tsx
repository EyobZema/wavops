import type { Metadata } from "next";
import CtaSection from "../components/cta-section";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

export const metadata: Metadata = {
  title: "How WavOps Works | WavOps",
  description:
    "See how WavOps combines automated analysis with musician-driven QA to detect audio dataset errors before training.",
  alternates: {
    canonical: "/how-wavops-works",
  },
  openGraph: {
    title: "How WavOps Works | WavOps",
    description:
      "See how WavOps combines automated analysis with musician-driven QA to detect audio dataset errors before training.",
    url: "https://wavops.io/how-wavops-works",
    type: "article",
  },
};

const workflow = [
  {
    title: "1. Data ingestion",
    detail: "Upload files or connect storage to bring your dataset into a structured validation workflow.",
  },
  {
    title: "2. Automated analysis",
    detail: "WavOps scans for clipping, silence, noise patterns, and format issues at scale.",
  },
  {
    title: "3. Musician-driven QA",
    detail: "Trained musicians review edge cases, nuanced audio content, and label ambiguity with domain expertise.",
    highlight: true,
  },
  {
    title: "4. Error detection",
    detail: "Issues are categorized into actionable classes so teams can prioritize the highest-impact fixes first.",
  },
  {
    title: "5. Report delivery",
    detail: "You receive a structured audit report with findings, confidence signals, and next-step recommendations.",
  },
];

export default function HowWavopsWorksPage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <video
        className="pointer-events-none fixed inset-0 z-0 h-screen w-screen object-cover opacity-[0.2]"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none fixed inset-0 z-10 bg-black/25" aria-hidden="true" />
      <Navbar />
      <main className="relative z-20 px-6 py-12 lg:px-10 lg:py-16">
        <section className="mx-auto max-w-6xl">
          <p className="text-sm text-zinc-400">
            <a href="https://wavops.io" className="underline underline-offset-4">
              Back to homepage
            </a>
          </p>
          <h1 className="section-title mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            How WavOps works
          </h1>
          <p className="mt-4 max-w-3xl text-zinc-300">
            Musician-driven QA is the core differentiator in the WavOps pipeline.
          </p>
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {workflow.map((step) => (
              <li
                key={step.title}
                className={`interactive-card rounded-2xl border p-6 ${
                  step.highlight
                    ? "border-emerald-500/60 bg-emerald-950/20"
                    : "border-zinc-800 bg-zinc-900/70"
                }`}
              >
                <h2 className="text-xl font-semibold text-zinc-100">{step.title}</h2>
                <p className="mt-3 text-zinc-300">{step.detail}</p>
              </li>
            ))}
          </ol>
        </section>
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

