import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { getTranslations } from '@/lib/i18n.server';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default async function ImpressumPage() {
  const { t } = await getTranslations();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="impressum" />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('impressum.title')}</h1>
          <p className="text-gray-600 text-lg">
            {t('impressum.subtitle')}
          </p>
        </div>

        <div className="space-y-8">
          {/* Angaben gemäß § 5 TMG */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                {t('impressum.tmg.title')}
              </h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <p className="font-medium">{t('impressum.tmg.name')}</p>
                  <p>{t('impressum.tmg.role')}</p>
                </div>
                <div>
                  <p className="font-medium">{t('impressum.tmg.contact')}</p>
                  <p>{t('impressum.tmg.email')}</p>
                  <p>{t('impressum.tmg.phone')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Haftungsausschluss */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                {t('impressum.liability.title')}
              </h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-medium mb-2">{t('impressum.liability.content.title')}</h3>
                  <p className="text-sm leading-relaxed">
                    {t('impressum.liability.content.text')}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">{t('impressum.liability.links.title')}</h3>
                  <p className="text-sm leading-relaxed">
                    {t('impressum.liability.links.text')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Datenschutz */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                {t('impressum.privacy.title')}
              </h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-medium mb-2">{t('impressum.privacy.intro.title')}</h3>
                  <p className="text-sm leading-relaxed">
                    {t('impressum.privacy.intro.text')}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">{t('impressum.privacy.collection.title')}</h3>
                  <p className="text-sm leading-relaxed">
                    {t('impressum.privacy.collection.text')}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">{t('impressum.privacy.usage.title')}</h3>
                  <p className="text-sm leading-relaxed">
                    {t('impressum.privacy.usage.text')}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">{t('impressum.privacy.rights.title')}</h3>
                  <p className="text-sm leading-relaxed">
                    {t('impressum.privacy.rights.text')}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">{t('impressum.privacy.contact.title')}</h3>
                  <p className="text-sm leading-relaxed">
                    {t('impressum.privacy.contact.text')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Urheberrecht */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                {t('impressum.copyright.title')}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="text-sm leading-relaxed">
                  {t('impressum.copyright.text1')}
                </p>
                <p className="text-sm leading-relaxed">
                  {t('impressum.copyright.text2')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Back to Home Button */}
        <div className="mt-12 text-center">
          <Link href="/">
            <Button>
              {t('impressum.backToHome')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
