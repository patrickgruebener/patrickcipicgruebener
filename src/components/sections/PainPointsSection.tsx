import { getTranslations } from '@/lib/i18n.server';

// Icon components
function RouteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  );
}

function ListXIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  );
}

function CompassIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  );
}

function ColumnsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
    </svg>
  );
}

function LayersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );
}

const painPointIcons = [RouteIcon, ListXIcon, CompassIcon, ColumnsIcon, LayersIcon];

export async function PainPointsSection() {
  const { t } = await getTranslations();

  const painPoints = [
    { key: '1', Icon: RouteIcon },
    { key: '2', Icon: ListXIcon },
    { key: '3', Icon: CompassIcon },
    { key: '4', Icon: ColumnsIcon },
    { key: '5', Icon: LayersIcon },
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
