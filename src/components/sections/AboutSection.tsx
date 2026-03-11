import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from '@/lib/i18n.server';
import { Button } from '@/components/ui/Button';

function RocketIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09zM12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11.95A22.18 22.18 0 0112 15z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function GraduationCapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zM12 14v7" />
    </svg>
  );
}

const credentials = [
  { name: 'Generative AI for Business Transformation', issuer: 'Purdue University', year: '2026' },
  { name: 'Agentic AI and AI Agents for Leaders', issuer: 'Vanderbilt University', year: '2025' },
  { name: 'Certified Professional for Requirements Engineering', issuer: 'IREB', year: '2025' },
  { name: 'Certified Scrum Product Owner', issuer: 'Scrum Alliance', year: '2022' },
];

export async function AboutSection() {
  const { t } = await getTranslations();

  return (
    <section id="about" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl mb-16 font-bold text-gray-900 text-center max-w-4xl mx-auto [text-wrap:balance]">
          <span className="text-5xl block mb-2">{t('home.about.title')}</span>
          <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
            {t('home.about.titleHighlight')}
          </span>
        </h2>

        {/* Two-column layout for image and text */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
          {/* Left Side: Portrait Photo */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/profile.webp"
                alt="Patrick Grübener"
                width={600}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Right Side: Text Content */}
          <div className="space-y-6">
            <p className="text-gray-700 text-lg leading-relaxed">
              {t('home.about.paragraph1')}
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              {t('home.about.paragraph2')}
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              {t('home.about.paragraph3')}
            </p>
          </div>
        </div>

        {/* Two-column layout for Approach and Highlights */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
          {/* Mein Ansatz */}
          <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-xl border border-blue-100">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <RocketIcon className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t('home.about.approach.title')}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t('home.about.approach.description')}
                </p>
              </div>
            </div>
          </div>

          {/* Was mich auszeichnet */}
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-8 rounded-xl border border-teal-100">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <StarIcon className="w-8 h-8 text-teal-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t('home.about.highlights.title')}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t('home.about.highlights.description')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Credentials Section */}
        <div className="mb-12 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCapIcon className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900">
              {t('home.about.credentials.title')}
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {credentials.map((cred) => (
              <div
                key={cred.name}
                className="bg-gradient-to-br from-gray-50 to-blue-50/50 p-5 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all"
              >
                <p className="font-medium text-gray-900 text-sm leading-snug mb-2">
                  {cred.name}
                </p>
                <p className="text-gray-500 text-xs">
                  {cred.issuer} · {cred.year}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Centered CTA Button */}
        <div className="text-center">
          <Link href="/beratungstermin">
            <Button size="lg" className="flex items-center gap-2 mx-auto">
              <CalendarIcon className="w-5 h-5" />
              {t('home.about.cta')}
            </Button>
          </Link>
          <p className="text-gray-500 text-sm mt-4">
            {t('home.about.microcopy')}
          </p>
        </div>
      </div>
    </section>
  );
}
