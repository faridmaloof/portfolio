import type { LanguageConfig } from '../../types';
import { getLanguages } from '../../lib/db';
import { Globe } from 'lucide-react';

interface LanguageTabSelectorProps {
  activeLang: string;
  onSelectLang: (langCode: string) => void;
  languages?: LanguageConfig[];
  label?: string;
  className?: string;
}

export function LanguageTabSelector({
  activeLang,
  onSelectLang,
  languages,
  label = 'Idioma de edición:',
  className = ''
}: LanguageTabSelectorProps) {
  const activeLanguages = (languages || getLanguages()).filter(l => l.isActive);

  return (
    <div className={`flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 ${className}`}>
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
        <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
        <span>{label}</span>
      </div>

      <div className="flex flex-wrap items-center gap-1">
        {activeLanguages.map((lang) => {
          const isSelected = activeLang === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => onSelectLang(lang.code)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-sm scale-102'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              <span>{lang.flag || '🌐'}</span>
              <span className="uppercase">{lang.code}</span>
              <span className="text-[10px] opacity-80 hidden sm:inline">({lang.name})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
