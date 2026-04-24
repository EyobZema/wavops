"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  onAuthStateChanged,
  signOut,
  type User,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, firebaseEnabled } from "@/lib/firebase-client";

export default function IngestPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!auth) {
      router.replace("/workspace");
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.replace("/workspace");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [router]);

  async function markDriveConnected() {
    if (!user || !db) return;
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

    if (!firebaseEnabled || !user || !db) {
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
      <div className="pointer-events-none fixed inset-0 z-10 bg-black/10" aria-hidden="true" />

      <main className="relative z-20 px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-4xl rounded-3xl border border-white/80 bg-white p-8 text-black shadow-[0_20px_50px_rgba(0,0,0,0.35)] lg:p-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h1 className="section-title text-3xl font-semibold tracking-tight md:text-4xl">
              Secure Workspace
            </h1>
            {user ? (
              <button
                type="button"
                onClick={() => auth && signOut(auth).then(() => router.push("/"))}
                className="rounded-full border border-black/15 px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white"
              >
                Sign out
              </button>
            ) : null}
          </div>

          <p className="mb-8 text-base text-black/70">
            Choose how you want to ingest your data.
          </p>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-black/10 bg-white p-6">
              <h2 className="text-lg font-semibold">Connect Google Drive</h2>
              <p className="mt-2 text-sm text-black/70">
                Link Drive and let WavOps pull a dataset sample for auditing.
              </p>
              <button
                type="button"
                onClick={markDriveConnected}
                disabled={isBusy}
                className="mt-5 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black/90 disabled:opacity-70"
              >
                Connect Google Drive
              </button>
            </div>

            <form
              onSubmit={submitDatasetDetails}
              className="rounded-2xl border border-black/10 bg-white p-6"
            >
              <h2 className="text-lg font-semibold">Share Dataset Details</h2>
              <p className="mt-2 text-sm text-black/70">
                Paste a Drive folder link and/or add notes. We&apos;ll start
                from metadata review while file transfer is finalized.
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
                  rows={4}
                  placeholder="Dataset size, format, language mix, known issues..."
                  className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm outline-none transition focus:border-black/40"
                />
              </label>
              <button
                type="submit"
                disabled={isBusy}
                className="mt-5 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black/90 disabled:opacity-70"
              >
                Continue to Analysis
              </button>
            </form>
          </div>

          {message ? <p className="mt-5 text-sm text-red-700">{message}</p> : null}
        </div>
      </main>
    </div>
  );
}
