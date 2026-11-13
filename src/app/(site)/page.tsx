import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { PainPointsSection } from '@/components/sections/PainPointsSection';
import { SystemInActionSection } from '@/components/sections/SystemInActionSection';
import { CaseStudySection } from '@/components/sections/CaseStudySection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { PackagesSection } from '@/components/sections/PackagesSection';
import { PersonalSystemTeaser } from '@/components/sections/PersonalSystemTeaser';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ClosingCta } from '@/components/sections/closing-cta';
import { getTranslations } from '@/lib/i18n.server';

// Order approved by Patrick on 2026-11-13 (Task 403): MidCta folded into SystemInAction, FinalCta replaced by ClosingCta.
// One guide line per page: it sits below the hero, so the closing CTA goes without.
export default async function Home() {
  const { t } = await getTranslations();

  return (
    <div className="min-h-screen bg-paper">
      <Header currentPage="home" />
      <main>
        <HeroSection />
        <PainPointsSection />
        <SystemInActionSection />
        <CaseStudySection />
        <ProcessSection />
        <PackagesSection />
        <PersonalSystemTeaser />
        <TestimonialsSection />
        <AboutSection />
        <section className="bg-paper pb-[72px]">
          <div className="mx-auto max-w-[1180px] px-4">
            <ClosingCta
              headlineLight={t('home.finalCta.title.light')}
              headlineHeavy={t('home.finalCta.title.heavy')}
              text={t('home.finalCta.description')}
              buttonLabel={t('home.finalCta.button')}
              href="/beratungstermin"
              guideLine={false}
              portrait={{
                src: '/images/profile.webp',
                alt: t('home.finalCta.portraitAlt'),
                name: 'Patrick Čipić Grübener',
                role: t('home.finalCta.portraitRole'),
              }}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
