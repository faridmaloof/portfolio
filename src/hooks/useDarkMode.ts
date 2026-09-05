import { useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark' | 'blue';

export function useDarkMode() {
  const [theme, setThemeState] = useState<ThemeMode>('light');

  useEffect(() => {
    // Check stored preference or system preference on mount
    const storedTheme = localStorage.getItem('portfolio_theme') as ThemeMode | null;
    if (storedTheme && ['light', 'dark', 'blue'].includes(storedTheme)) {
      setThemeState(storedTheme);
    } else {
      const storedDark = localStorage.getItem('darkMode');
      if (storedDark !== null) {
        setThemeState(storedDark === 'true' ? 'dark' : 'light');
      } else {
        const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setThemeState(isSystemDark ? 'dark' : 'light');
      }
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'theme-blue');

    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'blue') {
      root.classList.add('dark', 'theme-blue');
    }

    localStorage.setItem('portfolio_theme', theme);
    localStorage.setItem('darkMode', String(theme !== 'light'));
  }, [theme]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const toggle = () => {
    setThemeState(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'blue';
      return 'light';
    });
  };

  return { 
    theme, 
    setTheme, 
    isDark: theme !== 'light', 
    toggle 
  };
}
