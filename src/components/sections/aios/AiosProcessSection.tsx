import { getTranslations } from '@/lib/i18n.server';

export async function AiosProcessSection() {
  const { t } = await getTranslations();

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          {t('aios.process.title')}
        </h2>

        <div className="space-y-12">
          {/* Step 1: Clone */}
          <div className="flex gap-6 items-start">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xl font-bold shrink-0">
              1
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t('aios.process.step1.title')}
              </h3>
              <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-green-400 whitespace-pre">{t('aios.process.step1.code')}</pre>
              </div>
            </div>
          </div>

          {/* Step 2: Setup */}
          <div className="flex gap-6 items-start">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white text-xl font-bold shrink-0">
              2
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t('aios.process.step2.title')}
              </h3>
              <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm mb-3 overflow-x-auto">
                <pre className="text-green-400">{t('aios.process.step2.code')}</pre>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {t('aios.process.step2.description')}
              </p>
            </div>
          </div>

          {/* Step 3: Work */}
          <div className="flex gap-6 items-start">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white text-xl font-bold shrink-0">
              3
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t('aios.process.step3.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('aios.process.step3.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
