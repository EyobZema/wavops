import { Suspense } from "react";
import PortalContent from "./portal-content";

export default function PortalPage() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center text-white/80">
          Loading…
        </div>
      }
    >
      <PortalContent />
    </Suspense>
  );
}
