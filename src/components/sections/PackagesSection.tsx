import Link from 'next/link';
import { getTranslations } from '@/lib/i18n.server';
import { Section, SectionHead } from '@/components/sections/section-shell';
import { buttonStyles } from '@/components/ui/Button';

const PACKAGES = ['1', '2', '3', '4'] as const;

// Below 640px each row stacks into a block, so the table needs no horizontal scrolling
const CELL = 'block px-0 align-top sm:table-cell sm:py-3.5 sm:pr-6';

/** Four packages that build on each other, set as a table instead of cards. */
export async function PackagesSection() {
  const { t } = await getTranslations();

  return (
    <Section>
      <SectionHead heavy={t('home.packages.headline')} intro={<p>{t('home.packages.subtitle')}</p>} />
      <table className="block w-full border-collapse text-left text-[16px] sm:table">
        <thead className="hidden sm:table-header-group">
          <tr>
            <th className="w-[20%] border-b-2 border-ink py-3 pr-6 text-[14px] font-bold text-ink">
              {t('home.packages.table.package')}
            </th>
            <th className="w-[28%] border-b-2 border-ink py-3 pr-6 text-[14px] font-bold text-ink">
              {t('home.packages.table.purpose')}
            </th>
            <th className="border-b-2 border-ink py-3 text-[14px] font-bold text-ink">
              {t('home.packages.table.content')}
            </th>
          </tr>
        </thead>
        <tbody className="block border-t-2 border-ink sm:table-row-group sm:border-t-0">
          {PACKAGES.map((key) => (
            <tr key={key} className="block border-b border-line py-4 sm:table-row sm:py-0">
              <th scope="row" className={`${CELL} font-display text-[30px] leading-none font-[820] text-brand-blue`}>
                {t(`home.packages.${key}.name`)}
              </th>
              <td className={`${CELL} mt-2 font-semibold text-ink sm:mt-0`}>{t(`home.packages.${key}.tagline`)}</td>
              <td className={`${CELL} mt-1 text-ink-2 sm:mt-0 sm:pr-0`}>{t(`home.packages.${key}.description`)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-8 flex flex-wrap items-baseline gap-x-7 gap-y-3">
        <Link href="/angebote" className={buttonStyles({ variant: 'secondary' })}>
          {t('home.packages.detailsLink')}
        </Link>
        <span className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <span className="text-ink-2">{t('home.packages.cta')}</span>
          <Link href="/beratungstermin" className={buttonStyles({ variant: 'secondary' })}>
            {t('home.packages.ctaButton')}
          </Link>
        </span>
      </div>
    </Section>
  );
}
