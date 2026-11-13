import { getTranslations } from '@/lib/i18n.server';
import { Section, SectionHead } from '@/components/sections/section-shell';

const testimonials = ['testimonial1', 'testimonial2', 'testimonial3'] as const;

/** W.A.F. case as a ruled text block, quotes as plain blocks under a rule, no stars. */
export async function AiosSocialProofSection() {
  const { t } = await getTranslations();

  return (
    <Section>
      <SectionHead heavy={t('aios.social.title')} />
      <div className="mb-12 max-w-[64ch] border-l-4 border-brand-green pl-4">
        <p className="font-bold text-brand-blue">Case Study</p>
        <p className="mt-2 text-[17px] leading-[1.55] text-ink">{t('aios.social.story')}</p>
      </div>
      <div className="grid grid-cols-1 items-start gap-x-12 gap-y-10 md:grid-cols-3">
        {testimonials.map((key) => (
          <figure key={key} className="m-0 border-t-2 border-ink pt-5">
            <blockquote className="m-0 text-[17px] leading-[1.6] text-ink">
              {t(`aios.social.${key}.quote`)}
            </blockquote>
            <figcaption className="mt-5 text-[15px]">
              <b className="block text-ink">{t(`aios.social.${key}.name`)}</b>
              <span className="text-ink-2">{t(`aios.social.${key}.role`)}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
