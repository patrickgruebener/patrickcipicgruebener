import Link from 'next/link';
import { getTranslations } from '@/lib/i18n.server';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

function FolderKanbanIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  );
}

function ZapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function TelescopeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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

export async function TurningPointSection() {
  const { t } = await getTranslations();

  const benefits = [
    { key: '1', Icon: FolderKanbanIcon, iconBg: 'from-blue-100 to-teal-100', iconColor: 'text-blue-600' },
    { key: '2', Icon: ZapIcon, iconBg: 'from-teal-100 to-green-100', iconColor: 'text-teal-600' },
    { key: '3', Icon: TelescopeIcon, iconBg: 'from-green-100 to-blue-100', iconColor: 'text-green-600' },
  ];

  return (
    <>
      {/* Turning Point Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 via-teal-50 to-green-50">
        <div className="max-w-6xl mx-auto">
          {/* Headline + Intro */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6 bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 bg-clip-text text-transparent font-bold leading-tight">
              {t('home.turningPoint.headline')}
            </h2>
            <p className="text-gray-700 text-lg max-w-4xl mx-auto leading-relaxed">
              {t('home.turningPoint.intro')}
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map(({ key, Icon, iconBg, iconColor }, index) => (
              <div key={key} className={`animate-slide-up-delay-${index + 1}`}>
                <Card hover className="h-full border-0 bg-white/80 backdrop-blur">
                  <CardContent className="p-8">
                    <div className={`flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${iconBg} mb-6`}>
                      <Icon className={`w-8 h-8 ${iconColor}`} />
                    </div>
                    <h3 className="text-2xl mb-4 font-bold text-gray-900">
                      {t(`home.turningPoint.${key}.title` as any)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t(`home.turningPoint.${key}.description` as any)}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Post-Turning Point CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-50 via-teal-50 to-green-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-8 font-bold text-gray-900 leading-tight">
            {t('home.postTurningCta.headline')}
          </h2>
          <p className="text-gray-700 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('home.postTurningCta.description')}
          </p>

          <Link href="/beratungstermin">
            <Button size="lg" className="flex items-center gap-2 mx-auto">
              <CalendarIcon className="w-5 h-5" />
              {t('home.postTurningCta.button')}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
