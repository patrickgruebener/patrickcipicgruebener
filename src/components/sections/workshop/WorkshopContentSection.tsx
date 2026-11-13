import { getTranslations } from '@/lib/i18n.server';
import type { TranslationKey } from '@/lib/translations/de';
import { Section, SectionHead } from '@/components/sections/section-shell';

const CONTENT_BLOCKS = [
  { key: '1', bullets: 4 },
  { key: '2', bullets: 4 },
  { key: '3', bullets: 3 },
] as const;

/** Three workshop modules as columns under a rule, bullets with blue markers. */
export async function WorkshopContentSection() {
  const { t } = await getTranslations();

  return (
    <Section id="inhalte">
      <SectionHead heavy={t('workshop.content.title')} intro={<p>{t('workshop.content.intro')}</p>} />
      <div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-3">
        {CONTENT_BLOCKS.map(({ key, bullets }) => (
          <div key={key} className="border-t-2 border-ink pt-3.5">
            <h3 className="text-[20px] leading-tight font-bold text-ink">{t(`workshop.content.${key}.title`)}</h3>
            <p className="mt-1 mb-4 text-ink-2">{t(`workshop.content.${key}.subtitle`)}</p>
            <ul className="m-0 grid list-disc gap-2 pl-5 text-ink marker:text-brand-blue">
              {Array.from({ length: bullets }, (_, i) => (
                <li key={i}>{t(`workshop.content.${key}.bullet${i + 1}` as TranslationKey)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
