import { useState, useCallback, useMemo, useRef, useEffect, lazy, Suspense } from 'react';
import { SlidersHorizontal, Loader2 } from 'lucide-react';
import type { Country, Language } from '@/types/country';
import { useTheme } from '@/hooks/useTheme';
import { useCountryFilter } from '@/hooks/useCountryFilter';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { getCountryByCode } from '@/utils/filterCountries';
import { MAP_CONFIG, PANEL_SIZES } from '@/config/constants';
import { isRTL, getLanguageConfig } from '@/config/languages';
import { Button } from './ui/button';
import Header from './Header';
import SearchPane from './SearchPane';
import MapHoverLabel from './MapHoverLabel';
import { Sheet, SheetContent } from './ui/sheet';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './ui/resizable';

const MapView = lazy(() => import('./MapView'));

function MapSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-slate-100 dark:bg-slate-900">
      <Loader2 className="size-8 animate-spin text-indigo-500" />
    </div>
  );
}

interface FlaggrAppProps {
  countries: Country[];
  initialLang: Language;
}

export default function FlaggrApp({ countries, initialLang }: FlaggrAppProps) {
  const [currentLang, setCurrentLang] = useState<Language>(initialLang);
  const [hoveredCountryCode, setHoveredCountryCode] = useState<string | null>(null);
  const [hoverSource, setHoverSource] = useState<'map' | 'list' | null>(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null);
  const [selectSource, setSelectSource] = useState<'map' | 'list' | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [tappedCountryCode, setTappedCountryCode] = useState<string | null>(null);
  const [tapPosition, setTapPosition] = useState({ x: 0, y: 0 });
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const isMobile = useIsMobile();
  const { theme, toggleTheme } = useTheme();
  const {
    filters,
    filteredCountries,
    setSearchQuery,
    toggleColor,
    toggleSymbol,
    clearFilters,
    hasActiveFilters,
  } = useCountryFilter({ countries, lang: currentLang });

  const filterCodes = useMemo(() => filteredCountries.map((c) => c.code), [filteredCountries]);

  const hoveredCountry = useMemo(
    () => (hoveredCountryCode ? getCountryByCode(countries, hoveredCountryCode) : null),
    [countries, hoveredCountryCode]
  );

  const selectedCountry = useMemo(
    () => (selectedCountryCode ? (getCountryByCode(countries, selectedCountryCode) ?? null) : null),
    [countries, selectedCountryCode]
  );

  const tappedCountry = useMemo(
    () => (tappedCountryCode ? getCountryByCode(countries, tappedCountryCode) : null),
    [countries, tappedCountryCode]
  );

  const handleMapCountryHover = useCallback((code: string | null) => {
    setHoveredCountryCode(code);
    setHoverSource(code ? 'map' : null);
  }, []);

  const handleListCountryHover = useCallback((code: string | null) => {
    setHoveredCountryCode(code);
    setHoverSource(code ? 'list' : null);
  }, []);

  const handleCountryClick = useCallback(
    (code: string, position?: { x: number; y: number }) => {
      const source = position ? 'map' : 'list';
      if (isMobile) {
        if (position) {
          // Map tap - toggle the tap label
          if (tappedCountryCode === code) {
            // Tapping same country again closes the label and zooms
            setTappedCountryCode(null);
            setSelectedCountryCode(code);
            setSelectSource('map');
          } else {
            // Show label for tapped country
            setTappedCountryCode(code);
            setTapPosition(position);
          }
        } else {
          // List click - close sheet and center
          setSelectedCountryCode(code);
          setSelectSource('list');
          setTappedCountryCode(null);
        }
        setIsSheetOpen(false);
      } else {
        // On desktop
        setSelectedCountryCode(code);
        setSelectSource(source);
      }
    },
    [isMobile, tappedCountryCode]
  );

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  const handleLanguageChange = useCallback((lang: Language) => {
    setCurrentLang(lang);
    const newPath = lang === 'en' ? '/' : `/${lang}/`;
    window.history.pushState({}, '', newPath);

    // Update document direction for RTL languages
    const config = getLanguageConfig(lang);
    document.documentElement.dir = config?.dir || 'ltr';
    document.documentElement.lang = lang;
  }, []);

  // Track sidebar width for hover label positioning
  useEffect(() => {
    if (isMobile || !sidebarRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setSidebarWidth(entry.contentRect.width);
      }
    });

    observer.observe(sidebarRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <div className="flex h-full flex-col" onMouseMove={handleMouseMove}>
      <Header
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content */}
      {isMobile ? (
        /* Mobile: Full screen map + FAB + Drawer */
        <div className="relative flex-1">
          <Suspense fallback={<MapSkeleton />}>
            <MapView
              filterCodes={filterCodes}
              hoveredCountryCode={hoveredCountryCode}
              hoverSource={hoverSource}
              selectedCountry={selectedCountry}
              selectSource={selectSource}
              theme={theme}
              minZoom={MAP_CONFIG.mobileMinZoom}
              onCountryHover={handleMapCountryHover}
              onCountryClick={handleCountryClick}
              onEmptyClick={() => setTappedCountryCode(null)}
            />
          </Suspense>

          {/* FAB - Filter Button (top-left) */}
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setIsSheetOpen(true)}
            className="fixed left-4 top-18 z-10 size-12 rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-transform active:scale-95 dark:bg-slate-800/90"
          >
            <SlidersHorizontal className="size-5 text-slate-600 dark:text-slate-300" />
            {hasActiveFilters && (
              <span className="absolute -end-1 -top-1 flex size-5 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white">
                {filters.colors.length + filters.symbols.length}
              </span>
            )}
          </Button>

          {/* Bottom Drawer */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetContent
              side="bottom"
              className="h-[70vh]! max-h-[90vh] flex-col overflow-hidden rounded-t-2xl border-none bg-transparent p-0"
              hideCloseButton
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <SearchPane
                countries={filteredCountries}
                filters={filters}
                currentLang={currentLang}
                hasActiveFilters={hasActiveFilters}
                onSearchChange={setSearchQuery}
                onColorToggle={toggleColor}
                onSymbolToggle={toggleSymbol}
                onClearFilters={clearFilters}
                onCountryHover={handleListCountryHover}
                onCountryClick={handleCountryClick}
                isMobile
              />
            </SheetContent>
          </Sheet>
        </div>
      ) : (
        /* Desktop/Tablet: Resizable 2-pane layout */
        <ResizablePanelGroup
          orientation="horizontal"
          className="flex-1"
          dir={isRTL(currentLang) ? 'rtl' : 'ltr'}
        >
          <ResizablePanel
            defaultSize={PANEL_SIZES.defaultWidth}
            minSize={PANEL_SIZES.minWidth}
            maxSize={PANEL_SIZES.maxWidth}
          >
            <div ref={sidebarRef} className="h-full">
              <SearchPane
                countries={filteredCountries}
                filters={filters}
                currentLang={currentLang}
                hasActiveFilters={hasActiveFilters}
                onSearchChange={setSearchQuery}
                onColorToggle={toggleColor}
                onSymbolToggle={toggleSymbol}
                onClearFilters={clearFilters}
                onCountryHover={handleListCountryHover}
                onCountryClick={handleCountryClick}
              />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle className="hover:bg-indigo-500/50 transition-colors" />
          <ResizablePanel>
            <div className="map-pane relative h-full w-full">
              <Suspense fallback={<MapSkeleton />}>
                <MapView
                  filterCodes={filterCodes}
                  hoveredCountryCode={hoveredCountryCode}
                  hoverSource={hoverSource}
                  selectedCountry={selectedCountry}
                  selectSource={selectSource}
                  theme={theme}
                  onCountryHover={handleMapCountryHover}
                  onCountryClick={handleCountryClick}
                  onEmptyClick={() => setTappedCountryCode(null)}
                />
              </Suspense>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      )}

      {/* Hover Label - desktop: follow mouse, mobile: tap position */}
      {!isMobile && hoveredCountry && hoverSource === 'map' && (
        <MapHoverLabel
          country={hoveredCountry}
          position={mousePosition}
          currentLang={currentLang}
          isRTL={isRTL(currentLang)}
          sidebarWidth={sidebarWidth}
        />
      )}

      {/* Tap Label - mobile only */}
      {isMobile && tappedCountry && (
        <MapHoverLabel
          country={tappedCountry}
          position={tapPosition}
          currentLang={currentLang}
          isMobile
          onClose={() => setTappedCountryCode(null)}
        />
      )}
    </div>
  );
}
