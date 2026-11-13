import { getTranslations } from '@/lib/i18n.server';
import { ClosingCta } from '@/components/sections/closing-cta';

/** Closing call to action of the business page: the shared ClosingCta, guide line already used below the hero. */
export async function AiosCtaSection() {
  const { t } = await getTranslations();

  return (
    <section className="bg-paper pb-[72px]">
      <div className="mx-auto max-w-[1180px] px-4">
        <ClosingCta
          headlineLight={t('aios.cta.headline')}
          headlineHeavy={t('aios.cta.subline')}
          text={t('aios.cta.microcopy')}
          buttonLabel={t('aios.cta.button')}
          href="/beratungstermin"
          guideLine={false}
          portrait={{
            src: '/images/werkstatt/patrick-profil-800.webp',
            alt: t('home.finalCta.portraitAlt'),
            name: 'Patrick Čipić Grübener',
            role: t('home.finalCta.portraitRole'),
          }}
        />
      </div>
    </section>
  );
}
