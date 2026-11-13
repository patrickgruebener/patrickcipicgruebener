import Link from 'next/link';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { buttonStyles } from '@/components/ui/Button';
import { Card, CardPrice } from '@/components/ui/Card';
import { FlowSketch } from '@/components/ui/flow-sketch';
import { Leitlinie } from '@/components/ui/leitlinie';
import { ClosingCta } from '@/components/sections/closing-cta';
import { Section, SectionHead } from '@/components/sections/section-shell';
import { getTranslations } from '@/lib/i18n.server';
import type { TranslationKey } from '@/lib/translations/de';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslations();
  return {
    title: t('angebote.meta.title'),
    description: t('angebote.meta.description'),
  };
}

const PACKAGES = [
  { key: '1', deliverableCount: 6, bonusCount: 2 },
  { key: '2', deliverableCount: 4, bonusCount: 2, recommended: true },
  { key: '3', deliverableCount: 6, bonusCount: 1 },
] as const;

const TRUST_STEPS = ['step1', 'step2', 'step3', 'step4'] as const;
const PRICE_ARGS = ['arg1', 'arg2', 'arg3'] as const;

export default async function AngebotePage() {
  const { t } = await getTranslations();
  const flowSteps = TRUST_STEPS.map((key) => t(`angebote.trustPath.${key}`));

  return (
    <div className="min-h-screen bg-paper">
      <Header currentPage="angebote" />

      <main>
        <section className="bg-paper">
          <div className="mx-auto max-w-[1180px] px-4 pt-9 pb-8 min-[900px]:pt-[72px] min-[900px]:pb-16">
            <h1 className="mb-5 font-display text-[52px] leading-[0.9] tracking-[-0.005em] text-balance text-ink sm:mb-[30px] sm:text-[72px] lg:text-[88px]">
              <span className="font-light">{t('angebote.hero.headline')}</span>{' '}
              <span className="block font-[820] text-brand-blue">{t('angebote.hero.headlineHighlight')}</span>
            </h1>
            <p className="max-w-[34em] text-[17px] leading-[1.5] text-ink sm:text-xl">
              {t('angebote.hero.description')}
            </p>
          </div>
          <Leitlinie />
        </section>

        <Section id="weg">
          <SectionHead heavy={t('angebote.trustPath.title')} intro={<p>{t('angebote.trustPath.subtitle')}</p>} />
          <div className="bg-sheet px-7 py-6">
            <FlowSketch steps={flowSteps} label={flowSteps.join(', ')} className="max-w-[520px]" />
          </div>
        </Section>

        <Section id="pakete" label={t('angebote.trustPath.title')}>
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
            {PACKAGES.map((pkg) => {
              const { key, deliverableCount, bonusCount } = pkg;
              return (
                <Card key={key} highlighted={'recommended' in pkg} className="flex flex-col">
                  <div className="flex flex-1 flex-col gap-5 p-6">
                    <div>
                      <h3 className="font-display text-[34px] leading-none font-[820] text-ink">
                        {t(`angebote.pkg${key}.name`)}
                      </h3>
                      <p className="mt-2 text-[15px] text-ink-2">{t(`angebote.pkg${key}.duration`)}</p>
                    </div>

                    <CardPrice unit={t(`angebote.pkg${key}.priceNote`)} className="text-[48px]">
                      {t(`angebote.pkg${key}.price`)}
                    </CardPrice>

                    <p className="text-[19px] leading-snug font-semibold text-ink">
                      &ldquo;{t(`angebote.pkg${key}.promise`)}&rdquo;
                    </p>
                    <p className="text-[15px] text-ink-2">{t(`angebote.pkg${key}.for`)}</p>

                    <div className="border-t-2 border-ink pt-3">
                      <h4 className="mb-2 text-[15px] font-bold text-ink">
                        {t(`angebote.pkg${key}.deliverables.title`)}
                      </h4>
                      <ul className="m-0 grid list-disc gap-1.5 pl-5 text-[15px] text-ink marker:text-brand-blue">
                        {Array.from({ length: deliverableCount }, (_, i) => (
                          <li key={i}>{t(`angebote.pkg${key}.deliverables.${i + 1}` as TranslationKey)}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-sheet p-4">
                      <h4 className="mb-2 text-[15px] font-bold text-ink">{t(`angebote.pkg${key}.bonus.title`)}</h4>
                      <ul className="m-0 grid list-disc gap-1.5 pl-5 text-[15px] text-ink marker:text-brand-blue">
                        {Array.from({ length: bonusCount }, (_, i) => (
                          <li key={i}>{t(`angebote.pkg${key}.bonus.${i + 1}` as TranslationKey)}</li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href="/beratungstermin"
                      className={buttonStyles({ variant: 'secondary', className: 'mt-auto justify-self-start' })}
                    >
                      {t(`angebote.pkg${key}.cta`)}
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </Section>

        <Section id="retainer">
          <SectionHead
            heavy={t('angebote.retainer.title')}
            intro={
              <>
                <p className="font-semibold text-ink">{t('angebote.retainer.subtitle')}</p>
                <p>{t('angebote.retainer.description')}</p>
                <Link
                  href="/beratungstermin"
                  className={buttonStyles({ variant: 'secondary', className: 'justify-self-start' })}
                >
                  {t('angebote.retainer.cta')}
                </Link>
              </>
            }
          />
        </Section>

        <Section id="preisanker">
          <SectionHead heavy={t('angebote.priceAnchor.title')} />
          <div className="max-w-[820px] border-t-2 border-ink">
            {PRICE_ARGS.map((arg) => (
              <p key={arg} className="border-b border-line py-4 text-[19px] leading-snug text-ink">
                {t(`angebote.priceAnchor.${arg}`)}
              </p>
            ))}
          </div>
          <p className="mt-8 max-w-[820px] font-display text-[clamp(32px,7vw,44px)] leading-[0.95] font-[820] tracking-[-0.005em] text-balance text-brand-blue">
            {t('angebote.priceAnchor.conclusion')}
          </p>
        </Section>

        <section className="bg-paper pb-[72px]">
          <div className="mx-auto max-w-[1180px] px-4">
            <ClosingCta
              headlineHeavy={t('angebote.finalCta.title')}
              text={t('angebote.finalCta.description')}
              buttonLabel={t('angebote.finalCta.button')}
              href="/beratungstermin"
              note={t('angebote.finalCta.microcopy')}
              guideLine={false}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
