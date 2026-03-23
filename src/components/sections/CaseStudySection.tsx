import Link from 'next/link';
import { getTranslations } from '@/lib/i18n.server';
import { Button } from '@/components/ui/Button';

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

export async function CaseStudySection() {
  const { t } = await getTranslations();

  const steps = [
    { number: '1', key: 'step1', color: 'from-blue-500 to-teal-500' },
    { number: '2', key: 'step2', color: 'from-teal-500 to-green-500' },
    { number: '3', key: 'step3', color: 'from-green-500 to-teal-500' },
    { number: '4', key: 'step4', color: 'from-teal-500 to-blue-500' },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6 font-bold leading-tight">
            <span className="text-gray-900">{t('home.caseStudy.headline' as any)}</span>
          </h2>

          {/* Company Info */}
          <div className="flex items-start gap-4 mb-8 p-6 bg-gray-50 rounded-2xl">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-teal-100 flex-shrink-0">
              <BuildingIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {t('home.caseStudy.company' as any)}
              </p>
              <p className="text-gray-500">
                {t('home.caseStudy.companyInfo' as any)}
              </p>
            </div>
          </div>

          {/* Challenge */}
          <p className="text-gray-700 text-lg leading-relaxed max-w-4xl">
            {t('home.caseStudy.challenge' as any)}
          </p>
        </div>

        {/* Journey Steps */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-8">
            {t('home.caseStudy.stepsTitle' as any)}
          </h3>
          <div className="space-y-6">
            {steps.map(({ number, key, color }) => (
              <div key={number} className="flex items-start gap-5">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${color} text-white font-bold text-sm flex-shrink-0`}>
                  {number}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed pt-1.5">
                  {t(`home.caseStudy.${key}` as any)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl mb-10">
          <p className="text-gray-800 text-lg leading-relaxed font-medium">
            {t('home.caseStudy.result' as any)}
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-700 text-lg mb-6">
            {t('home.caseStudy.cta' as any)}
          </p>
          <Link href="/beratungstermin">
            <Button size="lg" className="flex items-center gap-2 mx-auto">
              <CalendarIcon className="w-5 h-5" />
              {t('home.midCta.button')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
