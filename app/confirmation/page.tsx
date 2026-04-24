import Link from "next/link";

export default function ConfirmationPage() {
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

      <main className="relative z-20 grid min-h-screen place-items-center px-6 py-16">
        <div className="surface-glow w-full max-w-2xl rounded-3xl border border-zinc-700/80 bg-zinc-950 p-8 text-center text-zinc-100 lg:p-10">
          <h1 className="section-title text-3xl font-semibold tracking-tight md:text-4xl">
            Your dataset is being analyzed
          </h1>
          <p className="mt-4 text-base text-zinc-300">
            We&apos;ll email you as soon as your initial audit report is ready.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-full bg-zinc-100 px-7 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-white"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
