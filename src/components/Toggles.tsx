import { useState, useRef, useEffect } from 'react';
import { Globe, Briefcase, ChevronDown, Check, Terminal, Code2, Database, Layers, Cpu, Sparkles } from 'lucide-react';
import type { Language, TrackType } from '../types';

interface LanguageToggleProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export function LanguageToggle({ language, setLanguage }: LanguageToggleProps) {
  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'es', label: 'ES', flag: '🇪🇸' },
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'pt', label: 'PT', flag: '🇧🇷' },
  ];

  return (
    <div className="flex items-center gap-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full p-1 shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="pl-2 pr-1 text-slate-400 dark:text-slate-500">
        <Globe className="w-3.5 h-3.5" />
      </div>
      {languages.map((l) => (
        <button
          key={l.code}
          onClick={() => setLanguage(l.code)}
          className={`text-xs font-semibold px-2 py-1 rounded-full transition-all cursor-pointer ${
            language === l.code
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50'
          }`}
          title={`${l.flag} ${l.label}`}
        >
          <span>{l.label}</span>
        </button>
      ))}
    </div>
  );
}

interface TrackToggleProps {
  track: TrackType;
  setTrack: (track: TrackType) => void;
  language?: Language;
}

export interface ProfileDefinition {
  value: TrackType;
  title: { es: string; en: string; pt?: string };
  shortLabel: string;
  badge: string;
  description: { es: string; en: string; pt?: string };
  icon: typeof Briefcase;
}

export const PROFILE_DEFINITIONS: ProfileDefinition[] = [
  {
    value: 'combined',
    title: {
      es: 'Combinado: Senior SDET & Full Stack',
      en: 'Combined: Senior SDET & Full Stack',
      pt: 'Combinado: SDET Sênior & Full Stack'
    },
    shortLabel: 'Combinado',
    badge: '15+ Yrs',
    description: {
      es: 'Visión holística de 15+ años integrando desarrollo full-stack, arquitectura SDET y liderazgo técnico.',
      en: 'Comprehensive 15+ years background combining full-stack engineering, SDET architecture and tech leadership.',
      pt: 'Visão holística de 15+ anos integrando desenvolvimento full-stack, arquitetura SDET e liderança técnica.'
    },
    icon: Sparkles
  },
  {
    value: 'sdet',
    title: {
      es: 'SDET (Software Development Engineer in Test)',
      en: 'SDET (Software Dev Engineer in Test)',
      pt: 'SDET (Engenheiro de Testes de Software)'
    },
    shortLabel: 'SDET',
    badge: 'Automation Core',
    description: {
      es: 'Arquitectura de automatización de pruebas, Playwright, Selenium, Robot Framework, CI/CD y Testing con IA.',
      en: 'Test automation architecture, Playwright, Selenium, Robot Framework, CI/CD gates and AI testing.',
      pt: 'Arquitetura de automação de testes, Playwright, Selenium, Robot Framework, CI/CD e testes com IA.'
    },
    icon: Terminal
  },
  {
    value: 'qa',
    title: {
      es: 'QA Specialist & Quality Assurance Lead',
      en: 'QA Specialist & Quality Assurance Lead',
      pt: 'Especialista em QA & Liderança de Qualidade'
    },
    shortLabel: 'QA Lead',
    badge: 'ISTQB v4.0',
    description: {
      es: 'Estrategia de calidad integral, certificación ISTQB CTFL v4.0, testing funcional, regresión y performance.',
      en: 'End-to-end quality strategy, ISTQB CTFL v4.0 certified, functional, regression, API and load validation.',
      pt: 'Estratégia de qualidade abrangente, certificado ISTQB CTFL v4.0, testes funcionais e regressivos.'
    },
    icon: Layers
  },
  {
    value: 'fullstack',
    title: {
      es: 'Desarrollador Senior Full Stack',
      en: 'Senior Full Stack Developer',
      pt: 'Desenvolvedor Full Stack Sênior'
    },
    shortLabel: 'Full Stack',
    badge: 'React · .NET',
    description: {
      es: 'Desarrollo de aplicaciones de punta a punta: React, TypeScript, Tailwind, .NET Core y despliegue cloud.',
      en: 'End-to-end web applications: modern React, TypeScript, Tailwind, .NET Core backends and cloud delivery.',
      pt: 'Aplicações web ponta a ponta: React, TypeScript, Tailwind, .NET Core e nuvem.'
    },
    icon: Code2
  },
  {
    value: 'backend',
    title: {
      es: 'Desarrollador Senior Backend & APIs',
      en: 'Senior Backend & API Engineer',
      pt: 'Desenvolvedor Backend Sênior & APIs'
    },
    shortLabel: 'Backend',
    badge: '.NET · Java · SQL',
    description: {
      es: 'Microservicios, APIs REST seguras, .NET 9, Java Spring Boot, PostgreSQL, SQL Server, Redis y Docker.',
      en: 'Microservices, secure RESTful APIs, .NET 9, Java Spring Boot, PostgreSQL, SQL Server, Redis and Docker.',
      pt: 'Microsserviços, APIs REST seguras, .NET 9, Java Spring Boot, PostgreSQL, Redis e Docker.'
    },
    icon: Database
  },
  {
    value: 'dev',
    title: {
      es: 'Ingeniero de Software Senior (Dev)',
      en: 'Senior Software Developer (Dev)',
      pt: 'Engenheiro de Software Sênior (Dev)'
    },
    shortLabel: 'Software Dev',
    badge: 'Architecture',
    description: {
      es: 'Diseño de software corporativo, Clean Architecture, principios SOLID, optimización de algoritmos y DevOps.',
      en: 'Enterprise software architecture, Clean Architecture, SOLID design principles, algorithmic optimization.',
      pt: 'Arquitetura de software corporativo, Clean Architecture, princípios SOLID e DevOps.'
    },
    icon: Cpu
  },
];

export function TrackToggle({ track, setTrack, language = 'es' }: TrackToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeDef = PROFILE_DEFINITIONS.find((p) => p.value === track) || PROFILE_DEFINITIONS[0];
  const ActiveIcon = activeDef.icon;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-xs border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 cursor-pointer"
        title="Cambiar perfil profesional"
      >
        <div className="p-1 rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
          <ActiveIcon className="w-3.5 h-3.5" />
        </div>
        <div className="flex flex-col items-start text-left">
          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 leading-none">
            {language === 'es' ? 'Perfil Activo' : language === 'pt' ? 'Perfil Ativo' : 'Active Profile'}
          </span>
          <span className="font-bold text-slate-900 dark:text-white leading-tight">
            {activeDef.shortLabel}
          </span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ml-1 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-80 sm:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 z-50 divide-y divide-slate-100 dark:divide-slate-700/60 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {language === 'es' ? 'Selecciona un Enfoque de Perfil' : 'Select a Track Profile Focus'}
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              {language === 'es'
                ? 'El resumen profesional, título, skills y certificaciones destacadas se adaptan en tiempo real.'
                : 'Summary, title, core skills and featured accreditations adapt dynamically in real-time.'}
            </p>
          </div>

          <div className="py-1.5 space-y-1 max-h-96 overflow-y-auto">
            {PROFILE_DEFINITIONS.map((p) => {
              const Icon = p.icon;
              const isSelected = track === p.value;
              const titleText = p.title[language] || p.title.es;
              const descText = p.description[language] || p.description.es;

              return (
                <button
                  key={p.value}
                  onClick={() => {
                    setTrack(p.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 border border-transparent'
                  }`}
                >
                  <div className={`p-2 rounded-lg flex-shrink-0 mt-0.5 ${
                    isSelected 
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className={`text-xs font-bold truncate ${
                        isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-slate-900 dark:text-white'
                      }`}>
                        {titleText}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200/70 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        {p.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight">
                      {descText}
                    </p>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
