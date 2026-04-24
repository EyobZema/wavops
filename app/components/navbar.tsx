const navLinks = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "Process", href: "#process" },
  { label: "Value", href: "#value" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-[#09090d]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 lg:px-10">
        <a href="#top" className="text-lg font-semibold tracking-tight text-white">
          WaveOps
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
          href="#cta"
          className="rounded-full border border-white/20 bg-white px-4 py-2 text-sm font-medium text-black transition hover:-translate-y-0.5 hover:shadow-[0_0_0_4px_rgba(255,255,255,0.08)]"
        >
          Request Free Audit
        </a>
      </div>
    </header>
  );
}
