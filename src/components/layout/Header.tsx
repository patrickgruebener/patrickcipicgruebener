'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

interface HeaderProps {
  currentPage?: 'home' | 'impressum' | 'beratungstermin' | 'angebote' | 'aios';
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
            className="flex items-center gap-3"
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
          <nav className="hidden md:flex items-center gap-6 ml-12">
            <Link
              href="/"
              className={`text-gray-600 hover:text-gray-900 transition-colors ${
                currentPage === 'home' ? 'text-gray-900 font-medium' : ''
              }`}
            >
              {t('header.home')}
            </Link>
            <Link
              href="/aios"
              className={`text-gray-600 hover:text-gray-900 transition-colors ${
                currentPage === 'aios' ? 'text-gray-900 font-medium' : ''
              }`}
            >
              {t('header.aios')}
            </Link>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {t('header.about')}
            </button>
          </nav>

          {/* Right Side: Language Switcher & Consultation Button */}
          <div className="hidden md:flex items-center gap-6 ml-auto">
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
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Language Switcher */}
            <LanguageSwitcher />

            <Link href="/beratungstermin">
              <Button size="sm">
                {t('header.consultation')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="md:hidden mt-4 flex flex-wrap gap-4">
          <Link
            href="/"
            className={`text-sm text-gray-600 hover:text-gray-900 transition-colors ${
              currentPage === 'home' ? 'text-gray-900 font-medium' : ''
            }`}
          >
            {t('header.home')}
          </Link>
          <Link
            href="/aios"
            className={`text-sm text-gray-600 hover:text-gray-900 transition-colors ${
              currentPage === 'aios' ? 'text-gray-900 font-medium' : ''
            }`}
          >
            {t('header.aios')}
          </Link>
          <button
            onClick={() => scrollToSection('about')}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            {t('header.about')}
          </button>
        </nav>
      </div>
    </header>
  );
}
