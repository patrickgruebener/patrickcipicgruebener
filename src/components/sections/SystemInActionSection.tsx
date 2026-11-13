import { getTranslations } from '@/lib/i18n.server';
import { Section, SectionHead } from '@/components/sections/section-shell';
import { Figure } from '@/components/ui/figure';
import { FileTree, FileTreeNode } from '@/components/ui/file-tree';

type Translate = Awaited<ReturnType<typeof getTranslations>>['t'];

const CAPABILITIES = ['1', '2', '3', '4'] as const;

// Business skills from the approved list in .claude/memory.md, names only
function skillsTree(t: Translate): FileTreeNode {
  return {
    name: 'skills/',
    children: [
      { name: 'inbox/', note: t('home.systemInAction.figure.inbox') },
      { name: 'meetingprep/', note: t('home.systemInAction.figure.meetingprep') },
      { name: 'morningbrief/', note: t('home.systemInAction.figure.morningbrief') },
      { name: 'content/', note: t('home.systemInAction.figure.content') },
    ],
  };
}

/** Own system as proof: skills excerpt as Abb. 2, capabilities as a plain list instead of icon tiles. */
export async function SystemInActionSection() {
  const { t } = await getTranslations();

  return (
    <Section>
      <SectionHead
        light={t('home.systemInAction.headline.light')}
        heavy={t('home.systemInAction.headline.heavy')}
        intro={<p>{t('home.systemInAction.intro')}</p>}
      />
      <div className="grid grid-cols-1 items-start gap-x-12 gap-y-10 min-[821px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <Figure number={2} caption={t('home.systemInAction.figure.caption')}>
          <FileTree root={skillsTree(t)} label={t('home.systemInAction.figure.label')} className="text-ink" />
        </Figure>
        <div>
          <dl className="border-t-2 border-ink">
            {CAPABILITIES.map((key) => (
              <div key={key} className="grid gap-2 border-b border-line py-5">
                <dt className="text-[20px] leading-tight font-bold text-ink">
                  {t(`home.systemInAction.${key}.title`)}
                </dt>
                <dd className="m-0 max-w-[64ch] text-ink-2">
                  {t(`home.systemInAction.${key}.description`)}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 max-w-[64ch] text-[17px] font-semibold text-ink">
            {t('home.systemInAction.outro')}
          </p>
        </div>
      </div>
    </Section>
  );
}
