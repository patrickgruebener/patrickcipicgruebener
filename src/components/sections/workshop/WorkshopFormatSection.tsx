import Link from 'next/link';
import { getTranslations } from '@/lib/i18n.server';
import { buttonStyles } from '@/components/ui/Button';
import { Card, CardFlag, CardPrice } from '@/components/ui/Card';
import { Section, SectionHead } from '@/components/sections/section-shell';
import { FlowSketch } from '@/components/ui/flow-sketch';

const STEPS = ['step1', 'step2', 'step3'] as const;
const DETAILS = ['remote', 'participants', 'interactive', 'materials'] as const;
const PRICING_INCLUDES = ['1', '2', '3', '4', '5'] as const;

/** Workshop sequence as flow sketch with step texts below, format facts and the price as a highlighted card. */
export async function WorkshopFormatSection() {
  const { t } = await getTranslations();
  const flowSteps = STEPS.map((key) => t(`workshop.format.${key}.title`));

  return (
    <Section id="ablauf">
      <SectionHead heavy={t('workshop.format.title')} />
      <div className="bg-sheet px-7 py-6">
        <FlowSketch steps={flowSteps} label={flowSteps.join(', ')} className="max-w-[420px]" />
      </div>
      <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-3">
        {STEPS.map((key) => (
          <div key={key} className="border-t-2 border-ink pt-3.5">
            <h3 className="text-[20px] leading-tight font-bold text-ink">{t(`workshop.format.${key}.title`)}</h3>
            <p className="mt-1 mb-2 font-semibold text-brand-blue">{t(`workshop.format.${key}.duration`)}</p>
            <p className="text-ink-2">{t(`workshop.format.${key}.description`)}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 grid grid-cols-1 items-start gap-x-12 gap-y-10 min-[821px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="border-t-2 border-ink pt-3.5">
          <h3 className="mb-3 text-[20px] leading-tight font-bold text-ink">{t('workshop.format.details.title')}</h3>
          <ul className="m-0 grid list-disc gap-2 pl-5 text-ink marker:text-brand-blue">
            {DETAILS.map((key) => (
              <li key={key}>{t(`workshop.format.details.${key}`)}</li>
            ))}
          </ul>
        </div>
        <Card highlighted>
          <div className="grid gap-4 p-6 min-[821px]:p-8">
            <CardFlag>{t('workshop.pricing.label')}</CardFlag>
            <CardPrice className="text-[40px] sm:text-[48px]">{t('workshop.pricing.price')}</CardPrice>
            <p className="max-w-[56ch] text-ink-2">{t('workshop.pricing.description')}</p>
            <ul className="m-0 grid list-disc gap-2 pl-5 text-ink marker:text-brand-blue">
              {PRICING_INCLUDES.map((key) => (
                <li key={key}>{t(`workshop.pricing.includes.${key}`)}</li>
              ))}
            </ul>
            <Link href="/beratungstermin" className={buttonStyles({ variant: 'secondary', className: 'justify-self-start' })}>
              {t('workshop.pricing.cta')}
            </Link>
          </div>
        </Card>
      </div>
    </Section>
  );
}
