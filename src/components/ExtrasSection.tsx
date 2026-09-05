import { useState } from 'react';
import { Award, Languages, ExternalLink, ShieldCheck, ChevronRight, CheckCircle2 } from 'lucide-react';
import type { ProfileData, Language, TrackType } from '../types';
import { getFeaturedCertifications, allCertificationsList } from '../data/certificationsData';
import { CertificationsModal } from './CertificationsModal';

interface ExtrasSectionProps {
  data: ProfileData;
  language: Language;
  track?: TrackType;
}

export function ExtrasSection({ data, language, track = 'combined' }: ExtrasSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Get featured certifications tailored to current track
  const featuredCerts = getFeaturedCertifications(track, 6);
  const languagesList = data.languages[language] || data.languages.es || data.languages.en || [];

  const getIssuerStyle = (issuer: string) => {
    if (issuer.includes('Brightest') || issuer.includes('ISTQB')) {
      return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
    }
    if (issuer.includes('HackerRank')) {
      return 'bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
    }
    if (issuer.includes('AWS') || issuer.includes('Amazon')) {
      return 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
    }
    if (issuer.includes('Google')) {
      return 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800';
    }
    if (issuer.includes('CertiProf')) {
      return 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
    }
    if (issuer.includes('Applitools')) {
      return 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800';
    }
    return 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Certifications Card (Span 2 cols on desktop) */}
        <section className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                    {data.labels[language]?.certifications || data.labels.es?.certifications || data.labels.en?.certifications || 'Certificaciones'}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {track === 'qa'
                      ? (language === 'es' ? 'Destacadas en Automatización, ISTQB & Pruebas con IA' : 'Featured in QA Automation, ISTQB & AI Testing')
                      : track === 'dev'
                      ? (language === 'es' ? 'Destacadas en .NET, React, APIs & Cloud' : 'Featured in .NET, React, APIs & Cloud')
                      : (language === 'es' ? 'Acreditaciones principales en Software & Calidad' : 'Core accreditations in Engineering & Quality')}
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{allCertificationsList.length}+ {language === 'es' ? 'Certificaciones' : 'Certifications'}</span>
              </span>
            </div>

            {/* Featured Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {featuredCerts.map((cert) => (
                <div
                  key={cert.id}
                  className="group relative p-3.5 bg-slate-50 dark:bg-slate-700/40 rounded-xl border border-slate-200/80 dark:border-slate-600/80 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-white dark:hover:bg-slate-700/80 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getIssuerStyle(cert.issuer)}`}>
                        {cert.issuer}
                      </span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-400">{cert.date}</span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {cert.title}
                    </h3>

                    {cert.skills && cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {cert.skills.slice(0, 2).map((s, idx) => (
                          <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-600 text-slate-700 dark:text-slate-300">
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-600/60 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>{language === 'es' ? 'Ver credencial' : 'View credential'}</span>
                      <ExternalLink className="w-2.5 h-2.5 ml-auto" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Button to Open All 120+ Certifications and LinkedIn Link */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
              {language === 'es'
                ? `Mostrando 6 destacadas para este perfil de ${allCertificationsList.length}+ acreditaciones oficiales.`
                : `Showing 6 top featured for this track out of ${allCertificationsList.length}+ accredited certifications.`}
            </p>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <a
                href="https://www.linkedin.com/in/fmaloofs/details/certifications/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 rounded-xl transition-all text-xs font-semibold cursor-pointer"
                title="Ver certificaciones en LinkedIn"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>LinkedIn Certs</span>
              </a>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all text-xs sm:text-sm font-semibold cursor-pointer active:scale-95"
              >
                <Award className="w-4 h-4" />
                <span>{language === 'es' ? `Explorador (${allCertificationsList.length}+)` : `Explorer (${allCertificationsList.length}+)`}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Languages Card (1 col on desktop) */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Languages className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                  {data.labels[language]?.languages || data.labels.es?.languages || data.labels.en?.languages || 'Idiomas'}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {language === 'es' ? 'Dominio idiomático profesional' : 'Professional language proficiency'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {languagesList.map((lang, index) => {
                const parts = lang.split('—').map(s => s.trim());
                const languageName = parts[0] || lang;
                const proficiency = parts[1] || '';
                const isNative = proficiency.toLowerCase().includes('native') || proficiency.toLowerCase().includes('nativo');
                const progress = isNative ? 100 : 85;

                return (
                  <div key={index} className="p-3.5 bg-slate-50 dark:bg-slate-700/40 rounded-xl border border-slate-200/80 dark:border-slate-600/80">
                    <div className="flex justify-between items-center mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{isNative ? '🇪🇸' : '🇺🇸'}</span>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">{languageName}</span>
                      </div>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                        {isNative ? (language === 'es' ? 'Nativo / Bilingüe' : 'Native / Bilingual') : 'C1 Professional'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                      {isNative 
                        ? (language === 'es' ? 'Lengua materna — fluidez total técnica y ejecutiva' : 'Native tongue — full executive & technical fluency')
                        : (language === 'es' ? 'Competencia laboral profesional — reuniones internacionales, documentación y liderazgo técnico' : 'Professional working proficiency — international client collaboration & technical leadership')}
                    </p>

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
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>{language === 'es' ? 'Preparado para equipos remotos globales' : 'Ready for global remote distributed teams'}</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">Remote Worldwide</span>
          </div>
        </section>
      </div>

      {/* Certifications Modal Explorer */}
      <CertificationsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        language={language}
        track={track}
      />
    </>
  );
}
