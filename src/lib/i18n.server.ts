import { cookies } from 'next/headers';
import { Language, defaultLanguage, languages, translations } from './i18n';
import { TranslationKey } from './translations/de';

// Server-side function to get current language from cookies
export async function getLanguage(): Promise<Language> {
  const cookieStore = await cookies();
  const lang = cookieStore.get('language')?.value as Language;
  return lang && languages.some(l => l.code === lang) ? lang : defaultLanguage;
}

// Server-side translation function
export async function getTranslations() {
  const lang = await getLanguage();
  return {
    t: (key: TranslationKey): string => {
      return translations[lang][key] || translations[defaultLanguage][key] || key;
    },
    language: lang,
  };
}
