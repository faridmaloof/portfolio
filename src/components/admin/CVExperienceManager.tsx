import { useState } from 'react';
import type { ProfileData, Experience, WorkModality } from '../../types';
import { getLanguages, getProfiles, saveProfile, getSystemVariables, saveSystemVariables } from '../../lib/db';
import { LanguageTabSelector } from './LanguageTabSelector';
import { 
  Briefcase, 
  User, 
  GraduationCap, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowUp, 
  ArrowDown, 
  Check, 
  X, 
  Upload, 
  Building2, 
  MapPin, 
  Sparkles,
  FileText
} from 'lucide-react';

interface CVExperienceManagerProps {
  onNotify: (type: 'success' | 'error', message: string) => void;
}

const TRACK_KEYS = [
  { id: 'combined', label: 'Integral / Lead SDET & Full Stack' },
  { id: 'sdet', label: 'SDET (Test Automation Architect)' },
  { id: 'qa', label: 'QA Specialist & Quality Lead' },
  { id: 'dev', label: 'Software Developer' },
  { id: 'backend', label: 'Backend Engineer (.NET / Java)' },
  { id: 'fullstack', label: 'Full Stack Engineer (React / .NET)' }
];

export function CVExperienceManager({ onNotify }: CVExperienceManagerProps) {
  const languages = getLanguages().filter(l => l.isActive);
  const [activeLang, setActiveLang] = useState<string>(languages[0]?.code || 'es');
  const [activeSection, setActiveSection] = useState<'contact' | 'summaries' | 'experience' | 'education'>('experience');
  
  // Profile data
  const [profiles, setProfiles] = useState<ProfileData[]>(() => {
    const list = getProfiles();
    return list.length > 0 ? list : [];
  });
  const currentProfile = profiles[0];
  const [profileData, setProfileData] = useState<ProfileData>(() => JSON.parse(JSON.stringify(currentProfile)));

  // Selected track for summary editing
  const [selectedSummaryTrack, setSelectedSummaryTrack] = useState<string>('combined');

  // Experience modal state
  const [editingExpIndex, setEditingExpIndex] = useState<number | null>(null);
  const [editingExpData, setEditingExpData] = useState<Experience | null>(null);
  const [isNewExp, setIsNewExp] = useState(false);
  const [selectedExpTrack, setSelectedExpTrack] = useState<string>('combined');

  const handleSaveAll = () => {
    const ok = saveProfile(profileData);
    if (ok) {
      // Synchronize contact variables with system variables
      const sysVars = getSystemVariables();
      saveSystemVariables({
        ...sysVars,
        fullName: profileData.contact.name,
        email: profileData.contact.email,
        phone: profileData.contact.phone,
        location: profileData.contact.location,
        linkedinUrl: profileData.contact.linkedinUrl || profileData.contact.linkedin,
        githubUrl: profileData.contact.githubUrl || profileData.contact.github
      });
      setProfiles([profileData]);
      onNotify('success', 'CV Principal y Experiencia guardados correctamente.');
    } else {
      onNotify('error', 'Error al guardar información del CV.');
    }
  };

  // Reorder experience
  const moveExp = (index: number, direction: 'up' | 'down') => {
    const list = [...profileData.experience];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= list.length) return;
    const temp = list[index];
    list[index] = list[target];
    list[target] = temp;
    setProfileData({ ...profileData, experience: list });
  };

  // Delete experience
  const handleDeleteExp = (index: number) => {
    if (!confirm('¿Deseas eliminar este registro de experiencia laboral?')) return;
    const list = profileData.experience.filter((_, i) => i !== index);
    setProfileData({ ...profileData, experience: list });
    onNotify('success', 'Experiencia eliminada.');
  };

  // Open edit experience modal
  const openEditExp = (index: number) => {
    setEditingExpIndex(index);
    setEditingExpData(JSON.parse(JSON.stringify(profileData.experience[index])));
    setIsNewExp(false);
  };

  // Open new experience modal
  const openNewExp = () => {
    const newExp: Experience = {
      company: '',
      location: 'Bogotá, Colombia (Remoto)',
      modality: 'remote',
      dates: { es: '', en: '', pt: '' },
      companyDescription: { es: '', en: '', pt: '' },
      role: {
        combined: { es: '', en: '', pt: '' },
        sdet: { es: '', en: '', pt: '' },
        qa: { es: '', en: '', pt: '' },
        dev: { es: '', en: '', pt: '' },
        backend: { es: '', en: '', pt: '' },
        fullstack: { es: '', en: '', pt: '' }
      },
      detail: {
        combined: { es: [''], en: [''], pt: [''] },
        sdet: { es: [''], en: [''], pt: [''] },
        qa: { es: [''], en: [''], pt: [''] },
        dev: { es: [''], en: [''], pt: [''] },
        backend: { es: [''], en: [''], pt: [''] },
        fullstack: { es: [''], en: [''], pt: [''] }
      }
    };
    setEditingExpIndex(null);
    setEditingExpData(newExp);
    setIsNewExp(true);
  };

  const handleSaveModalExp = () => {
    if (!editingExpData || !editingExpData.company.trim()) {
      alert('Por favor ingresa el nombre de la empresa');
      return;
    }

    const updatedList = [...profileData.experience];
    if (isNewExp) {
      updatedList.unshift(editingExpData);
    } else if (editingExpIndex !== null) {
      updatedList[editingExpIndex] = editingExpData;
    }

    setProfileData({ ...profileData, experience: updatedList });
    setEditingExpData(null);
    setEditingExpIndex(null);
    onNotify('success', isNewExp ? 'Nueva experiencia agregada.' : 'Experiencia actualizada.');
  };

  return (
    <div className="space-y-8">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
              <Briefcase className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              CV Principal & Experiencia Profesional
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Administra los datos curriculares, empresas, roles por track técnico, logros de impacto y resúmenes en todos los idiomas configurados.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSaveAll}
            className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Guardar Todo el CV</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
        {[
          { id: 'experience', label: 'Experiencia Laboral & Logros', icon: Briefcase },
          { id: 'summaries', label: 'Resúmenes Profesionales por Track', icon: FileText },
          { id: 'contact', label: 'Contacto & Foto de Perfil', icon: User },
          { id: 'education', label: 'Educación Académica', icon: GraduationCap }
        ].map((tab) => {
          const Icon = tab.icon;
          const isCurrent = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSection(tab.id as any)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                isCurrent
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-SECTION 1: EXPERIENCIA LABORAL */}
      {activeSection === 'experience' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Historial de Trayectoria Profesional ({profileData.experience.length} Empresas)
              </h3>
            </div>

            <button
              type="button"
              onClick={openNewExp}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Añadir Nueva Empresa / Experiencia</span>
            </button>
          </div>

          <div className="space-y-3">
            {profileData.experience.map((exp, idx) => {
              const currentRole = exp.role?.combined?.[activeLang] || 
                                  exp.role?.sdet?.[activeLang] || 
                                  exp.role?.qa?.[activeLang] || 
                                  exp.role?.dev?.[activeLang] || 
                                  'Rol no definido';
              const dates = exp.dates?.[activeLang] || exp.dates?.es || exp.dates?.en || '—';

              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-blue-400 dark:hover:border-blue-500 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {exp.company}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono">
                        {dates}
                      </span>
                      {exp.modality && (
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          {exp.modality}
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                      {currentRole}
                    </p>

                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 self-end md:self-center">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveExp(idx, 'up')}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-20 cursor-pointer"
                      title="Mover arriba"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      disabled={idx === profileData.experience.length - 1}
                      onClick={() => moveExp(idx, 'down')}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-20 cursor-pointer"
                      title="Mover abajo"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => openEditExp(idx)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Editar</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteExp(idx)}
                      className="p-1.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                      title="Eliminar experiencia"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-SECTION 2: RESÚMENES PROFESIONALES POR TRACK */}
      {activeSection === 'summaries' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Resúmenes Profesionales Adaptados por Especialidad Técnica
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personaliza cómo se describe tu trayectoria según el track seleccionado y en cada idioma activo.
            </p>
          </div>

          {/* Track selector */}
          <div className="flex flex-wrap gap-2">
            {TRACK_KEYS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedSummaryTrack(t.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedSummaryTrack === t.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Language tabs */}
          <LanguageTabSelector
            activeLang={activeLang}
            onSelectLang={setActiveLang}
            languages={languages}
            label={`Editando idioma para track [${selectedSummaryTrack.toUpperCase()}]:`}
          />

          {/* Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Título Profesional para ({activeLang.toUpperCase()})
              </label>
              <input
                type="text"
                value={profileData.titles?.[selectedSummaryTrack]?.[activeLang] || ''}
                onChange={(e) => {
                  const currentTitles: any = { ...profileData.titles };
                  const trackTitles = { ...currentTitles[selectedSummaryTrack] };
                  trackTitles[activeLang] = e.target.value;
                  currentTitles[selectedSummaryTrack] = trackTitles;
                  setProfileData({ ...profileData, titles: currentTitles });
                }}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="ej. Senior Software Engineer & SDET Architecture Lead"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Resumen Ejecutivo ({activeLang.toUpperCase()})
              </label>
              <textarea
                rows={5}
                value={(profileData.summary as any)?.[selectedSummaryTrack]?.[activeLang] || ''}
                onChange={(e) => {
                  const currentSummary: any = { ...profileData.summary };
                  const trackSummary = { ...currentSummary[selectedSummaryTrack] };
                  trackSummary[activeLang] = e.target.value;
                  currentSummary[selectedSummaryTrack] = trackSummary;
                  setProfileData({ ...profileData, summary: currentSummary });
                }}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 leading-relaxed"
                placeholder="Redacta la síntesis profesional para este track e idioma..."
              />
            </div>
          </div>
        </div>
      )}

      {/* SUB-SECTION 3: CONTACTO & FOTO */}
      {activeSection === 'contact' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Información de Contacto y Presencia Profesional
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Datos personales mostrados en el encabezado (Hero), footer y metadatos de CV.
            </p>
          </div>

          {/* Photo Uploader */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-700 border-2 border-blue-500/50 flex-shrink-0 flex items-center justify-center">
              {profileData.contact.avatarUrl ? (
                <img
                  src={profileData.contact.avatarUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '';
                  }}
                />
              ) : (
                <User className="w-8 h-8 text-slate-400" />
              )}
            </div>

            <div className="flex-1 w-full space-y-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Foto de Perfil Profesional (URL o Carga Directa)
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={profileData.contact.avatarUrl || ''}
                  onChange={(e) => setProfileData({
                    ...profileData,
                    contact: { ...profileData.contact, avatarUrl: e.target.value }
                  })}
                  placeholder="https://... o ruta de imagen"
                  className="flex-1 text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700"
                />
                <label className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Subir Imagen</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          setProfileData({
                            ...profileData,
                            contact: {
                              ...profileData.contact,
                              avatarUrl: ev.target?.result as string
                            }
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Nombre Completo:
              </label>
              <input
                type="text"
                value={profileData.contact.name}
                onChange={(e) => setProfileData({
                  ...profileData,
                  contact: { ...profileData.contact, name: e.target.value }
                })}
                className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Correo Electrónico:
              </label>
              <input
                type="email"
                value={profileData.contact.email}
                onChange={(e) => setProfileData({
                  ...profileData,
                  contact: { ...profileData.contact, email: e.target.value }
                })}
                className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Teléfono / WhatsApp:
              </label>
              <input
                type="text"
                value={profileData.contact.phone}
                onChange={(e) => setProfileData({
                  ...profileData,
                  contact: { ...profileData.contact, phone: e.target.value }
                })}
                className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Ubicación Geográfica:
              </label>
              <input
                type="text"
                value={profileData.contact.location}
                onChange={(e) => setProfileData({
                  ...profileData,
                  contact: { ...profileData.contact, location: e.target.value }
                })}
                className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Enlace LinkedIn:
              </label>
              <input
                type="url"
                value={profileData.contact.linkedinUrl || profileData.contact.linkedin}
                onChange={(e) => setProfileData({
                  ...profileData,
                  contact: { 
                    ...profileData.contact, 
                    linkedinUrl: e.target.value,
                    linkedin: e.target.value.replace(/^https?:\/\/(www\.)?/, '')
                  }
                })}
                className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Enlace GitHub:
              </label>
              <input
                type="url"
                value={profileData.contact.githubUrl || profileData.contact.github}
                onChange={(e) => setProfileData({
                  ...profileData,
                  contact: { 
                    ...profileData.contact, 
                    githubUrl: e.target.value,
                    github: e.target.value.replace(/^https?:\/\/(www\.)?/, '')
                  }
                })}
                className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700"
              />
            </div>
          </div>
        </div>
      )}

      {/* SUB-SECTION 4: EDUCACIÓN */}
      {activeSection === 'education' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Educación Académica y Títulos
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Instituciones y títulos obtenidos reflejados en el portafolio.
            </p>
          </div>

          <LanguageTabSelector
            activeLang={activeLang}
            onSelectLang={setActiveLang}
            languages={languages}
            label="Visualizando títulos en idioma:"
          />

          <div className="space-y-4">
            {((profileData.education as any)?.[activeLang] || (profileData.education as any)?.es || []).map((edu: any, index: number) => {
              const institution = Array.isArray(edu) ? edu[0] : edu.institution || '';
              const degree = Array.isArray(edu) ? edu[1] : edu.degree || '';
              const dates = Array.isArray(edu) ? edu[2] : edu.dates || '';

              return (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {degree}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {institution}
                    </p>
                    <span className="text-[11px] font-mono text-slate-400">
                      {dates}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODAL: EDIT / CREATE EXPERIENCE ENTRY */}
      {editingExpData && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {isNewExp ? 'Nueva Experiencia Laboral' : `Editar: ${editingExpData.company || 'Empresa'}`}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Diligencia los detalles de la empresa, roles por especialidad y logros clave en todos los idiomas activos.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingExpData(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Basic Company Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Empresa (*):
                  </label>
                  <input
                    type="text"
                    value={editingExpData.company}
                    onChange={(e) => setEditingExpData({ ...editingExpData, company: e.target.value })}
                    placeholder="ej. Globant / Evertec"
                    className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Ubicación (*):
                  </label>
                  <input
                    type="text"
                    value={editingExpData.location}
                    onChange={(e) => setEditingExpData({ ...editingExpData, location: e.target.value })}
                    placeholder="Bogotá, Colombia"
                    className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Modalidad:
                  </label>
                  <select
                    value={editingExpData.modality || 'remote'}
                    onChange={(e) => setEditingExpData({ ...editingExpData, modality: e.target.value as WorkModality })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    <option value="remote">Remoto (Remote)</option>
                    <option value="hybrid">Híbrido (Hybrid)</option>
                    <option value="onsite">Presencial (Onsite)</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Language Selector for Dates & Description */}
              <LanguageTabSelector
                activeLang={activeLang}
                onSelectLang={setActiveLang}
                languages={languages}
                label="Idioma de textos informativos:"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Fechas del Período ({activeLang.toUpperCase()}):
                  </label>
                  <input
                    type="text"
                    value={editingExpData.dates?.[activeLang] || ''}
                    onChange={(e) => {
                      const dates = { ...editingExpData.dates, [activeLang]: e.target.value };
                      setEditingExpData({ ...editingExpData, dates: dates as any });
                    }}
                    placeholder={activeLang === 'es' ? 'Ene 2022 – Presente' : 'Jan 2022 – Present'}
                    className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Descripción Corta de la Empresa ({activeLang.toUpperCase()}):
                  </label>
                  <input
                    type="text"
                    value={editingExpData.companyDescription?.[activeLang] || ''}
                    onChange={(e) => {
                      const desc = { ...editingExpData.companyDescription, [activeLang]: e.target.value };
                      setEditingExpData({ ...editingExpData, companyDescription: desc as any });
                    }}
                    placeholder="Multinacional de desarrollo y soluciones financieras..."
                    className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Role & Achievements Per Technical Track */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Roles y Logros por Especialidad Técnica
                    </span>
                  </div>

                  {/* Track selector */}
                  <div className="flex flex-wrap gap-1.5">
                    {TRACK_KEYS.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedExpTrack(t.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                          selectedExpTrack === t.id
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        {t.label.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Role Title in active language */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Título del Rol en Track [{selectedExpTrack.toUpperCase()}] ({activeLang.toUpperCase()}):
                  </label>
                  <input
                    type="text"
                    value={editingExpData.role?.[selectedExpTrack]?.[activeLang] || ''}
                    onChange={(e) => {
                      const currentRole: any = { ...editingExpData.role };
                      const trackRole = { ...currentRole[selectedExpTrack] };
                      trackRole[activeLang] = e.target.value;
                      currentRole[selectedExpTrack] = trackRole;
                      setEditingExpData({ ...editingExpData, role: currentRole });
                    }}
                    placeholder="ej. Senior SDET Lead Engineer"
                    className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                {/* Bullet Points in active language */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Logros y Responsabilidades Clave ({activeLang.toUpperCase()}):
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const detail = { ...editingExpData.detail };
                        if (!detail[selectedExpTrack]) detail[selectedExpTrack] = {} as any;
                        if (!detail[selectedExpTrack][activeLang]) detail[selectedExpTrack][activeLang] = [];
                        detail[selectedExpTrack][activeLang].push('');
                        setEditingExpData({ ...editingExpData, detail });
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Agregar Logro</span>
                    </button>
                  </div>

                  {((editingExpData.detail?.[selectedExpTrack]?.[activeLang]) || ['']).map((bullet: string, bIdx: number) => (
                    <div key={bIdx} className="flex items-center gap-2">
                      <span className="text-blue-500 font-bold text-xs">•</span>
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) => {
                          const detail = { ...editingExpData.detail };
                          if (!detail[selectedExpTrack]) detail[selectedExpTrack] = {} as any;
                          if (!detail[selectedExpTrack][activeLang]) detail[selectedExpTrack][activeLang] = [];
                          detail[selectedExpTrack][activeLang][bIdx] = e.target.value;
                          setEditingExpData({ ...editingExpData, detail });
                        }}
                        placeholder="Descripción del logro cuantitativo o técnico alcanzado..."
                        className="flex-1 text-xs px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const detail = { ...editingExpData.detail };
                          detail[selectedExpTrack][activeLang] = detail[selectedExpTrack][activeLang].filter((_: any, i: number) => i !== bIdx);
                          setEditingExpData({ ...editingExpData, detail });
                        }}
                        className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-end gap-3 bg-slate-50 dark:bg-slate-900/50">
              <button
                type="button"
                onClick={() => setEditingExpData(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveModalExp}
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
              >
                {isNewExp ? 'Crear Experiencia' : 'Guardar Cambios'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
