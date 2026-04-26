"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LegalAgreementField, UploadFileTrigger } from "@/components/upload";

type Dataset = {
  id: string;
  name: string;
  status: "queued" | "analyzing" | "ready_for_review" | "completed";
};

type QueueFile = {
  id: string;
  name: string;
  workflow_status: "queued" | "analyzing" | "ready_for_review" | "in_review" | "reviewed";
  locked_by: string | null;
  assigned_to: string | null;
  tags: string[];
  detected_issues: string[];
  metrics: Record<string, number>;
};

const API_BASE = process.env.NEXT_PUBLIC_QA_API_BASE ?? "http://localhost:8000/api";

async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as T;
}

async function apiPost<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: body instanceof FormData ? undefined : { "Content-Type": "application/json" },
    body: body ? (body instanceof FormData ? body : JSON.stringify(body)) : undefined,
  });
  if (!res.ok) throw new Error(await res.text());
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return (await res.json()) as T;
  }
  return {} as T;
}

function StepNav({ step }: { step: "Upload" | "Analyze" | "Review" | "Export" }) {
  const steps = ["Upload", "Analyze", "Review", "Export"] as const;
  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      {steps.map((item, i) => (
        <div key={item} className="flex items-center gap-2">
          <span
            className={
              "rounded-full border px-3 py-1 text-xs font-semibold " +
              (step === item
                ? "border-emerald-400/40 bg-gradient-to-b from-emerald-400/90 to-emerald-500/90 text-zinc-950"
                : "border-zinc-700 bg-zinc-900/80 text-zinc-200")
            }
          >
            {item}
          </span>
          {i < steps.length - 1 ? <span className="text-zinc-500">→</span> : null}
        </div>
      ))}
    </div>
  );
}

type QaWorkspaceProps = {
  /** When set (WavOps Ingest is signed in), used as the QA `user_id` and shows session UI. */
  ingestUserEmail?: string;
};

export default function QaWorkspace({ ingestUserEmail }: QaWorkspaceProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const userId = ingestUserEmail?.trim() || "qa_reviewer";
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [datasetId, setDatasetId] = useState<string>("");
  const [datasetName, setDatasetName] = useState<string>("");
  const [files, setFiles] = useState<QueueFile[]>([]);
  const [statusFilter, setStatusFilter] = useState<"ready_for_review" | "in_review" | "reviewed">("ready_for_review");
  const [selectedFileId, setSelectedFileId] = useState<string>("");
  const [version, setVersion] = useState(0);
  const [message, setMessage] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [running, setRunning] = useState(false);
  const [reviewTags, setReviewTags] = useState<string[]>([]);
  const [reviewNotes, setReviewNotes] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [staticJsonText, setStaticJsonText] = useState<string | null>(null);
  const [staticJsonState, setStaticJsonState] = useState<"idle" | "loading" | "ok" | "missing">("idle");

  const selectedFile = files.find((f) => f.id === selectedFileId);

  const currentStep = useMemo(() => {
    const ds = datasets.find((d) => d.id === datasetId);
    if (!ds) return "Upload" as const;
    if (ds.status === "queued" || ds.status === "analyzing") return "Analyze" as const;
    if (ds.status === "ready_for_review") return "Review" as const;
    return "Export" as const;
  }, [datasets, datasetId]);

  const refreshDatasets = useCallback(async () => {
    const rows = await apiGet<Dataset[]>("/datasets");
    setDatasets(rows);
    if (!datasetId && rows.length > 0) {
      setDatasetId(rows[0].id);
      setDatasetName(rows[0].name);
    }
  }, [datasetId]);

  const refreshQueue = useCallback(async () => {
    if (!datasetId) return;
    const ds = await apiGet<Dataset>(`/datasets/${datasetId}`);
    setDatasetName(ds.name);
    const rows = await apiGet<QueueFile[]>(`/queue/${datasetId}?status=${statusFilter}`);
    setFiles(rows);
    if (rows.length && !rows.some((f) => f.id === selectedFileId)) {
      setSelectedFileId(rows[0].id);
    }
  }, [datasetId, selectedFileId, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      refreshDatasets().catch((e: Error) => setMessage(e.message));
    }, 0);
    return () => clearTimeout(timer);
  }, [refreshDatasets]);

  useEffect(() => {
    const timer = setTimeout(() => {
      refreshQueue().catch((e: Error) => setMessage(e.message));
    }, 0);
    return () => clearTimeout(timer);
  }, [refreshQueue]);

  useEffect(() => {
    if (!datasetName) {
      setStaticJsonText(null);
      setStaticJsonState("idle");
      return;
    }
    const path = `/data/${encodeURIComponent(datasetName)}.json`;
    setStaticJsonState("loading");
    let cancelled = false;
    fetch(path)
      .then((r) => {
        if (!r.ok) throw new Error("not found");
        return r.text();
      })
      .then((text) => {
        if (cancelled) return;
        setStaticJsonText(text);
        setStaticJsonState("ok");
      })
      .catch(() => {
        if (cancelled) return;
        setStaticJsonText(null);
        setStaticJsonState("missing");
      });
    return () => {
      cancelled = true;
    };
  }, [datasetName]);

  useEffect(() => {
    const id = setInterval(async () => {
      try {
        const sync = await apiGet<{ changed: boolean; version: number }>(`/sync?since_version=${version}`);
        if (sync.changed) {
          setVersion(sync.version);
          await refreshDatasets();
          await refreshQueue();
        }
      } catch {
        // silent polling failure
      }
    }, 2000);
    return () => clearInterval(id);
  }, [version, datasetId, refreshDatasets, refreshQueue, statusFilter]);

  async function onUpload(filesInput: FileList | null) {
    if (!agreed) {
      setMessage("Please accept the Terms of Service before uploading audio.");
      return;
    }
    if (!filesInput || !filesInput.length) return;
    setUploading(true);
    setMessage("");
    try {
      const form = new FormData();
      form.append("user_id", userId);
      form.append("dataset_name", `upload_${Date.now()}`);
      Array.from(filesInput).forEach((f) => form.append("files", f));
      const created = await apiPost<Dataset>("/datasets/upload", form);
      await refreshDatasets();
      setDatasetId(created.id);
      setMessage("Dataset uploaded and queued.");
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setUploading(false);
    }
  }

  async function runAnalysis() {
    if (!agreed) {
      setMessage("Please accept the Terms of Service before running analysis.");
      return;
    }
    if (!datasetId) return;
    setRunning(true);
    setMessage("");
    try {
      await apiPost(`/datasets/${datasetId}/analyze`);
      setMessage("Analysis started. Queue will update automatically.");
      await refreshDatasets();
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setRunning(false);
    }
  }

  async function openForReview(fileId: string) {
    try {
      await apiPost(`/files/${fileId}/open`, { user_id: userId });
      setSelectedFileId(fileId);
      const match = files.find((f) => f.id === fileId);
      setReviewTags(match?.tags ?? []);
      setReviewNotes("");
      await refreshQueue();
    } catch (e) {
      setMessage((e as Error).message);
    }
  }

  async function saveReview() {
    if (!selectedFile) return;
    try {
      await apiPost(`/files/${selectedFile.id}/review`, {
        user_id: userId,
        tags: reviewTags.length ? reviewTags : ["clean"],
        notes: reviewNotes,
      });
      await apiPost(`/files/${selectedFile.id}/release`, { user_id: userId });
      setMessage("Review saved.");
      await refreshQueue();
      await refreshDatasets();
    } catch (e) {
      setMessage((e as Error).message);
    }
  }

  async function exportBundle() {
    if (!datasetId) return;
    window.open(`${API_BASE}/datasets/${datasetId}/export/archive`, "_blank");
  }

  async function exportReport() {
    if (!datasetId) return;
    window.open(`${API_BASE}/datasets/${datasetId}/export/report`, "_blank");
  }

  return (
    <section className="animate-fade-up px-4 pb-10 pt-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="surface-glow mb-5 rounded-2xl border border-zinc-700/70 bg-zinc-950/75 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="section-title text-2xl font-semibold text-zinc-100 sm:text-3xl">
                WavOps Ingest
              </h1>
              <p className="mt-2 text-sm text-zinc-400">
                Queue-based audio QA: upload, analyze, review, and export. Multi-user when your API
                is configured.
              </p>
              {ingestUserEmail ? (
                <p className="mt-1 text-xs text-zinc-500">
                  Signed in as <span className="text-zinc-300">{ingestUserEmail}</span>
                </p>
              ) : null}
            </div>
            {ingestUserEmail ? (
              <form
                className="shrink-0"
                onSubmit={async (e) => {
                  e.preventDefault();
                  await fetch("/api/ingest-access/logout", { method: "POST" });
                  window.location.href = "/ingest/login";
                }}
              >
                <button
                  type="submit"
                  className="rounded-full border border-zinc-600 bg-zinc-900/80 px-3 py-1.5 text-xs text-zinc-200 transition hover:border-zinc-500"
                >
                  Sign out
                </button>
              </form>
            ) : null}
          </div>
          <StepNav step={currentStep} />
          {message ? <p className="mt-2 text-sm text-emerald-300">{message}</p> : null}
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="surface-glow rounded-2xl border border-zinc-700/70 bg-zinc-950/75 p-5">
              <h2 className="text-lg font-semibold text-zinc-100">1) Upload</h2>
              <p className="mt-1 text-xs text-zinc-500">Uploading and analysis require agreement below.</p>
              <LegalAgreementField
                agreed={agreed}
                onAgreedChange={setAgreed}
                disabled={uploading}
              />
              <UploadFileTrigger
                fileInputRef={fileInputRef}
                onFiles={onUpload}
                uploading={uploading}
                canProceed={agreed}
                onAttemptWithoutAgreement={() =>
                  setMessage("Please accept the Terms of Service before uploading audio.")
                }
              />
            </div>

            <div className="surface-glow rounded-2xl border border-zinc-700/70 bg-zinc-950/75 p-5">
              <h2 className="text-lg font-semibold text-zinc-100">2) Analyze</h2>
              <select
                value={datasetId}
                onChange={(e) => setDatasetId(e.target.value)}
                className="mt-3 w-full rounded-lg border border-zinc-700 bg-zinc-900/80 p-2 text-sm text-zinc-200"
              >
                {datasets.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.status})
                  </option>
                ))}
              </select>
              <button
                onClick={runAnalysis}
                disabled={running || !datasetId || !agreed}
                className="mt-3 rounded-full border border-emerald-400/20 bg-gradient-to-b from-emerald-400/90 to-emerald-500/90 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {running ? "Analyzing..." : "Run Analysis"}
              </button>
            </div>

            {datasetName ? (
              <div className="surface-glow rounded-2xl border border-zinc-700/70 bg-zinc-950/75 p-5">
                <h2 className="text-lg font-semibold text-zinc-100">Synced ingestion JSON</h2>
                <p className="mt-1 text-xs text-zinc-500">
                  Fetches a static file at the path that matches the selected dataset name, for example{" "}
                  <span className="font-mono text-zinc-400">/data/{datasetName}.json</span>, after you run{" "}
                  <span className="font-mono">npm run sync:data</span> in the WavOps repo.
                </p>
                {staticJsonState === "loading" ? (
                  <p className="mt-2 text-sm text-zinc-500">Loading static results…</p>
                ) : null}
                {staticJsonState === "missing" ? (
                  <p className="mt-2 text-sm text-amber-200/80">
                    No file at this path yet. Run the local engine, sync, commit, and deploy to see live data.
                  </p>
                ) : null}
                {staticJsonState === "ok" && staticJsonText ? (
                  <pre className="mt-3 max-h-64 overflow-auto rounded-lg border border-zinc-800 bg-zinc-900/80 p-3 text-xs text-zinc-300">
                    {staticJsonText}
                  </pre>
                ) : null}
              </div>
            ) : null}

            <div className="surface-glow rounded-2xl border border-zinc-700/70 bg-zinc-950/75 p-5">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-zinc-100">3) Review Queue</h2>
                <div className="flex gap-2">
                  <button
                    className="rounded-full border border-zinc-700 bg-zinc-900/80 px-3 py-1 text-xs text-zinc-200"
                    onClick={() => setStatusFilter("ready_for_review")}
                  >
                    Unreviewed
                  </button>
                  <button
                    className="rounded-full border border-zinc-700 bg-zinc-900/80 px-3 py-1 text-xs text-zinc-200"
                    onClick={() => setStatusFilter("in_review")}
                  >
                    In Review
                  </button>
                  <button
                    className="rounded-full border border-zinc-700 bg-zinc-900/80 px-3 py-1 text-xs text-zinc-200"
                    onClick={() => setStatusFilter("reviewed")}
                  >
                    Reviewed
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[580px] text-sm text-zinc-300">
                  <thead>
                    <tr className="border-b border-zinc-700/70 text-left text-xs uppercase tracking-wide text-zinc-500">
                      <th className="px-2 py-2">File</th>
                      <th className="px-2 py-2">Status</th>
                      <th className="px-2 py-2">Locked By</th>
                      <th className="px-2 py-2">Assigned</th>
                      <th className="px-2 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((f) => (
                      <tr key={f.id} className="border-b border-zinc-800">
                        <td className="px-2 py-2 font-mono text-xs">{f.name}</td>
                        <td className="px-2 py-2">{f.workflow_status}</td>
                        <td className="px-2 py-2">{f.locked_by || "-"}</td>
                        <td className="px-2 py-2">{f.assigned_to || "-"}</td>
                        <td className="px-2 py-2">
                          <button
                            onClick={() => openForReview(f.id)}
                            className="rounded-full border border-zinc-700 bg-zinc-900/80 px-3 py-1 text-xs"
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="surface-glow rounded-2xl border border-zinc-700/70 bg-zinc-950/75 p-5">
              <h2 className="text-lg font-semibold text-zinc-100">File Review</h2>
              {selectedFile ? (
                <>
                  <p className="mt-2 font-mono text-xs text-zinc-300">{selectedFile.name}</p>
                  <audio controls className="mt-3 w-full">
                    <source src={`${API_BASE.replace("/api", "")}/data/datasets/${datasetName}/${selectedFile.name}`} />
                  </audio>
                  <div className="mt-3 rounded-lg border border-dashed border-zinc-700 p-3 text-xs text-zinc-500">
                    Waveform (placeholder)
                  </div>
                  <p className="mt-3 text-sm text-zinc-400">
                    Issues: {selectedFile.detected_issues?.length ? selectedFile.detected_issues.join(", ") : "none"}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["noise_like", "possible_distortion", "excessive_silence", "low_volume", "clean"].map((tag) => (
                      <label key={tag} className="inline-flex items-center gap-1 text-xs text-zinc-300">
                        <input
                          type="checkbox"
                          checked={reviewTags.includes(tag)}
                          onChange={(e) =>
                            setReviewTags((prev) =>
                              e.target.checked ? [...new Set([...prev, tag])] : prev.filter((x) => x !== tag)
                            )
                          }
                        />
                        {tag}
                      </label>
                    ))}
                  </div>
                  <textarea
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="Reviewer notes"
                    className="mt-3 w-full rounded-lg border border-zinc-700 bg-zinc-900/80 p-2 text-sm text-zinc-200"
                    rows={4}
                  />
                  <button
                    onClick={saveReview}
                    className="mt-3 rounded-full border border-emerald-400/20 bg-gradient-to-b from-emerald-400/90 to-emerald-500/90 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:-translate-y-0.5"
                  >
                    Save Review
                  </button>
                </>
              ) : (
                <p className="mt-2 text-sm text-zinc-500">Select a file from queue to begin review.</p>
              )}
            </div>

            <div className="surface-glow rounded-2xl border border-zinc-700/70 bg-zinc-950/75 p-5">
              <h2 className="text-lg font-semibold text-zinc-100">4) Export</h2>
              <p className="mt-2 text-sm text-zinc-500">Dataset must be completed before exporting.</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={exportBundle}
                  className="rounded-full border border-zinc-700 bg-zinc-900/80 px-4 py-2 text-sm text-zinc-200"
                >
                  Export Archive
                </button>
                <button
                  onClick={exportReport}
                  className="rounded-full border border-zinc-700 bg-zinc-900/80 px-4 py-2 text-sm text-zinc-200"
                >
                  Export PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
