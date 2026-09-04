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

function PortfolioContent() {
  const { language, track, setLanguage, setTrack } = useProfile();
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
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">FM</span>
              </div>
              <span className="font-semibold text-slate-900 dark:text-white hidden sm:inline">Portfolio</span>
            </div>

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

      {/* Hero Section */}
      <Header data={defaultProfileData} language={language} />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Summary & Skills */}
        <SummarySection data={defaultProfileData} language={language} track={track} />

        {/* Experience */}
        <ExperienceSection data={defaultProfileData} language={language} track={track} />

        {/* Education & Extras */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EducationSection data={defaultProfileData} language={language} />
          <ExtrasSection data={defaultProfileData} language={language} />
        </div>

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
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ProfileProvider>
      <PortfolioContent />
    </ProfileProvider>
  );
}
