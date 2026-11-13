import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from '@/lib/i18n.server';
import { buttonStyles } from '@/components/ui/Button';
import { Figure } from '@/components/ui/figure';
import { Leitlinie } from '@/components/ui/leitlinie';

/** First screen: light/heavy headline left, workbench photo as Abb. 1 and price block right, guide line below. */
export async function WorkshopHeroSection() {
  const { t } = await getTranslations();

  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-start gap-x-14 gap-y-8 px-4 pt-9 pb-8 min-[900px]:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] min-[900px]:pt-[72px] min-[900px]:pb-16">
        <div>
          <h1 className="mb-5 font-display text-[52px] leading-[0.9] tracking-[-0.005em] text-balance text-ink sm:mb-[30px] sm:text-[72px] lg:text-[88px]">
            <span className="font-light">{t('workshop.hero.headline')}</span>{' '}
            <span className="block font-[820] text-brand-blue">{t('workshop.hero.headlineHighlight')}</span>
          </h1>
          <p className="max-w-[34em] text-[17px] leading-[1.5] text-ink sm:text-xl">
            {t('workshop.hero.subheadline')}
          </p>
        </div>
        <div className="grid gap-6 min-[900px]:mt-1.5">
          <Figure number={1} caption={t('workshop.hero.figure.caption')}>
            <Image
              src="/images/werkstatt/werkbank-ordnerbaum.webp"
              alt={t('workshop.hero.figure.alt')}
              width={1500}
              height={1000}
              priority
              className="block h-auto w-full"
              sizes="(min-width: 900px) 460px, 100vw"
            />
          </Figure>
          <div className="border-t-2 border-ink pt-3.5">
            <p className="font-display text-[36px] leading-none font-[820] text-ink">{t('workshop.hero.priceBadge')}</p>
            <p className="mt-2 text-ink-2">{t('workshop.hero.priceNote')}</p>
          </div>
          <Link href="/beratungstermin" className={buttonStyles({ className: 'w-full sm:w-auto sm:justify-self-start' })}>
            {t('workshop.hero.cta')}
          </Link>
        </div>
      </div>
      <Leitlinie />
    </section>
  );
}
