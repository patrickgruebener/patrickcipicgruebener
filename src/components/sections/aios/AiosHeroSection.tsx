import Link from 'next/link';
import { getTranslations } from '@/lib/i18n.server';
import { buttonStyles } from '@/components/ui/Button';
import { Figure } from '@/components/ui/figure';
import { FileTree } from '@/components/ui/file-tree';
import { Leitlinie } from '@/components/ui/leitlinie';
import { systemTree } from '@/components/sections/HeroSection';

/** First screen: light/heavy headline, system excerpt as Abb. 1, guide line below. */
export async function AiosHeroSection() {
  const { t } = await getTranslations();

  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-start gap-x-14 gap-y-8 px-4 pt-9 pb-8 min-[900px]:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] min-[900px]:pt-[72px] min-[900px]:pb-16">
        <div>
          <h1 className="mb-5 font-display text-[52px] leading-[0.9] tracking-[-0.005em] text-balance text-ink sm:mb-[30px] sm:text-[72px] lg:text-[88px]">
            <span className="font-light">{t('aios.hero.headline')}</span>{' '}
            <span className="block font-[820] text-brand-blue">{t('aios.hero.headlineHighlight')}</span>
          </h1>
          <p className="mb-[26px] max-w-[34em] text-[17px] leading-[1.5] text-ink sm:mb-9 sm:text-xl">
            {t('aios.hero.subheadline')}
          </p>
          <Link href="#pakete" className={buttonStyles({ className: 'w-full sm:w-auto' })}>
            {t('aios.hero.cta')}
          </Link>
        </div>
        <Figure number={1} caption={t('home.hero.figure.caption')} className="min-[900px]:mt-1.5">
          <FileTree root={systemTree(t)} label={t('home.hero.figure.label')} className="text-ink" />
        </Figure>
      </div>
      <Leitlinie />
    </section>
  );
}
