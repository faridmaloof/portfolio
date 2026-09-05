import { Moon, Sun, Palette } from 'lucide-react';
import type { ThemeMode } from '../hooks/useDarkMode';

interface ThemeToggleProps {
  theme?: ThemeMode;
  setTheme?: (theme: ThemeMode) => void;
  isDark?: boolean;
  toggle?: () => void;
}

export function ThemeToggle({ theme = 'light', setTheme, isDark, toggle }: ThemeToggleProps) {
  // If setTheme is provided, show a 3-button segmented selector
  if (setTheme) {
    return (
      <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm" role="radiogroup" aria-label="Theme selector">
        <button
          type="button"
          onClick={() => setTheme('light')}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
            theme === 'light'
              ? 'bg-white text-amber-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
          title="Modo Claro"
        >
          <Sun className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Claro</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
            theme === 'dark'
              ? 'bg-slate-700 text-purple-300 shadow-sm'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
          title="Modo Oscuro"
        >
          <Moon className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Oscuro</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme('blue')}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
            theme === 'blue'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
          title="Modo Azul Navy"
        >
          <Palette className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Azul</span>
        </button>
      </div>
    );
  }

  // Fallback single-button cycler
  return (
    <button
      onClick={toggle}
      className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
      aria-label="Toggle theme"
      title="Cambiar tema (Claro / Oscuro / Azul)"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-slate-600" />
      )}
    </button>
  );
}
