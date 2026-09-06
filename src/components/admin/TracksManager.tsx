import { useState } from 'react';
import type { ProfileTrackConfig, LanguageConfig } from '../../types';
import { 
  getTrackConfigs, 
  saveTrackConfig, 
  deleteTrackConfig,
  getLanguages 
} from '../../lib/db';
import { allCertificationsList } from '../../data/certificationsData';
import { LanguageTabSelector } from './LanguageTabSelector';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Copy, 
  Check, 
  ExternalLink, 
  Info, 
  Layers,
  Award,
  Search,
  X,
  Sliders
} from 'lucide-react';

interface TracksManagerProps {
  onNotify: (type: 'success' | 'error', message: string) => void;
}

export function TracksManager({ onNotify }: TracksManagerProps) {
  const languages: LanguageConfig[] = getLanguages().filter(l => l.isActive);
  const [tracks, setTracks] = useState<ProfileTrackConfig[]>(() => getTrackConfigs());
  const [editingTrack, setEditingTrack] = useState<ProfileTrackConfig | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeLangTab, setActiveLangTab] = useState<string>(languages[0]?.code || 'es');
  const [modalSubTab, setModalSubTab] = useState<'content' | 'certs' | 'seo'>('content');

  // Certifications search query in modal
  const [certSearch, setCertSearch] = useState('');

  const refreshTracks = () => {
    setTracks(getTrackConfigs());
  };

  const handleCopyLink = (trackId: string) => {
    const url = `${window.location.origin}/?profile=${trackId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(trackId);
      onNotify('success', `Enlace directo copiado: ${url}`);
      setTimeout(() => setCopiedId(null), 2500);
    }).catch(() => {
      onNotify('error', 'No se pudo copiar el enlace al portapapeles');
    });
  };

  const handleOpenEdit = (track: ProfileTrackConfig) => {
    const copy: ProfileTrackConfig = JSON.parse(JSON.stringify(track));
    if (!copy.featuredCertifications) copy.featuredCertifications = [];
    if (!copy.initialVisibleCertsCount) copy.initialVisibleCertsCount = 6;
    setEditingTrack(copy);
    setIsNew(false);
    setModalSubTab('content');
    setCertSearch('');
  };

  const handleOpenNew = () => {
    const newConfig: ProfileTrackConfig = {
      id: '',
      name: '',
      badge: '',
      isSystem: false,
      isActive: true,
      initialVisibleCertsCount: 6,
      featuredCertifications: [],
      titles: {
        es: '',
        en: '',
        pt: ''
      },
      summary: {
        es: '',
        en: '',
        pt: ''
      },
      skillsHighlight: {
        es: [
          ['Framework Principal', 'Experto'],
          ['Arquitectura', 'Diseño'],
          ['CI/CD & Cloud', 'DevOps']
        ],
        en: [
          ['Main Framework', 'Expert'],
          ['Architecture', 'Design'],
          ['CI/CD & Cloud', 'DevOps']
        ],
        pt: [
          ['Framework Principal', 'Especialista'],
          ['Arquitetura', 'Design'],
          ['CI/CD & Cloud', 'DevOps']
        ]
      },
      seoTitle: {
        es: '',
        en: '',
        pt: ''
      },
      seoDescription: {
        es: '',
        en: '',
        pt: ''
      }
    };
    setEditingTrack(newConfig);
    setIsNew(true);
    setModalSubTab('content');
    setCertSearch('');
  };

  const handleSave = () => {
    if (!editingTrack) return;

    const cleanId = editingTrack.id.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-');
    if (!cleanId) {
      onNotify('error', 'El identificador (slug) del perfil es obligatorio');
      return;
    }

    if (!editingTrack.name.trim()) {
      onNotify('error', 'El nombre del perfil es obligatorio');
      return;
    }

    const payload: ProfileTrackConfig = {
      ...editingTrack,
      id: cleanId,
      initialVisibleCertsCount: Number(editingTrack.initialVisibleCertsCount) || 6,
      featuredCertifications: editingTrack.featuredCertifications || []
    };

    const ok = saveTrackConfig(payload);
    if (ok) {
      onNotify('success', isNew ? `Perfil "${payload.name}" creado con éxito` : `Perfil "${payload.name}" actualizado`);
      refreshTracks();
      setEditingTrack(null);
    } else {
      onNotify('error', 'Error al guardar la configuración del perfil');
    }
  };

  const handleDelete = (track: ProfileTrackConfig) => {
    if (track.isSystem) {
      onNotify('error', 'Los perfiles base del sistema no pueden eliminarse');
      return;
    }

    if (window.confirm(`¿Estás seguro de eliminar el perfil "${track.name}" (${track.id})?`)) {
      const res = deleteTrackConfig(track.id);
      if (res.success) {
        onNotify('success', `Perfil "${track.name}" eliminado correctamente`);
        refreshTracks();
      } else {
        onNotify('error', res.error || 'No se pudo eliminar el perfil');
      }
    }
  };

  const handleToggleActive = (track: ProfileTrackConfig) => {
    const updated = { ...track, isActive: !track.isActive };
    saveTrackConfig(updated);
    refreshTracks();
    onNotify('success', `Perfil "${track.name}" ${updated.isActive ? 'activado' : 'desactivado'}`);
  };

  // Toggle certification featured status
  const toggleFeaturedCert = (certName: string) => {
    if (!editingTrack) return;
    const current = editingTrack.featuredCertifications || [];
    const exists = current.includes(certName);
    const updated = exists 
      ? current.filter(c => c !== certName)
      : [...current, certName];

    setEditingTrack({
      ...editingTrack,
      featuredCertifications: updated
    });
  };

  // Filter certifications in modal
  const filteredCerts = allCertificationsList.filter(c => {
    const q = certSearch.toLowerCase().trim();
    if (!q) return true;
    return c.title.toLowerCase().includes(q) || 
           c.issuer.toLowerCase().includes(q) ||
           (c.category && c.category.toLowerCase().includes(q));
  });

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Gestión de Perfiles Técnicos (Tracks)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Configura los perfiles específicos: títulos, resúmenes, certificados destacados que más resalten el perfil y cantidad inicial a mostrar.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Añadir Nuevo Perfil</span>
        </button>
      </div>

      {/* Info notice about transparency */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 text-xs">
        <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold">
            Modo Transparente para la Landing Principal
          </p>
          <p className="text-amber-800 dark:text-amber-300/90 leading-relaxed">
            Cada perfil cuenta con su propio enlace directo (<code className="font-mono bg-amber-100 dark:bg-amber-900/60 px-1.5 py-0.5 rounded">?profile=identificador</code>). Al postularte a una vacante SDET, Full Stack o Backend, utiliza el botón "Copiar Enlace" para que el reclutador vea instantáneamente el enfoque y las certificaciones más prioritarias para ese rol.
          </p>
        </div>
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tracks.map((t) => {
          const isCopied = copiedId === t.id;
          const featCount = t.featuredCertifications?.length || 0;
          const visibleLimit = t.initialVisibleCertsCount || 6;

          return (
            <div 
              key={t.id}
              className={`bg-white dark:bg-slate-800 rounded-2xl border transition-all p-5 flex flex-col justify-between ${
                t.isActive 
                  ? 'border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md' 
                  : 'border-slate-200/60 dark:border-slate-800 opacity-60 bg-slate-50/50 dark:bg-slate-900/50'
              }`}
            >
              <div className="space-y-3.5">
                {/* Header row */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40">
                        ?profile={t.id}
                      </span>
                      {t.badge && (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          {t.badge}
                        </span>
                      )}
                      {t.isSystem && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40">
                          Base
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base mt-2 leading-snug">
                      {t.name}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleToggleActive(t)}
                    title={t.isActive ? 'Desactivar perfil' : 'Activar perfil'}
                    className={`text-xs px-2.5 py-1 rounded-full font-semibold transition-colors cursor-pointer ${
                      t.isActive 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 hover:bg-green-200' 
                        : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400 hover:bg-slate-300'
                    }`}
                  >
                    {t.isActive ? 'Activo' : 'Inactivo'}
                  </button>
                </div>

                {/* Badges for Certifications Configuration */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40">
                    <Award className="w-3 h-3 text-amber-600" />
                    <span>{featCount > 0 ? `${featCount} Certs fijadas` : 'Certs por defecto'}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    <Sliders className="w-3 h-3 text-slate-500" />
                    <span>{visibleLimit} iniciales</span>
                  </span>
                </div>

                {/* Localized Titles */}
                <div className="space-y-1.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium text-[11px]">
                      <span className="font-bold">ES:</span>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold line-clamp-1">{t.titles.es || '—'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium text-[11px]">
                      <span className="font-bold">EN:</span>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold line-clamp-1">{t.titles.en || '—'}</span>
                    </div>
                  </div>

                  {/* Summary preview */}
                  <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2 italic">
                    "{t.summary.es || t.summary.en || 'Sin resumen definido'}"
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleCopyLink(t.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                    title="Copiar URL directa para reclutadores"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? '¡Copiado!' : 'Copiar URL'}</span>
                  </button>

                  <a
                    href={`/?profile=${t.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs transition-colors"
                    title="Abrir landing con este perfil"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(t)}
                    className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors cursor-pointer"
                    title="Editar perfil"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  {!t.isSystem && (
                    <button
                      type="button"
                      onClick={() => handleDelete(t)}
                      className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors cursor-pointer"
                      title="Eliminar perfil personalizado"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* EDIT / NEW MODAL */}
      {editingTrack && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {isNew ? 'Nuevo Perfil Técnico (Track)' : `Editar Perfil: ${editingTrack.name}`}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ajusta la orientación técnica, textos por idioma y selección de certificaciones para máximo impacto.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingTrack(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="px-6 pt-3 border-b border-slate-200 dark:border-slate-700 flex gap-2">
              {[
                { id: 'content', label: '1. Información & Textos' },
                { id: 'certs', label: '2. Certificaciones Destacadas & Visibilidad' },
                { id: 'seo', label: '3. SEO & Metadatos' }
              ].map((sub) => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setModalSubTab(sub.id as any)}
                  className={`px-4 py-2 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                    modalSubTab === sub.id
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* SUB-TAB 1: CONTENT */}
              {modalSubTab === 'content' && (
                <div className="space-y-6">
                  {/* Basic Identifiers */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Slug / Parámetro URL (*):
                      </label>
                      <div className="flex items-center">
                        <span className="px-2.5 py-2 text-xs font-mono bg-slate-100 dark:bg-slate-700 text-slate-500 border border-r-0 border-slate-300 dark:border-slate-600 rounded-l-xl">
                          ?profile=
                        </span>
                        <input
                          type="text"
                          disabled={!isNew && editingTrack.isSystem}
                          value={editingTrack.id}
                          onChange={(e) => setEditingTrack({ ...editingTrack, id: e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '') })}
                          placeholder="devops"
                          className="w-full text-xs font-mono px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-r-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                        />
                      </div>
                      <span className="text-[10px] text-slate-400">Solo letras minúsculas y guiones.</span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Nombre del Perfil (*):
                      </label>
                      <input
                        type="text"
                        value={editingTrack.name}
                        onChange={(e) => setEditingTrack({ ...editingTrack, name: e.target.value })}
                        placeholder="DevOps & Cloud Architect"
                        className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Badge Corto (Tag):
                      </label>
                      <input
                        type="text"
                        value={editingTrack.badge}
                        onChange={(e) => setEditingTrack({ ...editingTrack, badge: e.target.value })}
                        placeholder="AWS · K8s · Terraform"
                        className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Dynamic Language Selector */}
                  <LanguageTabSelector
                    activeLang={activeLangTab}
                    onSelectLang={setActiveLangTab}
                    languages={languages}
                    label="Editando contenidos para idioma:"
                  />

                  {/* Localized inputs */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Título Profesional para ({activeLangTab.toUpperCase()}) (*):
                      </label>
                      <input
                        type="text"
                        value={editingTrack.titles[activeLangTab] || ''}
                        onChange={(e) => setEditingTrack({
                          ...editingTrack,
                          titles: { ...editingTrack.titles, [activeLangTab]: e.target.value }
                        })}
                        placeholder={activeLangTab === 'es' ? 'Ingeniero de Software Senior & SDET Lead' : 'Senior Software Engineer & SDET Lead'}
                        className="w-full text-xs px-3.5 py-2.5 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Resumen Profesional / Executive Summary ({activeLangTab.toUpperCase()}) (*):
                      </label>
                      <textarea
                        rows={5}
                        value={editingTrack.summary[activeLangTab] || ''}
                        onChange={(e) => setEditingTrack({
                          ...editingTrack,
                          summary: { ...editingTrack.summary, [activeLangTab]: e.target.value }
                        })}
                        placeholder="Redacta la síntesis de experiencia orientada a este perfil específico..."
                        className="w-full text-xs px-3.5 py-2.5 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 2: CERTIFICACIONES DESTACADAS & VISIBILIDAD */}
              {modalSubTab === 'certs' && (
                <div className="space-y-6">
                  {/* Visibility Count Control */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 space-y-3">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                        Cantidad Inicial de Certificaciones a Mostrar
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Determina cuántas certificaciones se visualizan de inmediato en el frontend antes de que el usuario haga clic en "Ver todas las certificaciones".
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {[4, 6, 8, 12, 16].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setEditingTrack({ ...editingTrack, initialVisibleCertsCount: num })}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            (editingTrack.initialVisibleCertsCount || 6) === num
                              ? 'bg-blue-600 text-white shadow-sm'
                              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {num} Certificaciones
                        </button>
                      ))}

                      <div className="flex items-center gap-1.5 ml-2">
                        <span className="text-xs text-slate-400">Personalizado:</span>
                        <input
                          type="number"
                          min="1"
                          max="50"
                          value={editingTrack.initialVisibleCertsCount || 6}
                          onChange={(e) => setEditingTrack({
                            ...editingTrack,
                            initialVisibleCertsCount: Math.max(1, parseInt(e.target.value) || 6)
                          })}
                          className="w-16 px-2 py-1 text-xs font-bold text-center border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Highlighted Certifications Picker */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-amber-500" />
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                            Certificados que Más Resaltan este Perfil ({editingTrack.featuredCertifications?.length || 0} Seleccionados)
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Estos certificados aparecerán en las primeras posiciones de la cuadrícula al activar este perfil técnico.
                        </p>
                      </div>

                      {/* Search box */}
                      <div className="relative w-full sm:w-64">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                        <input
                          type="text"
                          value={certSearch}
                          onChange={(e) => setCertSearch(e.target.value)}
                          placeholder="Buscar certificación..."
                          className="w-full text-xs pl-8 pr-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    {/* Selected Certs Pills */}
                    {(editingTrack.featuredCertifications || []).length > 0 && (
                      <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 space-y-2">
                        <span className="text-[11px] font-bold text-blue-800 dark:text-blue-300 block">
                          Certificados fijados para este track (en orden de prioridad):
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {(editingTrack.featuredCertifications || []).map((cName, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-blue-600 text-white font-medium shadow-xs"
                            >
                              <span>{idx + 1}. {cName}</span>
                              <button
                                type="button"
                                onClick={() => toggleFeaturedCert(cName)}
                                className="hover:text-red-200 cursor-pointer"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Certifications Catalog list */}
                    <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1 divide-y divide-slate-100 dark:divide-slate-700/40">
                      {filteredCerts.slice(0, 40).map((cert) => {
                        const isFeatured = (editingTrack.featuredCertifications || []).includes(cert.id);

                        return (
                          <div
                            key={cert.id}
                            onClick={() => toggleFeaturedCert(cert.id)}
                            className={`flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer ${
                              isFeatured
                                ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/40'
                                : 'hover:bg-slate-50 dark:hover:bg-slate-700/30 border border-transparent'
                            }`}
                          >
                            <div className="space-y-0.5 flex-1 pr-3">
                              <p className={`text-xs font-semibold ${isFeatured ? 'text-blue-700 dark:text-blue-300' : 'text-slate-900 dark:text-white'}`}>
                                {cert.title}
                              </p>
                              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                                <span>{cert.issuer}</span>
                                {cert.category && (
                                  <>
                                    <span>•</span>
                                    <span>{cert.category}</span>
                                  </>
                                )}
                              </div>
                            </div>

                            <button
                              type="button"
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                                isFeatured
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white'
                              }`}
                            >
                              {isFeatured ? '✓ Destacado' : '+ Destacar'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 3: SEO & METADATOS */}
              {modalSubTab === 'seo' && (
                <div className="space-y-6">
                  {/* Dynamic Language Selector */}
                  <LanguageTabSelector
                    activeLang={activeLangTab}
                    onSelectLang={setActiveLangTab}
                    languages={languages}
                    label="Metadatos SEO para idioma:"
                  />

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Meta Título de la Página ({activeLangTab.toUpperCase()}):
                      </label>
                      <input
                        type="text"
                        value={editingTrack.seoTitle?.[activeLangTab] || ''}
                        onChange={(e) => setEditingTrack({
                          ...editingTrack,
                          seoTitle: { ...editingTrack.seoTitle, [activeLangTab]: e.target.value }
                        })}
                        placeholder="Farid Maloof | Senior SDET Lead & Arquitecto de Pruebas"
                        className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Meta Descripción de la Página ({activeLangTab.toUpperCase()}):
                      </label>
                      <textarea
                        rows={3}
                        value={editingTrack.seoDescription?.[activeLangTab] || ''}
                        onChange={(e) => setEditingTrack({
                          ...editingTrack,
                          seoDescription: { ...editingTrack.seoDescription, [activeLangTab]: e.target.value }
                        })}
                        placeholder="Portafolio profesional especializado en ingeniería de calidad, automatización CI/CD y desarrollo de alto rendimiento..."
                        className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      />
                    </div>

                    {/* Google SERP Preview */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700 space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        Vista Previa en Google ({activeLangTab.toUpperCase()}):
                      </span>
                      <p className="text-blue-700 dark:text-blue-400 text-sm font-semibold hover:underline cursor-pointer">
                        {editingTrack.seoTitle?.[activeLangTab] || `${editingTrack.name} | Farid Maloof`}
                      </p>
                      <span className="text-emerald-700 dark:text-emerald-400 text-xs block font-mono">
                        {window.location.origin}/?profile={editingTrack.id || 'slug'}&lang={activeLangTab}
                      </span>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug line-clamp-2">
                        {editingTrack.seoDescription?.[activeLangTab] || editingTrack.summary?.[activeLangTab] || 'Portafolio profesional de ingeniería de software...'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Status active checkbox */}
              <div className="flex items-center gap-3 pt-2 border-t border-slate-200 dark:border-slate-700">
                <input
                  type="checkbox"
                  id="trackActive"
                  checked={editingTrack.isActive}
                  onChange={(e) => setEditingTrack({ ...editingTrack, isActive: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                />
                <label htmlFor="trackActive" className="text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
                  Perfil Activo (Disponible para ser visualizado mediante ?profile={editingTrack.id || 'slug'})
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-end gap-3 bg-slate-50 dark:bg-slate-900/50">
              <button
                type="button"
                onClick={() => setEditingTrack(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
              >
                {isNew ? 'Crear Perfil' : 'Guardar Cambios'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
