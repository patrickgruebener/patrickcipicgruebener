import Image from 'next/image';
import { getTranslations } from '@/lib/i18n.server';
import { Section, SectionHead } from '@/components/sections/section-shell';

const CREDENTIALS = ['credential1', 'credential2', 'credential3'] as const;

/** Trainer with square portrait left, bio and credentials as a ruled list right. */
export async function WorkshopTrainerSection() {
  const { t } = await getTranslations();

  return (
    <Section id="trainer">
      <SectionHead heavy={t('workshop.trainer.title')} />
      <div className="grid grid-cols-1 items-start gap-x-12 gap-y-8 min-[821px]:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <Image
          src="/images/werkstatt/patrick-profil-800.webp"
          alt={t('workshop.trainer.name')}
          width={400}
          height={400}
          className="h-auto w-full max-w-[320px] object-cover"
        />
        <div className="grid gap-6">
          <div>
            <h3 className="text-[28px] leading-tight font-bold text-ink">{t('workshop.trainer.name')}</h3>
            <p className="mt-1 font-semibold text-brand-blue">{t('workshop.trainer.role')}</p>
          </div>
          <div className="grid max-w-[64ch] gap-4 text-[17px] leading-[1.6] text-ink">
            <p>{t('workshop.trainer.bio1')}</p>
            <p>{t('workshop.trainer.bio2')}</p>
          </div>
          <ul className="m-0 grid list-none gap-x-10 p-0 md:grid-cols-3">
            {CREDENTIALS.map((key) => (
              <li key={key} className="border-t border-line py-3 text-[15px] font-semibold text-ink">
                {t(`workshop.trainer.${key}`)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
