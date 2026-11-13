import { getTranslations } from '@/lib/i18n.server';
import { Section, SectionHead } from '@/components/sections/section-shell';

const TESTIMONIALS = ['1', '2', '3'] as const;

/** Quotes as plain text blocks under a rule, no card, no quote glyph. */
export async function WorkshopTestimonialsSection() {
  const { t } = await getTranslations();

  return (
    <Section id="stimmen">
      <SectionHead heavy={t('workshop.testimonials.title')} />
      <div className="grid grid-cols-1 items-start gap-x-10 gap-y-10 md:grid-cols-3">
        {TESTIMONIALS.map((key) => (
          <figure key={key} className="m-0 border-t-2 border-ink pt-5">
            <blockquote className="m-0 text-[17px] leading-[1.6] text-ink">
              {t(`workshop.testimonials.${key}.text`)}
            </blockquote>
            <figcaption className="mt-5 text-[15px]">
              <b className="block text-ink">{t(`workshop.testimonials.${key}.name`)}</b>
              <span className="text-ink-2">{t(`workshop.testimonials.${key}.role`)}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
