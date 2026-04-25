import type { Metadata } from "next";
import CtaSection from "../components/cta-section";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

export const metadata: Metadata = {
  title: "Audio Dataset Problems | WavOps",
  description:
    "Learn why filenames, hidden noise, and label inconsistency reduce model quality in audio datasets.",
  alternates: {
    canonical: "/audio-dataset-problems",
  },
  openGraph: {
    title: "Audio Dataset Problems | WavOps",
    description:
      "Learn why filenames, hidden noise, and label inconsistency reduce model quality in audio datasets.",
    url: "https://wavops.io/audio-dataset-problems",
    type: "article",
  },
};

export default function AudioDatasetProblemsPage() {
  const sections = [
    {
      title: "Filenames are unreliable",
      body: "Filename conventions drift over time, so naming alone cannot guarantee true class labels.",
    },
    {
      title: "Hidden noise in clean audio",
      body: "Room tone, clipping, and mic artifacts remain in polished recordings and contaminate training data.",
    },
    {
      title: "Label inconsistency",
      body: "Different reviewers apply criteria differently, creating conflicting labels in the same dataset.",
    },
    {
      title: "Model performance impact",
      body: "These hidden issues lower precision and recall, increase retraining cycles, and hurt production reliability.",
    },
  ];

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
            Audio dataset problems that quietly hurt AI model quality
          </h1>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {sections.map((section) => (
              <article
                key={section.title}
                className="interactive-card rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6"
              >
                <h2 className="text-xl font-semibold text-zinc-100">{section.title}</h2>
                <p className="mt-3 text-zinc-300">{section.body}</p>
              </article>
            ))}
          </div>
        </section>
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

