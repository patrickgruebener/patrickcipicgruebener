import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getTranslations } from '@/lib/i18n.server';
import { WorkshopHeroSection } from '@/components/sections/workshop/WorkshopHeroSection';
import { WorkshopPainSection } from '@/components/sections/workshop/WorkshopPainSection';
import { WorkshopContentSection } from '@/components/sections/workshop/WorkshopContentSection';
import { WorkshopFormatSection } from '@/components/sections/workshop/WorkshopFormatSection';
import { WorkshopAudienceSection } from '@/components/sections/workshop/WorkshopAudienceSection';
import { WorkshopTrainerSection } from '@/components/sections/workshop/WorkshopTrainerSection';
import { WorkshopFaqSection } from '@/components/sections/workshop/WorkshopFaqSection';
import { WorkshopCtaSection } from '@/components/sections/workshop/WorkshopCtaSection';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslations();
  return {
    title: t('workshop.meta.title'),
    description: t('workshop.meta.description'),
    openGraph: {
      title: t('workshop.meta.title'),
      description: t('workshop.meta.description'),
      type: 'website',
    },
  };
}

export default function KiWorkshopPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="ki-workshop" />
      <main>
        <WorkshopHeroSection />
        <WorkshopPainSection />
        <WorkshopContentSection />
        <WorkshopFormatSection />
        <WorkshopAudienceSection />
        <WorkshopTrainerSection />
        <WorkshopFaqSection />
        <WorkshopCtaSection />
      </main>
      <Footer />
    </div>
  );
}
