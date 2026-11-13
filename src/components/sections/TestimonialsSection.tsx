import Image from 'next/image';
import { getTranslations } from '@/lib/i18n.server';
import { Section, SectionHead } from '@/components/sections/section-shell';

const TESTIMONIALS = [
  { key: '1', image: '/images/testimonials/sanela.avif' },
  { key: '2', image: '/images/testimonials/kristoph.avif' },
  { key: '3', image: '/images/testimonials/anna.avif' },
  { key: '4', image: '/images/testimonials/martin.avif' },
  { key: '5', image: '/images/testimonials/susanne.avif' },
] as const;

/** Quotes as plain text blocks under a rule, square portraits, no stars. */
export async function TestimonialsSection() {
  const { t } = await getTranslations();

  return (
    <Section id="testimonials">
      <SectionHead heavy={t('home.testimonials.title')} intro={<p>{t('home.testimonials.subtitle')}</p>} />
      <div className="grid grid-cols-1 items-start gap-x-12 gap-y-12 md:grid-cols-2">
        {TESTIMONIALS.map(({ key, image }) => {
          const name = t(`home.testimonials.${key}.name`);
          const role = t(`home.testimonials.${key}.role`);
          const company = t(`home.testimonials.${key}.company`);
          // Role reads "Position, Company"; only the company part becomes a link
          const position = role.split(', ')[0];

          return (
            <figure key={key} className="m-0 border-t-2 border-ink pt-5">
              <blockquote className="m-0 text-[17px] leading-[1.6] whitespace-pre-line text-ink">
                {t(`home.testimonials.${key}.text`)}
              </blockquote>
              <figcaption className="mt-6 grid grid-cols-[56px_minmax(0,1fr)] items-center gap-3.5 text-[15px]">
                <Image src={image} alt={name} width={56} height={56} className="h-14 w-14 object-cover" />
                <span>
                  <b className="block text-ink">{name}</b>
                  <span className="text-ink-2">
                    {position},{' '}
                    <a
                      href={t(`home.testimonials.${key}.url`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-blue underline underline-offset-[3px]"
                    >
                      {company}
                    </a>
                  </span>
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </Section>
  );
}
