import { getTranslations } from '@/lib/i18n.server';
import { Section, SectionHead } from '@/components/sections/section-shell';

const PAIN_POINTS = ['1', '2', '3', '4'] as const;

/** Four pain points as ruled text blocks, no icons. */
export async function WorkshopPainSection() {
  const { t } = await getTranslations();

  return (
    <Section id="pain">
      <SectionHead heavy={t('workshop.pain.title')} />
      <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
        {PAIN_POINTS.map((key) => (
          <div key={key} className="border-t-2 border-ink pt-3.5">
            <h3 className="mb-2 text-[20px] leading-tight font-bold text-ink">{t(`workshop.pain.${key}.title`)}</h3>
            <p className="max-w-[56ch] text-ink-2">{t(`workshop.pain.${key}.description`)}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
