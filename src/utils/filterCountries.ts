import type { Country, FilterState, Language } from '@/types/country';

export function filterCountries(
  countries: Country[],
  filters: FilterState,
  currentLang: Language
): Country[] {
  return countries.filter((country) => {
    // 1. Text search (partial match on name or code)
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase().trim();
      const name = country.names[currentLang].toLowerCase();
      const code = country.code.toLowerCase();
      // Also search in English name as fallback
      const englishName = country.names.en.toLowerCase();

      const matchesName = name.includes(query);
      const matchesCode = code.includes(query);
      const matchesEnglishName = englishName.includes(query);

      if (!matchesName && !matchesCode && !matchesEnglishName) return false;
    }

    // 2. Color filter (AND condition)
    if (filters.colors.length > 0) {
      const hasAllColors = filters.colors.every((selectedColor) =>
        country.colors.includes(selectedColor)
      );
      if (!hasAllColors) return false;
    }

    // 3. Symbol filter (AND condition)
    if (filters.symbols.length > 0) {
      const hasAllSymbols = filters.symbols.every((symbol) => country.symbols.includes(symbol));
      if (!hasAllSymbols) return false;
    }

    return true;
  });
}

export function sortCountriesByName(countries: Country[], lang: Language): Country[] {
  return [...countries].sort((a, b) => a.names[lang].localeCompare(b.names[lang], lang));
}

export function getCountryByCode(countries: Country[], code: string): Country | undefined {
  return countries.find((c) => c.code === code);
}
