import { useMemo } from 'react';
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
import { LanguageToggle, TrackToggle } from './components/Toggles';
import { ThemeToggle } from './components/ThemeToggle';
import { generatePDF } from './lib/pdfGenerator';
import { getServices, getProfiles } from './lib/db';
import { FileText, Shield, ExternalLink, Mail } from 'lucide-react';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import type { ProfileData, Language } from './types';

function PortfolioContent() {
  const { language, track, setLanguage, setTrack, refreshKey, settings } = useProfile();
  const { isDark, toggle: toggleTheme } = useDarkMode();

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

  return (
    <div key={refreshKey} className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
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
                  Farid Maloof
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  Engineering Portfolio
                </span>
              </div>
            </a>

            {/* Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              <TrackToggle track={track} setTrack={setTrack} language={language} />
              <LanguageToggle language={language} setLanguage={setLanguage} />
              <ThemeToggle isDark={isDark} toggle={toggleTheme} />
              
              <button
                onClick={handleDownloadPDF}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-sm hover:shadow-md transition-all text-xs sm:text-sm font-semibold cursor-pointer active:scale-95"
              >
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{language === 'es' ? 'Descargar CV' : 'Download CV'}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {visibility.hero !== false && (
        <Header data={activeProfileData} language={language} track={track} />
      )}

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Professional Summary & Core Strengths */}
        {visibility.summary !== false && (
          <SummarySection data={activeProfileData} language={language} track={track} />
        )}

        {/* GitHub Showcase - Highlighting capabilities, architectures, and open source */}
        {visibility.githubProjects !== false && (
          <GitHubShowcase language={language} track={track} />
        )}

        {/* Work Experience */}
        {visibility.experience !== false && (
          <ExperienceSection data={activeProfileData} language={language} track={track} />
        )}

        {/* Education, Certifications (120+ with modal explorer) & Languages */}
        <div className="space-y-6">
          {visibility.education !== false && (
            <EducationSection data={activeProfileData} language={language} />
          )}
          
          {(visibility.certifications !== false || visibility.languages !== false) && (
            <ExtrasSection data={activeProfileData} language={language} track={track} />
          )}
        </div>

        {/* Services Section */}
        {visibility.services !== false && (
          <ServicesSection language={language} />
        )}
      </main>

      {/* Footer - Clean, professional, recruiter-safe */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="font-bold text-white text-base tracking-tight">
                  Farid Maloof Suarez
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-mono">
                  Senior Engineer
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {language === 'es'
                  ? 'Portafolio Profesional y Hoja de Vida Técnica.'
                  : 'Professional Portfolio & Technical Curriculum Vitae.'}{' '}
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-slate-300">
              <a
                href="https://github.com/faridmaloof/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors inline-flex items-center gap-1 font-medium"
              >
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href="https://www.linkedin.com/in/fmaloofs/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors inline-flex items-center gap-1 font-medium"
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href="mailto:faridmaloof@gmail.com"
                className="hover:text-blue-400 transition-colors inline-flex items-center gap-1"
              >
                <Mail className="w-3 h-3 opacity-60" />
                <span>faridmaloof@gmail.com</span>
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

// Dynamic Services Section
function ServicesSection({ language }: { language: Language }) {
  const customServices = getServices();

  const sectionTitle = language === 'en' 
    ? 'Technical Advisory & Consulting Services' 
    : language === 'pt'
    ? 'Serviços de Consultoria e Liderança Técnica'
    : 'Servicios de Consultoría y Liderazgo Técnico';
  const ctaText = language === 'en' 
    ? 'Get in touch' 
    : language === 'pt'
    ? 'Entre em contato'
    : 'Contáctame directamente';

  return (
    <section className="bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 rounded-2xl shadow-xl p-6 sm:p-8 text-white relative overflow-hidden">
      <div className="relative z-10">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 tracking-tight">{sectionTitle}</h2>
        <p className="text-blue-100 text-xs sm:text-sm mb-6 max-w-2xl leading-relaxed">
          {language === 'en' 
            ? 'Available for full-time senior roles, staff test engineering leadership, and strategic technical consulting in high-scale distributed systems.'
            : language === 'pt'
            ? 'Disponível para cargos de liderança técnica sênior, arquitetura de qualidade contínua e desenvolvimento full-stack em ambientes corporativos de alta escala.'
            : 'Disponible para roles de liderazgo técnico sénior, arquitecturas de calidad continua y desarrollo full-stack en entornos empresariales de alta exigencia.'}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {customServices.slice(0, 3).map((service, index) => {
            const title = (service.title as Record<string, string>)[language] || service.title.es || service.title.en;
            const desc = (service.description as Record<string, string>)[language] || service.description.es || service.description.en;
            return (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-4.5 border border-white/10 hover:bg-white/15 transition-all">
                <h3 className="font-bold text-sm mb-1.5 text-white">{title}</h3>
                <p className="text-xs text-blue-100/90 leading-relaxed">{desc}</p>
              </div>
            );
          })}
        </div>
        
        <div className="flex flex-wrap gap-3">
          <a 
            href="mailto:faridmaloof@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 rounded-xl font-semibold hover:bg-blue-50 transition-all text-xs sm:text-sm shadow-md active:scale-95"
          >
            <Mail className="w-4 h-4 text-blue-600" />
            <span>{ctaText}</span>
          </a>
          <a 
            href="https://www.linkedin.com/in/fmaloofs/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 rounded-xl font-semibold transition-all text-xs sm:text-sm active:scale-95 text-white"
          >
            <span>LinkedIn Profile</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function App() {
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
