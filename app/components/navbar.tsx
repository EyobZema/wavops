const navLinks = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "Process", href: "#process" },
  { label: "Value", href: "#value" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 mt-3 px-6 lg:px-10">
      <div className="mx-auto max-w-6xl rounded-2xl border border-white/25 bg-black/12 backdrop-blur-md shadow-[0_10px_28px_rgba(0,0,0,0.24)]">
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
            className="rounded-full border border-white/20 bg-white px-4 py-2 text-sm font-medium text-black transition hover:-translate-y-0.5 hover:shadow-[0_0_0_4px_rgba(255,255,255,0.08)]"
          >
          Get Free Dataset Audit
          </a>
        </div>
      </div>
    </header>
  );
}
