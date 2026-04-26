import type { Metadata } from "next";
import { Suspense } from "react";
import Footer from "../../components/footer";
import Link from "next/link";
import IngestLoginForm from "./ingest-login-form";

export const metadata: Metadata = {
  title: "WavOps Ingest sign in | WavOps",
  description: "Sign in to the WavOps Ingest audio QA workspace.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/ingest/login" },
};

export default function IngestLoginPage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <header className="border-b border-zinc-800/80 bg-zinc-950/80 px-4 py-4 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link
            href="/"
            className="text-sm font-semibold text-zinc-100 transition hover:text-emerald-300"
          >
            WavOps
          </Link>
        </div>
      </header>
      <main className="px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-md">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
            WavOps Ingest
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Enter the email address you were given access for. You will stay signed in on this
            device for a week.
          </p>
          <Suspense
            fallback={
              <div className="mt-6 h-12 animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/50" />
            }
          >
            <IngestLoginForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
