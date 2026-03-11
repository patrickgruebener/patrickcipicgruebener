import { getTranslations } from '@/lib/i18n.server';

// Icon components
function ZapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function CompassIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
    </svg>
  );
}

function PuzzleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 010-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
    </svg>
  );
}

function GraduationCapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  );
}

function TrendingUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}

export async function PainPointsSection() {
  const { t } = await getTranslations();

  const painPoints = [
    { key: '1', Icon: ZapIcon },
    { key: '2', Icon: CompassIcon },
    { key: '3', Icon: PuzzleIcon },
    { key: '4', Icon: GraduationCapIcon },
    { key: '5', Icon: TrendingUpIcon },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Headline + Intro */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6 max-w-4xl leading-tight">
            <span className="text-black font-bold">
              {t('home.painPoints.headline.part1')}
            </span>{' '}
            <span className="text-gray-500 font-bold">
              {t('home.painPoints.headline.part2')}
            </span>
          </h2>
          <div className="max-w-3xl space-y-3">
            <p className="text-gray-600 text-lg">
              {t('home.painPoints.intro.part1')}
            </p>
            <p className="text-black text-lg">
              {t('home.painPoints.intro.part2')}
            </p>
            <p className="text-gray-500 text-lg italic">
              {t('home.painPoints.intro.part3')}
            </p>
          </div>
        </div>

        {/* Pain Points Grid */}
        <div className="space-y-12">
          {painPoints.map(({ key, Icon }) => (
            <div key={key} className="grid md:grid-cols-[80px_1fr] gap-6 items-start group">
              <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 group-hover:from-red-100 group-hover:to-orange-100 transition-colors">
                <Icon className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h3 className="text-2xl mb-3 font-semibold">
                  {t(`home.painPoints.${key}.title` as any)}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {t(`home.painPoints.${key}.description` as any)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
