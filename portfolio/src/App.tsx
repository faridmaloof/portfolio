import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { defaultProfileData } from './data/profile';
import { ProfileProvider, useProfile } from './context/ProfileContext';
import { useDarkMode } from './hooks/useDarkMode';
import { Header } from './components/Header';
import { SummarySection } from './components/SummarySection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { ExtrasSection } from './components/ExtrasSection';
import { LanguageToggle, TrackToggle } from './components/Toggles';
import { ThemeToggle } from './components/ThemeToggle';
import { ExportImport } from './components/ExportImport';
import { generatePDF } from './lib/pdfGenerator';
import { FileText } from 'lucide-react';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';

function PortfolioContent() {
  const { language, track, setLanguage, setTrack, isValidProfile } = useProfile();
  const { isDark, toggle: toggleTheme } = useDarkMode();
  
  const handleDownloadPDF = () => {
    generatePDF(defaultProfileData, language);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Logo/Brand */}
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">FM</span>
              </div>
              <span className="font-semibold text-slate-900 dark:text-white hidden sm:inline">Portfolio</span>
            </a>

            {/* Controls */}
            <div className="flex items-center gap-3 flex-wrap">
              <LanguageToggle language={language} setLanguage={setLanguage} />
              <TrackToggle track={track} setTrack={setTrack} />
              <ThemeToggle isDark={isDark} toggle={toggleTheme} />
              
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-sm transition-all text-sm font-medium"
              >
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Download CV</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Invalid Profile Warning */}
      {!isValidProfile && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              ⚠️ Perfil no reconocido. Mostrando perfil combinado por defecto. URL válida: <code className="bg-yellow-100 dark:bg-yellow-800 px-2 py-0.5 rounded">/?profile=qa</code>, <code className="bg-yellow-100 dark:bg-yellow-800 px-2 py-0.5 rounded">/?profile=dev</code>, o <code className="bg-yellow-100 dark:bg-yellow-800 px-2 py-0.5 rounded">/?profile=combined</code>
            </p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <Header data={defaultProfileData} language={language} track={track} />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Summary & Skills */}
        <SummarySection data={defaultProfileData} language={language} track={track} />

        {/* Experience */}
        <ExperienceSection data={defaultProfileData} language={language} track={track} />

        {/* Education & Extras */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EducationSection data={defaultProfileData} language={language} />
          <ExtrasSection data={defaultProfileData} language={language} track={track} />
        </div>

        {/* Services Section - SEO Optimization */}
        <ServicesSection language={language} />

        {/* GitHub Projects Section */}
        <GitHubProjectsSection language={language} />

        {/* Export/Import */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Data Management</h3>
          <ExportImport
            data={defaultProfileData}
            onImport={(data) => console.log('Imported:', data)}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-500 dark:text-slate-400 text-sm">
            <p>© {new Date().getFullYear()} {defaultProfileData.contact.name}. All rights reserved.</p>
            <p className="mt-2">
              Built with React + TypeScript + Vite + TailwindCSS
            </p>
            <p className="mt-2 text-xs">
              Available profiles: 
              <a href="/?profile=qa" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">QA/SDET</a>,
              <a href="/?profile=dev" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">Full Stack Dev</a>,
              <a href="/?profile=combined" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">Combined</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Services Section for SEO
function ServicesSection({ language }: { language: 'en' | 'es' }) {
  const services = {
    en: [
      { title: 'QA Automation & SDET Services', desc: 'End-to-end test automation strategy, framework design, and CI/CD integration for enterprise applications.' },
      { title: 'Full Stack Development', desc: 'Building scalable web applications and APIs using Java/Spring Boot, .NET, React, and cloud technologies.' },
      { title: 'Technical Consulting', desc: 'Software architecture review, code quality assessment, and technical mentorship for development teams.' },
      { title: 'Performance Testing', desc: 'Load testing, performance optimization, and reliability engineering for high-traffic systems.' },
    ],
    es: [
      { title: 'Automatización de Pruebas QA & SDET', desc: 'Estrategia completa de automatización de pruebas, diseño de frameworks e integración CI/CD para aplicaciones empresariales.' },
      { title: 'Desarrollo Full Stack', desc: 'Construcción de aplicaciones web escalables y APIs usando Java/Spring Boot, .NET, React y tecnologías cloud.' },
      { title: 'Consultoría Técnica', desc: 'Revisión de arquitectura de software, evaluación de calidad de código y mentoría técnica para equipos de desarrollo.' },
      { title: 'Pruebas de Rendimiento', desc: 'Pruebas de carga, optimización de rendimiento e ingeniería de confiabilidad para sistemas de alto tráfico.' },
    ],
  };

  const sectionTitle = language === 'en' ? 'Professional Services' : 'Servicios Profesionales';
  const ctaText = language === 'en' ? "Let's work together" : 'Trabajemos juntos';

  return (
    <section className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl shadow-lg p-8 text-white">
      <h2 className="text-2xl font-bold mb-2">{sectionTitle}</h2>
      <p className="text-blue-100 mb-6 max-w-2xl">
        {language === 'en' 
          ? 'Available for contract, freelance, and full-time opportunities. Specialized in delivering high-quality software solutions.'
          : 'Disponible para contratos, freelance y oportunidades de tiempo completo. Especializado en entregar soluciones de software de alta calidad.'}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {services[language].map((service, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors">
            <h3 className="font-semibold mb-1">{service.title}</h3>
            <p className="text-sm text-blue-100">{service.desc}</p>
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-4">
        <a 
          href="mailto:faridmaloof@gmail.com"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
        >
          📧 {ctaText}
        </a>
        <a 
          href="https://www.linkedin.com/in/fmaloofs/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg font-semibold hover:bg-white/30 transition-colors"
        >
          💼 LinkedIn
        </a>
      </div>
    </section>
  );
}

// GitHub Projects Section
function GitHubProjectsSection({ language }: { language: 'en' | 'es' }) {
  const projects = [
    {
      name: 'Test Automation Framework',
      description: language === 'en' 
        ? 'Enterprise-grade test automation framework with Playwright, supporting parallel execution and comprehensive reporting.'
        : 'Framework de automatización de pruebas de nivel empresarial con Playwright, soportando ejecución paralela y reportes completos.',
      tech: ['TypeScript', 'Playwright', 'Azure DevOps'],
      url: 'https://github.com/fmaloofs',
    },
    {
      name: 'API Testing Suite',
      description: language === 'en'
        ? 'Comprehensive API testing solution with Postman collections and automated validation workflows.'
        : 'Solución completa de pruebas de API con colecciones Postman y flujos de validación automatizados.',
      tech: ['Postman', 'Newman', 'CI/CD'],
      url: 'https://github.com/fmaloofs',
    },
    {
      name: 'Full Stack Web Application',
      description: language === 'en'
        ? 'Modern web application built with React, .NET Core, and SQL Server featuring real-time data synchronization.'
        : 'Aplicación web moderna construida con React, .NET Core y SQL Server con sincronización de datos en tiempo real.',
      tech: ['React', '.NET Core', 'SQL Server'],
      url: 'https://github.com/fmaloofs',
    },
  ];

  const sectionTitle = language === 'en' ? 'Featured Projects' : 'Proyectos Destacados';
  const viewMoreText = language === 'en' ? 'View more on GitHub' : 'Ver más en GitHub';

  return (
    <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
          {sectionTitle}
        </h2>
        <a
          href="https://github.com/fmaloofs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          {viewMoreText} →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.name}
              </h3>
              <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 4.41V8h2V3h-7zm-2 16H5V5h7V3H5c-1.11 0-2 .89-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7H12z"/>
              </svg>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {project.tech.map((tech, i) => (
                <span key={i} className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </a>
        ))}
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
