export default function Footer() {
  return (
    <footer className="border-t border-border/80 px-6 py-10 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="font-semibold text-foreground">WavOps</p>
        <p className="text-muted/90">Audio Data Intelligence for AI Systems</p>
        <a
          href="mailto:contact@waveops.ai"
          className="transition-colors hover:text-foreground"
        >
          contact@waveops.ai
        </a>
      </div>
    </footer>
  );
}
