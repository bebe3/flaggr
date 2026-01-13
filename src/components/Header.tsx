import { Moon, Sun, Info } from 'lucide-react';
import type { Language } from '@/types/country';
import { useTheme } from '@/hooks/useTheme';
import { Button } from './ui/button';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  currentLang?: Language;
  onLanguageChange?: (lang: Language) => void;
  showLanguageSwitcher?: boolean;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export default function Header({
  currentLang = 'en',
  onLanguageChange,
  showLanguageSwitcher = true,
  theme: themeProp,
  onToggleTheme,
}: HeaderProps) {
  const themeHook = useTheme();
  const theme = themeProp ?? themeHook.theme;
  const toggleTheme = onToggleTheme ?? themeHook.toggleTheme;

  return (
    <header
      dir="ltr"
      className="flex h-14 shrink-0 items-center justify-between bg-linear-to-r from-slate-100 to-slate-200 px-4 shadow-sm dark:from-slate-900 dark:to-slate-800 md:px-5"
    >
      <a
        href="/"
        className="bg-linear-to-r from-indigo-600 via-blue-500 to-indigo-400 bg-clip-text pb-1 text-2xl font-bold leading-relaxed text-transparent dark:from-indigo-400 dark:via-blue-400 dark:to-indigo-300"
      >
        Flaggr
      </a>
      <div className="flex items-center gap-2 md:gap-3">
        {showLanguageSwitcher && onLanguageChange && (
          <LanguageSwitcher currentLang={currentLang} onLanguageChange={onLanguageChange} />
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full text-slate-500 hover:bg-slate-200/70 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700/70 dark:hover:text-slate-200"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon className="size-5" /> : <Sun className="size-5" />}
        </Button>
        <a
          href="/about"
          className="inline-flex size-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-200/70 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700/70 dark:hover:text-slate-200"
          aria-label="About"
        >
          <Info className="size-5" />
        </a>
      </div>
    </header>
  );
}
