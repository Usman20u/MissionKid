import type { ReactNode } from 'react';

// Small decorative marks. Each sits beside words that carry its meaning, so
// every one is hidden from assistive technology and none is ever the only
// signal of anything.

type MarkProps = Readonly<{ className: string; children: ReactNode }>;

function Mark({ className, children }: MarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {children}
    </svg>
  );
}

// Beside an approximate duration.
export function DurationMark() {
  return (
    <Mark className="duration-mark">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Mark>
  );
}

// Beside *Mission history*.
export function HistoryMark() {
  return (
    <Mark className="exit-mark">
      <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" />
      <path d="M4.5 4.5v3h3" />
      <path d="M12 8v4.2l2.8 1.8" />
    </Mark>
  );
}

// Beside *Change setup*.
export function SetupMark() {
  return (
    <Mark className="exit-mark">
      <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
      <circle cx="15" cy="7" r="2" />
      <circle cx="9" cy="17" r="2" />
    </Mark>
  );
}
