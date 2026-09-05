import { useState, useMemo } from 'react';
import { Search, X, Award, ExternalLink, Filter, CheckCircle2, ShieldCheck } from 'lucide-react';
import type { Language, TrackType } from '../types';
import { allCertificationsList } from '../data/certificationsData';

interface CertificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  track?: TrackType;
}

export function CertificationsModal({ isOpen, onClose, language, track: _track = 'combined' }: CertificationsModalProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: language === 'es' ? 'Todas' : 'All' },
    { id: 'qa', label: language === 'es' ? 'QA & Automatización' : 'QA & Automation' },
    { id: 'dev', label: language === 'es' ? 'Desarrollo & APIs' : 'Development & APIs' },
    { id: 'cloud', label: language === 'es' ? 'Cloud & DevOps' : 'Cloud & DevOps' },
    { id: 'database', label: language === 'es' ? 'Bases de Datos & SQL' : 'Databases & SQL' },
    { id: 'agile', label: language === 'es' ? 'Agile & Scrum' : 'Agile & Scrum' },
    { id: 'ai', label: language === 'es' ? 'Inteligencia Artificial' : 'Artificial Intelligence' },
    { id: 'security', label: language === 'es' ? 'Seguridad' : 'Security' },
    { id: 'management', label: language === 'es' ? 'Gestión PMI' : 'PMI & Management' },
  ];

  const filteredCertifications = useMemo(() => {
    return allCertificationsList.filter((cert) => {
      const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory;
      const q = search.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        cert.title.toLowerCase().includes(q) ||
        cert.issuer.toLowerCase().includes(q) ||
        (cert.credentialId && cert.credentialId.toLowerCase().includes(q)) ||
        (cert.skills && cert.skills.some(s => s.toLowerCase().includes(q)));
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  if (!isOpen) return null;

  const getIssuerBadge = (issuer: string) => {
    if (issuer.includes('Brightest') || issuer.includes('ISTQB')) {
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700';
    }
    if (issuer.includes('HackerRank')) {
      return 'bg-green-100 text-green-800 dark:bg-green-950/60 dark:text-green-300 border-green-300 dark:border-green-700';
    }
    if (issuer.includes('AWS') || issuer.includes('Amazon')) {
      return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-700';
    }
    if (issuer.includes('Google')) {
      return 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border-red-300 dark:border-red-700';
    }
    if (issuer.includes('CertiProf')) {
      return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700';
    }
    if (issuer.includes('Applitools')) {
      return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300 border-cyan-300 dark:border-cyan-700';
    }
    if (issuer.includes('Coursera')) {
      return 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300 dark:border-blue-700';
    }
    if (issuer.includes('Udemy')) {
      return 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-300 dark:border-purple-700';
    }
    return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-md">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {language === 'es' ? 'Licencias y Certificaciones Profesionales' : 'Professional Licenses & Certifications'}
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {allCertificationsList.length}+ {language === 'es' ? 'Verificadas' : 'Verified'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {language === 'es'
                  ? 'Acreditaciones técnicas en Automatización QA, Desarrollo Full Stack, Cloud, Datos y Metodologías Ágiles'
                  : 'Technical credentials across QA Automation, Full Stack Engineering, Cloud, Databases and Agile'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={language === 'es' ? 'Buscar por tecnología, emisor (ISTQB, AWS, Playwright, .NET, Google)...' : 'Search by technology, issuer (ISTQB, AWS, Playwright, .NET, Google)...'}
                className="w-full pl-10 pr-9 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
              />
              {search && (
                <button 
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
              {filteredCertifications.length} {language === 'es' ? 'resultados' : 'results'}
            </span>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mr-1" />
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                    active
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Body / Certifications List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-slate-50/50 dark:bg-slate-900/50">
          {filteredCertifications.length === 0 ? (
            <div className="text-center py-16">
              <Award className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300">
                {language === 'es' ? 'No se encontraron certificaciones' : 'No certifications found'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {language === 'es' ? 'Prueba con otro término de búsqueda o categoría.' : 'Try a different search term or category.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredCertifications.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white leading-snug line-clamp-2">
                        {cert.title}
                      </h4>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-medium border flex-shrink-0 ${getIssuerBadge(cert.issuer)}`}>
                        {cert.issuer}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-2">
                      <span>{cert.date}</span>
                      {cert.credentialId && (
                        <span className="font-mono text-[11px] bg-slate-100 dark:bg-slate-700/60 px-1.5 py-0.5 rounded truncate max-w-[200px]" title={cert.credentialId}>
                          ID: {cert.credentialId}
                        </span>
                      )}
                    </div>

                    {cert.skills && cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {cert.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="inline-block px-1.5 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {cert.url ? (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 pt-2 border-t border-slate-100 dark:border-slate-700/60"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{language === 'es' ? 'Mostrar credencial oficial' : 'Show official credential'}</span>
                      <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
                    </a>
                  ) : (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-1 text-[11px] text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                      <span>{language === 'es' ? 'Acreditación verificada' : 'Verified credential'}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span>
              {language === 'es' ? 'Credenciales profesionales validadas en plataformas oficiales' : 'Professional credentials validated across official platforms'}
            </span>
            <a
              href="https://www.linkedin.com/in/fmaloofs/details/certifications/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <span>{language === 'es' ? 'Ver en LinkedIn' : 'View on LinkedIn'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://www.linkedin.com/in/fmaloofs/details/certifications/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 rounded-lg font-medium transition-colors inline-flex items-center gap-1"
            >
              <span>LinkedIn Certs</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-lg font-medium transition-colors"
            >
              {language === 'es' ? 'Cerrar' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
