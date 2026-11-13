import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from '@/lib/i18n.server';
import { Section, SectionHead } from '@/components/sections/section-shell';
import { buttonStyles } from '@/components/ui/Button';

const CREDENTIALS = [
  { name: 'Generative AI for Business Transformation', issuer: 'Purdue University', year: '2026' },
  { name: 'Agentic AI and AI Agents for Leaders', issuer: 'Vanderbilt University', year: '2025' },
  { name: 'Certified Professional for Requirements Engineering', issuer: 'IREB', year: '2025' },
  { name: 'Certified Scrum Product Owner', issuer: 'Scrum Alliance', year: '2022' },
] as const;

const HIGHLIGHTS = ['1', '2', '3', '4'] as const;
const PARAGRAPHS = ['paragraph1', 'paragraph2', 'paragraph3'] as const;

/** Left aligned about block: portrait without radius, text, approach and highlights, credentials as a list. */
export async function AboutSection() {
  const { t } = await getTranslations();

  return (
    <Section id="about">
      <SectionHead light={t('home.about.title')} heavy={t('home.about.titleHighlight')} />
      <div className="grid grid-cols-1 items-start gap-x-12 gap-y-10 min-[821px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <Image
          src="/images/profile.webp"
          alt="Patrick Čipić Grübener"
          width={600}
          height={600}
          className="h-auto w-full max-w-[460px] object-cover"
        />
        <div className="grid gap-8">
          <div className="grid max-w-[64ch] gap-4 text-[17px] leading-[1.6] text-ink">
            {PARAGRAPHS.map((key) => (
              <p key={key}>{t(`home.about.${key}`)}</p>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
            <div className="border-t-2 border-ink pt-3.5">
              <h3 className="mb-2 text-[15px] font-bold text-ink">{t('home.about.approach.title')}</h3>
              <p className="text-ink-2">{t('home.about.approach.description')}</p>
            </div>
            <div className="border-t-2 border-ink pt-3.5">
              <h3 className="mb-2 text-[15px] font-bold text-ink">{t('home.about.highlights.title')}</h3>
              <ul className="m-0 grid list-disc gap-1.5 pl-5 text-ink-2 marker:text-brand-blue">
                {HIGHLIGHTS.map((key) => (
                  <li key={key}>{t(`home.about.highlights.${key}`)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h3 className="border-b-2 border-ink pb-2.5 text-[15px] font-bold text-ink">
          {t('home.about.credentials.title')}
        </h3>
        <ul className="m-0 grid list-none grid-cols-1 gap-x-10 p-0 md:grid-cols-2">
          {CREDENTIALS.map((cred) => (
            <li key={cred.name} className="border-b border-line py-3.5">
              <span className="block font-semibold text-ink">{cred.name}</span>
              <span className="text-[15px] text-ink-2">
                {cred.issuer}, {cred.year}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <Link href="/beratungstermin" className={buttonStyles({ variant: 'secondary', className: 'mt-8' })}>
        {t('home.about.cta')}
      </Link>
    </Section>
  );
}
