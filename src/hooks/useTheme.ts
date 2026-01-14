import { useStore } from '@nanostores/react';
import { $theme, toggleTheme, type Theme } from '@/stores/theme';

export type { Theme };

export function useTheme() {
  const theme = useStore($theme);

  return { theme, toggleTheme };
}
