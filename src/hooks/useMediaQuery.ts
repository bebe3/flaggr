import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

export function useIsMobile(): boolean {
  // Mobile layout for anything under 768px (md breakpoint)
  return useMediaQuery('(max-width: 767px)');
}

export function useIsDesktop(): boolean {
  // Desktop is 1280px and above (xl breakpoint)
  return useMediaQuery('(min-width: 1280px)');
}
