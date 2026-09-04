import type { ProfileData, Language, EducationItem } from '../types';
import { useProfile } from '../context/ProfileContext';

interface EducationSectionProps {
  data: ProfileData;
  language: Language;
}

export function EducationSection({ data, language }: EducationSectionProps) {
  const { showCompletedEducation, setShowCompletedEducation } = useProfile();
  const label = data.labels[language].education;
  const educationItems: EducationItem[] = data.education[language];
  
  // Filter education based on toggle - show only completed if toggle is off
  const filteredEducation = educationItems.filter((item) => {
    const tuple = item[language];
    const dates = tuple[2]; // Index 2 is the dates field in EducationTuple
    // Check if date range indicates completed (has end date that is not "Present"/"Presente")
    const parts = dates.split('–');
    const endDate = parts[1]?.trim().toLowerCase() || '';
    const isCompleted = !endDate.includes('present') && !endDate.includes('presente');
    return showCompletedEducation ? true : isCompleted;
  });

  return (
    <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
          {label}
        </h2>
        <button
          onClick={() => setShowCompletedEducation(!showCompletedEducation)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            showCompletedEducation 
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
          }`}
        >
          {language === 'es' ? 'Mostrar todas' : 'Show all'}
        </button>
      </div>

      <div className="space-y-4">
        {filteredEducation.map((item, index) => {
          const tuple = item[language];
          const institution = tuple[0];
          const degree = tuple[1];
          const dates = tuple[2];
          const gpa = tuple[3];
          
          return (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {degree}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {institution}
                </p>
              </div>
              <div className="mt-2 sm:mt-0 sm:text-right">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {dates}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  {gpa}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
