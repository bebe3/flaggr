import { useState, useCallback, useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';

function getThemeFromDOM(): Theme {
  if (typeof document !== 'undefined') {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  }
  return 'light';
}

export function useTheme() {
  const theme = useSyncExternalStore(
    () => () => {},
    getThemeFromDOM,
    () => 'light' as Theme
  );

  const [, forceUpdate] = useState(0);

  const toggleTheme = useCallback(() => {
    const current = document.documentElement.classList.contains('dark');
    const next = current ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    forceUpdate((n) => n + 1);
  }, []);

  return { theme, toggleTheme };
}
