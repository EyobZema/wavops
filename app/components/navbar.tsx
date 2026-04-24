const navLinks = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "Process", href: "#process" },
  { label: "Value", href: "#value" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 mt-3 px-6 lg:px-10">
      <div className="surface-glow mx-auto max-w-6xl rounded-2xl border border-zinc-700/60 bg-zinc-950/75 backdrop-blur-md">
        <div className="flex h-16 w-full items-center justify-between px-6 lg:px-8">
          <a href="#top" className="text-lg font-semibold tracking-tight text-white">
            WavOps
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
          href="/audit"
            className="rounded-full border border-zinc-600/80 bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950 transition hover:-translate-y-0.5 hover:bg-white"
          >
          Get Free Dataset Audit
          </a>
        </div>
      </div>
    </header>
  );
}
