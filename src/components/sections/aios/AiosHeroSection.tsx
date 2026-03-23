import Link from 'next/link';
import { getTranslations } from '@/lib/i18n.server';
import { Button } from '@/components/ui/Button';

export async function AiosHeroSection() {
  const { t } = await getTranslations();

  return (
    <section className="py-20 md:py-28 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          {t('aios.hero.headline')}{' '}
          <span className="bg-gradient-to-r from-[#65C87A] to-[#0426CB] bg-clip-text text-transparent">
            {t('aios.hero.headlineHighlight')}
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
          {t('aios.hero.subheadline')}
        </p>

        {/* Body Text */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <p className="text-gray-400 leading-relaxed">
            {t('aios.hero.text1')}
          </p>
          <p className="text-gray-400 leading-relaxed">
            {t('aios.hero.text2')}
          </p>
          <p className="text-white font-medium">
            {t('aios.hero.text3')}
          </p>
        </div>

        {/* CTA */}
        <Link href="/beratungstermin">
          <Button size="lg">
            {t('aios.hero.cta')}
          </Button>
        </Link>
      </div>
    </section>
  );
}
