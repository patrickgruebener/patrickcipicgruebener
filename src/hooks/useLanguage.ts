'use client';

import { useState, useEffect, useCallback } from 'react';
import { Language, defaultLanguage, translate } from '@/lib/i18n';
import { TranslationKey } from '@/lib/translations/de';

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load language from cookie on mount
  useEffect(() => {
    const savedLanguage = document.cookie
      .split('; ')
      .find(row => row.startsWith('language='))
      ?.split('=')[1] as Language | undefined;

    if (savedLanguage && ['de', 'en', 'hr'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
    setIsLoaded(true);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    // Set cookie with 1 year expiry
    document.cookie = `language=${lang};path=/;max-age=${60 * 60 * 24 * 365}`;
    // Reload to apply server-side translations
    window.location.reload();
  }, []);

  const t = useCallback((key: TranslationKey): string => {
    return translate(language, key);
  }, [language]);

  return {
    language,
    setLanguage,
    t,
    isLoaded,
  };
}
