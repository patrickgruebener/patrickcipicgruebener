import { getTranslations } from '@/lib/i18n.server';

const personas = [
  { key: 'freelancer', gradient: 'from-blue-500 to-cyan-500' },
  { key: 'pm', gradient: 'from-cyan-500 to-teal-500' },
  { key: 'developer', gradient: 'from-teal-500 to-emerald-500' },
  { key: 'everyone', gradient: 'from-emerald-500 to-green-500' },
] as const;

export async function AiosAudienceSection() {
  const { t } = await getTranslations();

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          {t('aios.audience.title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {personas.map(({ key, gradient }) => (
            <div
              key={key}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t(`aios.audience.${key}.title` as any)}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t(`aios.audience.${key}.description` as any)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
