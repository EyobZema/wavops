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
      <div className="interactive-card rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-zinc-100">Connect Google Drive</h2>
        <p className="mt-2 text-sm text-zinc-300">
          Mark Drive connection so we can coordinate sample pulls with your
          team.
        </p>
        <button
          type="button"
          onClick={markDriveConnected}
          disabled={isBusy}
          className="mt-5 rounded-full bg-zinc-100 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:-translate-y-0.5 hover:bg-white disabled:opacity-70"
        >
          Connect Google Drive
        </button>
      </div>

      <form
        onSubmit={submitDatasetDetails}
        className="interactive-card rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 p-6 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-zinc-100">Share dataset details</h2>
        <p className="mt-2 text-sm text-zinc-300">
          Paste a folder link and/or notes. We start with metadata review.
        </p>
        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-medium text-zinc-300">
            Google Drive / dataset link
          </span>
          <input
            type="url"
            name="datasetLink"
            placeholder="https://drive.google.com/..."
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition focus:border-zinc-500"
          />
        </label>
        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-medium text-zinc-300">Notes</span>
          <textarea
            name="datasetNotes"
            rows={compact ? 3 : 4}
            placeholder="Size, format, language mix, known issues…"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition focus:border-zinc-500"
          />
        </label>
        <button
          type="submit"
          disabled={isBusy}
          className="mt-5 w-full rounded-full bg-zinc-100 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:-translate-y-0.5 hover:bg-white disabled:opacity-70 md:w-auto"
        >
          Continue to analysis
        </button>
      </form>

      {message ? <p className="text-sm text-red-400 md:col-span-2">{message}</p> : null}
    </div>
  );
}
