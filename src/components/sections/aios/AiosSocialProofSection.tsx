import { getTranslations } from '@/lib/i18n.server';

const testimonials = ['testimonial1', 'testimonial2', 'testimonial3'] as const;

export async function AiosSocialProofSection() {
  const { t } = await getTranslations();

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10">
          {t('aios.social.title')}
        </h2>

        {/* W.A.F. Case Study */}
        <div className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-lg mb-16 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-green-500 rounded-full" />
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Case Study</p>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed">
            {t('aios.social.story')}
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((key) => (
            <div
              key={key}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <p className="text-gray-700 italic leading-relaxed text-sm mb-6">
                {t(`aios.social.${key}.quote` as any)}
              </p>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {t(`aios.social.${key}.name` as any)}
                </p>
                <p className="text-xs text-gray-500">
                  {t(`aios.social.${key}.role` as any)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
