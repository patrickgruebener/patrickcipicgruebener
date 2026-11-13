import Link from 'next/link';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { getTranslations, getLanguage } from '@/lib/i18n.server';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslations();
  return {
    title: t('angebote.meta.title'),
    description: t('angebote.meta.description'),
  };
}

export default async function AngebotePage() {
  const { t } = await getTranslations();

  const packages = [
    {
      key: '1' as const,
      gradient: 'from-blue-500 to-cyan-500',
      accentBg: 'bg-blue-50',
      accentText: 'text-blue-700',
      deliverableCount: 6,
      bonusCount: 2,
    },
    {
      key: '2' as const,
      gradient: 'from-cyan-500 to-teal-500',
      accentBg: 'bg-teal-50',
      accentText: 'text-teal-700',
      deliverableCount: 4,
      bonusCount: 2,
      popular: true,
    },
    {
      key: '3' as const,
      gradient: 'from-teal-500 to-emerald-500',
      accentBg: 'bg-emerald-50',
      accentText: 'text-emerald-700',
      deliverableCount: 6,
      bonusCount: 1,
    },
  ];

  const trustSteps = [
    { key: 'step1', number: '1', gradient: 'from-blue-500 to-cyan-500' },
    { key: 'step2', number: '2', gradient: 'from-cyan-500 to-teal-500' },
    { key: 'step3', number: '3', gradient: 'from-teal-500 to-emerald-500' },
    { key: 'step4', number: '4', gradient: 'from-emerald-500 to-green-500' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="angebote" />

      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-28 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {t('angebote.hero.headline')}{' '}
              <span className="bg-gradient-to-r from-[#0426CB] to-[#65C87A] bg-clip-text text-transparent">
                {t('angebote.hero.headlineHighlight')}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              {t('angebote.hero.description')}
            </p>
          </div>
        </section>

        {/* Trust Path / Upsell Pyramid */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('angebote.trustPath.title')}
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {t('angebote.trustPath.subtitle')}
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
              {trustSteps.map(({ key, number, gradient }, index) => (
                <div key={key} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xl font-bold shadow-lg`}
                    >
                      {number}
                    </div>
                    <p className="mt-3 text-sm font-medium text-gray-700 text-center max-w-[120px]">
                      {t(`angebote.trustPath.${key}` as any)}
                    </p>
                  </div>
                  {index < trustSteps.length - 1 && (
                    <div className="hidden md:block w-16 lg:w-24 h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 mx-4 mt-[-20px]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Package Cards */}
        <section id="pakete" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {packages.map(({ key, gradient, accentBg, accentText, deliverableCount, bonusCount, popular }) => (
                <div
                  key={key}
                  className={`bg-white rounded-2xl shadow-lg border ${
                    popular ? 'border-teal-300 ring-2 ring-teal-100' : 'border-gray-100'
                  } overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300`}
                >
                  {/* Package Header */}
                  <div className={`bg-gradient-to-r ${gradient} p-6 text-white`}>
                    <h3 className="text-2xl font-bold mb-1">
                      {t(`angebote.pkg${key}.name` as any)}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {t(`angebote.pkg${key}.duration` as any)}
                    </p>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    {/* Price */}
                    <div className="mb-6">
                      <span className="text-3xl font-bold text-gray-900">
                        {t(`angebote.pkg${key}.price` as any)}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        {t(`angebote.pkg${key}.priceNote` as any)}
                      </span>
                    </div>

                    {/* Promise */}
                    <p className="text-gray-900 font-medium text-lg mb-4 leading-snug">
                      &ldquo;{t(`angebote.pkg${key}.promise` as any)}&rdquo;
                    </p>

                    {/* For whom */}
                    <p className="text-gray-500 text-sm mb-6">
                      {t(`angebote.pkg${key}.for` as any)}
                    </p>

                    {/* Deliverables */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                        {t(`angebote.pkg${key}.deliverables.title` as any)}
                      </h4>
                      <ul className="space-y-2">
                        {Array.from({ length: deliverableCount }, (_, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                            <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            {t(`angebote.pkg${key}.deliverables.${i + 1}` as any)}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bonuses */}
                    <div className={`${accentBg} rounded-xl p-4 mb-6`}>
                      <h4 className={`text-sm font-semibold ${accentText} uppercase tracking-wide mb-2`}>
                        {t(`angebote.pkg${key}.bonus.title` as any)}
                      </h4>
                      <ul className="space-y-2">
                        {Array.from({ length: bonusCount }, (_, i) => (
                          <li key={i} className={`flex items-start gap-2 ${accentText} text-sm`}>
                            <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            {t(`angebote.pkg${key}.bonus.${i + 1}` as any)}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="mt-auto">
                      <Link href="/beratungstermin" className="block">
                        <Button size="md" className="w-full">
                          {t(`angebote.pkg${key}.cta` as any)}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Retainer Section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-gradient-to-br from-gray-50 to-emerald-50 rounded-2xl p-8 md:p-12 border border-gray-100">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {t('angebote.retainer.title')}
              </h2>
              <p className="text-lg text-gray-700 font-medium mb-4">
                {t('angebote.retainer.subtitle')}
              </p>
              <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                {t('angebote.retainer.description')}
              </p>
              <Link href="/beratungstermin">
                <Button variant="secondary" size="md">
                  {t('angebote.retainer.cta')}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Price Anchor Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
              {t('angebote.priceAnchor.title')}
            </h2>
            <div className="space-y-6 mb-12">
              {(['arg1', 'arg2', 'arg3'] as const).map((arg) => (
                <p key={arg} className="text-lg md:text-xl text-gray-300 italic">
                  {t(`angebote.priceAnchor.${arg}` as any)}
                </p>
              ))}
            </div>
            <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#65C87A] to-[#0426CB] bg-clip-text text-transparent">
              {t('angebote.priceAnchor.conclusion')}
            </p>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('angebote.finalCta.title')}
            </h2>
            <p className="text-gray-600 text-lg mb-10 max-w-xl mx-auto">
              {t('angebote.finalCta.description')}
            </p>
            <div className="flex flex-col items-center gap-3">
              <Link href="/beratungstermin">
                <Button size="lg">
                  {t('angebote.finalCta.button')}
                </Button>
              </Link>
              <p className="text-sm text-gray-500">
                {t('angebote.finalCta.microcopy')}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
