// Cookie consent and Google Analytics settings. Pure helpers, no DOM access, so they stay testable.

export const GA_MEASUREMENT_ID = 'G-5S1L0QWK5P';
export const CONSENT_COOKIE = 'cookie_consent';
// Ask again after roughly six months
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 182;
// Fired by the footer link to reopen the banner
export const OPEN_CONSENT_EVENT = 'cookie-consent:open';

// Analytics only runs on production, never on staging or localhost
const ANALYTICS_HOSTS = new Set(['patrickcipicgruebener.com', 'www.patrickcipicgruebener.com']);

export type ConsentState = 'granted' | 'denied';

/** Reads the stored decision from a `document.cookie` style string. */
export function parseConsent(cookieString: string): ConsentState | null {
  const entry = cookieString
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${CONSENT_COOKIE}=`));
  if (!entry) return null;

  const value = entry.slice(CONSENT_COOKIE.length + 1);
  return value === 'granted' || value === 'denied' ? value : null;
}

/** Builds the cookie string that stores the decision. */
export function serializeConsent(state: ConsentState): string {
  return `${CONSENT_COOKIE}=${state};path=/;max-age=${CONSENT_MAX_AGE_SECONDS};SameSite=Lax`;
}

export function isAnalyticsHost(hostname: string): boolean {
  return ANALYTICS_HOSTS.has(hostname.toLowerCase());
}

/** Names of the cookies Google Analytics set (`_ga`, `_ga_<id>`), so they can be removed on revoke. */
export function analyticsCookieNames(cookieString: string): string[] {
  return cookieString
    .split(';')
    .map((part) => part.trim().split('=')[0])
    .filter((name) => name === '_ga' || name.startsWith('_ga_'));
}
