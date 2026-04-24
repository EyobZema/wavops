import { redirect } from "next/navigation";

export default function IngestRedirectPage() {
  redirect("/portal?tab=data");
}
