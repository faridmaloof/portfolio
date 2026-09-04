import { ProfileData, Language } from '../types';

interface EducationSectionProps {
  data: ProfileData;
  language: Language;
}

export function EducationSection({ data, language }: EducationSectionProps) {
  const label = data.labels[language].education;
  const educationItems = data.education[language];

  return (
    <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 lg:p-8">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 uppercase tracking-wider">
        {label}
      </h2>

      <div className="space-y-4">
        {educationItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {item[1]}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {item[0]}
              </p>
            </div>
            <div className="mt-2 sm:mt-0 sm:text-right">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {item[2]}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500">
                {item[3]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
