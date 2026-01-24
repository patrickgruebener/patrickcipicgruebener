import { getTranslations } from '@/lib/i18n.server';

export async function ProcessSection() {
  const { t } = await getTranslations();

  const steps = [
    { key: '1', number: '1', gradient: 'from-blue-500 to-cyan-500' },
    { key: '2', number: '2', gradient: 'from-cyan-500 to-teal-500' },
    { key: '3', number: '3', gradient: 'from-teal-500 to-emerald-500' },
  ];

  return (
    <section id="process" className="py-24 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('home.process.title')}
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            {t('home.process.intro')}
          </p>
        </div>

        {/* Three Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 mt-16">
          {steps.map(({ key, number, gradient }) => (
            <div
              key={key}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-6">
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-2xl font-bold`}
                >
                  {number}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">
                {t(`home.process.step${key}.title` as any)}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {t(`home.process.step${key}.description` as any)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
