import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { TrackType, Language } from '../types';
import { 
  getSettings, 
  saveSettings, 
  getAdmins, 
  saveAdmin, 
  deleteAdmin, 
  changeAdminPassword,
  isUserAuthenticated, 
  getCurrentUser, 
  logout,
  type AdminUser,
  type PortfolioSettings
} from '../lib/db';
import { 
  Shield, 
  Users, 
  Settings as SettingsIcon, 
  ExternalLink, 
  LogOut, 
  Briefcase, 
  Layers, 
  Sliders, 
  Sparkles, 
  Palette, 
  Search,
  Check,
  Plus,
  Trash2,
  KeyRound,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { TracksManager } from '../components/admin/TracksManager';
import { SystemVariablesManager } from '../components/admin/SystemVariablesManager';
import { CVExperienceManager } from '../components/admin/CVExperienceManager';
import { DesignTemplatesManager } from '../components/admin/DesignTemplatesManager';
import { ServicesManager } from '../components/admin/ServicesManager';
import { SEOManager } from '../components/admin/SEOManager';

type DashboardTab = 'profiles' | 'tracks' | 'design' | 'services' | 'seo' | 'variables' | 'settings' | 'admins';

export function AdminDashboard() {
  const navigate = useNavigate();
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState<DashboardTab>('profiles');

  // Settings state
  const [settings, setSettings] = useState<PortfolioSettings>(() => getSettings());
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Admins state
  const [admins, setAdmins] = useState<AdminUser[]>(() => getAdmins());
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [showResetPassModal, setShowResetPassModal] = useState<AdminUser | null>(null);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminUsername, setNewAdminUsername] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [newAdminRole, setNewAdminRole] = useState<'superadmin' | 'admin' | 'editor'>('admin');
  const [manualPassword, setManualPassword] = useState('');

  // Notification message
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (!isUserAuthenticated()) {
      console.warn('⛔ [AdminDashboard] User is not authenticated. Redirecting to /admin...');
      navigate('/admin');
      return;
    }

    const admin = getCurrentUser();
    setCurrentAdmin(admin);
    setSettings(getSettings());
    setAdmins(getAdmins());
  }, [navigate]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const success = saveSettings(settings);
    if (success) {
      setSettingsSaved(true);
      showNotification('success', 'Ajustes guardados correctamente.');
      setTimeout(() => setSettingsSaved(false), 3000);
    } else {
      showNotification('error', 'Error al guardar los ajustes.');
    }
  };

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail.trim() || !newAdminPassword.trim()) {
      showNotification('error', 'Correo y contraseña son requeridos.');
      return;
    }

    const newAdmin: AdminUser = {
      id: Date.now().toString(),
      email: newAdminEmail.trim(),
      username: newAdminUsername.trim() || newAdminEmail.split('@')[0],
      password: newAdminPassword.trim(),
      role: newAdminRole,
      mustChangePassword: false,
      resetCode: null,
      resetCodeExpiry: null,
      createdAt: new Date().toISOString()
    };

    const success = saveAdmin(newAdmin);
    if (success) {
      setAdmins(getAdmins());
      setShowAddAdminModal(false);
      setNewAdminEmail('');
      setNewAdminUsername('');
      setNewAdminPassword('');
      showNotification('success', `Administrador ${newAdmin.email} agregado.`);
    } else {
      showNotification('error', 'Error al agregar administrador.');
    }
  };

  const handleDeleteAdmin = (adminId: string) => {
    const res = deleteAdmin(adminId);
    if (res.success) {
      setAdmins(getAdmins());
      showNotification('success', 'Administrador eliminado.');
    } else {
      showNotification('error', res.error || 'Error al eliminar.');
    }
  };

  const handleResetAdminPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showResetPassModal || !manualPassword.trim()) return;

    changeAdminPassword(showResetPassModal.id, manualPassword.trim());
    setAdmins(getAdmins());
    setShowResetPassModal(null);
    setManualPassword('');
    showNotification('success', `Contraseña cambiada para ${showResetPassModal.email}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Admin Console</h1>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                  {currentAdmin?.role || 'Superadmin'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentAdmin?.email || 'admin'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Ver Portafolio en Vivo</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-300 text-xs font-medium transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>

        {/* Tab Selector Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 border-t border-slate-200 dark:border-slate-700/60 overflow-x-auto py-1">
          {[
            { id: 'profiles', label: 'CV Principal / Experiencia', icon: Briefcase },
            { id: 'tracks', label: 'Perfiles Técnicos (Tracks)', icon: Layers },
            { id: 'design', label: 'Diseño & Templates', icon: Palette },
            { id: 'services', label: 'Servicios Profesionales', icon: Sparkles },
            { id: 'seo', label: 'SEO & Metadatos', icon: Search },
            { id: 'variables', label: 'Variables del Sistema', icon: Sliders },
            { id: 'settings', label: 'Ajustes & Visibilidad', icon: SettingsIcon },
            { id: 'admins', label: `Administradores (${admins.length})`, icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as DashboardTab)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Floating Notification */}
      {feedback && (
        <div className={`fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm transition-all ${
          feedback.type === 'success' 
            ? 'bg-green-600 text-white shadow-green-600/30' 
            : 'bg-red-600 text-white shadow-red-600/30'
        }`}>
          {feedback.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: CV PRINCIPAL / EXPERIENCIA */}
        {activeTab === 'profiles' && (
          <CVExperienceManager onNotify={showNotification} />
        )}

        {/* TAB 2: TRACKS */}
        {activeTab === 'tracks' && (
          <TracksManager onNotify={showNotification} />
        )}

        {/* TAB 3: DESIGN & TEMPLATES */}
        {activeTab === 'design' && (
          <DesignTemplatesManager onNotify={showNotification} />
        )}

        {/* TAB 4: SERVICES */}
        {activeTab === 'services' && (
          <ServicesManager onNotify={showNotification} />
        )}

        {/* TAB 5: SEO */}
        {activeTab === 'seo' && (
          <SEOManager onNotify={showNotification} />
        )}

        {/* TAB 6: VARIABLES */}
        {activeTab === 'variables' && (
          <SystemVariablesManager onNotify={showNotification} />
        )}

        {/* TAB 7: SETTINGS & VISIBILITY */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Ajustes Generales del Portafolio</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Define las opciones por defecto al cargar el portafolio para nuevos visitantes.
                  </p>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{settingsSaved ? '¡Guardado!' : 'Guardar Cambios'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Perfil Principal por Defecto (Track Técnico)
                  </label>
                  <select
                    value={settings.defaultProfile}
                    onChange={(e) => setSettings({ ...settings, defaultProfile: e.target.value as TrackType })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-900 dark:text-white"
                  >
                    <option value="combined">Combinado (Liderazgo Senior SDET & Full Stack · 15+ Años)</option>
                    <option value="sdet">SDET Lead (Software Dev Engineer in Test · Automatización & CI/CD)</option>
                    <option value="qa">QA Specialist (Especialista en Automatización & Calidad ISTQB v4.0)</option>
                    <option value="fullstack">Senior Full Stack Developer (React, TypeScript, .NET & Cloud)</option>
                    <option value="backend">Senior Backend Engineer (.NET 9, Java Spring Boot, APIs & SQL)</option>
                    <option value="dev">Senior Software Developer (Clean Architecture & Algoritmos)</option>
                  </select>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                    Define la orientación técnica inicial con la que se cargarán el título, resumen profesional, skills y orden de certificaciones.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Idioma Base por Defecto
                  </label>
                  <select
                    value={settings.defaultLanguage}
                    onChange={(e) => setSettings({ ...settings, defaultLanguage: e.target.value as Language })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-900 dark:text-white"
                  >
                    <option value="es">Español (ES) - Base Principal</option>
                    <option value="en">English (EN) - Global Default</option>
                    <option value="pt">Português (PT) - Brasil & Portugal</option>
                  </select>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                    Idioma inicial para visitantes que ingresen sin parámetros de idioma en la URL.
                  </p>
                </div>
              </div>

              {/* Language Auto-Detection Toggle */}
              <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-800/60 bg-blue-50/50 dark:bg-blue-950/20">
                <label className="flex items-start justify-between gap-4 cursor-pointer">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      Detección Inteligente de Idioma por Navegador / Sistema Operativo
                    </span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                      Detecta el país o configuración del navegador: activa Español para usuarios de habla hispana, Portugués para Brasil/Portugal, y asigna Inglés por defecto para EE.UU. o cualquier otro país internacional. Inicialmente parte en Español.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.autoDetectLanguage !== false}
                    onChange={(e) => setSettings({ ...settings, autoDetectLanguage: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mt-1"
                  />
                </label>
              </div>

              {/* Visibility Controls */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                  Visibilidad de Secciones en la Landing Page
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { key: 'hero', label: 'Encabezado & Foto de Perfil' },
                    { key: 'summary', label: 'Resumen Profesional & Fortalezas' },
                    { key: 'services', label: 'Servicios Profesionales' },
                    { key: 'experience', label: 'Experiencia Laboral' },
                    { key: 'githubProjects', label: 'Vitrina de Proyectos GitHub' },
                    { key: 'certifications', label: 'Certificaciones Técnicas (120+)' },
                    { key: 'education', label: 'Educación & Títulos' },
                  ].map(({ key, label }) => (
                    <label
                      key={key}
                      className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 cursor-pointer"
                    >
                      <span className="text-xs font-medium text-slate-800 dark:text-slate-200">{label}</span>
                      <input
                        type="checkbox"
                        checked={settings.visibility?.[key as keyof typeof settings.visibility] !== false}
                        onChange={(e) => setSettings({
                          ...settings,
                          visibility: {
                            ...settings.visibility,
                            [key]: e.target.checked
                          }
                        })}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </form>
        )}

        {/* TAB 8: ADMINS */}
        {activeTab === 'admins' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Usuarios Administradores</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Gestiona las credenciales de acceso al panel administrativo.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddAdminModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Crear Administrador</span>
              </button>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-750 text-slate-500 uppercase font-semibold border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="px-6 py-3.5">Usuario / Correo</th>
                      <th className="px-6 py-3.5">Rol</th>
                      <th className="px-6 py-3.5">Fecha Creación</th>
                      <th className="px-6 py-3.5 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                    {admins.map((adm) => (
                      <tr key={adm.id} className="hover:bg-slate-50 dark:hover:bg-slate-750/50">
                        <td className="px-6 py-4">
                          <span className="font-bold text-slate-900 dark:text-white block">{adm.email}</span>
                          <span className="text-slate-400 text-[11px] font-mono">@{adm.username}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full font-semibold text-[10px] uppercase ${
                            adm.role === 'superadmin'
                              ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300'
                              : 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                          }`}>
                            {adm.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-500">
                          {adm.createdAt ? new Date(adm.createdAt).toLocaleDateString() : '—'}
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => setShowResetPassModal(adm)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-blue-500 transition-colors cursor-pointer"
                            title="Cambiar contraseña"
                          >
                            <KeyRound className="w-4 h-4" />
                          </button>
                          {admins.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleDeleteAdmin(adm.id)}
                              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-red-500 transition-colors cursor-pointer"
                              title="Eliminar administrador"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* CREATE ADMIN MODAL */}
      {showAddAdminModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
              Nuevo Administrador
            </h3>
            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Correo Electrónico (*):
                </label>
                <input
                  type="email"
                  required
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  placeholder="admin@ejemplo.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nombre de Usuario (Opcional):
                </label>
                <input
                  type="text"
                  value={newAdminUsername}
                  onChange={(e) => setNewAdminUsername(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  placeholder="faridmaloof"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Contraseña Inicial (*):
                </label>
                <input
                  type="password"
                  required
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Rol de Permisos:
                </label>
                <select
                  value={newAdminRole}
                  onChange={(e) => setNewAdminRole(e.target.value as any)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                >
                  <option value="admin">Admin Regular</option>
                  <option value="superadmin">Superadmin</option>
                  <option value="editor">Editor de Contenido</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setShowAddAdminModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm"
                >
                  Crear Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RESET PASSWORD MODAL */}
      {showResetPassModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Cambiar Contraseña
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Actualizar contraseña para: <span className="font-semibold text-slate-800 dark:text-slate-200">{showResetPassModal.email}</span>
            </p>

            <form onSubmit={handleResetAdminPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nueva Contraseña:
                </label>
                <input
                  type="password"
                  required
                  value={manualPassword}
                  onChange={(e) => setManualPassword(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowResetPassModal(null);
                    setManualPassword('');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm"
                >
                  Guardar Contraseña
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
