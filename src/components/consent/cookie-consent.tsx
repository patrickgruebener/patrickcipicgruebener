'use client';

import Link from 'next/link';
import Script from 'next/script';
import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import {
  ConsentState,
  GA_MEASUREMENT_ID,
  OPEN_CONSENT_EVENT,
  analyticsCookieNames,
  isAnalyticsHost,
  parseConsent,
  serializeConsent,
} from '@/lib/consent';

export interface CookieConsentTexts {
  title: string;
  text: string;
  accept: string;
  decline: string;
  privacyLink: string;
}

// Accept and decline carry equal weight on purpose (no nudging toward consent).
// Important modifiers beat the unlayered button reset in globals.css.
const CHOICE_BUTTON =
  'cursor-pointer rounded-[3px] border! border-solid! border-ink! px-[18px] pt-[10px] pb-[11px] text-[15px] font-semibold text-ink ' +
  'transition-colors hover:bg-sheet! motion-reduce:transition-none ' +
  'focus-visible:outline-2 focus-visible:outline-offset-[3px]! focus-visible:outline-brand-blue!';

/** Removes GA cookies on the host and on the parent domain, where gtag sets them. */
function clearAnalyticsCookies() {
  const domain = window.location.hostname.replace(/^www\./, '');
  for (const name of analyticsCookieNames(document.cookie)) {
    document.cookie = `${name}=;path=/;max-age=0`;
    document.cookie = `${name}=;path=/;max-age=0;domain=.${domain}`;
  }
}

function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', { allow_google_signals: false, allow_ad_personalization_signals: false });`}
      </Script>
    </>
  );
}

// Tiny external store over document.cookie, so the server render and hydration stay in sync
const listeners = new Set<() => void>();
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
const noopSubscribe = () => () => {};
// 'pending' on the server and during hydration: render nothing until the cookie is known
const getConsentSnapshot = () => parseConsent(document.cookie) ?? 'unset';
const getServerConsentSnapshot = () => 'pending' as const;
const getHostSnapshot = () => isAnalyticsHost(window.location.hostname);
const getServerHostSnapshot = () => false;

export function CookieConsent({ texts }: { texts: CookieConsentTexts }) {
  const consent = useSyncExternalStore(subscribe, getConsentSnapshot, getServerConsentSnapshot);
  const isProduction = useSyncExternalStore(noopSubscribe, getHostSnapshot, getServerHostSnapshot);
  const [isReopened, setIsReopened] = useState(false);
  const isOpen = consent === 'unset' || isReopened;

  useEffect(() => {
    const open = () => setIsReopened(true);
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  const decide = useCallback(
    (state: ConsentState) => {
      document.cookie = serializeConsent(state);
      setIsReopened(false);
      if (state === 'denied' && consent === 'granted') {
        // gtag cannot be unloaded, so drop its cookies and start clean
        clearAnalyticsCookies();
        window.location.reload();
        return;
      }
      listeners.forEach((listener) => listener());
    },
    [consent],
  );

  return (
    <>
      {consent === 'granted' && isProduction && <GoogleAnalytics />}
      {isOpen && (
        <section
          role="region"
          aria-labelledby="cookie-consent-title"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-paper px-4 py-5 font-text text-ink shadow-[0_-8px_24px_rgba(11,18,51,0.08)]"
        >
          <div className="mx-auto flex max-w-[1180px] flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
            <div className="max-w-[68ch]">
              <h2 id="cookie-consent-title" className="mb-1.5 text-[17px] font-bold">
                {texts.title}
              </h2>
              <p className="text-[15px] leading-[1.55] text-ink-2">
                {texts.text}{' '}
                <Link href="/impressum#datenschutz" className="font-semibold text-ink underline decoration-brand-green decoration-2 underline-offset-[4px]">
                  {texts.privacyLink}
                </Link>
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <button type="button" onClick={() => decide('denied')} className={CHOICE_BUTTON}>
                {texts.decline}
              </button>
              <button type="button" onClick={() => decide('granted')} className={CHOICE_BUTTON}>
                {texts.accept}
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
