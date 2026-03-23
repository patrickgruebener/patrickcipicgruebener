import Link from 'next/link';
import { getTranslations } from '@/lib/i18n.server';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

export async function PackagesSection() {
  const { t } = await getTranslations();

  const packages = [
    { key: '1', gradient: 'from-blue-500 to-blue-600' },
    { key: '2', gradient: 'from-teal-500 to-teal-600' },
    { key: '3', gradient: 'from-green-500 to-green-600' },
    { key: '4', gradient: 'from-emerald-500 to-emerald-600' },
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6 font-bold text-gray-900 leading-tight">
            {t('home.packages.headline' as any)}
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            {t('home.packages.subtitle' as any)}
          </p>
        </div>

        {/* Package Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {packages.map(({ key, gradient }, index) => (
            <div key={key} className={`animate-slide-up-delay-${index + 1}`}>
              <Link href="/angebote" className="block h-full">
                <Card hover className="h-full border-0 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${gradient}`} />
                  <CardContent className="p-6">
                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      {t(`home.packages.${key}.name` as any)}
                    </p>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {t(`home.packages.${key}.tagline` as any)}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {t(`home.packages.${key}.description` as any)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-gray-700 text-lg mb-6 font-medium">
            {t('home.packages.cta' as any)}
          </p>
          <Link href="/beratungstermin">
            <Button size="lg" className="flex items-center gap-2 mx-auto">
              <CalendarIcon className="w-5 h-5" />
              {t('home.packages.ctaButton' as any)}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
