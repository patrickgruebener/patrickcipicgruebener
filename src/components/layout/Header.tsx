'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

interface HeaderProps {
  currentPage?: 'home' | 'impressum' | 'beratungstermin' | 'angebote' | 'ki-system-fuer-unternehmen' | 'ki-system' | 'ki-workshop';
}

export function Header({ currentPage = 'home' }: HeaderProps) {
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-40">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center">
          {/* Logo/Name */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
          >
            <Image
              src="/images/logo.svg"
              alt="Patrick Cipic Grübener"
              width={200}
              height={32}
              className="h-8 w-auto hidden sm:block"
              priority
            />
            <Image
              src="/images/logo.svg"
              alt="Patrick Cipic Grübener"
              width={160}
              height={24}
              className="h-6 w-auto sm:hidden"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="ml-8 hidden items-center gap-4 whitespace-nowrap text-sm xl:flex">
            <Link
              href="/"
              className={`text-gray-600 hover:text-gray-900 transition-colors ${
                currentPage === 'home' ? 'text-gray-900 font-medium' : ''
              }`}
            >
              {t('header.home')}
            </Link>
            <Link
              href="/ki-system"
              className={`text-gray-600 hover:text-gray-900 transition-colors ${
                currentPage === 'ki-system' ? 'text-gray-900 font-medium' : ''
              }`}
            >
              {t('header.personalSystem')}
            </Link>
            <Link
              href="/ki-system-fuer-unternehmen"
              className={`text-gray-600 hover:text-gray-900 transition-colors ${
                currentPage === 'ki-system-fuer-unternehmen' ? 'text-gray-900 font-medium' : ''
              }`}
            >
              {t('header.businessSystem')}
            </Link>
            <Link
              href="/ki-workshop"
              className={`text-gray-600 hover:text-gray-900 transition-colors ${
                currentPage === 'ki-workshop' ? 'text-gray-900 font-medium' : ''
              }`}
            >
              {t('header.kiWorkshop')}
            </Link>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {t('header.about')}
            </button>
          </nav>

          {/* Right Side: Language Switcher & Consultation Button */}
          <div className="ml-auto hidden items-center gap-4 xl:flex">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Consultation Button */}
            <div className="flex flex-col items-center">
              <Link href="/beratungstermin">
                <Button size="sm">
                  {t('header.consultation')}
                </Button>
              </Link>
              <span className="text-xs text-gray-500 mt-1">
                {t('header.consultationMicro')}
              </span>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="ml-auto flex items-center xl:hidden">
            {/* Mobile Language Switcher */}
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="mt-4 flex flex-wrap gap-4 xl:hidden">
          <Link
            href="/"
            className={`text-sm text-gray-600 hover:text-gray-900 transition-colors ${
              currentPage === 'home' ? 'text-gray-900 font-medium' : ''
            }`}
          >
            {t('header.home')}
          </Link>
          <Link
            href="/ki-system"
            className={`text-sm text-gray-600 hover:text-gray-900 transition-colors ${
              currentPage === 'ki-system' ? 'text-gray-900 font-medium' : ''
            }`}
          >
            {t('header.personalSystem')}
          </Link>
          <Link
            href="/ki-system-fuer-unternehmen"
            className={`text-sm text-gray-600 hover:text-gray-900 transition-colors ${
              currentPage === 'ki-system-fuer-unternehmen' ? 'text-gray-900 font-medium' : ''
            }`}
          >
            {t('header.businessSystem')}
          </Link>
          <Link
            href="/ki-workshop"
            className={`text-sm text-gray-600 hover:text-gray-900 transition-colors ${
              currentPage === 'ki-workshop' ? 'text-gray-900 font-medium' : ''
            }`}
          >
            {t('header.kiWorkshop')}
          </Link>
          <button
            onClick={() => scrollToSection('about')}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            {t('header.about')}
          </button>
          <Link href="/beratungstermin" className="text-sm font-semibold text-[#0426CB] hover:underline">
            {t('header.consultation')}
          </Link>
        </nav>
      </div>
    </header>
  );
}
