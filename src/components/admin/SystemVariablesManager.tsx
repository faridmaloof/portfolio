import { useState } from 'react';
import type { SystemVariables, ProfileTrackConfig, LanguageConfig } from '../../types';
import { 
  getSystemVariables, 
  saveSystemVariables, 
  getTrackConfigs,
  getLanguages,
  saveLanguages,
  detectSchedulingProvider,
  getSettings,
  saveSettings,
  exportFullBackup,
  importFullBackup,
  syncWithBackendDatabase
} from '../../lib/db';
import { 
  Sliders, 
  Save, 
  User, 
  Globe, 
  ShieldCheck,
  Calendar,
  Plus,
  Trash2,
  ExternalLink,
  Database,
  Download,
  Upload,
  RefreshCw,
  Eye
} from 'lucide-react';

interface SystemVariablesManagerProps {
  onNotify: (type: 'success' | 'error', message: string) => void;
}

export function SystemVariablesManager({ onNotify }: SystemVariablesManagerProps) {
  const [vars, setVars] = useState<SystemVariables>(() => getSystemVariables());
  const [tracks] = useState<ProfileTrackConfig[]>(() => getTrackConfigs());
  const [languages, setLanguagesState] = useState<LanguageConfig[]>(() => getLanguages());
  const [settings, setSettingsState] = useState(() => getSettings());
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // New language form state
  const [showAddLang, setShowAddLang] = useState(false);
  const [newLangCode, setNewLangCode] = useState('');
  const [newLangName, setNewLangName] = useState('');
  const [newLangNative, setNewLangNative] = useState('');
  const [newLangFlag, setNewLangFlag] = useState('');

  const handleChange = <K extends keyof SystemVariables>(key: K, value: SystemVariables[K]) => {
    setVars((prev) => {
      const next = { ...prev, [key]: value };
      // Auto-detect scheduling provider when url changes
      if (key === 'schedulingUrl' && typeof value === 'string') {
        next.schedulingProvider = detectSchedulingProvider(value);
      }
      return next;
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    const okVars = saveSystemVariables(vars);
    const okLangs = saveLanguages(languages);
    const okSettings = saveSettings(settings);
    setIsSaving(false);

    if (okVars && okLangs && okSettings) {
      onNotify('success', 'Variables del sistema, idiomas y visibilidad guardadas y sincronizadas con SQLite');
    } else {
      onNotify('error', 'Error al guardar algunas variables del sistema');
    }
  };

  const handleToggleLang = (code: string) => {
    const updated = languages.map(l => l.code === code ? { ...l, isActive: !l.isActive } : l);
    setLanguagesState(updated);
    saveLanguages(updated);
    onNotify('success', `Estado de idioma '${code}' actualizado`);
  };

  const handleAddLanguage = () => {
    if (!newLangCode || !newLangName) {
      onNotify('error', 'El código y nombre del idioma son obligatorios');
      return;
    }
    const cleanCode = newLangCode.trim().toLowerCase();
    if (languages.some(l => l.code === cleanCode)) {
      onNotify('error', `El código de idioma '${cleanCode}' ya existe`);
      return;
    }

    const newLang: LanguageConfig = {
      code: cleanCode,
      name: newLangName.trim(),
      nativeName: newLangNative.trim() || newLangName.trim(),
      flag: newLangFlag.trim() || '🌐',
      isActive: true
    };

    const updated = [...languages, newLang];
    setLanguagesState(updated);
    saveLanguages(updated);
    setNewLangCode('');
    setNewLangName('');
    setNewLangNative('');
    setNewLangFlag('');
    setShowAddLang(false);
    onNotify('success', `Nuevo idioma '${newLang.name}' (${newLang.code}) agregado y habilitado`);
  };

  const handleDeleteLanguage = (code: string) => {
    if (['es', 'en', 'pt'].includes(code)) {
      onNotify('error', 'Los idiomas base (ES, EN, PT) no pueden eliminarse, solo desactivarse');
      return;
    }
    const updated = languages.filter(l => l.code !== code);
    setLanguagesState(updated);
    saveLanguages(updated);
    onNotify('success', `Idioma '${code}' eliminado`);
  };

  const handleSyncSQLite = async () => {
    setIsSyncing(true);
    try {
      const ok = await syncWithBackendDatabase();
      if (ok) {
        setVars(getSystemVariables());
        setLanguagesState(getLanguages());
        setSettingsState(getSettings());
        onNotify('success', 'Sincronización bidireccional con SQLite completada exitosamente');
      } else {
        onNotify('error', 'No se pudo completar la sincronización con SQLite');
      }
    } catch {
      onNotify('error', 'Error de red durante la sincronización');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleExportJSON = () => {
    const jsonStr = exportFullBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-full-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    onNotify('success', 'Copia de seguridad completa exportada en JSON');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const result = importFullBackup(text);
        if (result.success) {
          setVars(getSystemVariables());
          setLanguagesState(getLanguages());
          setSettingsState(getSettings());
          onNotify('success', 'Datos del sistema y perfiles restaurados correctamente desde JSON');
        } else {
          onNotify('error', `Error al importar: ${result.error}`);
        }
      } catch {
        onNotify('error', 'Archivo JSON no válido');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Variables Generales del Sistema
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Parámetros estándar de identidad, contacto, agendamiento (Calendly/Outlook/Google), idiomas y persistencia SQLite.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSyncSQLite}
            disabled={isSyncing}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
            title="Sincronizar con base de datos SQLite"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-blue-600' : ''}`} />
            <span>{isSyncing ? 'Sincronizando...' : 'Sync SQLite'}</span>
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs font-semibold rounded-xl shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Guardando...' : 'Guardar Variables'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* COLUMN 1 & 2: Identidad, Agendamiento & Idiomas */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* SECTION 1: Agendamiento & Entrevistas */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Integración de Agendamiento de Reuniones / Entrevistas
                </h3>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800">
                Calendly · Google · Outlook
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Permite a reclutadores y líderes de ingeniería agendar entrevistas o llamadas técnicas directamente desde el portafolio.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  URL de Agendamiento (Calendly, Google Calendar, Microsoft Bookings, Outlook o Personalizada):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={vars.schedulingUrl || vars.calendlyUrl || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      handleChange('schedulingUrl', val);
                      handleChange('calendlyUrl', val);
                    }}
                    placeholder="https://calendly.com/tu-usuario o https://calendar.app.google/... o https://outlook.office365.com/owa/calendar/..."
                    className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                  {vars.schedulingUrl && (
                    <a
                      href={vars.schedulingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-200 text-xs transition-colors shrink-0"
                      title="Probar enlace"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Proveedor Detectado / Seleccionado:
                </label>
                <select
                  value={vars.schedulingProvider || 'calendly'}
                  onChange={(e) => handleChange('schedulingProvider', e.target.value as any)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="calendly">Calendly (calendly.com)</option>
                  <option value="google_calendar">Google Calendar (calendar.google.com / calendar.app.google)</option>
                  <option value="outlook">Microsoft Bookings / Outlook Calendar</option>
                  <option value="custom">Enlace de Agendamiento Personalizado</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Texto del Botón CTA (Español):
                </label>
                <input
                  type="text"
                  value={vars.schedulingCtaText?.es || ''}
                  onChange={(e) => {
                    const prev = vars.schedulingCtaText || { es: '', en: '', pt: '' };
                    handleChange('schedulingCtaText', { ...prev, es: e.target.value });
                  }}
                  placeholder="Agendar Llamada / Entrevista Técnica"
                  className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Texto del Botón CTA (English):
                </label>
                <input
                  type="text"
                  value={vars.schedulingCtaText?.en || ''}
                  onChange={(e) => {
                    const prev = vars.schedulingCtaText || { es: '', en: '', pt: '' };
                    handleChange('schedulingCtaText', { ...prev, en: e.target.value });
                  }}
                  placeholder="Schedule Technical Interview / Call"
                  className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Texto del Botón CTA (Português):
                </label>
                <input
                  type="text"
                  value={vars.schedulingCtaText?.pt || ''}
                  onChange={(e) => {
                    const prev = vars.schedulingCtaText || { es: '', en: '', pt: '' };
                    handleChange('schedulingCtaText', { ...prev, pt: e.target.value });
                  }}
                  placeholder="Agendar Reunião Técnica"
                  className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Gestión de Idiomas Ampliable */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Idiomas Disponibles en el Sistema
                </h3>
              </div>

              <button
                onClick={() => setShowAddLang(!showAddLang)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold hover:bg-blue-100 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showAddLang ? 'Cancelar' : 'Agregar Idioma'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Configura los idiomas disponibles para los visitantes y perfiles técnicos. Los idiomas activos se muestran en el selector superior de la landing.
            </p>

            {/* Add Language Form Drawer */}
            {showAddLang && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3 animate-in fade-in">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Registrar Nuevo Idioma
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Código (ej: fr, de, it):
                    </label>
                    <input
                      type="text"
                      maxLength={5}
                      value={newLangCode}
                      onChange={(e) => setNewLangCode(e.target.value)}
                      placeholder="fr"
                      className="w-full text-xs px-2.5 py-1.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Nombre (ej: Francés):
                    </label>
                    <input
                      type="text"
                      value={newLangName}
                      onChange={(e) => setNewLangName(e.target.value)}
                      placeholder="Francés"
                      className="w-full text-xs px-2.5 py-1.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Nativo (ej: Français):
                    </label>
                    <input
                      type="text"
                      value={newLangNative}
                      onChange={(e) => setNewLangNative(e.target.value)}
                      placeholder="Français"
                      className="w-full text-xs px-2.5 py-1.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Bandera / Emoji:
                    </label>
                    <input
                      type="text"
                      value={newLangFlag}
                      onChange={(e) => setNewLangFlag(e.target.value)}
                      placeholder="🇫🇷"
                      className="w-full text-xs px-2.5 py-1.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-center"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleAddLanguage}
                    className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-sm"
                  >
                    Guardar Idioma
                  </button>
                </div>
              </div>
            )}

            {/* List of Languages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {languages.map((l) => (
                <div
                  key={l.code}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    l.isActive
                      ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800'
                      : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-700 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{l.flag || '🌐'}</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {l.name}
                        </span>
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                          {l.code}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                        {l.nativeName}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleToggleLang(l.code)}
                      className={`text-[11px] px-2 py-0.5 rounded font-semibold transition-colors cursor-pointer ${
                        l.isActive
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300'
                          : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                      }`}
                      title={l.isActive ? 'Desactivar idioma' : 'Activar idioma'}
                    >
                      {l.isActive ? 'Activo' : 'Inactivo'}
                    </button>

                    {!['es', 'en', 'pt'].includes(l.code) && (
                      <button
                        type="button"
                        onClick={() => handleDeleteLanguage(l.code)}
                        className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 cursor-pointer"
                        title="Eliminar idioma"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: Identidad & Contacto */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700/60">
              <User className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Identidad & Datos de Contacto Globales
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nombre Completo:
                </label>
                <input
                  type="text"
                  value={vars.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tagline / Cargo Profesional Global:
                </label>
                <input
                  type="text"
                  value={vars.professionalTagline}
                  onChange={(e) => handleChange('professionalTagline', e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Principal:
                </label>
                <input
                  type="email"
                  value={vars.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Teléfono Móvil:
                </label>
                <input
                  type="text"
                  value={vars.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Número de WhatsApp (con indicativo):
                </label>
                <input
                  type="text"
                  value={vars.whatsappNumber}
                  onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Ubicación / Ciudad & País:
                </label>
                <input
                  type="text"
                  value={vars.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Estado de Disponibilidad:
                </label>
                <input
                  type="text"
                  value={vars.availabilityStatus}
                  onChange={(e) => handleChange('availabilityStatus', e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Años de Experiencia Globales:
                </label>
                <input
                  type="text"
                  value={vars.yearsOfExperience}
                  onChange={(e) => handleChange('yearsOfExperience', e.target.value)}
                  placeholder="15+"
                  className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 3: Comportamiento, Fallback & SQLite Backup */}
        <div className="space-y-6">
          
          {/* Landing Behavior & Profile Fallback */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700/60">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Comportamiento & Perfil por Defecto
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Perfil Predeterminado de Inicio (Fallback):
                </label>
                <select
                  value={vars.defaultProfile}
                  onChange={(e) => handleChange('defaultProfile', e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  {tracks.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} (?profile={t.id})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  Si un reclutador entra a la raíz sin parámetro ?profile=, o si solicita un perfil no existente, el sistema mostrará automáticamente este perfil.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Idioma Predeterminado:
                </label>
                <select
                  value={vars.defaultLanguage}
                  onChange={(e) => handleChange('defaultLanguage', e.target.value as any)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  {languages.filter(l => l.isActive).map(l => (
                    <option key={l.code} value={l.code}>
                      {l.flag} {l.name} ({l.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Toggles */}
              <div className="pt-2 space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={vars.autoDetectLanguage}
                    onChange={(e) => handleChange('autoDetectLanguage', e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                  />
                  <div>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                      Auto-detectar idioma del visitante
                    </span>
                    <span className="text-[11px] text-slate-400 block">
                      Detecta automáticamente el idioma preferido del navegador del usuario.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={vars.allowUrlProfileOverride}
                    onChange={(e) => handleChange('allowUrlProfileOverride', e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                  />
                  <div>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                      Permitir activación por URL (?profile=...)
                    </span>
                    <span className="text-[11px] text-slate-400 block">
                      Habilita que los parámetros en la URL seleccionen el perfil técnico para el reclutador.
                    </span>
                  </div>
                </label>
              </div>

              {/* Global Section Visibility Defaults */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <Eye className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Visibilidad Global de Secciones
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(settings.visibility || {}).map(([secKey, isVis]) => (
                    <label key={secKey} className="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-700/40">
                      <input
                        type="checkbox"
                        checked={Boolean(isVis)}
                        onChange={(e) => {
                          const updatedVis = {
                            ...settings.visibility,
                            [secKey]: e.target.checked
                          };
                          setSettingsState({ ...settings, visibility: updatedVis });
                        }}
                        className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                      />
                      <span className="capitalize text-slate-700 dark:text-slate-300 text-[11px]">
                        {secKey}
                      </span>
                    </label>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 mt-2">
                  Configuración base: los perfiles técnicos heredan esta visibilidad a menos que configuren una regla específica.
                </p>
              </div>
            </div>
          </div>

          {/* SQLite Backup & JSON Sync */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700/60">
              <Database className="w-4 h-4 text-purple-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Base de Datos SQLite & Copias de Seguridad
              </h3>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Todos los perfiles, stacks técnicos, variables y servicios se sincronizan automáticamente con la base de datos SQLite en backend.
            </p>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleExportJSON}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar Copia de Seguridad JSON</span>
              </button>

              <label className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>Restaurar desde Archivo JSON</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJSON}
                  className="hidden"
                />
              </label>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
