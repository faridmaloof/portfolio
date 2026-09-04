import { Award, Languages, ChevronDown, ChevronUp } from 'lucide-react';
import type { ProfileData, Language } from '../types';
import { useProfile } from '../context/ProfileContext';

interface ExtrasSectionProps {
  data: ProfileData;
  language: Language;
}

export function ExtrasSection({ data, language }: ExtrasSectionProps) {
  const { showAllCertifications, setShowAllCertifications } = useProfile();
  
  // Show only first 5 certifications by default
  const certifications = data.certifications[language];
  const certificationsToShow = showAllCertifications 
    ? certifications 
    : certifications.slice(0, 5);
  const hasMoreCertifications = certifications.length > 5;
  
  const languagesList = data.languages[language];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Certifications */}
      <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              {data.labels[language].certifications}
            </h2>
          </div>
        </div>

        <ul className="space-y-3">
          {certificationsToShow.map((cert, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
              <span>{cert}</span>
            </li>
          ))}
        </ul>

        {/* Show More / Show Less Button */}
        {hasMoreCertifications && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowAllCertifications(!showAllCertifications)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-md transition-all text-sm font-medium"
            >
              {showAllCertifications ? (
                <>
                  <span>{language === 'es' ? 'Ver menos' : 'Show less'}</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>{language === 'es' ? 'Ver más certificaciones' : 'View more certifications'}</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </section>

      {/* Languages */}
      <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 lg:p-8">
        <div className="flex items-center gap-2 mb-6">
          <Languages className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
            {data.labels[language].languages}
          </h2>
        </div>

        <div className="space-y-4">
          {languagesList.map((lang, index) => {
            // Parse language string to extract name and proficiency
            const parts = lang.split('—').map(s => s.trim());
            const languageName = parts[0] || lang;
            const proficiency = parts[1] || '';
            
            // Map proficiency to progress percentage
            const getProgress = (prof: string) => {
              if (prof.toLowerCase().includes('native') || prof.toLowerCase().includes('bilingüe')) return 100;
              if (prof.toLowerCase().includes('professional') || prof.toLowerCase().includes('profesional')) return 80;
              if (prof.toLowerCase().includes('intermediate') || prof.toLowerCase().includes('intermedio')) return 60;
              if (prof.toLowerCase().includes('basic') || prof.toLowerCase().includes('básico')) return 40;
              return 50;
            };
            
            const progress = proficiency ? getProgress(proficiency) : 50;

            return (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{languageName}</span>
                  {proficiency && (
                    <span className="text-xs text-slate-500 dark:text-slate-400">{proficiency}</span>
                  )}
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
