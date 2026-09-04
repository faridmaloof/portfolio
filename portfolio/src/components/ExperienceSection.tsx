import { ProfileData, Language, TrackType } from '../types';
import { getLocalizedRole, getLocalizedDetail, formatExperienceDates } from '../lib/utils';

interface ExperienceSectionProps {
  data: ProfileData;
  language: Language;
  track: TrackType;
}

export function ExperienceSection({ data, language, track }: ExperienceSectionProps) {
  const label = data.labels[language].experience;

  return (
    <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 lg:p-8">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 uppercase tracking-wider">
        {label}
      </h2>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-transparent"></div>

        <div className="space-y-8">
          {data.experience.map((exp, index) => {
            const role = getLocalizedRole(exp.role, track, language);
            const details = getLocalizedDetail(exp.detail, track, language);
            const dates = formatExperienceDates(exp.dates, language);

            return (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-6 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-4 border-white dark:border-slate-800 shadow-lg z-10"></div>

                {/* Content */}
                <div className={`flex-1 ml-8 md:ml-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                  <div className="group">
                    <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full mb-2">
                      {dates}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {role}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium mb-2">
                      {exp.company}
                      {exp.location && <span className="text-slate-400 dark:text-slate-500"> · {exp.location}</span>}
                    </p>
                    <ul className={`space-y-2 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      {details.map((detail, i) => (
                        <li
                          key={i}
                          className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed list-none"
                        >
                          • {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Early Career */}
      {data.earlyCareer.items[language].length > 0 && (
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">
            {data.earlyCareer.heading[language]}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.earlyCareer.items[language].map((item, index) => (
              <div
                key={index}
                className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
              >
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                  {item[0]}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">{item[1]}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mb-2">{item[2]}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item[3]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
