import { getTranslations } from '@/lib/i18n.server';
import { Section, SectionHead } from '@/components/sections/section-shell';
import { Figure } from '@/components/ui/figure';
import { FlowSketch } from '@/components/ui/flow-sketch';

const STEPS = ['1', '2', '3'] as const;

/** Collaboration as a flow sketch with dimension lines (Abb. 3), step texts below in three columns. */
export async function ProcessSection() {
  const { t } = await getTranslations();
  const flowSteps = [
    t('home.process.flow.step1'),
    t('home.process.flow.step2'),
    t('home.process.flow.step3'),
    t('home.process.flow.step4'),
  ];

  return (
    <Section id="process">
      <SectionHead
        light={t('home.process.title.light')}
        heavy={t('home.process.title.heavy')}
        intro={<p>{t('home.process.intro')}</p>}
      />
      <Figure number={4} caption={t('home.process.flow.caption')}>
        <FlowSketch
          steps={flowSteps}
          tail={t('home.process.flow.tail')}
          dimensions={[
            { from: 2, to: 2, label: t('home.process.flow.build') },
            { from: 3, to: 3, label: t('home.process.flow.show') },
          ]}
          label={t('home.process.flow.label')}
          className="max-w-[760px]"
        />
      </Figure>
      <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-3">
        {STEPS.map((key) => (
          <div key={key} className="border-t-2 border-ink pt-3.5">
            <h3 className="mb-2 text-[20px] leading-tight font-bold text-ink">
              {t(`home.process.step${key}.title`)}
            </h3>
            <p className="text-ink-2">{t(`home.process.step${key}.description`)}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
