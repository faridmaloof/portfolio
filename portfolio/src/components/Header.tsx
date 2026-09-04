import { Mail, MapPin, Phone, Linkedin } from 'lucide-react';
import type { ProfileData, Language } from '../types';

interface HeaderProps {
  data: ProfileData;
  language: Language;
}

export function Header({ data, language }: HeaderProps) {
  const { contact } = data;

  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Image */}
          <div className="relative">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-2xl">
              <div className="w-full h-full rounded-full bg-slate-200 overflow-hidden flex items-center justify-center">
                <img
                  src="/profile-placeholder.jpg"
                  alt={contact.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <span className="hidden text-4xl font-bold text-slate-600">
                  {contact.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 tracking-tight">
              {contact.name}
            </h1>
            <p className="text-blue-300 text-lg sm:text-xl mb-6 font-medium">
              {language === 'es' ? 'Especialista en Automatización de Pruebas / SDET' : 'QA Automation Engineer / SDET'}
            </p>

            {/* Contact Details */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 hover:text-blue-300 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{contact.email}</span>
              </a>
              
              <a
                href={`tel:${contact.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 hover:text-blue-300 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{contact.phone}</span>
              </a>
              
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{contact.location}</span>
              </div>
              
              <a
                href={contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-blue-300 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
