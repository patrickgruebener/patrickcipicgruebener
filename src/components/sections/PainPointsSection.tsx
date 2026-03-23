import { getTranslations } from '@/lib/i18n.server';

// Icon components
function ChatBubbleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

function UnlinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      <path strokeLinecap="round" strokeWidth={2} d="M2 2l20 20" />
    </svg>
  );
}

function FireIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
    </svg>
  );
}

export async function PainPointsSection() {
  const { t } = await getTranslations();

  const painPoints = [
    { key: '1', Icon: ChatBubbleIcon },
    { key: '2', Icon: UnlinkIcon },
    { key: '3', Icon: FireIcon },
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
