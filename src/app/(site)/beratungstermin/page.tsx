import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from '@/lib/i18n.server';
import { ContactForm } from '@/components/ContactForm';
import { buttonStyles } from '@/components/ui/Button';
import { Leitlinie } from '@/components/ui/leitlinie';

export default async function BeratungsterminPage({ searchParams }: { searchParams: Promise<{ anliegen?: string }> }) {
  const { t, language } = await getTranslations();
  const purchaseInquiry = (await searchParams).anliegen === 'ki-system-kauf';

  return (
    <div className="min-h-screen bg-paper">
      {/* Slim header without navigation, keeps the focus on the form */}
      <header className="bg-paper">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-4 py-5">
          <p className="m-0 font-display text-[26px] leading-none font-[820] text-ink">Patrick Čipić Grübener</p>
          <Link
            href={purchaseInquiry ? '/ki-system' : '/'}
            className={buttonStyles({ variant: 'ghost', size: 'sm' })}
          >
            {t('consultation.backToHome')}
          </Link>
        </div>
        <Leitlinie />
      </header>

      <main className="py-12 min-[900px]:py-[72px]">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-start gap-x-14 gap-y-10 px-4 min-[900px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="grid gap-8">
            <h1 className="m-0 font-display text-[clamp(40px,9.4vw,57px)] leading-[0.9] font-[820] tracking-[-0.005em] text-balance text-ink">
              {t(purchaseInquiry ? 'consultation.purchaseHeadline' : 'consultation.headline')}
            </h1>

            <div className="grid grid-cols-[96px_minmax(0,1fr)] items-center gap-4">
              <Image
                src="/images/werkstatt/patrick-profil-800.webp"
                alt="Patrick Čipić Grübener"
                width={96}
                height={96}
                sizes="96px"
                priority
                className="h-24 w-24 object-cover"
              />
              <div>
                <p className="m-0 font-bold text-ink">{t('footer.name')}</p>
                <p className="m-0 text-[15px] text-ink-2">{t('footer.role')}</p>
              </div>
            </div>
          </div>

          <ContactForm language={language} purchaseInquiry={purchaseInquiry} />
        </div>
      </main>
    </div>
  );
}
