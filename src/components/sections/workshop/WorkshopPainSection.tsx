import { getTranslations } from '@/lib/i18n.server';

const painPoints = [
  { key: '1', icon: '😐' },
  { key: '2', icon: '🔀' },
  { key: '3', icon: '🧠' },
  { key: '4', icon: '🔧' },
] as const;

export async function WorkshopPainSection() {
  const { t } = await getTranslations();

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          {t('workshop.pain.title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {painPoints.map(({ key, icon }) => (
            <div
              key={key}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-3xl mb-4">{icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t(`workshop.pain.${key}.title` as any)}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t(`workshop.pain.${key}.description` as any)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
