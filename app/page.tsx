import CtaSection from "./components/cta-section";
import Footer from "./components/footer";
import HeroSection from "./components/hero-section";
import Navbar from "./components/navbar";
import ProblemSection from "./components/problem-section";
import ProcessSection from "./components/process-section";
import SolutionSection from "./components/solution-section";
import ValueSection from "./components/value-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem] bg-gradient-to-b from-white/5 to-transparent" />
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ProcessSection />
        <ValueSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
