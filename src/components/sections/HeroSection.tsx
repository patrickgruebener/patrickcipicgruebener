import Link from 'next/link';
import { getTranslations } from '@/lib/i18n.server';
import { kiSystemContent } from '@/lib/ki-system-content';
import { buttonStyles } from '@/components/ui/Button';
import { Figure } from '@/components/ui/figure';
import { FileTree, FileTreeNode } from '@/components/ui/file-tree';
import { Leitlinie } from '@/components/ui/leitlinie';

export type Translate = Awaited<ReturnType<typeof getTranslations>>['t'];

// Cleaned system excerpt from the moodboard hero, within the approved list in .claude/memory.md
export function systemTree(t: Translate): FileTreeNode {
  return {
    name: 'ki-system/',
    children: [
      { name: 'CLAUDE.md', note: t('home.hero.figure.rules') },
      {
        name: 'memory/',
        children: [
          { name: 'kunden/', note: t('home.hero.figure.perClient') },
          { name: 'entscheidungen/', note: t('home.hero.figure.decisions') },
        ],
      },
      { name: 'skills/', note: t('home.hero.figure.skills') },
      { name: 'sessions/', note: t('home.hero.figure.sessions') },
    ],
  };
}

/** First screen: light/heavy headline, real system excerpt as Abb. 1, guide line below. */
export async function HeroSection() {
  const { t, language } = await getTranslations();
  const personal = kiSystemContent[language];

  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-start gap-x-14 gap-y-8 px-4 pt-9 pb-8 min-[900px]:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] min-[900px]:pt-[72px] min-[900px]:pb-16">
        <div>
          <p className="mb-3.5 text-[15px] text-ink-2 sm:mb-[22px] sm:text-[17px]">{t('home.tagline')}</p>
          <h1 className="mb-5 font-display text-[52px] leading-[0.9] tracking-[-0.005em] text-balance text-ink sm:mb-[30px] sm:text-[72px] lg:text-[94px]">
            <span className="font-light">{t('home.headline.part1')}</span>{' '}
            <span className="block font-[820] text-brand-blue">{t('home.headline.part2')}</span>
          </h1>
          <p className="mb-[26px] max-w-[34em] text-[17px] leading-[1.5] text-ink sm:mb-9 sm:text-xl">
            {t('home.description')}
          </p>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7">
            <Link href="/beratungstermin" className={buttonStyles({ className: 'w-full sm:w-auto' })}>
              {t('home.cta.getInTouch')}
            </Link>
            <Link href="/ki-system" className={buttonStyles({ variant: 'secondary' })}>
              {personal.teaserLink}
            </Link>
          </div>
        </div>
        <Figure number={1} caption={t('home.hero.figure.caption')} className="min-[900px]:mt-1.5">
          <FileTree root={systemTree(t)} label={t('home.hero.figure.label')} className="text-ink" />
        </Figure>
      </div>
      <Leitlinie />
    </section>
  );
}
