import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const title = "WavOps Terms of Service";

export const metadata: Metadata = {
  title: `${title} | WavOps`,
  description:
    "Terms governing use of WavOps, including user responsibilities, data processing, and content policies.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title,
    url: "https://wavops.io/terms",
  },
};

const sections = [
  {
    heading: "1. User responsibility",
    body:
      "You must confirm that you have the legal rights to upload and process the audio you submit through WavOps.",
  },
  {
    heading: "2. Data processing",
    body:
      "Files you provide are used only for analysis and quality-assurance operations related to your request. WavOps does not redistribute your audio for unrelated purposes.",
  },
  {
    heading: "3. Limitation of liability",
    body:
      "WavOps is not responsible for copyrighted or otherwise protected content that you upload without proper authorization. You are solely responsible for the material you submit.",
  },
  {
    heading: "4. Data retention",
    body:
      "Files may be stored temporarily to complete analysis and related services, and may be deleted after a defined retention period or upon request, subject to operational and legal requirements.",
  },
  {
    heading: "5. Content removal",
    body:
      "WavOps may remove or refuse to process content that violates these terms, applicable law, or our acceptable-use policies.",
  },
];

export default function TermsPage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <Navbar />
      <main className="relative z-20 px-4 pb-16 pt-8 sm:px-6 lg:px-10">
        <article className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-100 md:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Last updated for operational clarity. For questions, contact{" "}
            <a
              className="text-emerald-400/90 underline decoration-emerald-500/40 underline-offset-4 hover:text-emerald-300"
              href="mailto:contact@wavops.io"
            >
              contact@wavops.io
            </a>
            .
          </p>
          <div className="mt-10 space-y-8 text-base leading-relaxed text-zinc-300">
            {sections.map((s) => (
              <section key={s.heading} className="space-y-2">
                <h2 className="text-lg font-semibold text-zinc-100">{s.heading}</h2>
                <p className="text-zinc-400">{s.body}</p>
              </section>
            ))}
          </div>
          <p className="mt-10 text-sm text-zinc-500">
            <Link
              className="text-emerald-400/90 underline decoration-emerald-500/40 underline-offset-4 hover:text-emerald-300"
              href="/"
            >
              Back to home
            </Link>
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
