import { useState, useRef, useEffect } from 'react';
import { 
  FileText, 
  ChevronDown, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Columns, 
  Layers, 
  Loader2,
  Download
} from 'lucide-react';
import type { ProfileData, Language, TrackType, CVTemplateType } from '../types';
import { generatePDF } from '../lib/pdfGenerator';
import { useProfile } from '../context/ProfileContext';

interface CVDownloadDropdownProps {
  data: ProfileData;
  language: Language;
  track?: TrackType;
  className?: string;
}

interface TemplateOption {
  id: CVTemplateType;
  name: Record<Language, string>;
  subtitle: Record<Language, string>;
  icon: typeof Sparkles;
  badge?: Record<Language, string>;
  accentColor: string;
}

const TEMPLATE_OPTIONS: TemplateOption[] = [
  {
    id: 'executive',
    name: {
      es: 'Ejecutivo Tech Lead',
      en: 'Executive Tech Lead',
      pt: 'Executivo Tech Lead',
    },
    subtitle: {
      es: 'Banner corporativo, foto/monograma, 2 columnas de skills y diseño de alto impacto.',
      en: 'Corporate navy banner, photo/monogram, 2-column skills and high-impact layout.',
      pt: 'Banner corporativo, foto/monograma, 2 colunas de skills e design de alto impacto.',
    },
    icon: Sparkles,
    badge: {
      es: 'Popular',
      en: 'Popular',
      pt: 'Popular',
    },
    accentColor: 'from-blue-600 to-indigo-600',
  },
  {
    id: 'minimalist',
    name: {
      es: 'Minimalista (100% ATS)',
      en: 'Minimalist (100% ATS)',
      pt: 'Minimalista (100% ATS)',
    },
    subtitle: {
      es: 'Sin fotos ni gráficos. Estándar Stanford/Harvard optimizado para Workday y Lever.',
      en: 'No photos or graphics. Stanford/Harvard standard optimized for ATS scrapers.',
      pt: 'Sem fotos ou gráficos. Padrão Stanford/Harvard otimizado para Workday e Lever.',
    },
    icon: ShieldCheck,
    badge: {
      es: 'ATS Safe',
      en: 'ATS Safe',
      pt: 'ATS Safe',
    },
    accentColor: 'from-slate-700 to-slate-900',
  },
  {
    id: 'sidebar',
    name: {
      es: 'Swiss Sidebar (2 Columnas)',
      en: 'Swiss Sidebar (2 Columns)',
      pt: 'Swiss Sidebar (2 Colunas)',
    },
    subtitle: {
      es: 'Columna lateral dedicada (contacto, educación, certificaciones) y timeline central.',
      en: 'Dedicated side rail (contact, education, certs) and prominent central timeline.',
      pt: 'Coluna lateral dedicada (contato, educação, certificações) e timeline central.',
    },
    icon: Columns,
    badge: {
      es: 'Elegante',
      en: 'Sleek',
      pt: 'Elegante',
    },
    accentColor: 'from-indigo-600 to-purple-600',
  },
  {
    id: 'engineering',
    name: {
      es: 'Ingeniería QA & SDET',
      en: 'QA & SDET Engineering',
      pt: 'Engenharia QA & SDET',
    },
    subtitle: {
      es: 'Paleta esmeralda, sello ISTQB, especificación técnica de stacks y métricas de calidad.',
      en: 'Emerald palette, ISTQB badge, technical stack tagging and QA metrics.',
      pt: 'Paleta esmeralda, selo ISTQB, especificação técnica de stacks e métricas de qualidade.',
    },
    icon: Layers,
    badge: {
      es: 'Técnico',
      en: 'Technical',
      pt: 'Técnico',
    },
    accentColor: 'from-emerald-600 to-teal-600',
  },
  {
    id: 'compact',
    name: {
      es: 'Compacto Silicon Valley',
      en: 'Silicon Valley Compact',
      pt: 'Compacto Silicon Valley',
    },
    subtitle: {
      es: 'Alta densidad de información, 2 páginas estables, ideal para roles Senior y Startups.',
      en: 'High density, concise 2-page guarantee, ideal for Senior and Tech Startup roles.',
      pt: 'Alta densidade de informação, 2 páginas estáveis, ideal para perfis Sênior.',
    },
    icon: Download,
    badge: {
      es: '2 Páginas',
      en: '2 Pages',
      pt: '2 Páginas',
    },
    accentColor: 'from-amber-600 to-orange-600',
  },
];

export function CVDownloadDropdown({
  data,
  language,
  track = 'combined',
  className = '',
}: CVDownloadDropdownProps) {
  const { cvTemplate, setCvTemplate } = useProfile();
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleTriggerDownload = (targetTemplate: CVTemplateType) => {
    setCvTemplate(targetTemplate);
    setIsOpen(false);
    setIsGenerating(true);

    // Let the DOM update state before the synchronous PDF generation runs
    setTimeout(() => {
      try {
        generatePDF(data, language, track, targetTemplate);
      } catch (err) {
        console.error('Error al generar PDF:', err);
      } finally {
        setIsGenerating(false);
      }
    }, 60);
  };

  const activeOption = TEMPLATE_OPTIONS.find((t) => t.id === cvTemplate) || TEMPLATE_OPTIONS[0];

  const ctaLabel = {
    es: 'Descargar CV',
    en: 'Download CV',
    pt: 'Baixar CV',
  }[language];

  return (
    <div ref={dropdownRef} className={`relative inline-flex items-center ${className}`}>
      {/* Split Button Group */}
      <div className="inline-flex rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-blue-500/30 group">
        {/* Main Action Button */}
        <button
          type="button"
          onClick={() => handleTriggerDownload(cvTemplate)}
          disabled={isGenerating}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-semibold cursor-pointer active:scale-95 transition-all disabled:opacity-75 disabled:cursor-wait"
          title={`${ctaLabel} (${activeOption.name[language]})`}
          aria-label={`${ctaLabel} (${activeOption.name[language]})`}
        >
          {isGenerating ? (
            <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin text-white" />
          ) : (
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          )}
          <span className="hidden xs:inline">{ctaLabel}</span>
          <span className="xs:hidden">CV</span>
        </button>

        {/* Dropdown Toggle Chevron */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          disabled={isGenerating}
          className="px-1.5 sm:px-2 py-1.5 sm:py-2 bg-indigo-700 hover:bg-indigo-800 text-white border-l border-indigo-500/40 transition-colors cursor-pointer flex items-center justify-center"
          title={
            language === 'es'
              ? 'Elegir formato de CV (5 estilos disponibles)'
              : language === 'pt'
              ? 'Escolher formato do CV (5 estilos disponíveis)'
              : 'Choose CV template (5 styles available)'
          }
          aria-expanded={isOpen}
          aria-haspopup="menu"
        >
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-blue-200' : 'text-white'
            }`}
          />
        </button>
      </div>

      {/* Floating Dropdown Menu */}
      {isOpen && (
        <div 
          role="menu"
          className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 p-2 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl"
        >
          {/* Header */}
          <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800/80 mb-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {language === 'es'
                  ? 'Formatos de CV Profesionales'
                  : language === 'pt'
                  ? 'Formatos de CV Profissionais'
                  : 'Professional CV Formats'}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                5 Templates
              </span>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
              {language === 'es'
                ? 'Elige la distribución y estilo que mejor se adapte al reclutador o portal:'
                : language === 'pt'
                ? 'Escolha a distribuição que melhor se adapte ao recrutador ou portal:'
                : 'Pick the layout and style best fitted for the recruiter or ATS portal:'}
            </p>
          </div>

          {/* List of 5 Templates */}
          <div className="space-y-1">
            {TEMPLATE_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const isSelected = opt.id === cvTemplate;

              return (
                <button
                  key={opt.id}
                  role="menuitem"
                  type="button"
                  onClick={() => handleTriggerDownload(opt.id)}
                  className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 cursor-pointer group ${
                    isSelected
                      ? 'bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/80'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white bg-gradient-to-br ${opt.accentColor} shadow-sm group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Text details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 justify-between">
                      <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                        {opt.name[language]}
                      </span>
                      {opt.badge && (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex-shrink-0">
                          {opt.badge[language]}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 leading-tight">
                      {opt.subtitle[language]}
                    </p>
                  </div>

                  {/* Active Checkmark */}
                  {isSelected && (
                    <div className="flex-shrink-0 self-center text-blue-600 dark:text-blue-400">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 px-3 py-1 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
            <span>
              {language === 'es'
                ? 'Tip: Puedes usar ?cv=minimalista en el enlace'
                : language === 'pt'
                ? 'Dica: Você pode usar ?cv=minimalista no link'
                : 'Tip: You can use ?cv=minimalist in the URL'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
