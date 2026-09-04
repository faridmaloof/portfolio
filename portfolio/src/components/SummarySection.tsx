import { ProfileData, Language, TrackType } from '../types';
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
  const label = data.labels[language].skills;

  return (
    <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 lg:p-8">
      {/* Professional Title */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
          {title}
        </h2>
      </div>

      {/* Summary */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
          {data.labels[language].summary}
        </h3>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          {summary}
        </p>
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
          {label}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map(([category, tech], index) => (
            <div key={index} className="group">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {category}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {tech}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
