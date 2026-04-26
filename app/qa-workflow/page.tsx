import Footer from "../components/footer";
import Navbar from "../components/navbar";
import QaWorkspace from "../components/qa-workspace";

export default function QaWorkflowPage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <Navbar />
      <main className="relative z-20">
        <QaWorkspace />
      </main>
      <Footer />
    </div>
  );
}
