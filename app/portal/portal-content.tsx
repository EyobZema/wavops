"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  onAuthStateChanged,
  signOut,
  type User,
} from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { auth, db, firebaseEnabled } from "@/lib/firebase-client";
import PortalIngestPanel from "../components/portal-ingest-panel";

type Tab = "overview" | "data" | "status" | "help";

export default function PortalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [workspaceStatus, setWorkspaceStatus] = useState<string | null>(null);

  const tabParam = searchParams.get("tab");
  const tab: Tab =
    tabParam === "data" || tabParam === "status" || tabParam === "help"
      ? tabParam
      : "overview";

  useEffect(() => {
    if (!firebaseEnabled || !auth) {
      router.replace("/workspace");
      return;
    }

    let cancelled = false;
    let unsub: (() => void) | undefined;

    (async () => {
      // Wait until persisted session is restored. Without this, the first
      // onAuthStateChanged event can be null and incorrectly send users to /workspace
      // after a client navigation (e.g. Marketing site -> back to portal).
      await auth.authStateReady();
      if (cancelled) return;

      if (!auth.currentUser) {
        router.replace("/workspace");
        return;
      }

      setUser(auth.currentUser);
      setAuthReady(true);

      unsub = onAuthStateChanged(auth, (u) => {
        if (cancelled) return;
        if (!u) {
          router.replace("/workspace");
          return;
        }
        setUser(u);
      });
    })();

    return () => {
      cancelled = true;
      unsub?.();
    };
  }, [router]);

  useEffect(() => {
    if (!user || !db) return;
    const ref = doc(db, "workspaces", user.uid);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        const d = snap.data();
        setWorkspaceStatus(typeof d?.status === "string" ? d.status : null);
      },
      () => setWorkspaceStatus(null)
    );
    return () => unsub();
  }, [user]);

  if (!authReady || !user) {
    return (
      <div className="grid min-h-screen place-items-center text-white/80">
        <p>Loading your workspaceâ€¦</p>
      </div>
    );
  }

  const displayName = user.displayName || "Member";
  const email = user.email || "";
  const photo = user.photoURL;

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
      <div
        className="pointer-events-none fixed inset-0 z-10 bg-black/25"
        aria-hidden="true"
      />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 md:px-6 lg:px-8">
        <header className="surface-glow mb-6 flex flex-col gap-4 rounded-2xl border border-zinc-700/60 bg-zinc-950/80 px-4 py-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-4">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo}
                alt=""
                className="h-12 w-12 rounded-full border border-zinc-600 object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-600 bg-zinc-800/80 text-sm font-semibold text-zinc-100">
                {displayName.slice(0, 1).toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-lg font-semibold text-white">{displayName}</p>
              <p className="text-sm text-white/70">{email}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/"
              className="rounded-full border border-zinc-600/80 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800/80"
            >
              Marketing site
            </Link>
            <button
              type="button"
              onClick={() => auth && signOut(auth).then(() => router.push("/"))}
              className="rounded-full border border-zinc-600/80 bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-white"
            >
              Sign out
            </button>
          </div>
        </header>

        <nav className="mb-6 flex flex-wrap gap-2">
          {(
            [
              { id: "overview" as const, label: "Overview" },
              { id: "data" as const, label: "Data & intake" },
              { id: "status" as const, label: "Activity" },
              { id: "help" as const, label: "Help" },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                router.push(`/portal?tab=${item.id}`, { scroll: false });
              }}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                tab === item.id
                  ? "bg-zinc-100 text-zinc-950"
                  : "border border-zinc-600/80 text-zinc-200 hover:bg-zinc-800/80"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {tab === "overview" && (
          <div className="space-y-6">
            <div className="surface-glow rounded-2xl border border-zinc-700/80 bg-zinc-950 p-6 text-zinc-100">
              <h1 className="section-title text-2xl font-semibold md:text-3xl">
                Your workspace
              </h1>
              <p className="mt-2 text-base text-zinc-300">
                You stay signed in on this device. Add dataset details,
                check activity, or get help below.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <button
                type="button"
                onClick={() => {
                  router.push("/portal?tab=data", { scroll: false });
                }}
                className="interactive-card rounded-2xl border border-zinc-700/80 bg-zinc-900/60 p-5 text-left text-zinc-100 shadow-sm"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
                  Next step
                </p>
                <p className="mt-2 text-lg font-semibold">Data & intake</p>
                <p className="mt-1 text-sm text-zinc-300">
                  Connect Drive or share a link and notes
                </p>
              </button>
              <button
                type="button"
                onClick={() => {
                  router.push("/portal?tab=status", { scroll: false });
                }}
                className="interactive-card rounded-2xl border border-zinc-700/80 bg-zinc-900/60 p-5 text-left text-zinc-100 shadow-sm"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
                  Status
                </p>
                <p className="mt-2 text-lg font-semibold">Activity</p>
                <p className="mt-1 text-sm text-zinc-300">
                  Current workspace state
                </p>
              </button>
              <a
                href="mailto:contact@wavops.io?subject=Workspace%20help"
                className="interactive-card rounded-2xl border border-zinc-700/80 bg-zinc-900/60 p-5 text-left text-zinc-100 shadow-sm"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
                  Support
                </p>
                <p className="mt-2 text-lg font-semibold">Email the team</p>
                <p className="mt-1 text-sm text-zinc-300">
                  contact@wavops.io
                </p>
              </a>
            </div>
          </div>
        )}

        {tab === "data" && (
          <div className="surface-glow rounded-2xl border border-zinc-700/80 bg-zinc-950 p-6 text-zinc-100">
            <h2 className="section-title text-xl font-semibold md:text-2xl">
              Data & intake
            </h2>
            <p className="mt-2 text-sm text-zinc-300">
              Choose how you want to get your sample to WavOps.
            </p>
            <div className="mt-6">
              <PortalIngestPanel user={user} />
            </div>
          </div>
        )}

        {tab === "status" && (
          <div className="surface-glow rounded-2xl border border-zinc-700/80 bg-zinc-950 p-6 text-zinc-100">
            <h2 className="section-title text-xl font-semibold md:text-2xl">
              Activity
            </h2>
            <p className="mt-2 text-sm text-zinc-300">
              Latest status from your workspace record in Firestore.
            </p>
            <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/80 p-4">
              <p className="text-sm text-zinc-500">Workspace status</p>
              <p className="mt-1 text-lg font-medium capitalize text-zinc-100">
                {workspaceStatus?.replaceAll("_", " ") || "active"}
              </p>
            </div>
          </div>
        )}

        {tab === "help" && (
          <div className="surface-glow rounded-2xl border border-zinc-700/80 bg-zinc-950 p-6 text-zinc-100">
            <h2 className="section-title text-xl font-semibold md:text-2xl">
              Help
            </h2>
            <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-zinc-300">
              <li>
                You remain signed in until you use Sign out or clear site data
                (session uses device-local storage).
              </li>
              <li>
                For dataset access questions, email{" "}
                <a
                  className="font-medium text-zinc-100 underline"
                  href="mailto:contact@wavops.io"
                >
                  contact@wavops.io
                </a>
                .
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

