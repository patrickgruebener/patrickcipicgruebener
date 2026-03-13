import Link from 'next/link';
import { getTranslations } from '@/lib/i18n.server';
import { Button } from '@/components/ui/Button';

export async function AiosCtaSection() {
  const { t } = await getTranslations();

  return (
    <section className="py-24 px-6 bg-gradient-to-r from-[#0426CB] to-[#65C87A]">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-12 md:p-16 shadow-2xl text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
            {t('aios.cta.headline')}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-10">
            {t('aios.cta.subline')}
          </p>
          <div className="flex flex-col items-center gap-3">
            <Link href="/beratungstermin">
              <Button size="lg">
                {t('aios.cta.button')}
              </Button>
            </Link>
            <p className="text-sm text-gray-500">
              {t('aios.cta.microcopy')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
