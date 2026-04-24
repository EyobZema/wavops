"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, firebaseEnabled, googleProvider } from "@/lib/firebase-client";

type LeadDraft = {
  name: string;
  workEmail: string;
  company: string;
  datasetType?: string;
};

export default function WorkspacePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!auth || !firebaseEnabled) return;

    let cancelled = false;

    (async () => {
      await auth.authStateReady();
      if (cancelled) return;
      if (auth.currentUser) {
        router.replace("/portal");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  useEffect(() => {
    if (!auth || !db || !firebaseEnabled) return;

    let active = true;

    (async () => {
      try {
        const result = await getRedirectResult(auth);
        if (!result?.user || !active) return;

        const draftRaw = localStorage.getItem("auditLeadDraft");
        const draft: LeadDraft | null = draftRaw
          ? JSON.parse(draftRaw)
          : null;

        await setDoc(
          doc(db, "workspaces", result.user.uid),
          {
            userId: result.user.uid,
            name: draft?.name || result.user.displayName || "",
            workEmail: draft?.workEmail || result.user.email || "",
            company: draft?.company || "",
            datasetType: draft?.datasetType || "",
            status: "workspace_created",
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );

        router.replace("/portal");
      } catch {
        // Ignore; user may not be returning from redirect
      }
    })();

    return () => {
      active = false;
    };
  }, [router]);

  async function handleGoogle() {
    if (!firebaseEnabled || !auth || !db) {
      setMessage("Firebase is not configured yet. Add env vars and retry.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const draftRaw = localStorage.getItem("auditLeadDraft");
      const draft: LeadDraft | null = draftRaw ? JSON.parse(draftRaw) : null;

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await setDoc(
        doc(db, "workspaces", user.uid),
        {
          userId: user.uid,
          name: draft?.name || user.displayName || "",
          workEmail: draft?.workEmail || user.email || "",
          company: draft?.company || "",
          datasetType: draft?.datasetType || "",
          status: "workspace_created",
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      router.push("/portal");
    } catch (error) {
      const authError = error as { code?: string; message?: string };
      const code = authError?.code || "unknown";

      // Some browsers/environments block popups; redirect flow is more reliable.
      if (code === "auth/popup-blocked" || code === "auth/cancelled-popup-request") {
        await signInWithRedirect(auth, googleProvider);
        return;
      }

      setMessage(
        `Google sign in failed (${code}). Ensure this domain is added in Firebase Auth authorized domains.`
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen text-foreground">
      <video
        className="pointer-events-none fixed inset-0 z-0 h-screen w-screen object-cover opacity-[0.2]"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none fixed inset-0 z-10 bg-black/25" aria-hidden="true" />

      <main className="relative z-20 px-6 py-16 lg:px-10 lg:py-20">
        <div className="surface-glow mx-auto w-full max-w-3xl rounded-3xl border border-zinc-700/80 bg-zinc-950 p-8 text-zinc-100 lg:p-10">
          <h1 className="section-title text-3xl font-semibold tracking-tight md:text-4xl">
            Create your secure workspace
          </h1>
          <p className="mt-4 text-base text-zinc-300">
            To analyze your dataset, we&apos;ll create a secure workspace for you.
          </p>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="mt-8 rounded-full bg-zinc-100 px-7 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-white disabled:opacity-70"
          >
            {loading ? "Connecting..." : "Continue with Google"}
          </button>

          {message ? <p className="mt-4 text-sm text-red-700">{message}</p> : null}
        </div>
      </main>
    </div>
  );
}
