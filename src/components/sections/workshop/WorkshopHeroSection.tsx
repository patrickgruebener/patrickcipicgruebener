import Link from 'next/link';
import { getTranslations } from '@/lib/i18n.server';
import { Button } from '@/components/ui/Button';

export async function WorkshopHeroSection() {
  const { t } = await getTranslations();

  return (
    <section className="py-20 md:py-28 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          {t('workshop.hero.headline')}{' '}
          <span className="bg-gradient-to-r from-[#65C87A] to-[#0426CB] bg-clip-text text-transparent">
            {t('workshop.hero.headlineHighlight')}
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          {t('workshop.hero.subheadline')}
        </p>

        <Link href="/beratungstermin">
          <Button size="lg">
            {t('workshop.hero.cta')}
          </Button>
        </Link>
      </div>
    </section>
  );
}
