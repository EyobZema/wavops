export default function Footer() {
  return (
    <footer className="mt-3 px-6 pb-3 lg:px-10">
      <div className="mx-auto max-w-6xl rounded-2xl border border-zinc-700/60 bg-zinc-950/75 backdrop-blur-md shadow-[0_10px_28px_rgba(0,0,0,0.45)]">
        <div className="flex w-full flex-col gap-2 px-6 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="font-semibold text-foreground">WavOps</p>
          <p className="text-muted/90">Audio Data Intelligence for AI Systems</p>
          <a
            href="mailto:contact@waveops.ai"
            className="transition-colors hover:text-foreground"
          >
            contact@waveops.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
