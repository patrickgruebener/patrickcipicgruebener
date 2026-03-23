import { getTranslations } from '@/lib/i18n.server';

const outcomes = [
  { key: 'wissen', icon: '🧠' },
  { key: 'prozesse', icon: '⚙️' },
  { key: 'entscheidungen', icon: '🎯' },
  { key: 'team', icon: '👥' },
  { key: 'integration', icon: '🔗' },
] as const;

export async function AiosFeaturesSection() {
  const { t } = await getTranslations();

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          {t('aios.features.title')}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outcomes.map(({ key, icon }) => (
            <div
              key={key}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-3xl mb-4">{icon}</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {t(`aios.features.${key}.title` as any)}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t(`aios.features.${key}.description` as any)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
