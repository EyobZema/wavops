import Link from "next/link";

export default function ConfirmationPage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <video
        className="pointer-events-none fixed inset-0 z-0 h-screen w-screen object-cover opacity-[0.12]"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none fixed inset-0 z-10 bg-black/10" aria-hidden="true" />

      <main className="relative z-20 grid min-h-screen place-items-center px-6 py-16">
        <div className="w-full max-w-2xl rounded-3xl border border-white/80 bg-white p-8 text-center text-black shadow-[0_20px_50px_rgba(0,0,0,0.35)] lg:p-10">
          <h1 className="section-title text-3xl font-semibold tracking-tight md:text-4xl">
            Your dataset is being analyzed
          </h1>
          <p className="mt-4 text-base text-black/70">
            We&apos;ll email you as soon as your initial audit report is ready.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-full bg-black px-7 py-3 text-sm font-semibold text-white transition hover:bg-black/90"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
