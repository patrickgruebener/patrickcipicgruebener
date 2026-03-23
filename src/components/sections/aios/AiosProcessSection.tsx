import { getTranslations } from '@/lib/i18n.server';

const steps = [
  { num: 1, key: 'step1', gradient: 'from-blue-500 to-cyan-500' },
  { num: 2, key: 'step2', gradient: 'from-cyan-500 to-teal-500' },
  { num: 3, key: 'step3', gradient: 'from-teal-500 to-emerald-500' },
  { num: 4, key: 'step4', gradient: 'from-emerald-500 to-green-500' },
] as const;

export async function AiosProcessSection() {
  const { t } = await getTranslations();

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          {t('aios.process.title')}
        </h2>

        <div className="space-y-12">
          {steps.map(({ num, key, gradient }) => (
            <div key={key} className="flex gap-6 items-start">
              <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xl font-bold shrink-0`}>
                {num}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {t(`aios.process.${key}.title` as any)}
                </h3>
                <p className="text-sm font-medium text-green-600 mb-3">
                  {t(`aios.process.${key}.subtitle` as any)}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {t(`aios.process.${key}.description` as any)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
