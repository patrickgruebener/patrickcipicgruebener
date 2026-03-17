import Image from 'next/image';
import { getTranslations } from '@/lib/i18n.server';

const credentials = ['credential1', 'credential2', 'credential3'] as const;

export async function WorkshopTrainerSection() {
  const { t } = await getTranslations();

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          {t('workshop.trainer.title')}
        </h2>

        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
          <div className="shrink-0">
            <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-lg ring-4 ring-gray-100">
              <Image
                src="/images/patrickcipicgruebener_portrait.webp"
                alt={t('workshop.trainer.name')}
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {t('workshop.trainer.name')}
            </h3>
            <p className="text-green-600 font-medium mb-6">
              {t('workshop.trainer.role')}
            </p>

            <div className="space-y-4 mb-8">
              <p className="text-gray-600 leading-relaxed">
                {t('workshop.trainer.bio1')}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t('workshop.trainer.bio2')}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {credentials.map((key) => (
                <span
                  key={key}
                  className="bg-gray-100 text-gray-700 text-sm font-medium px-4 py-2 rounded-full"
                >
                  {t(`workshop.trainer.${key}` as any)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
