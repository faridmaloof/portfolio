import { useMemo } from 'react';
import type { Language, TrackType, ServiceItem } from '../types';
import { getServicesForTrack, getSystemVariables, detectSchedulingProvider } from '../lib/db';
import { 
  Bot, 
  Server, 
  ShieldCheck, 
  Gauge, 
  Code2, 
  Layers, 
  Calendar, 
  Mail, 
  ExternalLink, 
  CheckCircle2,
  Clock
} from 'lucide-react';

interface ServicesSectionProps {
  language: Language;
  track: TrackType;
}

export function ServicesSection({ language, track }: ServicesSectionProps) {
  const sysVars = getSystemVariables();
  const services: ServiceItem[] = useMemo(() => {
    return getServicesForTrack(track);
  }, [track]);

  // Determine scheduling link
  const schedulingUrl = sysVars.schedulingUrl || sysVars.calendlyUrl || '';
  const provider = sysVars.schedulingProvider || detectSchedulingProvider(schedulingUrl);

  const providerLabels: Record<string, Record<string, string>> = {
    calendly: {
      es: 'Agendar en Calendly',
      en: 'Book via Calendly',
      pt: 'Agendar no Calendly'
    },
    google_calendar: {
      es: 'Agendar en Google Calendar',
      en: 'Book with Google Calendar',
      pt: 'Agendar no Google Calendar'
    },
    outlook: {
      es: 'Agendar en Microsoft Bookings / Outlook',
      en: 'Book via Outlook / Microsoft',
      pt: 'Agendar no Outlook / Microsoft'
    },
    custom: {
      es: 'Agendar Reunión Técnica',
      en: 'Schedule Technical Call',
      pt: 'Agendar Reunião Técnica'
    }
  };

  const ctaLabel = sysVars.schedulingCtaText?.[language] ||
    providerLabels[provider]?.[language] ||
    providerLabels[provider]?.es ||
    (language === 'en' ? 'Schedule Technical Interview / Call' : language === 'pt' ? 'Agendar Reunião Técnica' : 'Agendar Llamada / Entrevista Técnica');

  const titleSets: Record<string, { heading: string; subtitle: string; contactBtn: string; callBtn: string; availability: string }> = {
    es: {
      heading: 'Servicios de Consultoría y Liderazgo Técnico',
      subtitle: 'Servicios especializados y optimizados para el stack técnico seleccionado.',
      contactBtn: 'Contáctame directamente',
      callBtn: ctaLabel,
      availability: sysVars.availabilityStatus || 'Disponible para contratación inmediata'
    },
    en: {
      heading: 'Technical Advisory & Consulting Services',
      subtitle: 'Specialized services focused and optimized for the selected technical stack.',
      contactBtn: 'Get in touch',
      callBtn: ctaLabel,
      availability: sysVars.availabilityStatus || 'Available for immediate hire'
    },
    pt: {
      heading: 'Serviços de Consultoria e Liderança Técnica',
      subtitle: 'Serviços especializados e focados no stack técnico selecionado.',
      contactBtn: 'Entre em contato',
      callBtn: ctaLabel,
      availability: sysVars.availabilityStatus || 'Disponível para contratação imediata'
    }
  };

  const titles = titleSets[language] || titleSets.es;

  // Helper to pick Lucide icon
  const renderIcon = (iconName: string) => {
    const props = { className: 'w-5 h-5 text-indigo-200' };
    switch (iconName) {
      case 'Bot': return <Bot {...props} />;
      case 'Server': return <Server {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'Gauge': return <Gauge {...props} />;
      case 'Layers': return <Layers {...props} />;
      default: return <Code2 {...props} />;
    }
  };

  return (
    <section id="services-section" className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl shadow-xl p-6 sm:p-8 text-white relative overflow-hidden border border-indigo-500/20">
      {/* Decorative ambient background */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2 border border-indigo-400/30">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{titles.availability}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {titles.heading}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              {titles.subtitle}
            </p>
          </div>

          {/* Quick Schedule button on top if configured */}
          {schedulingUrl && (
            <a
              id="header-schedule-btn"
              href={schedulingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-95 shrink-0 self-start md:self-auto"
            >
              <Calendar className="w-4 h-4" />
              <span>{titles.callBtn}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          )}
        </div>

        {/* Services Grid tailored to current Technical Stack */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, idx) => {
            const title = (service.title as Record<string, string>)[language] || service.title.es || service.title.en;
            const desc = (service.description as Record<string, string>)[language] || service.description.es || service.description.en;
            return (
              <div 
                key={service.id || idx}
                id={`service-card-${service.id || idx}`}
                className="bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10 hover:border-indigo-400/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-indigo-600/30 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-indigo-400/20">
                    {renderIcon(service.icon)}
                  </div>
                  <h3 className="font-bold text-sm text-white mb-2 leading-snug">
                    {title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {desc}
                  </p>
                </div>

                {service.keywords && service.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/10">
                    {service.keywords.map((kw, kIdx) => (
                      <span 
                        key={kIdx} 
                        className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-indigo-200 font-mono"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Call to actions footer */}
        <div className="pt-3 flex flex-wrap items-center gap-3">
          {/* Email CTA */}
          <a 
            id="service-email-cta"
            href={`mailto:${sysVars.email || 'faridmaloof@gmail.com'}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 hover:bg-indigo-50 rounded-xl font-semibold transition-all text-xs sm:text-sm shadow-md active:scale-95"
          >
            <Mail className="w-4 h-4 text-indigo-600" />
            <span>{titles.contactBtn}</span>
          </a>

          {/* Direct Scheduling Link */}
          {schedulingUrl && (
            <a 
              id="service-scheduling-cta"
              href={schedulingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-all text-xs sm:text-sm shadow-md active:scale-95"
            >
              <Clock className="w-4 h-4" />
              <span>{titles.callBtn}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          )}

          {/* LinkedIn Profile */}
          <a 
            id="service-linkedin-cta"
            href={sysVars.linkedinUrl || "https://www.linkedin.com/in/fmaloofs/"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl font-semibold transition-all text-xs sm:text-sm active:scale-95 text-white"
          >
            <span>LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </div>
    </section>
  );
}
