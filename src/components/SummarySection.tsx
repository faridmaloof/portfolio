import { Sparkles, Terminal, Code2, Database, Cloud, Cpu, Layers } from 'lucide-react';
import type { ProfileData, Language, TrackType } from '../types';
import { getLocalizedSummary, getLocalizedTitle, getLocalizedSkills } from '../lib/utils';

interface SummarySectionProps {
  data: ProfileData;
  language: Language;
  track: TrackType;
}

export function SummarySection({ data, language, track }: SummarySectionProps) {
  const summary = getLocalizedSummary(data.summary, track, language);
  const title = getLocalizedTitle(data.titles, track, language);
  const skills = getLocalizedSkills(data.skills, track, language);
  const label = data.labels[language]?.skills || data.labels.es?.skills || data.labels.en?.skills || 'Habilidades';

  const getCategoryIcon = (category: string) => {
    const catLower = category.toLowerCase();
    if (catLower.includes('automatización') || catLower.includes('automation') || catLower.includes('qa') || catLower.includes('testing')) {
      return <Terminal className="w-4 h-4 text-emerald-500" />;
    }
    if (catLower.includes('lenguaje') || catLower.includes('language') || catLower.includes('backend') || catLower.includes('desarrollo')) {
      return <Code2 className="w-4 h-4 text-blue-500" />;
    }
    if (catLower.includes('base') || catLower.includes('database') || catLower.includes('sql') || catLower.includes('datos')) {
      return <Database className="w-4 h-4 text-amber-500" />;
    }
    if (catLower.includes('cloud') || catLower.includes('devops') || catLower.includes('ci') || catLower.includes('cd')) {
      return <Cloud className="w-4 h-4 text-purple-500" />;
    }
    if (catLower.includes('arquitectura') || catLower.includes('architecture') || catLower.includes('api') || catLower.includes('patron')) {
      return <Layers className="w-4 h-4 text-indigo-500" />;
    }
    return <Cpu className="w-4 h-4 text-cyan-500" />;
  };

  return (
    <section className="bg-white dark:bg-slate-800/90 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/80 p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
      {/* Decorative subtle ambient gradient in corner */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Professional Title & Summary */}
      <div className="mb-8 relative z-10">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
          <Sparkles className="w-4 h-4" />
          <span>{data.labels[language]?.summary || data.labels.es?.summary || data.labels.en?.summary || 'Resumen'}</span>
        </div>
        
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
          {title}
        </h2>
        
        <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-600/60">
          <p className="text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
            {summary}
          </p>
        </div>
      </div>

      {/* Skills Matrix */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
            {label}
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Stack Verificado
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map(([category, tech], index) => {
            // Split technologies by comma to render individual pills
            const techList = tech.split(',').map(t => t.trim()).filter(Boolean);

            return (
              <div
                key={index}
                className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-700/40 border border-slate-200/80 dark:border-slate-600/80 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="p-1.5 rounded-lg bg-white dark:bg-slate-800 shadow-xs border border-slate-200/60 dark:border-slate-700">
                      {getCategoryIcon(category)}
                    </div>
                    <h4 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {category}
                    </h4>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {techList.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs hover:border-blue-400 dark:hover:border-blue-400 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
