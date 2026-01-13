import type { Symbol, Language } from '@/types/country';
import { SYMBOL_OPTIONS } from '@/config/symbols';
import { cn } from '@/lib/utils';

interface SymbolFilterProps {
  selectedSymbols: Symbol[];
  onSymbolToggle: (symbol: Symbol) => void;
  currentLang: Language;
}

export default function SymbolFilter({
  selectedSymbols,
  onSymbolToggle,
  currentLang,
}: SymbolFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {SYMBOL_OPTIONS.map((symbol) => {
        const isSelected = selectedSymbols.includes(symbol.id);
        return (
          <button
            key={symbol.id}
            onClick={() => onSymbolToggle(symbol.id)}
            className={cn(
              'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-all',
              isSelected
                ? 'bg-indigo-500 text-white shadow-sm ring-1 ring-indigo-600'
                : 'bg-slate-100 text-slate-700 ring-1 ring-slate-300 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:ring-slate-600 dark:hover:bg-slate-600'
            )}
          >
            <span>{symbol.icon}</span>
            <span>{symbol.name[currentLang]}</span>
          </button>
        );
      })}
    </div>
  );
}
