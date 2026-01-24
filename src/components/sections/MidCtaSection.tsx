import Link from 'next/link';
import { getTranslations } from '@/lib/i18n.server';
import { Button } from '@/components/ui/Button';

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

export async function MidCtaSection() {
  const { t } = await getTranslations();

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
          <span className="font-bold text-black">{t('home.midCta.headline.part1')} </span>
          <span className="font-bold text-orange-600">{t('home.midCta.headline.part2')}</span>
          <br />
          <span className="font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            {t('home.midCta.headline.part3')}
          </span>
        </h2>
        <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          {t('home.midCta.description')}
        </p>

        <div className="flex flex-col items-center gap-3">
          <Link href="/beratungstermin">
            <Button size="lg" className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              {t('home.midCta.button')}
            </Button>
          </Link>
          <p className="text-sm text-gray-500">
            {t('home.midCta.microcopy')}
          </p>
        </div>
      </div>
    </section>
  );
}
