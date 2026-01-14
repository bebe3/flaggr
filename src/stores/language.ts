import { persistentAtom } from '@nanostores/persistent';
import type { Language } from '@/types/country';

export const $language = persistentAtom<Language>('language', 'en');

export function setLanguage(lang: Language) {
  $language.set(lang);
}
