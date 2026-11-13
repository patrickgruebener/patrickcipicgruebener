import Image from 'next/image';
import { getTranslations } from '@/lib/i18n.server';
import { Figure } from '@/components/ui/figure';
import { Section, SectionHead } from '@/components/sections/section-shell';

const PAIN_POINTS = ['1', '2', '3'] as const;

/** Three recurring patterns as plain rows with hairlines, no icons, then a before/after photo as Abb. 2. */
export async function PainPointsSection() {
  const { t } = await getTranslations();

  return (
    <Section>
      <SectionHead
        light={t('home.painPoints.headline.part1')}
        heavy={t('home.painPoints.headline.part2')}
        intro={
          <>
            <p>{t('home.painPoints.intro.part1')}</p>
            <p className="text-ink">{t('home.painPoints.intro.part2')}</p>
            <p>{t('home.painPoints.intro.part3')}</p>
          </>
        }
      />
      <div className="border-t-2 border-ink">
        {PAIN_POINTS.map((key) => (
          <div
            key={key}
            className="grid grid-cols-1 gap-x-12 gap-y-2 border-b border-line py-6 min-[821px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
          >
            <h3 className="text-[22px] leading-tight font-bold text-ink">
              {t(`home.painPoints.${key}.title`)}
            </h3>
            <p className="max-w-[64ch] text-[17px] leading-[1.55] text-ink-2">
              {t(`home.painPoints.${key}.description`)}
            </p>
          </div>
        ))}
      </div>
      <Figure number={2} caption={t('home.painPoints.figure.caption')} className="mt-10 max-w-[760px]">
        <Image
          src="/images/werkstatt/zwei-blaetter-vorher-nachher.webp"
          alt={t('home.painPoints.figure.alt')}
          width={1500}
          height={1000}
          className="block h-auto w-full"
          sizes="(min-width: 820px) 704px, 100vw"
        />
      </Figure>
    </Section>
  );
}
