import { getTranslations } from '@/lib/i18n.server';

const contentBlocks = [
  { key: '1', icon: '✍️', gradient: 'from-blue-500 to-cyan-500', bullets: 4 },
  { key: '2', icon: '🧩', gradient: 'from-cyan-500 to-teal-500', bullets: 4 },
  { key: '3', icon: '🚀', gradient: 'from-teal-500 to-emerald-500', bullets: 3 },
] as const;

export async function WorkshopContentSection() {
  const { t } = await getTranslations();

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
          {t('workshop.content.title')}
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
          {t('workshop.content.intro')}
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {contentBlocks.map(({ key, icon, gradient, bullets }) => (
            <div
              key={key}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />
              <div className="p-8">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {t(`workshop.content.${key}.title` as any)}
                </h3>
                <p className="text-sm font-medium text-gray-500 mb-6">
                  {t(`workshop.content.${key}.subtitle` as any)}
                </p>
                <ul className="space-y-3">
                  {Array.from({ length: bullets }, (_, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                      <span className="text-green-500 mt-0.5 shrink-0">&#10003;</span>
                      {t(`workshop.content.${key}.bullet${i + 1}` as any)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
