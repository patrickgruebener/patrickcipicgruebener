'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { buttonStyles } from '@/components/ui/Button';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

interface HeaderProps {
  currentPage?: 'home' | 'impressum' | 'beratungstermin' | 'angebote' | 'ki-system-fuer-unternehmen' | 'ki-system' | 'ki-workshop' | 'bausteine';
}

// Active page: green underline as in the secondary link style
function navLinkClass(isActive: boolean, isMobile = false): string {
  const size = isMobile ? 'text-sm' : '';
  const active = isActive ? 'underline decoration-brand-green decoration-2 underline-offset-[5px]' : 'hover:text-brand-blue';
  return `${size} text-ink transition-colors motion-reduce:transition-none ${active}`.trim();
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
    <header className="sticky top-0 z-40 border-b border-line bg-paper font-text text-ink">
      <div className="mx-auto max-w-[1180px] px-4 py-3 xl:py-4">
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
              className="h-6 w-auto hidden sm:block"
              priority
            />
            <Image
              src="/images/logo.svg"
              alt="Patrick Cipic Grübener"
              width={160}
              height={24}
              className="h-[15px] w-auto sm:hidden"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="ml-8 hidden items-center gap-8 whitespace-nowrap text-base font-medium xl:flex">
            <Link
              href="/"
              aria-current={currentPage === 'home' ? 'page' : undefined}
              className={navLinkClass(currentPage === 'home')}
            >
              {t('header.home')}
            </Link>
            <Link
              href="/ki-system"
              aria-current={currentPage === 'ki-system' ? 'page' : undefined}
              className={navLinkClass(currentPage === 'ki-system')}
            >
              {t('header.personalSystem')}
            </Link>
            <Link
              href="/ki-system-fuer-unternehmen"
              aria-current={currentPage === 'ki-system-fuer-unternehmen' ? 'page' : undefined}
              className={navLinkClass(currentPage === 'ki-system-fuer-unternehmen')}
            >
              {t('header.businessSystem')}
            </Link>
            <Link
              href="/ki-workshop"
              aria-current={currentPage === 'ki-workshop' ? 'page' : undefined}
              className={navLinkClass(currentPage === 'ki-workshop')}
            >
              {t('header.kiWorkshop')}
            </Link>
            <button
              onClick={() => scrollToSection('about')}
              className={navLinkClass(false)}
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
              <Link href="/beratungstermin" className={buttonStyles({ size: 'sm' })}>
                {t('header.consultation')}
              </Link>
              <span className="mt-1 text-xs text-ink-2">
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
        <nav className="mt-3 flex flex-wrap gap-x-5 gap-y-2 xl:hidden">
          <Link
            href="/"
            aria-current={currentPage === 'home' ? 'page' : undefined}
            className={navLinkClass(currentPage === 'home', true)}
          >
            {t('header.home')}
          </Link>
          <Link
            href="/ki-system"
            aria-current={currentPage === 'ki-system' ? 'page' : undefined}
            className={navLinkClass(currentPage === 'ki-system', true)}
          >
            {t('header.personalSystem')}
          </Link>
          <Link
            href="/ki-system-fuer-unternehmen"
            aria-current={currentPage === 'ki-system-fuer-unternehmen' ? 'page' : undefined}
            className={navLinkClass(currentPage === 'ki-system-fuer-unternehmen', true)}
          >
            {t('header.businessSystem')}
          </Link>
          <Link
            href="/ki-workshop"
            aria-current={currentPage === 'ki-workshop' ? 'page' : undefined}
            className={navLinkClass(currentPage === 'ki-workshop', true)}
          >
            {t('header.kiWorkshop')}
          </Link>
          <button
            onClick={() => scrollToSection('about')}
            className={navLinkClass(false, true)}
          >
            {t('header.about')}
          </button>
          <Link href="/beratungstermin" className="text-sm font-semibold text-brand-blue hover:underline">
            {t('header.consultation')}
          </Link>
        </nav>
      </div>
    </header>
  );
}
