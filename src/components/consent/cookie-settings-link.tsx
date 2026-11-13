'use client';

import { OPEN_CONSENT_EVENT } from '@/lib/consent';

/** Footer action that reopens the cookie banner, so consent can be changed or revoked at any time. */
export function CookieSettingsLink({ label, className = '' }: { label: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className={`cursor-pointer text-left ${className}`}
    >
      {label}
    </button>
  );
}
