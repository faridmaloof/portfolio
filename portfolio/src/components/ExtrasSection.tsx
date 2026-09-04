import { Award, Languages } from 'lucide-react';
import { ProfileData, Language } from '../types';

interface ExtrasSectionProps {
  data: ProfileData;
  language: Language;
}

export function ExtrasSection({ data, language }: ExtrasSectionProps) {
  const certifications = data.certifications[language];
  const languages = data.languages[language];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Certifications */}
      <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 lg:p-8">
        <div className="flex items-center gap-2 mb-6">
          <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
            {data.labels[language].certifications}
          </h2>
        </div>

        <ul className="space-y-3">
          {certifications.map((cert, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
              <span>{cert}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Languages */}
      <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 lg:p-8">
        <div className="flex items-center gap-2 mb-6">
          <Languages className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
            {data.labels[language].languages}
          </h2>
        </div>

        <ul className="space-y-3">
          {languages.map((lang, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0"></span>
              <span>{lang}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
