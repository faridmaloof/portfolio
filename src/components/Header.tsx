import { Mail, MapPin, Phone, Award, ShieldCheck, ExternalLink, Sparkles, Calendar } from 'lucide-react';
import type { ProfileData, Language, TrackType } from '../types';
import { getLocalizedTitle } from '../lib/utils';
import { getSystemVariables } from '../lib/db';

interface HeaderProps {
  data: ProfileData;
  language: Language;
  track?: TrackType;
}

// LinkedIn SVG Icon component
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// GitHub SVG Icon component
const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

export function Header({ data, language, track = 'combined' }: HeaderProps) {
  const { contact } = data;
  const sysVars = getSystemVariables();
  
  // Get dynamic title based on track and language
  const titleText = getLocalizedTitle(data.titles, track, language);

  const githubUrl = contact.githubUrl || sysVars.githubUrl || "https://github.com/faridmaloof/";
  const avatarImage = contact.avatarUrl || "/profile.jpg";

  const schedulingUrl = sysVars.schedulingUrl || sysVars.calendlyUrl;
  const scheduleCtaLabel = sysVars.schedulingCtaText?.[language] ||
    (language === 'es' ? 'Agendar Reunión' : language === 'pt' ? 'Agendar Reunião' : 'Schedule Meeting');

  return (
    <header className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white border-b border-slate-800/80 overflow-hidden">
      {/* Decorative ambient light gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-10">
          
          {/* Profile Image / Photo with Glowing Ring */}
          <div className="relative group flex-shrink-0">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 p-1 shadow-2xl shadow-blue-500/20 transition-all duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-[22px] bg-slate-900 overflow-hidden flex items-center justify-center relative">
                <img
                  src={avatarImage}
                  alt={contact.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.classList.remove('hidden');
                  }}
                />
                {/* Modern Fallback initials with gradient */}
                <div className="hidden w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center text-center p-2">
                  <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    FM
                  </span>
                  <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider mt-1">
                    Farid Maloof
                  </span>
                </div>
              </div>
            </div>

            {/* Active Status Badge */}
            <div className="absolute -bottom-2.5 left-1/2 md:left-auto md:-right-2 transform -translate-x-1/2 md:translate-x-0 bg-slate-900/95 border border-emerald-500/60 text-emerald-400 text-[11px] font-semibold px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 backdrop-blur-md whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{language === 'es' ? 'Disponible para Contratación' : 'Available for Hire'}</span>
            </div>
          </div>

          {/* Bio Info, Stats & Actions */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                {contact.name}
              </h1>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>15+ {language === 'es' ? 'Años Exp.' : 'Yrs Exp.'}</span>
              </span>
            </div>

            <p className="text-blue-300 text-lg sm:text-xl font-medium tracking-wide mb-4">
              {titleText}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-w-xl mx-auto md:mx-0 mb-6 text-xs">
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-2.5 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-bold text-white">ISTQB Certified</div>
                  <div className="text-[10px] text-slate-400">CTFL v4.0 Specialist</div>
                </div>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-2.5 flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-bold text-white">120+ Acreditaciones</div>
                  <div className="text-[10px] text-slate-400">AWS · GCP · Brightest</div>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-slate-800/80 border border-slate-700/80 rounded-xl p-2.5 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-bold text-white">{contact.location}</div>
                  <div className="text-[10px] text-slate-400">{language === 'es' ? 'Remoto Global' : 'Remote Worldwide'}</div>
                </div>
              </div>
            </div>

            {/* Contact Details & Links */}
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 text-xs sm:text-sm">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-700 hover:border-blue-400 transition-all font-semibold shadow-xs hover:shadow-md"
              >
                <GithubIcon className="w-4 h-4 text-white" />
                <span>GitHub @faridmaloof</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href={contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-xl border border-blue-500/30 hover:border-blue-400 transition-all font-semibold"
              >
                <LinkedinIcon className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 px-3 py-2 text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>{contact.email}</span>
              </a>

              <a
                href={`tel:${contact.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 px-3 py-2 text-slate-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-slate-400" />
                <span>{contact.phone}</span>
              </a>

              {schedulingUrl ? (
                <a
                  href={schedulingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-indigo-500/25 active:scale-95 cursor-pointer ml-auto md:ml-0"
                >
                  <Calendar className="w-4 h-4 text-blue-200" />
                  <span>{scheduleCtaLabel}</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              ) : (
                <a
                  href="#services-section"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-indigo-500/25 active:scale-95 cursor-pointer ml-auto md:ml-0"
                >
                  <Calendar className="w-4 h-4 text-blue-200" />
                  <span>{scheduleCtaLabel}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
