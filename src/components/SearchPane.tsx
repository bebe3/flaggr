import { Search } from 'lucide-react';
import type { Country, Color, Symbol, Language, FilterState } from '@/types/country';
import { UI_STRINGS } from '@/config/languages';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import ColorFilter from './ColorFilter';
import SymbolFilter from './SymbolFilter';
import CountryList from './CountryList';

interface SearchPaneProps {
  countries: Country[];
  filters: FilterState;
  currentLang: Language;
  hasActiveFilters: boolean;
  onSearchChange: (query: string) => void;
  onColorToggle: (color: Color) => void;
  onSymbolToggle: (symbol: Symbol) => void;
  onClearFilters: () => void;
  onCountryHover: (code: string | null) => void;
  onCountryClick: (code: string) => void;
  isMobile?: boolean;
}

export default function SearchPane({
  countries,
  filters,
  currentLang,
  hasActiveFilters,
  onSearchChange,
  onColorToggle,
  onSymbolToggle,
  onClearFilters,
  onCountryHover,
  onCountryClick,
  isMobile = false,
}: SearchPaneProps) {
  const strings = UI_STRINGS[currentLang];

  return (
    <aside
      className={cn(
        'search-pane flex h-full w-full flex-col bg-linear-to-b from-slate-100 to-slate-50 shadow-lg dark:from-slate-900 dark:to-slate-800/95',
        isMobile && 'rounded-t-2xl'
      )}
    >
      {/* Drag Handle - mobile only */}
      {isMobile && (
        <div className="flex shrink-0 justify-center pb-2 pt-3">
          <div className="h-1 w-10 rounded-full bg-slate-300 dark:bg-slate-600" />
        </div>
      )}

      {/* Scrollable content */}
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        {/* Search Input */}
        <div
          className={cn(
            'shrink-0 border-b border-slate-200/70 p-4 dark:border-slate-700/50',
            isMobile && 'pt-2'
          )}
        >
          <div className="relative">
            <Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={strings.search}
              className="w-full rounded-xl bg-white py-2.5 ps-10 pe-4 text-sm ring-1 ring-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800 dark:text-white dark:ring-slate-600 dark:placeholder-slate-500"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="shrink-0">
          {/* Color Filter */}
          <div className="border-b border-slate-200/70 p-4 dark:border-slate-700/50">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <span>🎨</span>
              {strings.colors}
            </h3>
            <ColorFilter
              selectedColors={filters.colors}
              onColorToggle={onColorToggle}
              currentLang={currentLang}
            />
          </div>

          {/* Symbol Filter */}
          <div className="border-b border-slate-200/70 p-4 dark:border-slate-700/50">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <span>⭐</span>
              {strings.symbols}
            </h3>
            <SymbolFilter
              selectedSymbols={filters.symbols}
              onSymbolToggle={onSymbolToggle}
              currentLang={currentLang}
            />
          </div>
        </div>

        {/* Results */}
        <div className="flex min-h-0 flex-1 flex-col p-4">
          <div className="mb-3 flex shrink-0 items-center justify-between">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <span>🌍</span>
              {strings.results}
              <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                {countries.length}
              </span>
            </h3>
            {hasActiveFilters && (
              <Button
                variant="link"
                size="sm"
                onClick={onClearFilters}
                className="h-auto p-0 text-xs text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                {strings.clearFilters}
              </Button>
            )}
          </div>
          <div className="min-h-0 flex-1">
            <CountryList
              countries={countries}
              currentLang={currentLang}
              hasActiveFilters={hasActiveFilters}
              onCountryHover={onCountryHover}
              onCountryClick={onCountryClick}
              isMobile={isMobile}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
