import Link from 'next/link';
import { getTranslations } from '@/lib/i18n.server';
import { Section, SectionHead } from '@/components/sections/section-shell';
import { buttonStyles } from '@/components/ui/Button';

// Real sequence of the engagement, so numbers are justified
const STEPS = ['step1', 'step2', 'step3', 'step4'] as const;

/** W.A.F. case: client and challenge left, numbered path and result right, text link instead of a button. */
export async function CaseStudySection() {
  const { t } = await getTranslations();

  return (
    <Section>
      <SectionHead heavy={t('home.caseStudy.headline')} />
      <div className="grid grid-cols-1 items-start gap-x-12 gap-y-10 min-[821px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="grid gap-5">
          <div className="border-t-2 border-ink pt-3.5">
            <p className="text-[20px] leading-tight font-bold text-ink">{t('home.caseStudy.company')}</p>
            <p className="mt-1.5 text-ink-2">{t('home.caseStudy.companyInfo')}</p>
          </div>
          <p className="max-w-[64ch] text-[17px] leading-[1.55] text-ink">{t('home.caseStudy.challenge')}</p>
        </div>
        <div>
          <h3 className="border-b-2 border-ink pb-2.5 text-[15px] font-bold text-ink">
            {t('home.caseStudy.stepsTitle')}
          </h3>
          <ol className="m-0 list-none p-0">
            {STEPS.map((key, index) => (
              <li key={key} className="grid grid-cols-[2.5rem_minmax(0,1fr)] border-b border-line py-3.5">
                <span className="font-display text-[26px] leading-none font-[820] text-brand-blue tabular-nums">
                  {index + 1}
                </span>
                <span className="text-ink">{t(`home.caseStudy.${key}`)}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-[64ch] border-l-4 border-brand-green pl-4 text-[17px] leading-[1.55] font-semibold text-ink">
            {t('home.caseStudy.result')}
          </p>
          <div className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <p className="text-ink-2">{t('home.caseStudy.cta')}</p>
            <Link href="/beratungstermin" className={buttonStyles({ variant: 'secondary' })}>
              {t('home.midCta.button')}
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
