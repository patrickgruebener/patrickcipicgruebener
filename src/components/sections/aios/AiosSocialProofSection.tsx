import { getTranslations } from '@/lib/i18n.server';

export async function AiosSocialProofSection() {
  const { t } = await getTranslations();

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10">
          {t('aios.social.title')}
        </h2>

        {/* Body Text */}
        <div className="max-w-2xl mx-auto space-y-4 mb-16">
          <p className="text-gray-600 leading-relaxed">
            {t('aios.social.text1')}
          </p>
          <p className="text-gray-600 leading-relaxed">
            {t('aios.social.text2')}
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {(['testimonial1', 'testimonial2', 'testimonial3'] as const).map((key) => (
            <div
              key={key}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
            >
              <p className="text-gray-700 italic leading-relaxed text-sm">
                {t(`aios.social.${key}` as any)}
              </p>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-gray-400 text-xs italic">
          {t('aios.social.note')}
        </p>
      </div>
    </section>
  );
}
