import type { Color, Language } from '@/types/country';
import { COLOR_PALETTE } from '@/config/colors';
import { cn } from '@/lib/utils';

interface ColorFilterProps {
  selectedColors: Color[];
  onColorToggle: (color: Color) => void;
  currentLang: Language;
}

export default function ColorFilter({
  selectedColors,
  onColorToggle,
  currentLang,
}: ColorFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {COLOR_PALETTE.map((color) => {
        const isSelected = selectedColors.includes(color.id);
        return (
          <button
            key={color.id}
            onClick={() => onColorToggle(color.id)}
            className={cn(
              'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-all',
              isSelected
                ? 'bg-indigo-500 text-white shadow-sm ring-1 ring-indigo-600'
                : 'bg-slate-100 text-slate-700 ring-1 ring-slate-300 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:ring-slate-600 dark:hover:bg-slate-600'
            )}
          >
            <span
              className="h-3 w-3 rounded-full ring-1 ring-black/20"
              style={{ backgroundColor: color.hex }}
            />
            <span>{color.name[currentLang]}</span>
          </button>
        );
      })}
    </div>
  );
}
