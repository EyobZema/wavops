"use client";

import Link from "next/link";
import { useId, type RefObject } from "react";

type LegalAgreementFieldProps = {
  agreed: boolean;
  onAgreedChange: (agreed: boolean) => void;
  disabled?: boolean;
  /** `ingest` = audio upload workspace; `audit` = free audit / lead forms. */
  variant?: "ingest" | "audit";
  className?: string;
};

const auditLabel = (
  <>
    I agree to the{" "}
    <Link
      href="/terms"
      className="font-medium text-emerald-400/90 underline decoration-emerald-500/40 underline-offset-2 hover:text-emerald-300"
    >
      Terms of Service
    </Link>{" "}
    and confirm I have the right to request a dataset review and that the information I submit is
    accurate to the best of my knowledge.
  </>
);

const ingestLabel = (
  <>
    I confirm I have the legal rights to upload and process this audio and agree to the{" "}
    <Link
      href="/terms"
      className="font-medium text-emerald-400/90 underline decoration-emerald-500/40 underline-offset-2 hover:text-emerald-300"
    >
      Terms of Service
    </Link>
    .
  </>
);

/**
 * Required checkbox and Terms link before upload, analysis, or marketing/audit form submission.
 */
export function LegalAgreementField({
  agreed,
  onAgreedChange,
  disabled,
  variant = "ingest",
  className = "",
}: LegalAgreementFieldProps) {
  const id = useId();
  return (
    <div className={`rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 ${className}`.trim()}>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm text-zinc-300">
        <input
          id={id}
          type="checkbox"
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-zinc-600 bg-zinc-900 accent-emerald-500"
          checked={agreed}
          onChange={(e) => onAgreedChange(e.target.checked)}
          disabled={disabled}
        />
        <span>{variant === "audit" ? auditLabel : ingestLabel}</span>
      </label>
    </div>
  );
}

type UploadFileTriggerProps = {
  fileInputRef: RefObject<HTMLInputElement | null>;
  onFiles: (files: FileList | null) => void;
  uploading: boolean;
  canProceed: boolean;
  onAttemptWithoutAgreement?: () => void;
};

const ACCEPT = ".wav,.mp3,.flac";

/**
 * File input and trigger button; parent should disable when `!canProceed` and block in `onFiles` as well.
 */
export function UploadFileTrigger({
  fileInputRef,
  onFiles,
  uploading,
  canProceed,
  onAttemptWithoutAgreement,
}: UploadFileTriggerProps) {
  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={ACCEPT}
        className="hidden"
        onChange={(e) => {
          if (!canProceed) {
            e.target.value = "";
            onAttemptWithoutAgreement?.();
            return;
          }
          onFiles(e.target.files);
        }}
        disabled={uploading}
      />
      <div className="mt-3">
        <button
          type="button"
          onClick={() => {
            if (!canProceed) {
              onAttemptWithoutAgreement?.();
              return;
            }
            fileInputRef.current?.click();
          }}
          disabled={uploading || !canProceed}
          className="rounded-full border border-zinc-700 bg-zinc-900/80 px-4 py-2 text-sm text-zinc-200 transition hover:-translate-y-0.5 hover:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Select Audio Files"}
        </button>
      </div>
      <p className="mt-2 text-xs text-zinc-500">Accepted: .wav .mp3 .flac</p>
    </>
  );
}
