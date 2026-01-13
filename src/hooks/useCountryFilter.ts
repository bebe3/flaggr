import { useState, useMemo, useCallback } from 'react';
import type { Country, Color, Symbol, Language, FilterState } from '@/types/country';
import { filterCountries, sortCountriesByName } from '@/utils/filterCountries';

interface UseCountryFilterProps {
  countries: Country[];
  lang: Language;
}

export function useCountryFilter({ countries, lang }: UseCountryFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    colors: [],
    symbols: [],
  });

  const hasActiveFilters =
    filters.searchQuery.length > 0 || filters.colors.length > 0 || filters.symbols.length > 0;

  const filteredCountries = useMemo(() => {
    // Return empty array when no filters are active
    if (!hasActiveFilters) {
      return [];
    }
    const filtered = filterCountries(countries, filters, lang);
    return sortCountriesByName(filtered, lang);
  }, [countries, filters, lang, hasActiveFilters]);

  const setSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  const toggleColor = useCallback((color: Color) => {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  }, []);

  const toggleSymbol = useCallback((symbol: Symbol) => {
    setFilters((prev) => ({
      ...prev,
      symbols: prev.symbols.includes(symbol)
        ? prev.symbols.filter((s) => s !== symbol)
        : [...prev.symbols, symbol],
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      searchQuery: '',
      colors: [],
      symbols: [],
    });
  }, []);

  return {
    filters,
    filteredCountries,
    setSearchQuery,
    toggleColor,
    toggleSymbol,
    clearFilters,
    hasActiveFilters,
  };
}
