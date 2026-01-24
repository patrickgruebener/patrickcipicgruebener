import Link from 'next/link';
import { getTranslations } from '@/lib/i18n.server';
import { Button } from '@/components/ui/Button';

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

export async function FinalCtaSection() {
  const { t } = await getTranslations();

  return (
    <section className="py-24 px-6 bg-gradient-to-r from-blue-600 to-teal-500">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-12 md:p-16 shadow-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t('home.finalCta.title')}
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('home.finalCta.description')}
          </p>
          <Link href="/beratungstermin">
            <Button size="lg" className="flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
              <MailIcon className="w-5 h-5" />
              {t('home.finalCta.button')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
