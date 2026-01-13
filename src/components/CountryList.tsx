import { Globe, Search } from 'lucide-react';
import type { Country, Language } from '@/types/country';
import { UI_STRINGS } from '@/config/languages';
import { cn } from '@/lib/utils';
import CountryListItem from './CountryListItem';

interface CountryListProps {
  countries: Country[];
  currentLang: Language;
  hasActiveFilters: boolean;
  onCountryHover: (code: string | null) => void;
  onCountryClick: (code: string) => void;
  isMobile?: boolean;
}

export default function CountryList({
  countries,
  currentLang,
  hasActiveFilters,
  onCountryHover,
  onCountryClick,
  isMobile = false,
}: CountryListProps) {
  const strings = UI_STRINGS[currentLang];

  if (countries.length === 0) {
    const message = hasActiveFilters ? strings.noResults : strings.filterPrompt;
    const Icon = hasActiveFilters ? Globe : Search;

    return (
      <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500 dark:text-gray-400">
        <Icon className="mb-2 size-12 opacity-50" strokeWidth={1.5} />
        <p className="text-sm">{message}</p>
      </div>
    );
  }

  return (
    <ul className={cn('space-y-1 p-1', !isMobile && 'h-full overflow-y-auto')}>
      {countries.map((country) => (
        <CountryListItem
          key={country.code}
          country={country}
          currentLang={currentLang}
          onHover={() => onCountryHover(country.code)}
          onLeave={() => onCountryHover(null)}
          onClick={() => onCountryClick(country.code)}
        />
      ))}
    </ul>
  );
}
