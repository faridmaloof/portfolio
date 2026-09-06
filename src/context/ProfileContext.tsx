import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { Language, TrackType } from '../types';
import { getSettings, getTrackConfig, getSystemVariables, type PortfolioSettings } from '../lib/db';

interface ProfileContextType {
  language: Language;
  track: TrackType;
  setLanguage: (lang: Language) => void;
  setTrack: (track: TrackType) => void;
  showAllExperience: boolean;
  setShowAllExperience: (show: boolean) => void;
  showAllCertifications: boolean;
  setShowAllCertifications: (show: boolean) => void;
  showCompletedEducation: boolean;
  setShowCompletedEducation: (show: boolean) => void;
  isValidProfile: boolean;
  refreshKey: number;
  settings: PortfolioSettings;
  reloadSettings: () => void;
  detectedBrowserLang: string;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

/**
 * Detect browser / OS language settings.
 * - If browser is Spanish (es, es-ES, es-CO, etc.) -> 'es'
 * - If browser is Portuguese (pt, pt-BR, pt-PT) -> 'pt'
 * - If browser is English (en, en-US, en-GB) -> 'en'
 * - If browser is any other country/language -> defaults to 'en' (international standard)
 * - Initial base default is 'es'
 */
export function detectBrowserLanguage(fallback: Language = 'es'): Language {
  try {
    const saved = localStorage.getItem('farid_maloof_lang');
    if (saved === 'es' || saved === 'en' || saved === 'pt') {
      return saved;
    }

    const browserLangs: string[] = [];
    if (typeof navigator !== 'undefined') {
      if (navigator.languages && navigator.languages.length > 0) {
        browserLangs.push(...navigator.languages);
      } else if (navigator.language) {
        browserLangs.push(navigator.language);
      }
    }

    if (browserLangs.length === 0) {
      return fallback;
    }

    for (const raw of browserLangs) {
      const code = raw.toLowerCase().trim();
      if (code.startsWith('es')) return 'es';
      if (code.startsWith('pt')) return 'pt';
      if (code.startsWith('en')) return 'en';
    }

    // Default to English if from another region (e.g. de, fr, it, zh, ja)
    return 'en';
  } catch {
    return fallback;
  }
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [settings, setSettingsState] = useState<PortfolioSettings>(() => getSettings());
  const [language, setLanguageState] = useState<Language>(() => settings.defaultLanguage || 'es');
  const [track, setTrackState] = useState<TrackType>(() => settings.defaultProfile || 'combined');
  const [isValidProfile, setIsValidProfile] = useState(true);
  const [showAllExperience, setShowAllExperience] = useState(false);
  const [showAllCertifications, setShowAllCertifications] = useState(false);
  const [showCompletedEducation, setShowCompletedEducation] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [detectedBrowserLang, setDetectedBrowserLang] = useState<string>('es');

  const reloadSettings = useCallback(() => {
    const updated = getSettings();
    setSettingsState(updated);
  }, []);

  // Update Dynamic SEO according to active track, language and custom settings
  const updateSEO = useCallback((activeTrack: TrackType, activeLang: Language, currentSettings: PortfolioSettings) => {
    let title = '';
    let description = '';
    let keywords = currentSettings.seo?.keywords || '';

    const customTrack = getTrackConfig(activeTrack);

    if (currentSettings.seo?.metaTitle) {
      title = currentSettings.seo.metaTitle;
    } else if (customTrack?.seoTitle?.[activeLang]) {
      title = customTrack.seoTitle[activeLang]!;
    } else {
      switch (activeTrack) {
        case 'sdet':
          title = activeLang === 'es'
            ? 'Farid Maloof | Senior SDET Lead & Arquitecto de Automatización de Pruebas'
            : activeLang === 'pt'
            ? 'Farid Maloof | Líder SDET Sênior & Arquiteto de Automação de Testes'
            : 'Farid Maloof | Senior SDET Lead & Test Automation Architect';
          break;
        case 'qa':
          title = activeLang === 'es'
            ? 'Farid Maloof | Especialista Senior en Automatización QA & Calidad de Software'
            : activeLang === 'pt'
            ? 'Farid Maloof | Especialista Sênior em Automação de QA & Qualidade de Software'
            : 'Farid Maloof | Senior QA Automation Specialist & Quality Lead';
          break;
        case 'backend':
          title = activeLang === 'es'
            ? 'Farid Maloof | Desarrollador Senior Backend (.NET 9 · Java Spring Boot · APIs REST)'
            : activeLang === 'pt'
            ? 'Farid Maloof | Desenvolvedor Backend Sênior (.NET 9 · Java Spring Boot · APIs REST)'
            : 'Farid Maloof | Senior Backend Engineer (.NET 9 · Java Spring Boot · REST APIs)';
          break;
        case 'fullstack':
          title = activeLang === 'es'
            ? 'Farid Maloof | Desarrollador Senior Full Stack (.NET · React · TypeScript · Cloud)'
            : activeLang === 'pt'
            ? 'Farid Maloof | Desenvolvedor Full Stack Sênior (.NET · React · TypeScript · Cloud)'
            : 'Farid Maloof | Senior Full Stack Developer (.NET · React · TypeScript · Cloud)';
          break;
        case 'dev':
          title = activeLang === 'es'
            ? 'Farid Maloof | Ingeniero de Software Senior (.NET · Java · Microservicios · Cloud)'
            : activeLang === 'pt'
            ? 'Farid Maloof | Engenheiro de Software Sênior (.NET · Java · Microsserviços · Cloud)'
            : 'Farid Maloof | Senior Software Engineer (.NET · Java · Microservices · Cloud)';
          break;
        case 'combined':
        default:
          title = activeLang === 'es'
            ? 'Farid Maloof Suarez | Ingeniero de Software Senior & SDET Architecture Lead (15+ Años)'
            : activeLang === 'pt'
            ? 'Farid Maloof Suarez | Engenheiro de Software Sênior & Líder de Arquitetura SDET'
            : 'Farid Maloof Suarez | Senior Software Engineer & SDET Architecture Lead (15+ Yrs)';
          break;
      }
    }

    if (currentSettings.seo?.metaDescription) {
      description = currentSettings.seo.metaDescription;
    } else if (customTrack?.seoDescription?.[activeLang]) {
      description = customTrack.seoDescription[activeLang]!;
    } else {
      switch (activeTrack) {
        case 'sdet':
          description = activeLang === 'es'
            ? 'Portafolio técnico de Farid Maloof Suarez. Senior SDET Lead con más de 15 años de experiencia. Arquitectura de pruebas, Playwright, Selenium, Robot Framework, CI/CD pipelines, automatización de APIs y testing con Inteligencia Artificial.'
            : activeLang === 'pt'
            ? 'Portfólio técnico de Farid Maloof Suarez. Líder SDET Sênior com mais de 15 anos de experiência em arquitetura de automação, Playwright, Selenium, Robot Framework e testes com IA.'
            : 'Technical Portfolio & ATS CV of Farid Maloof Suarez. Senior SDET Lead with 15+ years of experience in test automation architecture, Playwright, Selenium, Robot Framework, CI/CD gates, and AI testing.';
          break;
        case 'qa':
          description = activeLang === 'es'
            ? 'Portafolio profesional de Farid Maloof Suarez. Especialista en QA Automation certificado ISTQB CTFL v4.0. Estrategia de calidad, gestión de pruebas funcionales y regresivas, Cypress, Appium y pruebas de rendimiento.'
            : activeLang === 'pt'
            ? 'Portfólio profissional de Farid Maloof Suarez. Especialista em automação de QA certificado ISTQB CTFL v4.0, estratégias de testes funcionais e regressivos.'
            : 'Professional Portfolio of Farid Maloof Suarez. ISTQB CTFL v4.0 Certified QA Automation Specialist, quality strategy, functional/regression test suites, Cypress, Appium and performance.';
          break;
        case 'backend':
          description = activeLang === 'es'
            ? 'Portafolio técnico de Farid Maloof Suarez. Desarrollador Senior Backend enfocado en C# .NET 9, Java Spring Boot, arquitectura de microservicios, bases de datos PostgreSQL, SQL Server, Redis y Docker.'
            : activeLang === 'pt'
            ? 'Portfólio técnico de Farid Maloof Suarez. Desenvolvedor Backend Sênior com foco em .NET 9, Java Spring Boot, microsserviços, PostgreSQL e arquiteturas em nuvem.'
            : 'Technical Portfolio of Farid Maloof Suarez. Senior Backend Engineer specializing in .NET 9, C#, Java Spring Boot, microservices, PostgreSQL, SQL Server, Redis, and cloud containers.';
          break;
        case 'fullstack':
          description = activeLang === 'es'
            ? 'Portafolio técnico de Farid Maloof Suarez. Desarrollador Senior Full Stack especializado en React, TypeScript, Next.js, .NET Core, diseño de APIs seguras y despliegues en AWS y Azure.'
            : activeLang === 'pt'
            ? 'Portfólio técnico de Farid Maloof Suarez. Desenvolvedor Full Stack Sênior com expertise em React, TypeScript, .NET Core e soluções em nuvem.'
            : 'Technical Portfolio of Farid Maloof Suarez. Senior Full Stack Engineer specializing in React, TypeScript, modern UI architectures, .NET Core backends, and cloud deployments.';
          break;
        default:
          description = activeLang === 'es'
            ? 'Portafolio técnico de Farid Maloof Suarez. Más de 15 años de trayectoria en ingeniería de software, arquitectura de automatización QA / SDET, desarrollo full-stack, cloud computing y liderazgo técnico.'
            : activeLang === 'pt'
            ? 'Portfólio técnico de Farid Maloof Suarez. Mais de 15 anos de trajetória em engenharia de software, arquitetura de automação QA / SDET e liderança técnica.'
            : 'Technical Portfolio of Farid Maloof Suarez. 15+ years of enterprise software engineering, test automation architecture (SDET), full-stack development, cloud computing, and technical leadership.';
          break;
      }
    }

    if (!keywords) {
      keywords = 'Farid Maloof, SDET, QA Automation, Software Engineer, .NET, C#, Java, React, TypeScript, Playwright, Selenium, Robot Framework, ISTQB, CI/CD, AWS, Cloud, Testing, Portfolio';
    }

    // Update document title
    document.title = title;

    // Update html lang attribute
    if (document.documentElement) {
      document.documentElement.lang = activeLang;
    }

    // Update or insert meta tags
    const updateMetaTag = (selector: string, attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMetaTag('meta[name="description"]', 'name', 'description', description);
    updateMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);
    updateMetaTag('meta[name="author"]', 'name', 'author', 'Farid Maloof Suarez');
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    updateMetaTag('meta[property="og:type"]', 'property', 'og:type', 'profile');
    updateMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
  }, []);

  // Read URL params on mount and when URL changes
  const parseUrlParams = useCallback(() => {
    const currentSettings = getSettings();
    const sysVars = getSystemVariables();
    setSettingsState(currentSettings);
    
    const params = new URLSearchParams(window.location.search);
    const allowOverride = currentSettings.allowUrlProfileOverride !== undefined 
      ? currentSettings.allowUrlProfileOverride 
      : (sysVars.allowUrlProfileOverride !== false);

    const rawProfile = allowOverride 
      ? (params.get('profile') || params.get('track'))?.toLowerCase().trim()
      : undefined;
    const langParam = params.get('lang')?.toLowerCase().trim();
    
    let resolvedTrack: TrackType = currentSettings.defaultProfile || sysVars.defaultProfile || 'combined';

    if (rawProfile) {
      if (rawProfile === 'sdet' || rawProfile === 'automation') {
        resolvedTrack = 'sdet';
        setIsValidProfile(true);
      } else if (rawProfile === 'qa') {
        resolvedTrack = 'qa';
        setIsValidProfile(true);
      } else if (rawProfile === 'backend') {
        resolvedTrack = 'backend';
        setIsValidProfile(true);
      } else if (rawProfile === 'fullstack' || rawProfile === 'full-stack' || rawProfile === 'frontend') {
        resolvedTrack = 'fullstack';
        setIsValidProfile(true);
      } else if (rawProfile === 'dev' || rawProfile === 'developer') {
        resolvedTrack = 'dev';
        setIsValidProfile(true);
      } else if (rawProfile === 'combined' || rawProfile === 'all' || rawProfile === 'full') {
        resolvedTrack = 'combined';
        setIsValidProfile(true);
      } else {
        resolvedTrack = rawProfile;
        setIsValidProfile(true);
      }
    } else {
      resolvedTrack = currentSettings.defaultProfile || sysVars.defaultProfile || 'combined';
      setIsValidProfile(true);
    }
    
    // Auto-detect browser/PC language if enabled and not explicitly overridden via query param
    const autoDetect = currentSettings.autoDetectLanguage !== undefined
      ? currentSettings.autoDetectLanguage
      : (sysVars.autoDetectLanguage !== false);

    let resolvedLang: Language = currentSettings.defaultLanguage || sysVars.defaultLanguage || 'es';
    if (langParam && (langParam === 'en' || langParam === 'es' || langParam === 'pt')) {
      resolvedLang = langParam as Language;
    } else if (autoDetect) {
      resolvedLang = detectBrowserLanguage(resolvedLang);
    }

    const detected = typeof navigator !== 'undefined' ? (navigator.language || 'es') : 'es';
    setDetectedBrowserLang(detected);

    setTrackState(resolvedTrack);
    setLanguageState(resolvedLang);
    setRefreshKey(prev => prev + 1);

    // Run SEO update
    updateSEO(resolvedTrack, resolvedLang, currentSettings);
  }, [updateSEO]);

  // Initial load
  useEffect(() => {
    parseUrlParams();
    
    const handlePopState = () => parseUrlParams();
    window.addEventListener('popstate', handlePopState);
    
    return () => window.removeEventListener('popstate', handlePopState);
  }, [parseUrlParams]);

  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('farid_maloof_lang', lang);
    } catch {
      // Ignore
    }
    const params = new URLSearchParams(window.location.search);
    params.set('lang', lang);
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    setRefreshKey(prev => prev + 1);
    updateSEO(track, lang, settings);
  }, [track, settings, updateSEO]);

  const handleSetTrack = useCallback((newTrack: TrackType) => {
    setTrackState(newTrack);
    const params = new URLSearchParams(window.location.search);
    params.set('profile', newTrack);
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    setRefreshKey(prev => prev + 1);
    updateSEO(newTrack, language, settings);
  }, [language, settings, updateSEO]);

  return (
    <ProfileContext.Provider value={{ 
      language, 
      track, 
      setLanguage: handleSetLanguage, 
      setTrack: handleSetTrack,
      showAllExperience,
      setShowAllExperience,
      showAllCertifications,
      setShowAllCertifications,
      showCompletedEducation,
      setShowCompletedEducation,
      isValidProfile,
      refreshKey,
      settings,
      reloadSettings,
      detectedBrowserLang
    }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
