import { persistentAtom } from '@nanostores/persistent';

export type Theme = 'light' | 'dark';

export const $theme = persistentAtom<Theme>('theme', 'light');

export function toggleTheme() {
  const current = $theme.get();
  const next = current === 'light' ? 'dark' : 'light';
  $theme.set(next);
  document.documentElement.classList.toggle('dark', next === 'dark');
}
