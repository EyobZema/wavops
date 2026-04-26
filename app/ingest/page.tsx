import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import QaWorkspace from "../components/qa-workspace";
import { getIngestCookieName, verifyIngestSession } from "@/lib/ingest-access-auth";

export default async function IngestPage() {
  const c = await cookies();
  const session = verifyIngestSession(c.get(getIngestCookieName())?.value);
  if (!session) {
    redirect("/ingest/login?next=%2Fingest");
  }

  return (
    <div className="relative min-h-screen text-foreground">
      <Navbar />
      <main className="relative z-20">
        <QaWorkspace ingestUserEmail={session.email} />
      </main>
      <Footer />
    </div>
  );
}
