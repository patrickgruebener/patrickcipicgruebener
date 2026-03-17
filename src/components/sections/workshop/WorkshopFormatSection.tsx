import { getTranslations } from '@/lib/i18n.server';

const steps = [
  { key: 'step1', gradient: 'from-blue-500 to-cyan-500' },
  { key: 'step2', gradient: 'from-cyan-500 to-teal-500' },
  { key: 'step3', gradient: 'from-teal-500 to-emerald-500' },
] as const;

const details = ['remote', 'participants', 'interactive', 'materials'] as const;

export async function WorkshopFormatSection() {
  const { t } = await getTranslations();

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          {t('workshop.format.title')}
        </h2>

        <div className="space-y-12 mb-16">
          {steps.map(({ key, gradient }, index) => (
            <div key={key} className="flex gap-6 items-start">
              <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xl font-bold shrink-0`}>
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {t(`workshop.format.${key}.title` as any)}
                </h3>
                <p className="text-sm font-medium text-green-600 mb-3">
                  {t(`workshop.format.${key}.duration` as any)}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {t(`workshop.format.${key}.description` as any)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('workshop.format.details.title')}
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {details.map((key) => (
              <div key={key} className="flex items-center gap-3 text-gray-600">
                <span className="text-green-500">&#10003;</span>
                {t(`workshop.format.details.${key}` as any)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
