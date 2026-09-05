import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { ProfileData, Language, TrackType } from '../types';
import { defaultProfileData } from '../data/profile';
import { 
  getProfiles, 
  saveProfile, 
  deleteProfile, 
  getSettings, 
  saveSettings, 
  getAdmins, 
  saveAdmin, 
  deleteAdmin, 
  changeAdminPassword,
  getServices,
  saveServices,
  isUserAuthenticated, 
  getCurrentUser, 
  logout,
  type AdminUser,
  type PortfolioSettings,
  type ServiceItem
} from '../lib/db';
import { generatePDF } from '../lib/pdfGenerator';
import { 
  Upload, 
  Trash2, 
  Edit, 
  FileJson, 
  FileText, 
  Plus, 
  Check, 
  X, 
  Shield, 
  Users, 
  Settings as SettingsIcon, 
  Globe, 
  ExternalLink, 
  LogOut, 
  Briefcase, 
  Award, 
  GraduationCap, 
  Sparkles,
  KeyRound,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

type DashboardTab = 'profiles' | 'services' | 'settings' | 'admins' | 'seo';

export function AdminDashboard() {
  const navigate = useNavigate();
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState<DashboardTab>('profiles');
  
  // Profiles state
  const [profiles, setProfiles] = useState<ProfileData[]>([]);
  const [editingProfile, setEditingProfile] = useState<ProfileData | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Settings state
  const [settings, setSettings] = useState<PortfolioSettings>(getSettings());
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Admins state
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [showResetPassModal, setShowResetPassModal] = useState<AdminUser | null>(null);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminUsername, setNewAdminUsername] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [newAdminRole, setNewAdminRole] = useState<'superadmin' | 'admin' | 'editor'>('admin');
  const [manualPassword, setManualPassword] = useState('');

  // Services state
  const [services, setServicesState] = useState<ServiceItem[]>([]);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);

  // Notification / Alert message
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (!isUserAuthenticated()) {
      console.warn('⛔ [AdminDashboard] User is not authenticated. Redirecting to /admin...');
      navigate('/admin');
      return;
    }

    const admin = getCurrentUser();
    setCurrentAdmin(admin);
    loadAllData();
  }, [navigate]);

  const loadAllData = () => {
    const loadedProfiles = getProfiles();
    if (loadedProfiles.length === 0) {
      saveProfile(defaultProfileData);
      setProfiles([defaultProfileData]);
    } else {
      setProfiles(loadedProfiles);
    }

    setSettings(getSettings());
    setAdmins(getAdmins());
    setServicesState(getServices());
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleLogout = () => {
    console.log('👋 [AdminDashboard] Logging out...');
    logout();
    navigate('/admin');
  };

  // Profile operations
  const handleExportJSON = (profile: ProfileData) => {
    const blob = new Blob([JSON.stringify(profile, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `profile-${profile.contact.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotification('success', 'Perfil JSON exportado.');
  };

  const handleExportPDF = (profile: ProfileData, lang: Language = 'es') => {
    generatePDF(profile, lang);
    showNotification('success', `Generando CV en PDF (${lang.toUpperCase()})...`);
  };

  const handleDeleteProfile = (email: string) => {
    if (profiles.length <= 1) {
      showNotification('error', 'No puedes eliminar el único perfil activo.');
      return;
    }
    if (confirm(`¿Estás seguro de eliminar el perfil con correo "${email}"?`)) {
      deleteProfile(email);
      loadAllData();
      showNotification('success', 'Perfil eliminado correctamente.');
    }
  };

  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (!json.contact || !json.summary) {
          throw new Error('Estructura de perfil inválida');
        }
        const success = saveProfile(json);
        if (success) {
          loadAllData();
          showNotification('success', '¡Perfil importado exitosamente!');
        }
      } catch (error) {
        console.error('Error al parsear JSON:', error);
        showNotification('error', 'Archivo JSON inválido o estructura incorrecta.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleSaveProfile = (profile: ProfileData) => {
    const success = saveProfile(profile);
    if (success) {
      loadAllData();
      setShowProfileModal(false);
      setEditingProfile(null);
      showNotification('success', 'Perfil guardado con éxito.');
    } else {
      showNotification('error', 'Error al guardar el perfil.');
    }
  };

  // Settings operations
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings(settings);
    setSettingsSaved(true);
    showNotification('success', 'Configuraciones y visibilidad actualizadas.');
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  // Admin operations
  const handleCreateAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail.trim() || !newAdminPassword.trim()) {
      showNotification('error', 'Correo y contraseña son requeridos.');
      return;
    }

    const newAdmin: AdminUser = {
      id: String(Date.now()),
      email: newAdminEmail.trim(),
      username: newAdminUsername.trim() || newAdminEmail.split('@')[0],
      password: newAdminPassword.trim(),
      role: newAdminRole,
      mustChangePassword: false,
      resetCode: null,
      resetCodeExpiry: null,
      createdAt: new Date().toISOString()
    };

    saveAdmin(newAdmin);
    setAdmins(getAdmins());
    setShowAddAdminModal(false);
    setNewAdminEmail('');
    setNewAdminUsername('');
    setNewAdminPassword('');
    showNotification('success', `Administrador ${newAdmin.email} registrado.`);
  };

  const handleDeleteAdmin = (adminId: string) => {
    if (currentAdmin && currentAdmin.id === adminId) {
      showNotification('error', 'No puedes eliminar tu propia cuenta en sesión.');
      return;
    }
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

  // Services operations
  const handleSaveService = (service: ServiceItem) => {
    const existingIndex = services.findIndex(s => s.id === service.id);
    let updated: ServiceItem[];
    if (existingIndex >= 0) {
      updated = [...services];
      updated[existingIndex] = service;
    } else {
      updated = [...services, service];
    }
    saveServices(updated);
    setServicesState(updated);
    setShowServiceModal(false);
    setEditingService(null);
    showNotification('success', 'Servicio guardado.');
  };

  const handleDeleteService = (serviceId: string) => {
    const filtered = services.filter(s => s.id !== serviceId);
    saveServices(filtered);
    setServicesState(filtered);
    showNotification('success', 'Servicio eliminado.');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-sm">
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
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-300 text-xs font-medium transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 border-t border-slate-200 dark:border-slate-700/60 overflow-x-auto py-1">
          <button
            onClick={() => setActiveTab('profiles')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'profiles'
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Perfiles ({profiles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'services'
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Servicios Profesionales ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <SettingsIcon className="w-4 h-4" />
            <span>Ajustes & Visibilidad</span>
          </button>

          <button
            onClick={() => setActiveTab('admins')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'admins'
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Administradores ({admins.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'seo'
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>SEO & Metadatos</span>
          </button>
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
        {/* TAB 1: PROFILES */}
        {activeTab === 'profiles' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Gestión de Perfiles y CVs</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Crea, importa, edita y exporta perfiles profesionales para QA Automation y Full Stack.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <label className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer">
                  <Upload className="w-4 h-4 text-blue-500" />
                  <span>Importar JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJSON}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={() => {
                    setEditingProfile(defaultProfileData);
                    setShowProfileModal(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs font-semibold rounded-lg shadow-sm shadow-blue-500/20 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nuevo Perfil</span>
                </button>
              </div>
            </div>

            {/* Profiles Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profiles.map((profile, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                          {profile.contact.name}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{profile.contact.email}</p>
                      </div>
                      <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
                        {profile.experience?.length || 0} exp
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                      {profile.summary.combined?.es || profile.summary.qa.es}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        <Award className="w-3 h-3" />
                        {profile.certifications?.es?.length || 0} Certs
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        <GraduationCap className="w-3 h-3" />
                        {profile.education?.es?.length || 0} Edu
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleExportJSON(profile)}
                        className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-medium transition-colors"
                      >
                        <FileJson className="w-3.5 h-3.5 text-blue-500" />
                        <span>JSON</span>
                      </button>

                      <button
                        onClick={() => handleExportPDF(profile, 'es')}
                        className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-medium transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-purple-500" />
                        <span>PDF (ES)</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setEditingProfile(profile);
                          setShowProfileModal(true);
                        }}
                        className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-lg text-xs font-medium transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Editar</span>
                      </button>

                      <button
                        onClick={() => handleDeleteProfile(profile.contact.email)}
                        className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-300 rounded-lg text-xs font-medium transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Eliminar</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SERVICES */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Servicios Profesionales Ofrecidos</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Configura los paquetes y servicios especializados visibles en la sección de servicios del portafolio.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingService({
                    id: `s-${Date.now()}`,
                    title: { es: '', en: '' },
                    description: { es: '', en: '' },
                    icon: 'Bot',
                    keywords: []
                  });
                  setShowServiceModal(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar Servicio</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                            {srv.title.es || 'Sin título'}
                          </h3>
                          <p className="text-xs text-slate-400 italic">
                            {srv.title.en || 'No EN title'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingService(srv);
                            setShowServiceModal(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-blue-500 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(srv.id)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                      {srv.description.es}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-4 italic leading-relaxed">
                      {srv.description.en}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                    {srv.keywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SETTINGS & VISIBILITY */}
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

              {/* Guía Explicativa de Perfiles Profesionales */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-750">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2.5">
                  Significado y Alcance de Cada Perfil Técnico
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block mb-1">Combinado (General)</span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                      Muestra la visión completa de 15+ años integrando SDET, desarrollo de software full-stack, DevOps y liderazgo.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mb-1">SDET Lead</span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                      Foco en ingeniería de pruebas automatizadas con código (Playwright, Selenium, Robot Framework), testing de APIs y calidad con IA.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block mb-1">QA Specialist</span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                      Estrategia de calidad ISTQB CTFL v4.0, gestión de pruebas funcionales, regresivas, rendimiento y aseguramiento de entregas.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block mb-1">Full Stack Developer</span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                      Soluciones web modernas frontend (React, TypeScript) conectadas a backends corporativos (.NET, Java) y servicios en la nube.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block mb-1">Backend Engineer</span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                      Arquitectura de microservicios, APIs REST de alto desempeño, .NET 9, Java Spring Boot, PostgreSQL, SQL Server y Docker.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                    <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 block mb-1">Software Dev</span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                      Desarrollo de aplicaciones bajo Clean Architecture, patrones de diseño SOLID, buenas prácticas de desarrollo y DevOps.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section Visibility Toggles */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 pt-2">
                  Visibilidad de Secciones del Portafolio
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { key: 'hero', label: 'Encabezado Hero & Contacto' },
                    { key: 'summary', label: 'Resumen Profesional & Skills' },
                    { key: 'experience', label: 'Línea de Tiempo de Experiencia' },
                    { key: 'earlyCareer', label: 'Mostrar Carrera Temprana (< 2021)' },
                    { key: 'education', label: 'Educación y Estudios' },
                    { key: 'certifications', label: 'Certificaciones Profesionales' },
                    { key: 'skills', label: 'Herramientas y Tecnologías' },
                    { key: 'languages', label: 'Idiomas' },
                    { key: 'services', label: 'Servicios Profesionales' },
                    { key: 'githubProjects', label: 'Proyectos Destacados de GitHub' },
                  ].map(({ key, label }) => (
                    <label
                      key={key}
                      className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-medium text-slate-800 dark:text-slate-200">{label}</span>
                      <input
                        type="checkbox"
                        checked={Boolean(settings.visibility[key as keyof typeof settings.visibility])}
                        onChange={(e) => {
                          setSettings({
                            ...settings,
                            visibility: {
                              ...settings.visibility,
                              [key]: e.target.checked
                            }
                          });
                        }}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </form>
        )}

        {/* TAB 4: ADMINS */}
        {activeTab === 'admins' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Administradores del Sistema</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Cuentas con acceso al portal de administración para gestionar contenidos.
                </p>
              </div>

              <button
                onClick={() => setShowAddAdminModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Administrador</span>
              </button>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/40 text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                    <th className="py-3 px-4">Usuario / Correo</th>
                    <th className="py-3 px-4">Rol</th>
                    <th className="py-3 px-4">Fecha Creación</th>
                    <th className="py-3 px-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-xs">
                  {admins.map((adm) => (
                    <tr key={adm.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900 dark:text-white">{adm.email}</div>
                        <div className="text-slate-400 text-[11px]">@{adm.username}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          adm.role === 'superadmin' 
                            ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300'
                            : 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                        }`}>
                          {adm.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                        {new Date(adm.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => setShowResetPassModal(adm)}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded text-slate-700 dark:text-slate-200 transition-colors text-[11px]"
                          >
                            <KeyRound className="w-3.5 h-3.5" />
                            <span>Contraseña</span>
                          </button>
                          {admins.length > 1 && adm.id !== currentAdmin?.id && (
                            <button
                              onClick={() => handleDeleteAdmin(adm.id)}
                              className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: SEO */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
              <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Optimización para Motores de Búsqueda (SEO)</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Configura cómo se presenta tu portafolio en Google, LinkedIn y redes sociales.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Título Meta (Meta Title)
                  </label>
                  <input
                    type="text"
                    value={settings.seo?.metaTitle || ''}
                    onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, metaTitle: e.target.value } })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Descripción Meta (Meta Description)
                  </label>
                  <textarea
                    rows={3}
                    value={settings.seo?.metaDescription || ''}
                    onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, metaDescription: e.target.value } })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Palabras Clave (Keywords)
                  </label>
                  <input
                    type="text"
                    value={settings.seo?.keywords || ''}
                    onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, keywords: e.target.value } })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      saveSettings(settings);
                      showNotification('success', 'Metadatos SEO guardados.');
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
                  >
                    <Check className="w-4 h-4" />
                    <span>Guardar Metadatos SEO</span>
                  </button>
                </div>
              </div>

              {/* SERP Search Preview Card */}
              <div className="mt-8 p-5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 block">
                  Vista Previa en Resultados de Búsqueda (Google Preview)
                </span>
                <div className="space-y-1">
                  <div className="text-xs text-slate-600 dark:text-slate-400">https://faridmaloof.com</div>
                  <h4 className="text-base text-blue-700 dark:text-blue-400 font-medium hover:underline cursor-pointer">
                    {settings.seo?.metaTitle || 'Farid Maloof S. | Portafolio'}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {settings.seo?.metaDescription || 'Portafolio profesional y CV interactivo de Farid Maloof S.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL: ADD ADMIN */}
      {showAddAdminModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 dark:text-white">Registrar Nuevo Administrador</h3>
              <button onClick={() => setShowAddAdminModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nombre de Usuario (opcional)
                </label>
                <input
                  type="text"
                  value={newAdminUsername}
                  onChange={(e) => setNewAdminUsername(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
                  placeholder="ej. faridmaloof"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Contraseña Inicial
                </label>
                <input
                  type="password"
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
                  placeholder="Mínimo 8 caracteres"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Rol de Permisos
                </label>
                <select
                  value={newAdminRole}
                  onChange={(e) => setNewAdminRole(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
                >
                  <option value="admin">Administrador</option>
                  <option value="superadmin">Super Administrador</option>
                  <option value="editor">Editor</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddAdminModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                >
                  Crear Administrador
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: RESET ADMIN PASSWORD */}
      {showResetPassModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">
              Cambiar Contraseña: {showResetPassModal.email}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Ingresa la nueva contraseña para este usuario.
            </p>

            <form onSubmit={handleResetAdminPassword} className="space-y-4">
              <input
                type="password"
                value={manualPassword}
                onChange={(e) => setManualPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
                placeholder="Nueva contraseña"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowResetPassModal(null)}
                  className="px-3 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                >
                  Actualizar Contraseña
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT/NEW PROFILE */}
      {showProfileModal && editingProfile && (
        <ProfileModalEditor
          profile={editingProfile}
          onSave={handleSaveProfile}
          onCancel={() => {
            setShowProfileModal(false);
            setEditingProfile(null);
          }}
        />
      )}

      {/* MODAL: EDIT SERVICE */}
      {showServiceModal && editingService && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white">Editar Servicio Profesional</h3>
              <button onClick={() => setShowServiceModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Título (Español)</label>
                <input
                  type="text"
                  value={editingService.title.es}
                  onChange={(e) => setEditingService({
                    ...editingService,
                    title: { ...editingService.title, es: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Título (Inglés)</label>
                <input
                  type="text"
                  value={editingService.title.en}
                  onChange={(e) => setEditingService({
                    ...editingService,
                    title: { ...editingService.title, en: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Descripción (Español)</label>
                <textarea
                  rows={2}
                  value={editingService.description.es}
                  onChange={(e) => setEditingService({
                    ...editingService,
                    description: { ...editingService.description, es: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Descripción (Inglés)</label>
                <textarea
                  rows={2}
                  value={editingService.description.en}
                  onChange={(e) => setEditingService({
                    ...editingService,
                    description: { ...editingService.description, en: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Palabras Clave (separadas por coma)</label>
                <input
                  type="text"
                  value={editingService.keywords.join(', ')}
                  onChange={(e) => setEditingService({
                    ...editingService,
                    keywords: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
                  placeholder="ej. Playwright, CI/CD, Java"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={() => setShowServiceModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => handleSaveService(editingService)}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
              >
                Guardar Servicio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Complete modal for editing profile contacts & basic info
function ProfileModalEditor({ 
  profile, 
  onSave, 
  onCancel 
}: { 
  profile: ProfileData; 
  onSave: (p: ProfileData) => void; 
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<ProfileData>(JSON.parse(JSON.stringify(profile)));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-800 z-10">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Editor de Perfil Profesional</h2>
            <p className="text-xs text-slate-500">Modifica la información de contacto y resúmenes principales</p>
          </div>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Contact Info */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Información de Contacto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  value={formData.contact.name}
                  onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, name: e.target.value } })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  value={formData.contact.email}
                  onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, email: e.target.value } })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Teléfono</label>
                <input
                  type="text"
                  value={formData.contact.phone}
                  onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, phone: e.target.value } })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Ubicación</label>
                <input
                  type="text"
                  value={formData.contact.location}
                  onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, location: e.target.value } })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Social Links & Photo */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Foto y Enlaces Profesionales</h3>
            
            {/* Photo / Avatar Uploader */}
            <div className="mb-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/30 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-600 border-2 border-blue-500/50 flex-shrink-0 flex items-center justify-center">
                {formData.contact.avatarUrl ? (
                  <img
                    src={formData.contact.avatarUrl}
                    alt="Vista previa"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '';
                      (e.target as HTMLImageElement).alt = 'Error imagen';
                    }}
                  />
                ) : (
                  <span className="text-sm font-bold text-slate-400">Sin foto</span>
                )}
              </div>

              <div className="flex-1 w-full space-y-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Foto de Perfil (URL o Cargar Imagen)
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={formData.contact.avatarUrl || ''}
                    onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, avatarUrl: e.target.value } })}
                    placeholder="https://... o ruta de imagen"
                    className="flex-1 px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-xs"
                  />
                  <label className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Subir Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const base64 = event.target?.result as string;
                            setFormData({
                              ...formData,
                              contact: {
                                ...formData.contact,
                                avatarUrl: base64
                              }
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Se guardará y mostrará inmediatamente en el encabezado del portafolio.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">URL LinkedIn</label>
                <input
                  type="url"
                  value={formData.contact.linkedinUrl || formData.contact.linkedin}
                  onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, linkedin: e.target.value, linkedinUrl: e.target.value } })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">URL GitHub</label>
                <input
                  type="url"
                  value={formData.contact.githubUrl || formData.contact.github || 'https://github.com/faridmaloof/'}
                  onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, github: e.target.value, githubUrl: e.target.value } })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Summaries */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Resúmenes Profesionales</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Resumen Combinado (Español)</label>
                <textarea
                  rows={3}
                  value={formData.summary.combined?.es || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    summary: {
                      ...formData.summary,
                      combined: {
                        es: e.target.value,
                        en: formData.summary.combined?.en || ''
                      }
                    }
                  })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Resumen Combinado (Inglés)</label>
                <textarea
                  rows={3}
                  value={formData.summary.combined?.en || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    summary: {
                      ...formData.summary,
                      combined: {
                        es: formData.summary.combined?.es || '',
                        en: e.target.value
                      }
                    }
                  })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-xs font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs font-semibold shadow-sm"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
