import { GraduationCap, Calendar, Award, Building2 } from 'lucide-react';
import type { ProfileData, Language, EducationItem } from '../types';
import { useProfile } from '../context/ProfileContext';

interface EducationSectionProps {
  data: ProfileData;
  language: Language;
}

export function EducationSection({ data, language }: EducationSectionProps) {
  const { showCompletedEducation, setShowCompletedEducation } = useProfile();
  const label = data.labels[language]?.education || data.labels.es?.education || data.labels.en?.education || 'Educación';
  const educationItems: EducationItem[] = (data.education[language] || data.education.es || data.education.en || []) as EducationItem[];
  
  // Filter education based on toggle
  const filteredEducation = educationItems.filter((item) => {
    const tuple = item[language] || item.es || item.en;
    if (!tuple) return false;
    const dates = tuple[2] || '';
    const parts = dates.split('–');
    const endDate = parts[1]?.trim().toLowerCase() || '';
    const isCompleted = !endDate.includes('present') && !endDate.includes('presente');
    return showCompletedEducation ? true : isCompleted;
  });

  return (
    <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              {label}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'es' ? 'Formación universitaria y posgrados especializados' : 'University degrees and specialized postgraduate programs'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowCompletedEducation(!showCompletedEducation)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            showCompletedEducation 
              ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' 
              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
          }`}
        >
          {language === 'es' ? (showCompletedEducation ? 'Filtrar completadas' : 'Mostrar todas') : (showCompletedEducation ? 'Show completed only' : 'Show all')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEducation.map((item, index) => {
          const tuple = item[language] || item.es || item.en;
          if (!tuple) return null;
          const institution = tuple[0] || '';
          const degree = tuple[1] || '';
          const dates = tuple[2] || '';
          const gpa = tuple[3] || '';

          const isPostgrad = degree.toLowerCase().includes('especialización') || degree.toLowerCase().includes('specialization');

          return (
            <div
              key={index}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                isPostgrad 
                  ? 'bg-gradient-to-br from-blue-50/50 to-purple-50/30 dark:from-slate-700/60 dark:to-slate-800/80 border-blue-200 dark:border-blue-900/50 shadow-sm' 
                  : 'bg-slate-50 dark:bg-slate-700/30 border-slate-200 dark:border-slate-600/60 hover:border-slate-300 dark:hover:border-slate-500'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                    {degree}
                  </h3>
                  {isPostgrad && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-600 text-white flex-shrink-0">
                      Postgraduate
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 mb-3">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>{institution}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-600/60 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400">
                  <Calendar className="w-3 h-3" />
                  {dates}
                </span>
                {gpa && (
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded text-[11px]">
                    <Award className="w-3 h-3" />
                    {gpa}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
