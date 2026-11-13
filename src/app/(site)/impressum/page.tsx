import Link from 'next/link';
import { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { getTranslations } from '@/lib/i18n.server';
import { buttonStyles } from '@/components/ui/Button';
import { Leitlinie } from '@/components/ui/leitlinie';

/** Legal block: heavy heading under a rule, content set as plain text. */
function LegalBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t-2 border-ink pt-4">
      <h2 className="mb-5 font-display text-[clamp(30px,6vw,40px)] leading-[0.95] font-[820] tracking-[-0.005em] text-ink">
        {title}
      </h2>
      <div className="grid max-w-[68ch] gap-5 text-ink">{children}</div>
    </section>
  );
}

function LegalItem({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="mb-1.5 text-[15px] font-bold text-ink">{title}</h3>
      <div className="grid gap-2 text-[15px] leading-[1.6] text-ink-2">{children}</div>
    </div>
  );
}

export default async function ImpressumPage() {
  const { t } = await getTranslations();

  return (
    <div className="min-h-screen bg-paper">
      <Header currentPage="impressum" />

      <section className="bg-paper">
        <div className="mx-auto max-w-[1180px] px-4 pt-9 pb-8 min-[900px]:pt-[72px] min-[900px]:pb-12">
          <h1 className="mb-4 font-display text-[52px] leading-[0.9] font-[820] tracking-[-0.005em] text-ink sm:text-[72px]">
            {t('impressum.title')}
          </h1>
          <p className="max-w-[34em] text-[17px] text-ink-2 sm:text-xl">{t('impressum.subtitle')}</p>
        </div>
        <Leitlinie />
      </section>

      <main className="mx-auto max-w-[1180px] px-4 py-[72px]">
        <div className="grid gap-14">
          <LegalBlock title={t('impressum.provider.title')}>
            <div className="grid gap-5 text-[17px] leading-[1.5]">
              <div>
                <p className="font-bold">{t('impressum.provider.name')}</p>
                <p>{t('impressum.provider.owner')}</p>
                <p>{t('impressum.provider.role')}</p>
              </div>
              <div>
                <p className="font-bold">{t('impressum.provider.seatLabel')}</p>
                <p>{t('impressum.provider.seat')}</p>
                <p>{t('impressum.provider.register')}</p>
                <p>{t('impressum.provider.registrationNumber')}</p>
                <p>{t('impressum.provider.oib')}</p>
              </div>
              <div>
                <p className="font-bold">{t('impressum.provider.postalLabel')}</p>
                <p>{t('impressum.provider.postal')}</p>
              </div>
              <div>
                <p className="font-bold">{t('impressum.provider.contact')}</p>
                <p>{t('impressum.provider.email')}</p>
                <p>{t('impressum.provider.phone')}</p>
              </div>
            </div>
          </LegalBlock>

          <LegalBlock title={t('impressum.liability.title')}>
            <LegalItem title={t('impressum.liability.content.title')}>
              <p>{t('impressum.liability.content.text')}</p>
            </LegalItem>
            <LegalItem title={t('impressum.liability.links.title')}>
              <p>{t('impressum.liability.links.text')}</p>
            </LegalItem>
          </LegalBlock>

          <LegalBlock title={t('impressum.privacy.title')}>
            <LegalItem title={t('impressum.privacy.intro.title')}>
              <p>{t('impressum.privacy.intro.text')}</p>
              <p>{t('impressum.privacy.controller')}</p>
            </LegalItem>
            <LegalItem title={t('impressum.privacy.collection.title')}>
              <p>{t('impressum.privacy.collection.text')}</p>
            </LegalItem>
            <LegalItem title={t('impressum.privacy.usage.title')}>
              <p>{t('impressum.privacy.usage.text')}</p>
            </LegalItem>
            <LegalItem title={t('impressum.privacy.rights.title')}>
              <p>{t('impressum.privacy.rights.text')}</p>
            </LegalItem>
            <LegalItem title={t('impressum.privacy.contact.title')}>
              <p>{t('impressum.privacy.contact.text')}</p>
            </LegalItem>
          </LegalBlock>

          <LegalBlock title={t('impressum.copyright.title')}>
            <div className="grid gap-2 text-[15px] leading-[1.6] text-ink-2">
              <p>{t('impressum.copyright.text1')}</p>
              <p>{t('impressum.copyright.text2')}</p>
            </div>
          </LegalBlock>
        </div>

        <Link href="/" className={buttonStyles({ variant: 'secondary', className: 'mt-14' })}>
          {/* The translation starts with an arrow glyph; the Werkstatt style has no arrows on links */}
          {t('impressum.backToHome').replace(/^←\s*/, '')}
        </Link>
      </main>
    </div>
  );
}
