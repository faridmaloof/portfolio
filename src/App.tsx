import { useMemo, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { defaultProfileData } from './data/profile';
import { ProfileProvider, useProfile } from './context/ProfileContext';
import { useDarkMode } from './hooks/useDarkMode';
import { Header } from './components/Header';
import { SummarySection } from './components/SummarySection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { ExtrasSection } from './components/ExtrasSection';
import { GitHubShowcase } from './components/GitHubShowcase';
import { ServicesSection } from './components/ServicesSection';
import { LanguageToggle } from './components/Toggles';
import { ThemeToggle } from './components/ThemeToggle';
import { generatePDF } from './lib/pdfGenerator';
import { getProfiles, getSystemVariables, getDesignConfig, syncWithBackendDatabase } from './lib/db';
import { FileText, Shield, ExternalLink, Mail } from 'lucide-react';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import type { ProfileData, FrontendDesignConfig } from './types';

function PortfolioContent() {
  const { language, track, setLanguage, refreshKey, settings } = useProfile();
  const { isDark, toggle: toggleTheme } = useDarkMode();
  const sysVars = getSystemVariables();
  const designConfig: FrontendDesignConfig = sysVars.designConfig || getDesignConfig();

  // Load custom profile data if saved in database, else fallback to default
  const activeProfileData: ProfileData = useMemo(() => {
    try {
      const savedProfiles = getProfiles();
      if (savedProfiles && savedProfiles.length > 0) {
        return savedProfiles[0];
      }
    } catch {
      // Fallback
    }
    return defaultProfileData;
  }, [refreshKey]);
  
  const handleDownloadPDF = () => {
    generatePDF(activeProfileData, language, track);
  };

  const visibility = settings?.visibility || {
    hero: true,
    summary: true,
    experience: true,
    education: true,
    certifications: true,
    skills: true,
    languages: true,
    services: true,
    githubProjects: true,
  };

  // Font pairing classes
  const fontClass = useMemo(() => {
    switch (designConfig.fontPairing) {
      case 'tech-mono': return 'font-mono';
      case 'editorial': return 'font-serif';
      case 'geometric': return 'font-sans tracking-tight';
      default: return 'font-sans';
    }
  }, [designConfig.fontPairing]);

  // Template preset spacing
  const containerClass = useMemo(() => {
    switch (designConfig.templatePreset) {
      case 'minimalist': return 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8';
      case 'compact': return 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6';
      case 'bento': return 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8';
      default: return 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10';
    }
  }, [designConfig.templatePreset]);

  // Dynamic Section Rendering based on sectionOrder
  const sectionOrder = designConfig.sectionOrder || [
    'summary',
    'services',
    'experience',
    'githubProjects',
    'certifications',
    'education',
    'languages'
  ];

  const renderedExtras = useMemo(() => {
    return (visibility.certifications !== false || visibility.languages !== false) ? (
      <ExtrasSection key="extras" data={activeProfileData} language={language} track={track} />
    ) : null;
  }, [visibility.certifications, visibility.languages, activeProfileData, language, track]);

  let hasRenderedExtras = false;

  const renderSectionItem = (secId: string) => {
    switch (secId) {
      case 'summary':
        return visibility.summary !== false ? (
          <SummarySection key="summary" data={activeProfileData} language={language} track={track} />
        ) : null;

      case 'services':
        return visibility.services !== false ? (
          <ServicesSection key="services" language={language} track={track} />
        ) : null;

      case 'githubProjects':
        return visibility.githubProjects !== false ? (
          <GitHubShowcase key="githubProjects" language={language} track={track} />
        ) : null;

      case 'experience':
        return visibility.experience !== false ? (
          <ExperienceSection key="experience" data={activeProfileData} language={language} track={track} />
        ) : null;

      case 'education':
        return visibility.education !== false ? (
          <EducationSection key="education" data={activeProfileData} language={language} />
        ) : null;

      case 'certifications':
      case 'languages':
        if (!hasRenderedExtras) {
          hasRenderedExtras = true;
          return renderedExtras;
        }
        return null;

      default:
        return null;
    }
  };

  return (
    <div key={refreshKey} className={`min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors ${fontClass}`}>
      {/* Navigation Bar - Clean, focused, without recruiter-visible profile toggles */}
      <nav className="sticky top-0 z-40 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo/Brand */}
            <a href="/" className="flex items-center gap-2.5 hover:opacity-85 transition-opacity">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xs tracking-wider">FM</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-slate-900 dark:text-white leading-none">
                  {sysVars.fullName || 'Farid Maloof'}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  Engineering Portfolio
                </span>
              </div>
            </a>

            {/* Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              <LanguageToggle language={language} setLanguage={setLanguage} />
              <ThemeToggle isDark={isDark} toggle={toggleTheme} />
              
              <button
                onClick={handleDownloadPDF}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-sm hover:shadow-md transition-all text-xs sm:text-sm font-semibold cursor-pointer active:scale-95"
              >
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{language === 'es' ? 'Descargar CV' : language === 'pt' ? 'Baixar CV' : 'Download CV'}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {visibility.hero !== false && (
        <Header data={activeProfileData} language={language} track={track} />
      )}

      {/* Main Content Container with dynamic section ordering */}
      <main className={containerClass}>
        {sectionOrder.map((sectionId) => renderSectionItem(sectionId))}
      </main>

      {/* Footer - Clean, professional, recruiter-safe */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="font-bold text-white text-base tracking-tight">
                  {sysVars.fullName || 'Farid Maloof Suarez'}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-mono">
                  Senior Engineer
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {language === 'es'
                  ? 'Portafolio Profesional y Hoja de Vida Técnica.'
                  : language === 'pt'
                  ? 'Portfólio Profissional e Currículo Técnico.'
                  : 'Professional Portfolio & Technical Curriculum Vitae.'}{' '}
                {sysVars.copyrightText || `© ${new Date().getFullYear()} All rights reserved.`}
              </p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-slate-300">
              <a
                href={sysVars.githubUrl || "https://github.com/faridmaloof/"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors inline-flex items-center gap-1 font-medium"
              >
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href={sysVars.linkedinUrl || "https://www.linkedin.com/in/fmaloofs/"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors inline-flex items-center gap-1 font-medium"
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href={`mailto:${sysVars.email || 'faridmaloof@gmail.com'}`}
                className="hover:text-blue-400 transition-colors inline-flex items-center gap-1"
              >
                <Mail className="w-3 h-3 opacity-60" />
                <span>{sysVars.email || 'faridmaloof@gmail.com'}</span>
              </a>

              <span className="text-slate-700 hidden sm:inline">|</span>

              <Link 
                to="/admin" 
                className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors"
                title="Acceso de Administración"
              >
                <Shield className="w-3.5 h-3.5 opacity-60" />
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    syncWithBackendDatabase().catch(() => {});
  }, []);

  return (
    <BrowserRouter>
      <ProfileProvider>
        <Routes>
          <Route path="/" element={<PortfolioContent />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </ProfileProvider>
    </BrowserRouter>
  );
}
