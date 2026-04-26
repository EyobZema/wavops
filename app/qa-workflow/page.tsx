import { permanentRedirect } from "next/navigation";

export default function QaWorkflowRedirectPage() {
  permanentRedirect("/ingest");
}
