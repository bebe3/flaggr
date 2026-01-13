export type Color = 'red' | 'blue' | 'white' | 'green' | 'yellow' | 'black' | 'orange' | 'purple';

export type Symbol =
  | 'star'
  | 'moon'
  | 'cross'
  | 'circle'
  | 'emblem'
  | 'triangle'
  | 'animal'
  | 'plant';

export type Language = 'en' | 'ja' | 'zh' | 'fr' | 'es' | 'pt' | 'ar' | 'th' | 'vi' | 'id' | 'ru';

export interface LocalizedString {
  en: string;
  ja: string;
  zh: string;
  fr: string;
  es: string;
  pt: string;
  ar: string;
  th: string;
  vi: string;
  id: string;
  ru: string;
}

export interface Country {
  code: string; // ISO 3166-1 alpha-3
  code2: string; // ISO 3166-1 alpha-2 (for flag SVGs)
  names: LocalizedString;
  colors: Color[];
  symbols: Symbol[];
}

export interface CountriesData {
  countries: Country[];
}

export interface ColorOption {
  id: Color;
  hex: string;
  name: LocalizedString;
}

export interface SymbolOption {
  id: Symbol;
  icon: string;
  name: LocalizedString;
}

export interface FilterState {
  searchQuery: string;
  colors: Color[];
  symbols: Symbol[];
}
