/** Inline SVGs for marketing sections — no extra dependencies */

export function IconWaveform(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={props.className}>
      <rect x="3" y="13" width="3" height="8" rx="1" opacity="0.85" />
      <rect x="8" y="8" width="3" height="13" rx="1" />
      <rect x="13" y="10" width="3" height="11" rx="1" opacity="0.9" />
      <rect x="18" y="5" width="3" height="16" rx="1" opacity="0.75" />
    </svg>
  );
}

export function IconPipeline(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={props.className}>
      <rect x="2" y="7" width="5" height="10" rx="1.5" opacity="0.35" />
      <rect x="9" y="4" width="5" height="16" rx="1.5" opacity="0.7" />
      <rect x="16" y="9" width="5" height="11" rx="1.5" opacity="0.5" />
    </svg>
  );
}

export function IconUsersSound(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={props.className}>
      <path
        d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM4 20a8 8 0 0 1 16 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 14h8M9 17h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

export function IconShieldCheck(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={props.className}>
      <path
        d="M12 3 5 6v6c0 5 3.5 8.5 7 9 3.5-.5 7-4 7-9V6l-7-3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconUpload(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={props.className}>
      <path
        d="M12 4v10m0 0 3.5-3.5M12 14 8.5 10.5M4 17h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconCpu(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={props.className}>
      <rect
        x="7"
        y="7"
        width="10"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7 4v3M12 4v3M17 4v3M7 20v-3M12 20v-3M17 20v-3M4 7h3M4 12h3M4 17h3M20 7h-3M20 12h-3M20 17h-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconRoute(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={props.className}>
      <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 7.5c2 1 3 2.5 3.5 5M11.5 13.5c-1 2-2 3.5-3 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconUsersRound(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={props.className}>
      <circle cx="9" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4 19a5 5 0 0 1 7.5-1M14 19a4.5 4.5 0 0 0-5-1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconPackage(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={props.className}>
      <path
        d="M12 3 3 7.5 12 12l9-4.5L12 3zM3 12v4.5L12 21l9-4.5V12M12 12v9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** File + uncertain label */
export function IconFileLabelMismatch(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={props.className}>
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M14 2v6h6M9 16h.01M8 20h.01"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9.5 9.5a1.5 1.5 0 1 1 3 0c0 1.2-.4 1.4-.9 1.8a2.5 2.5 0 0 0-.5 1.1h-.01M12 16v.01"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
    </svg>
  );
}

export function IconMic(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={props.className}>
      <path
        d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8 10v1a4 4 0 0 0 8 0v-1M12 19v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Uneven bars / drift */
export function IconBarDrift(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={props.className}>
      <rect x="3" y="15" width="3.5" height="6" rx="0.8" opacity="0.4" />
      <rect x="8.5" y="4" width="3.5" height="17" rx="0.8" opacity="0.7" />
      <rect x="14" y="11" width="3.5" height="10" rx="0.8" opacity="0.5" />
      <rect x="19.5" y="7" width="2.5" height="14" rx="0.6" opacity="0.3" />
    </svg>
  );
}

export function IconSparkles(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={props.className}>
      <path
        d="M12 2.5v4.5M12 17v4.5M2.5 12h4.5M17 12h4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M4.5 4.5l1.7 1.7M19.5 4.5l-1.7 1.7M4.5 19.5l1.7-1.7M19.5 19.5l-1.7-1.7"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" fillOpacity="0.35" />
    </svg>
  );
}

export function IconTrendingUp(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={props.className}>
      <path
        d="M4 19h16M4 19V5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d="M6 14l4-4 3 2 5-7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconCheckCircle(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={props.className}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="m8.5 12 2.2 2.2L15 8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconBullseye(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={props.className}>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle
        cx="12"
        cy="12"
        r="7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <path
        d="M4 4l2 2M20 4l-2 2M4 20l2-2M20 20l-2-2"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}
