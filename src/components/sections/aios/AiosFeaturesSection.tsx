import { getTranslations } from '@/lib/i18n.server';

const coreFeatures = [
  { key: 'memory', icon: '🧠' },
  { key: 'sessionend', icon: '💾' },
  { key: 'skills', icon: '⚡' },
  { key: 'entities', icon: '📋' },
  { key: 'tasks', icon: '📌' },
  { key: 'claude', icon: '📄' },
] as const;

const modules = [
  { key: 'google', icon: '📧' },
  { key: 'memory', icon: '🔍' },
  { key: 'telegram', icon: '💬' },
] as const;

export async function AiosFeaturesSection() {
  const { t } = await getTranslations();

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          {t('aios.features.title')}
        </h2>

        {/* Core Package */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {t('aios.features.core.title')}
            </h3>
            <p className="text-sm font-medium uppercase tracking-wide text-green-600 mb-4">
              {t('aios.features.core.subtitle')}
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('aios.features.core.intro')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map(({ key, icon }) => (
              <div
                key={key}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-3xl mb-4">{icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {t(`aios.features.core.${key}.title` as any)}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t(`aios.features.core.${key}.description` as any)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Modules */}
        <div>
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {t('aios.features.modules.title')}
            </h3>
            <p className="text-sm font-medium uppercase tracking-wide text-blue-600 mb-4">
              {t('aios.features.modules.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {modules.map(({ key, icon }) => (
              <div
                key={key}
                className="bg-blue-50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-3xl mb-4">{icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {t(`aios.features.modules.${key}.title` as any)}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t(`aios.features.modules.${key}.description` as any)}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-sm">
            {t('aios.features.modules.intro')}
          </p>
        </div>
      </div>
    </section>
  );
}
