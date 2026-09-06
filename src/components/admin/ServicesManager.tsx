import { useState } from 'react';
import type { ServiceItem, LanguageConfig } from '../../types';
import { getServices, saveServices, getLanguages, getTrackConfigs } from '../../lib/db';
import { LanguageTabSelector } from './LanguageTabSelector';
import { 
  Sparkles, 
  Plus, 
  Edit, 
  Trash2, 
  X, 
  Layers
} from 'lucide-react';

interface ServicesManagerProps {
  onNotify: (type: 'success' | 'error', message: string) => void;
}

export function ServicesManager({ onNotify }: ServicesManagerProps) {
  const languages: LanguageConfig[] = getLanguages().filter(l => l.isActive);
  const [activeLang, setActiveLang] = useState<string>(languages[0]?.code || 'es');
  const [services, setServices] = useState<ServiceItem[]>(() => getServices());
  const tracks = getTrackConfigs();

  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [keywordInput, setKeywordInput] = useState('');

  const handleOpenNew = () => {
    const newService: ServiceItem = {
      id: `service-${Date.now()}`,
      title: { es: '', en: '', pt: '' },
      description: { es: '', en: '', pt: '' },
      icon: 'Bot',
      keywords: [],
      trackIds: []
    };
    setEditingService(newService);
    setKeywordInput('');
    setIsNew(true);
  };

  const handleOpenEdit = (service: ServiceItem) => {
    setEditingService(JSON.parse(JSON.stringify(service)));
    setKeywordInput(service.keywords.join(', '));
    setIsNew(false);
  };

  const handleSaveModal = () => {
    if (!editingService) return;

    if (!editingService.title.es && !editingService.title[activeLang]) {
      alert('Por favor ingresa un título para el servicio.');
      return;
    }

    const keywords = keywordInput
      .split(',')
      .map(k => k.trim())
      .filter(Boolean);

    const updatedService: ServiceItem = {
      ...editingService,
      keywords
    };

    let updatedList: ServiceItem[];
    if (isNew) {
      updatedList = [...services, updatedService];
    } else {
      updatedList = services.map(s => s.id === updatedService.id ? updatedService : s);
    }

    const ok = saveServices(updatedList);
    if (ok) {
      setServices(updatedList);
      setEditingService(null);
      onNotify('success', isNew ? 'Nuevo servicio creado.' : 'Servicio actualizado.');
    } else {
      onNotify('error', 'Error al guardar el servicio.');
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('¿Deseas eliminar este servicio profesional?')) return;
    const updated = services.filter(s => s.id !== id);
    const ok = saveServices(updated);
    if (ok) {
      setServices(updated);
      onNotify('success', 'Servicio eliminado correctamente.');
    } else {
      onNotify('error', 'Error al eliminar el servicio.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
              <Sparkles className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Servicios Profesionales de Consultoría
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Define los servicios técnicos, títulos y descripciones en todos los idiomas activos para reclutadores y clientes corporativos.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenNew}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar Servicio</span>
        </button>
      </div>

      {/* Language switcher for cards overview */}
      <LanguageTabSelector
        activeLang={activeLang}
        onSelectLang={setActiveLang}
        languages={languages}
        label="Visualizando tarjetas en idioma:"
      />

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((srv) => {
          const displayTitle = srv.title[activeLang] || srv.title.es || srv.title.en || 'Sin título';
          const displayDesc = srv.description[activeLang] || srv.description.es || srv.description.en || 'Sin descripción';

          return (
            <div
              key={srv.id}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm flex flex-col justify-between hover:border-blue-400 dark:hover:border-blue-500 transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                        {displayTitle}
                      </h3>
                      <span className="text-[11px] text-slate-400 font-mono">
                        ID: {srv.id}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(srv)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-blue-500 transition-colors cursor-pointer"
                      title="Editar servicio"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(srv.id)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-red-500 transition-colors cursor-pointer"
                      title="Eliminar servicio"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                  {displayDesc}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                {/* Keywords */}
                <div className="flex flex-wrap gap-1.5">
                  {srv.keywords.map((kw, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
                      {kw}
                    </span>
                  ))}
                </div>

                {/* Track associations if any */}
                {srv.trackIds && srv.trackIds.length > 0 && (
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                    <Layers className="w-3 h-3 text-purple-500" />
                    <span>Tracks: {srv.trackIds.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* EDIT / CREATE MODAL */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full flex flex-col shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {isNew ? 'Nuevo Servicio Profesional' : 'Editar Servicio Profesional'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Diligencia títulos y descripciones en todos los idiomas configurados.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
              {/* Dynamic Language Selector */}
              <LanguageTabSelector
                activeLang={activeLang}
                onSelectLang={setActiveLang}
                languages={languages}
                label="Editando en idioma:"
              />

              {/* Title in active language */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Título del Servicio ({activeLang.toUpperCase()}) (*):
                </label>
                <input
                  type="text"
                  value={editingService.title[activeLang] || ''}
                  onChange={(e) => setEditingService({
                    ...editingService,
                    title: { ...editingService.title, [activeLang]: e.target.value }
                  })}
                  placeholder="ej. Arquitectura de Automatización de Pruebas Empresariales"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Description in active language */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Descripción Detallada ({activeLang.toUpperCase()}):
                </label>
                <textarea
                  rows={3}
                  value={editingService.description[activeLang] || ''}
                  onChange={(e) => setEditingService({
                    ...editingService,
                    description: { ...editingService.description, [activeLang]: e.target.value }
                  })}
                  placeholder="Explica el alcance del servicio, tecnologías y valor agregado..."
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 leading-relaxed"
                />
              </div>

              {/* Keywords */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tecnologías y Palabras Clave (Separadas por comas):
                </label>
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  placeholder="Playwright, CI/CD, Java, .NET, JMeter"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              {/* Associated Tracks (Optional) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Asociar a Perfiles Técnicos Específicos (Opcional - vacío para todos):
                </label>
                <div className="flex flex-wrap gap-2">
                  {tracks.map((t) => {
                    const isSelected = (editingService.trackIds || []).includes(t.id);
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          const current = editingService.trackIds || [];
                          const updated = isSelected 
                            ? current.filter(id => id !== t.id)
                            : [...current, t.id];
                          setEditingService({ ...editingService, trackIds: updated });
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-purple-600 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        {t.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-end gap-3 bg-slate-50 dark:bg-slate-900/50">
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveModal}
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
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
