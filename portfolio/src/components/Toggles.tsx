import { Globe, Briefcase } from 'lucide-react';
import type { Language, TrackType } from '../types';

interface LanguageToggleProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export function LanguageToggle({ language, setLanguage }: LanguageToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm border border-slate-200 dark:border-slate-700">
      <Globe className="w-4 h-4 text-slate-500" />
      <button
        onClick={() => setLanguage('es')}
        className={`text-sm font-medium transition-colors ${
          language === 'es'
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
        }`}
      >
        ES
      </button>
      <span className="text-slate-300 dark:text-slate-600">|</span>
      <button
        onClick={() => setLanguage('en')}
        className={`text-sm font-medium transition-colors ${
          language === 'en'
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
        }`}
      >
        EN
      </button>
    </div>
  );
}

interface TrackToggleProps {
  track: TrackType;
  setTrack: (track: TrackType) => void;
}

export function TrackToggle({ track, setTrack }: TrackToggleProps) {
  const tracks: { value: TrackType; label: string; icon: typeof Briefcase }[] = [
    { value: 'qa', label: 'QA/SDET', icon: Briefcase },
    { value: 'dev', label: 'Dev', icon: Briefcase },
  ];

  return (
    <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm border border-slate-200 dark:border-slate-700">
      <Briefcase className="w-4 h-4 text-slate-500" />
      {tracks.map((t) => (
        <button
          key={t.value}
          onClick={() => setTrack(t.value)}
          className={`text-sm font-medium transition-colors px-2 ${
            track === t.value
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
