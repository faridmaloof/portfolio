import { useState } from 'react';
import type { 
  FrontendDesignConfig, 
  TemplatePreset, 
  ColorPalette, 
  FontPairing, 
  CardBorderRadius, 
  HeroLayout, 
  SectionId 
} from '../../types';
import { 
  getDesignConfig, 
  saveDesignConfig, 
  DEFAULT_DESIGN_CONFIG 
} from '../../lib/db';
import { 
  Palette, 
  Layout, 
  Type, 
  Square, 
  ArrowUp, 
  ArrowDown, 
  RotateCcw, 
  Check, 
  Sliders,
  MoveVertical
} from 'lucide-react';

interface DesignTemplatesManagerProps {
  onNotify: (type: 'success' | 'error', message: string) => void;
}

const SECTION_METADATA: Record<SectionId, { title: string; desc: string; icon: string }> = {
  summary: { title: 'Resumen Profesional', desc: 'Executive Summary y fortalezas técnicas', icon: '📝' },
  services: { title: 'Servicios Profesionales', desc: 'Tarjetas de consultoría y arquitectura técnica', icon: '💼' },
  experience: { title: 'Experiencia Laboral', desc: 'Línea de tiempo de empresas, roles y logros', icon: '🏢' },
  githubProjects: { title: 'Showcase GitHub', desc: 'Repositorios y arquitectura de código abierto', icon: '🐙' },
  certifications: { title: 'Certificaciones (120+)', desc: 'Grid de certificaciones y explorador interactivo', icon: '🏆' },
  education: { title: 'Educación & Estudios', desc: 'Títulos académicos e instituciones', icon: '🎓' },
  languages: { title: 'Idiomas', desc: 'Dominio de lenguas y niveles', icon: '🌐' }
};

const TEMPLATE_PRESETS: { id: TemplatePreset; name: string; desc: string; previewBadge: string }[] = [
  {
    id: 'executive',
    name: 'Executive Tech Lead',
    desc: 'Diseño corporativo premium con alto contraste, acentos distinguidos y jerarquía ejecutiva.',
    previewBadge: 'Recomendado'
  },
  {
    id: 'minimalist',
    name: 'Modern Minimalist',
    desc: 'Líneas limpias, bordes sutiles y amplio espacio negativo para una lectura sin distracciones.',
    previewBadge: 'Limpio'
  },
  {
    id: 'compact',
    name: 'Compact ATS / Recruiter Direct',
    desc: 'Alta densidad de información, estructurado para reclutadores técnicos y escaneo rápido.',
    previewBadge: 'Directo'
  },
  {
    id: 'bento',
    name: 'Creative Bento Grid',
    desc: 'Contenedores modulares estilo Bento con micro-interacciones contemporáneas.',
    previewBadge: 'Moderno'
  }
];

const COLOR_PALETTES: { id: ColorPalette; name: string; primary: string; bg: string; border: string }[] = [
  { id: 'indigo', name: 'Tech Indigo (SaaS)', primary: 'bg-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-950/40', border: 'border-indigo-400' },
  { id: 'emerald', name: 'Cyber Emerald (DevOps)', primary: 'bg-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/40', border: 'border-emerald-400' },
  { id: 'violet', name: 'Royal Violet (Executive)', primary: 'bg-purple-600', bg: 'bg-purple-50 dark:bg-purple-950/40', border: 'border-purple-400' },
  { id: 'blue', name: 'Classic Enterprise Blue', primary: 'bg-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/40', border: 'border-blue-400' },
  { id: 'amber', name: 'Strategic Amber (Consulting)', primary: 'bg-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/40', border: 'border-amber-400' },
  { id: 'monochrome', name: 'Architect Slate (Minimal)', primary: 'bg-slate-800', bg: 'bg-slate-100 dark:bg-slate-800', border: 'border-slate-500' }
];

const FONT_PAIRINGS: { id: FontPairing; name: string; fontClass: string; desc: string }[] = [
  { id: 'modern-sans', name: 'Inter & Plus Jakarta', fontClass: 'font-sans', desc: 'Estándar moderno de la industria tecnológica' },
  { id: 'tech-mono', name: 'Tech Mono Accents', fontClass: 'font-mono', desc: 'Énfasis en código, microservicios y arquitectura' },
  { id: 'editorial', name: 'Editorial Executive Serif', fontClass: 'font-serif', desc: 'Encabezados con prestancia de consultoría estratégica' },
  { id: 'geometric', name: 'Geometric Contemporary', fontClass: 'tracking-tight', desc: 'Geometría limpia para impacto visual vanguardista' }
];

export function DesignTemplatesManager({ onNotify }: DesignTemplatesManagerProps) {
  const [config, setConfig] = useState<FrontendDesignConfig>(() => getDesignConfig());
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    const ok = saveDesignConfig(config);
    setIsSaving(false);
    if (ok) {
      onNotify('success', 'Configuración de diseño y templates guardada exitosamente.');
    } else {
      onNotify('error', 'Error al guardar la configuración de diseño.');
    }
  };

  const handleReset = () => {
    setConfig(DEFAULT_DESIGN_CONFIG);
    saveDesignConfig(DEFAULT_DESIGN_CONFIG);
    onNotify('success', 'Diseño restablecido a valores por defecto.');
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...config.sectionOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;

    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;

    setConfig({ ...config, sectionOrder: newOrder });
  };

  return (
    <div className="space-y-8">
      {/* Header card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
              <Palette className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Templates de Frontend & Personalización Visual
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Define la plantilla de presentación, esquema cromático, tipografía, estilo de bordes y el orden visual de los segmentos del portafolio.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            <span>{isSaving ? 'Guardando...' : 'Aplicar Cambios de Diseño'}</span>
          </button>
        </div>
      </div>

      {/* 1. Template Presets */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
          <Layout className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            1. Plantilla de Estructura / Layout Preset
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TEMPLATE_PRESETS.map((tpl) => {
            const isSelected = config.templatePreset === tpl.id;
            return (
              <div
                key={tpl.id}
                onClick={() => setConfig({ ...config, templatePreset: tpl.id })}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 shadow-md ring-2 ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-900/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {tpl.previewBadge}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 font-bold" />}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    {tpl.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {tpl.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Color Themes & Font Pairings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Color Palette */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
            <Palette className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              2. Esquema Cromático (Paleta de Acentos)
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {COLOR_PALETTES.map((pal) => {
              const isSelected = config.colorPalette === pal.id;
              return (
                <div
                  key={pal.id}
                  onClick={() => setConfig({ ...config, colorPalette: pal.id })}
                  className={`p-3 rounded-xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-5 h-5 rounded-full ${pal.primary} shadow-sm`} />
                    <span className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                      {pal.name.split(' ')[0]}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                    {pal.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Font Pairings */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
            <Type className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              3. Tipografía & Jerarquía
            </h3>
          </div>

          <div className="space-y-2.5">
            {FONT_PAIRINGS.map((f) => {
              const isSelected = config.fontPairing === f.id;
              return (
                <div
                  key={f.id}
                  onClick={() => setConfig({ ...config, fontPairing: f.id })}
                  className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      {f.name}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {f.desc}
                    </span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-blue-600 font-bold" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Radius & Hero Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card Border Radius */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
            <Square className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              4. Bordes de Contenedores y Tarjetas
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'rounded', label: 'Estándar (16px)', preview: 'rounded-2xl' },
              { id: 'soft', label: 'Suave Pill (24px)', preview: 'rounded-3xl' },
              { id: 'sharp', label: 'Técnico Sharp (6px)', preview: 'rounded-md' }
            ].map((r) => {
              const isSelected = config.cardRadius === r.id;
              return (
                <div
                  key={r.id}
                  onClick={() => setConfig({ ...config, cardRadius: r.id as CardBorderRadius })}
                  className={`p-3 border-2 text-center transition-all cursor-pointer ${r.preview} ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    {r.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hero Layout */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
            <Sliders className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              5. Diseño del Encabezado (Hero Layout)
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'classic', label: 'Clásico Lateral', desc: 'Avatar izq. + Contacto der.' },
              { id: 'centered', label: 'Centrado Ejecutivo', desc: 'Foto central y badges simétricos' },
              { id: 'compact', label: 'Compacto Recruiter', desc: 'Barra horizontal condensada' }
            ].map((h) => {
              const isSelected = config.heroLayout === h.id;
              return (
                <div
                  key={h.id}
                  onClick={() => setConfig({ ...config, heroLayout: h.id as HeroLayout })}
                  className={`p-3 rounded-xl border-2 text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    {h.label}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                    {h.desc}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. Ubicación y Reordenamiento de Segmentos */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
          <div className="flex items-center gap-2">
            <MoveVertical className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              6. Ubicación y Orden de los Segmentos del Portafolio
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Usa los botones ⬆️ y ⬇️ para cambiar la posición de cada sección
          </span>
        </div>

        <div className="space-y-2">
          {config.sectionOrder.map((sectionId, index) => {
            const meta = SECTION_METADATA[sectionId] || { title: sectionId, desc: '', icon: '📌' };
            const isFirst = index === 0;
            const isLast = index === config.sectionOrder.length - 1;

            return (
              <div
                key={sectionId}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 hover:border-blue-300 dark:hover:border-blue-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-mono text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-base">{meta.icon}</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {meta.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {meta.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={isFirst}
                    onClick={() => moveSection(index, 'up')}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    title="Subir posición"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    disabled={isLast}
                    onClick={() => moveSection(index, 'down')}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    title="Bajar posición"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
