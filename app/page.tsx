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
      <div
        className="pointer-events-none fixed inset-0 z-10 bg-black/10"
        aria-hidden="true"
      />
      <Navbar />
      <main className="relative z-20">
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
