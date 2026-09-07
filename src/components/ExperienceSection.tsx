import { Briefcase, Calendar, MapPin, Building, ChevronDown, ChevronUp, Globe, Laptop } from 'lucide-react';
import type { ProfileData, Language, TrackType } from '../types';
import { getLocalizedRole, getLocalizedDetail, formatExperienceDates, formatModality, getLocalizedText } from '../lib/utils';
import { useProfile } from '../context/ProfileContext';

interface ExperienceSectionProps {
  data: ProfileData;
  language: Language;
  track: TrackType;
}

export function ExperienceSection({ data, language, track }: ExperienceSectionProps) {
  const { showAllExperience, setShowAllExperience } = useProfile();
  const label = data.labels[language]?.experience || data.labels.es?.experience || data.labels.en?.experience || 'Experiencia Laboral';
  
  // Show only last 5 experiences by default
  const experiencesToShow = showAllExperience 
    ? data.experience 
    : data.experience.slice(0, 5);
  
  const hasMoreExperiences = data.experience.length > 5;
  const earlyCareerItems = data.earlyCareer?.items?.[language] || data.earlyCareer?.items?.es || data.earlyCareer?.items?.en || [];

  return (
    <section className="bg-white dark:bg-slate-800/90 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/80 p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-slate-700/60">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {label}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'es' ? 'Trayectoria comprobada en entornos corporativos de alta escala' : 'Proven career impact in enterprise distributed environments'}
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
          15+ {language === 'es' ? 'Años en la Industria' : 'Years Experience'}
        </span>
      </div>

      {/* Modern Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 dark:border-slate-700 space-y-10">
        {experiencesToShow.map((exp, index) => {
          const role = getLocalizedRole(exp.role, track, language);
          const details = getLocalizedDetail(exp.detail, track, language);
          const dates = formatExperienceDates(exp.dates, language);

          return (
            <div key={index} className="relative group">
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-3 border-blue-600 dark:border-blue-400 shadow-sm transition-transform duration-300 group-hover:scale-125"></div>

              {/* Card Container */}
              <div className="p-5 sm:p-6 bg-slate-50/70 dark:bg-slate-750 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-400 dark:hover:border-blue-500/70 transition-all shadow-xs hover:shadow-md">
                
                {/* Header Row: Role & Dates */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {role}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-100/70 dark:bg-blue-900/40 px-3 py-1 rounded-full w-fit">
                    <Calendar className="w-3.5 h-3.5" />
                    {dates}
                  </span>
                </div>

                {/* Company & Location Badges */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-300 mb-2 pb-3 border-b border-slate-200/60 dark:border-slate-700/60">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>{exp.company}</span>
                  </div>
                  {exp.modality && (
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      exp.modality === 'remote'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        : exp.modality === 'hybrid'
                        ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}>
                      {exp.modality === 'remote' && <Globe className="w-3 h-3" />}
                      {exp.modality === 'hybrid' && <Laptop className="w-3 h-3" />}
                      {exp.modality === 'onsite' && <Building className="w-3 h-3" />}
                      <span>{formatModality(exp.modality, language)}</span>
                    </span>
                  )}
                  {exp.location && (
                    <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location}</span>
                    </div>
                  )}
                </div>

                {/* Company Profile Description */}
                {exp.companyDescription && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic mb-3.5 leading-relaxed">
                    {getLocalizedText(exp.companyDescription, language)}
                  </p>
                )}

                {/* Achievements List */}
                <ul className="space-y-2">
                  {details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies / Stack Chips */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 mt-3.5 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">
                      {language === 'es' ? 'Stack:' : 'Tech:'}
                    </span>
                    {exp.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/70 dark:border-blue-800/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Show More / Show Less Button */}
      {hasMoreExperiences && (
        <div className="mt-8 pt-4 flex justify-center">
          <button
            onClick={() => setShowAllExperience(!showAllExperience)}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            {showAllExperience ? (
              <>
                <span>{language === 'es' ? 'Ver menos experiencia' : 'Show less experience'}</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>{language === 'es' ? 'Ver trayectoria completa' : 'View full experience history'}</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}

      {/* Early Career Grid */}
      {earlyCareerItems.length > 0 && (
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
            {data.earlyCareer?.heading?.[language] || data.earlyCareer?.heading?.es || 'Trayectoria Temprana'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {earlyCareerItems.map((item, index) => {
              const tuple = (item as any)[language] || item.es || item.en;
              if (!tuple) return null;
              return (
                <div
                  key={index}
                  className="p-3.5 bg-slate-50 dark:bg-slate-750 rounded-xl border border-slate-200/70 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                >
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm mb-1">
                    {tuple[0]}
                  </h4>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1.5">{tuple[1]}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">{tuple[3]}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
