"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import type { User } from "firebase/auth";
import { db, firebaseEnabled } from "@/lib/firebase-client";

type Props = {
  user: User;
  compact?: boolean;
};

export default function PortalIngestPanel({ user, compact }: Props) {
  const router = useRouter();
  const [isBusy, setIsBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function markDriveConnected() {
    if (!db) return;
    setIsBusy(true);
    setMessage("");

    await setDoc(
      doc(db, "workspaces", user.uid),
      {
        ingestionMethod: "google_drive",
        status: "analyzing",
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    router.push("/confirmation");
  }

  async function submitDatasetDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!firebaseEnabled || !db) {
      setMessage("Firebase is not configured correctly.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const datasetLink = String(formData.get("datasetLink") || "");
    const datasetNotes = String(formData.get("datasetNotes") || "");

    if (!datasetLink && !datasetNotes) {
      setMessage("Please add a dataset link or a short description.");
      return;
    }

    setIsBusy(true);
    setMessage("");

    await setDoc(
      doc(db, "workspaces", user.uid),
      {
        ingestionMethod: datasetLink ? "shared_link" : "dataset_notes",
        datasetLink,
        datasetNotes,
        status: "analyzing",
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    router.push("/confirmation");
  }

  return (
    <div
      className={
        compact
          ? "space-y-5"
          : "grid gap-5 md:grid-cols-2"
      }
    >
      <div className="interactive-card rounded-2xl border border-black/10 bg-gradient-to-b from-white to-slate-50/80 p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Connect Google Drive</h2>
        <p className="mt-2 text-sm text-black/70">
          Mark Drive connection so we can coordinate sample pulls with your
          team.
        </p>
        <button
          type="button"
          onClick={markDriveConnected}
          disabled={isBusy}
          className="mt-5 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black/90 disabled:opacity-70"
        >
          Connect Google Drive
        </button>
      </div>

      <form
        onSubmit={submitDatasetDetails}
        className="interactive-card rounded-2xl border border-black/10 bg-gradient-to-b from-white to-slate-50/80 p-6 shadow-sm"
      >
        <h2 className="text-lg font-semibold">Share dataset details</h2>
        <p className="mt-2 text-sm text-black/70">
          Paste a folder link and/or notes. We start with metadata review.
        </p>
        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-medium">
            Google Drive / dataset link
          </span>
          <input
            type="url"
            name="datasetLink"
            placeholder="https://drive.google.com/..."
            className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm outline-none transition focus:border-black/40"
          />
        </label>
        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-medium">Notes</span>
          <textarea
            name="datasetNotes"
            rows={compact ? 3 : 4}
            placeholder="Size, format, language mix, known issues…"
            className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm outline-none transition focus:border-black/40"
          />
        </label>
        <button
          type="submit"
          disabled={isBusy}
          className="mt-5 w-full rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black/90 disabled:opacity-70 md:w-auto"
        >
          Continue to analysis
        </button>
      </form>

      {message ? <p className="text-sm text-red-700 md:col-span-2">{message}</p> : null}
    </div>
  );
}
