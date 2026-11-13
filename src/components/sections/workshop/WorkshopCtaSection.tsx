import { getTranslations } from '@/lib/i18n.server';
import { ClosingCta } from '@/components/sections/closing-cta';

/** The single closing call to action; the upsell sentence follows as plain text. */
export async function WorkshopCtaSection() {
  const { t } = await getTranslations();

  return (
    <section className="bg-paper pb-[72px]">
      <div className="mx-auto max-w-[1180px] px-4">
        <ClosingCta
          headlineHeavy={t('workshop.cta.headline')}
          text={t('workshop.cta.subline')}
          buttonLabel={t('workshop.cta.button')}
          href="/beratungstermin"
          note={t('workshop.cta.microcopy')}
          guideLine={false}
        />
        <p className="mt-6 max-w-[64ch] text-[15px] text-ink-2">{t('workshop.cta.upsell')}</p>
      </div>
    </section>
  );
}
