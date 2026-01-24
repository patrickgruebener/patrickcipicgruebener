import Image from 'next/image';
import { getTranslations } from '@/lib/i18n.server';
import { ContactForm } from '@/components/ContactForm';

export default async function BeratungsterminPage() {
  const { t, language } = await getTranslations();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 py-6 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">
            Patrick Cipic Grübener
          </h1>
          <a
            href="/"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            {t('consultation.backToHome')}
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column - Text and Profile */}
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {t('consultation.headline')}
              </h2>

              {/* Profile */}
              <div className="flex items-center gap-4 pt-8">
                <Image
                  src="/images/patrickcipicgruebener_portrait.webp"
                  alt="Patrick Cipic Grübener"
                  width={96}
                  height={96}
                  sizes="(max-width: 768px) 80px, 96px"
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shadow-lg ring-4 ring-white"
                />
                <div>
                  <h3 className="font-bold text-gray-900">
                    {t('footer.name')}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t('footer.role')}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <ContactForm language={language} />
          </div>
        </div>
      </main>
    </div>
  );
}
