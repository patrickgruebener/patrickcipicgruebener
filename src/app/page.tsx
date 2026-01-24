import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { PainPointsSection } from '@/components/sections/PainPointsSection';
import { MidCtaSection } from '@/components/sections/MidCtaSection';
import { TurningPointSection } from '@/components/sections/TurningPointSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="home" />
      <main>
        <HeroSection />
        <PainPointsSection />
        <MidCtaSection />
        <TurningPointSection />
        <TestimonialsSection />
        <AboutSection />
        <ProcessSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
}
