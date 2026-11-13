import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from '@/lib/i18n.server';
import { buttonStyles } from '@/components/ui/Button';
import { CookieSettingsLink } from '@/components/consent/cookie-settings-link';

// Icons as inline SVG components
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

export async function Footer() {
  const { t } = await getTranslations();

  const linkClass =
    'flex items-center gap-2 text-ink transition-colors hover:text-brand-blue motion-reduce:transition-none';

  return (
    <footer className="border-t border-line bg-paper px-4 py-16 font-text text-ink">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          {/* Left: portrait, name, role and imprint */}
          <div className="flex h-full flex-col justify-between">
            <div className="grid grid-cols-[72px_auto] items-center gap-3.5">
              <Image
                src="/images/werkstatt/patrick-profil-800.webp"
                alt="Patrick Cipic Grübener"
                width={72}
                height={72}
                className="h-[72px] w-[72px] object-cover grayscale-[.15]"
              />
              <div>
                <h3 className="text-[17px] font-bold text-ink">{t('footer.name')}</h3>
                <p className="text-[15px] text-ink-2">{t('footer.role')}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Link href="/impressum" className={linkClass}>
                {t('footer.impressum')}
              </Link>
              <CookieSettingsLink label={t('footer.cookieSettings')} className={linkClass} />
            </div>
          </div>

          {/* Right: contact links and button */}
          <div className="flex flex-col gap-3 text-[15px]">
            <a
              href="https://www.linkedin.com/in/patrick-cipic-gr%C3%BCbener/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <LinkedinIcon className="h-4 w-4 text-ink-2" />
              {t('footer.linkedin')}
            </a>

            <a href="tel:+4917632104967" className={linkClass}>
              <PhoneIcon className="h-4 w-4 text-ink-2" />
              <span>+49 176 32104967</span>
            </a>

            <a href="mailto:patrickgruebener@gmail.com" className={linkClass}>
              <MailIcon className="h-4 w-4 text-ink-2" />
              <span>patrickgruebener@gmail.com</span>
            </a>

            <Link href="/beratungstermin" className={buttonStyles({ variant: 'secondary', size: 'sm', className: 'mt-2 self-start' })}>
              {t('footer.cta')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
