import { getTranslations } from '@/lib/i18n.server';
import { Section, SectionHead } from '@/components/sections/section-shell';

const PERSONAS = ['marketing', 'product', 'leadership', 'everyone'] as const;

/** Audiences as ruled text blocks. */
export async function WorkshopAudienceSection() {
  const { t } = await getTranslations();

  return (
    <Section id="zielgruppe">
      <SectionHead heavy={t('workshop.audience.title')} />
      <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
        {PERSONAS.map((key) => (
          <div key={key} className="border-t-2 border-ink pt-3.5">
            <h3 className="mb-2 text-[20px] leading-tight font-bold text-ink">{t(`workshop.audience.${key}.title`)}</h3>
            <p className="max-w-[56ch] text-ink-2">{t(`workshop.audience.${key}.description`)}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
