import { getTranslations } from '@/lib/i18n.server';

const testimonials = ['1', '2', '3'] as const;

export async function WorkshopTestimonialsSection() {
  const { t } = await getTranslations();

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          {t('workshop.testimonials.title')}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((key) => (
            <div
              key={key}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col"
            >
              <div className="text-2xl text-gray-200 mb-4">&ldquo;</div>
              <p className="text-gray-600 leading-relaxed flex-1 mb-6">
                {t(`workshop.testimonials.${key}.text` as any)}
              </p>
              <div>
                <p className="font-semibold text-gray-900">
                  {t(`workshop.testimonials.${key}.name` as any)}
                </p>
                <p className="text-sm text-gray-500">
                  {t(`workshop.testimonials.${key}.role` as any)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
