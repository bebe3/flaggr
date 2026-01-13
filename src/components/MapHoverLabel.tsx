import { X } from 'lucide-react';
import type { Country, Language } from '@/types/country';
import { getColorHex } from '@/config/colors';
import { SYMBOL_OPTIONS } from '@/config/symbols';
import { HOVER_LABEL } from '@/config/constants';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface MapHoverLabelProps {
  country: Country;
  position: { x: number; y: number };
  currentLang: Language;
  isMobile?: boolean;
  isRTL?: boolean;
  sidebarWidth?: number;
  onClose?: () => void;
}

function getSymbolIcon(symbolId: string): string {
  const symbol = SYMBOL_OPTIONS.find((s) => s.id === symbolId);
  return symbol?.icon || '';
}

export default function MapHoverLabel({
  country,
  position,
  currentLang,
  isMobile = false,
  isRTL = false,
  sidebarWidth = 0,
  onClose,
}: MapHoverLabelProps) {
  // Check if label would overlap with sidebar
  if (!isMobile && sidebarWidth > 0) {
    const viewportWidth = window.innerWidth;
    const labelWidth = HOVER_LABEL.width;
    const xOffset = HOVER_LABEL.xOffset;
    const labelLeft = position.x + xOffset;
    const labelRight = labelLeft + labelWidth;

    if (isRTL) {
      // RTL: sidebar is on the right
      const sidebarStart = viewportWidth - sidebarWidth;
      if (labelRight > sidebarStart) {
        return null;
      }
    } else {
      // LTR: sidebar is on the left
      if (labelLeft < sidebarWidth) {
        return null;
      }
    }
  }

  // Mobile: center horizontally, position above tap point
  // Desktop: follow mouse
  const style = isMobile
    ? {
        left: '50%',
        transform: 'translateX(-50%)',
        top: Math.max(HOVER_LABEL.minTop, position.y - HOVER_LABEL.yOffset),
      }
    : {
        left: position.x + HOVER_LABEL.xOffset,
        top: position.y - HOVER_LABEL.desktopYOffset,
      };

  return (
    <div
      className={cn(
        'fixed z-50 w-44 overflow-hidden rounded-xl bg-linear-to-b from-gray-900 to-gray-950 shadow-2xl ring-1 ring-white/10',
        isMobile ? 'pointer-events-auto' : 'pointer-events-none'
      )}
      style={style}
    >
      {/* Flag with subtle inner shadow */}
      <div className="relative">
        <img
          src={`/flags/3x2/${country.code2}.svg`}
          alt={`Flag of ${country.names.en}`}
          className="h-28 w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 shadow-[inset_0_-12px_12px_-8px_rgba(0,0,0,0.15)]" />
        {/* Close button - mobile only */}
        {isMobile && onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute end-1 top-1 size-6 rounded-full bg-black/50 text-white/80 hover:bg-black/70 hover:text-white"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>

      {/* Info */}
      <div className="space-y-2 px-3 py-2.5">
        {/* Country name */}
        <div className="text-sm font-semibold tracking-wide text-white">
          {country.names[currentLang]}
        </div>

        {/* Color chips and symbols */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {country.colors.map((color, idx) => (
              <div
                key={`${color}-${idx}`}
                className="h-2.5 w-2.5 rounded-full ring-1 ring-white/20"
                style={{ backgroundColor: getColorHex(color) }}
              />
            ))}
          </div>
          {country.symbols.length > 0 && (
            <>
              <div className="h-3 w-px bg-white/20" />
              <div className="flex gap-0.5 text-xs opacity-90">
                {country.symbols.map((symbol, idx) => (
                  <span key={`${symbol}-${idx}`}>{getSymbolIcon(symbol)}</span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
