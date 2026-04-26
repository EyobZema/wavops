export default function Footer() {
  return (
    <footer className="mt-3 px-6 pb-3 lg:px-10">
      <div className="surface-glow mx-auto max-w-6xl rounded-2xl border border-zinc-700/60 bg-zinc-950/75 backdrop-blur-md">
        <div className="flex w-full flex-col gap-2 px-6 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="font-semibold text-foreground">WavOps</p>
          <p className="text-muted/90">Audio Data Intelligence for AI Systems</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              Terms of Service
            </a>
            <a
              href="mailto:contact@wavops.io"
              className="transition-colors hover:text-foreground"
            >
              contact@wavops.io
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

