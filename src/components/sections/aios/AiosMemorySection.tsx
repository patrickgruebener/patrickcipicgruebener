import { getTranslations } from '@/lib/i18n.server';

const withoutItems = ['item1', 'item2', 'item3', 'item4'] as const;
const withItems = ['item1', 'item2', 'item3', 'item4'] as const;

export async function AiosMemorySection() {
  const { t } = await getTranslations();

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6">
          {t('aios.memory.title')}
        </h2>

        {/* Intro */}
        <p className="text-gray-600 text-lg leading-relaxed text-center max-w-3xl mx-auto mb-16">
          {t('aios.memory.intro')}
        </p>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Without Memory */}
          <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-xl">
                ✕
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {t('aios.memory.without.title')}
              </h3>
            </div>
            <ul className="space-y-4">
              {withoutItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5 shrink-0">—</span>
                  <span className="text-gray-600">
                    {t(`aios.memory.without.${item}` as any)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* With Memory */}
          <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl">
                ✓
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {t('aios.memory.with.title')}
              </h3>
            </div>
            <ul className="space-y-4">
              {withItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                  <span className="text-gray-600">
                    {t(`aios.memory.with.${item}` as any)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Analogy */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 md:p-10 border border-blue-100">
          <p className="text-gray-700 text-lg leading-relaxed text-center italic">
            {t('aios.memory.analogy')}
          </p>
        </div>
      </div>
    </section>
  );
}
