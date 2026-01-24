import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from '@/lib/i18n.server';
import { Button } from '@/components/ui/Button';

export async function HeroSection() {
  const { t } = await getTranslations();

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background Image with Overlay - mirrored horizontally */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/chaos.png)',
          backgroundPosition: 'center right',
          transform: 'scaleX(-1)',
        }}
      />

      {/* Multi-layered Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-gray-900/85 via-gray-900/70 to-gray-100/95" />
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-gray-100/60 to-gray-100" />

      {/* Subtle noise/texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-5 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="bg-white/95 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-200/50">
            <p className="text-gray-700 mb-6 text-xl md:text-2xl lg:text-[28px]">
              {t('home.tagline')}
            </p>

            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                {t('home.headline.part1')}
              </span>{' '}
              <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                {t('home.headline.part2')}
              </span>
            </h1>

            <p className="text-gray-700 text-lg md:text-xl lg:text-[22px] mb-8">
              {t('home.description')}
            </p>

            <div>
              <Link href="/beratungstermin">
                <Button size="lg">
                  {t('home.cta.getInTouch')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side - subtle chaos visualization */}
          <div className="hidden md:block">
            <div className="space-y-3 opacity-40">
              <div className="h-2 bg-red-500/30 rounded-full w-3/4 ml-auto" />
              <div className="h-2 bg-orange-500/30 rounded-full w-2/3 ml-auto" />
              <div className="h-2 bg-yellow-500/30 rounded-full w-4/5 ml-auto" />
              <h2 className="h-2 bg-red-500/30 rounded-full w-1/2 ml-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
