import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getTranslations } from '@/lib/i18n.server';
import { AiosHeroSection } from '@/components/sections/aios/AiosHeroSection';
import { AiosFeaturesSection } from '@/components/sections/aios/AiosFeaturesSection';
import { AiosProcessSection } from '@/components/sections/aios/AiosProcessSection';
import { AiosAudienceSection } from '@/components/sections/aios/AiosAudienceSection';
import { AiosFaqSection } from '@/components/sections/aios/AiosFaqSection';
import { AiosSocialProofSection } from '@/components/sections/aios/AiosSocialProofSection';
import { AiosCtaSection } from '@/components/sections/aios/AiosCtaSection';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslations();
  return {
    title: t('aios.meta.title'),
    description: t('aios.meta.description'),
    openGraph: {
      title: t('aios.meta.title'),
      description: t('aios.meta.description'),
      type: 'website',
    },
  };
}

export default function AiosPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="aios" />
      <main>
        <AiosHeroSection />
        <AiosFeaturesSection />
        <AiosProcessSection />
        <AiosAudienceSection />
        <AiosFaqSection />
        <AiosSocialProofSection />
        <AiosCtaSection />
      </main>
      <Footer />
    </div>
  );
}
