import { de, TranslationKey } from './translations/de';
import { en } from './translations/en';
import { hr } from './translations/hr';

export type Language = 'de' | 'en' | 'hr';

export const translations = {
  de,
  en,
  hr,
} as const;

export const defaultLanguage: Language = 'de';

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'hr', name: 'Hrvatski', flag: '🇭🇷' },
];

// Client-side translation lookup (for when you have the language already)
export function translate(lang: Language, key: TranslationKey): string {
  return translations[lang][key] || translations[defaultLanguage][key] || key;
}

// Get all translations for a language (useful for passing to client components)
export function getAllTranslations(lang: Language) {
  return translations[lang];
}

export type { TranslationKey };
