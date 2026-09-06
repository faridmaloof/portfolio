import { useState } from 'react';
import type { SystemVariables, LanguageConfig } from '../../types';
import { 
  getSystemVariables, 
  saveSystemVariables, 
  getLanguages,
  getTrackConfigs
} from '../../lib/db';
import { LanguageTabSelector } from './LanguageTabSelector';
import { 
  Search, 
  Globe, 
  Check, 
  Share2, 
  Layers
} from 'lucide-react';

interface SEOManagerProps {
  onNotify: (type: 'success' | 'error', message: string) => void;
}

export function SEOManager({ onNotify }: SEOManagerProps) {
  const languages: LanguageConfig[] = getLanguages().filter(l => l.isActive);
  const [activeLang, setActiveLang] = useState<string>(languages[0]?.code || 'es');
  const [sysVars, setSysVars] = useState<SystemVariables>(() => getSystemVariables());
  const tracks = getTrackConfigs();
  const [isSaving, setIsSaving] = useState(false);

  // SEO state per language
  const [seoTitles, setSeoTitles] = useState<Record<string, string>>(() => ({
    es: 'Farid Maloof | Senior SDET Lead & Desarrollador Full Stack (15+ Años)',
    en: 'Farid Maloof | Senior SDET Lead & Full Stack Developer (15+ Years)',
    pt: 'Farid Maloof | Engenheiro Sênior SDET e Full Stack (15+ Anos)',
    ...sysVars.defaultSeoTitle
  }));

  const [seoDescriptions, setSeoDescriptions] = useState<Record<string, string>>(() => ({
    es: 'Portafolio profesional de Farid Maloof Suarez. Ingeniero de Software Senior con más de 15 años de experiencia en QA Automation, SDET, .NET, React, TypeScript y Cloud Architecture.',
    en: 'Professional portfolio of Farid Maloof Suarez. Senior Software Engineer with 15+ years of experience in QA Automation, SDET, .NET, React, TypeScript, and Cloud Architecture.',
    pt: 'Portfólio profissional de Farid Maloof Suarez. Engenheiro de Software Sênior com mais de 15 anos de experiência em QA Automation, SDET e Cloud.',
    ...sysVars.defaultSeoDescription
  }));

  const [seoKeywords, setSeoKeywords] = useState<Record<string, string>>(() => ({
    es: 'Farid Maloof, SDET, QA Automation, Senior Software Engineer, Full Stack, .NET, Playwright, React',
    en: 'Farid Maloof, SDET, QA Automation, Senior Software Engineer, Full Stack, .NET, Playwright, React',
    pt: 'Farid Maloof, SDET, QA Automation, Senior Software Engineer, Full Stack, .NET, Playwright, React',
    ...sysVars.defaultSeoKeywords
  }));

  const [ogImageUrl, setOgImageUrl] = useState<string>(
    sysVars.defaultOgImage || 'https://raw.githubusercontent.com/faridmaloof/portfolio/main/public/og-image.png'
  );

  const currentTitle = seoTitles[activeLang] || seoTitles.es || '';
  const currentDesc = seoDescriptions[activeLang] || seoDescriptions.es || '';
  const currentKeywords = seoKeywords[activeLang] || seoKeywords.es || '';

  const handleSave = () => {
    setIsSaving(true);
    const updated = {
      ...sysVars,
      defaultSeoTitle: { ...seoTitles, [activeLang]: currentTitle },
      defaultSeoDescription: { ...seoDescriptions, [activeLang]: currentDesc },
      defaultSeoKeywords: { ...seoKeywords, [activeLang]: currentKeywords },
      defaultOgImage: ogImageUrl
    };

    const ok = saveSystemVariables(updated);
    setIsSaving(false);
    if (ok) {
      setSysVars(updated);
      onNotify('success', `Ajustes SEO globales para (${activeLang.toUpperCase()}) guardados exitosamente.`);
    } else {
      onNotify('error', 'Error al guardar ajustes SEO.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
              <Search className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Optimización para Motores de Búsqueda (SEO) & Open Graph
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Configura los metadatos de posicionamiento en Google y tarjetas sociales para todos los idiomas configurados.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer disabled:opacity-50"
        >
          <Check className="w-4 h-4" />
          <span>{isSaving ? 'Guardando...' : 'Guardar Configuración SEO'}</span>
        </button>
      </div>

      {/* Language Selector */}
      <LanguageTabSelector
        activeLang={activeLang}
        onSelectLang={setActiveLang}
        languages={languages}
        label="Idioma de metadatos SEO:"
      />

      {/* Main Form & Live Previews Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Fields (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
          <div className="border-b border-slate-200 dark:border-slate-700 pb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Parámetros Globales ({activeLang.toUpperCase()})
            </h3>
            <span className="text-[11px] text-slate-500">
              Afecta la página principal y URL raíz
            </span>
          </div>

          {/* Meta Title */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Meta Título / Page Title (*):
              </label>
              <span className={`text-[10px] font-mono ${currentTitle.length > 60 ? 'text-amber-500' : 'text-slate-400'}`}>
                {currentTitle.length} / 60 caracteres recomendados
              </span>
            </div>
            <input
              type="text"
              value={currentTitle}
              onChange={(e) => setSeoTitles({ ...seoTitles, [activeLang]: e.target.value })}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Farid Maloof | Senior SDET Lead & Full Stack Developer"
            />
          </div>

          {/* Meta Description */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Meta Descripción (*):
              </label>
              <span className={`text-[10px] font-mono ${currentDesc.length > 160 ? 'text-amber-500' : 'text-slate-400'}`}>
                {currentDesc.length} / 160 caracteres recomendados
              </span>
            </div>
            <textarea
              rows={4}
              value={currentDesc}
              onChange={(e) => setSeoDescriptions({ ...seoDescriptions, [activeLang]: e.target.value })}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 leading-relaxed"
              placeholder="Describe tu propuesta de valor profesional, certificaciones y experiencia clave..."
            />
          </div>

          {/* Keywords */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Palabras Clave (Meta Keywords):
            </label>
            <input
              type="text"
              value={currentKeywords}
              onChange={(e) => setSeoKeywords({ ...seoKeywords, [activeLang]: e.target.value })}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              placeholder="SDET, QA Automation, .NET, React, Playwright, CI/CD"
            />
          </div>

          {/* OG Image */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Imagen para Redes Sociales (Open Graph / Twitter Card Image):
            </label>
            <input
              type="text"
              value={ogImageUrl}
              onChange={(e) => setOgImageUrl(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              placeholder="https://..."
            />
          </div>
        </div>

        {/* Right Column: Previews (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Google SERP Preview */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
              <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Vista Previa en Google Search ({activeLang.toUpperCase()})
              </h4>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">
                {window.location.origin} › {activeLang}
              </span>
              <h5 className="text-sm font-semibold text-blue-700 dark:text-blue-400 hover:underline line-clamp-1 cursor-pointer">
                {currentTitle || 'Farid Maloof | Senior SDET Lead'}
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug line-clamp-2">
                {currentDesc || 'Portafolio profesional de Farid Maloof con más de 15 años en ingeniería...'}
              </p>
            </div>
          </div>

          {/* Social Share Preview */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
              <Share2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Tarjeta Social (LinkedIn & Twitter)
              </h4>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-900/60">
              <div className="h-32 bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                {ogImageUrl ? (
                  <img
                    src={ogImageUrl}
                    alt="OG Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="text-xs text-slate-400">Sin imagen OG</span>
                )}
              </div>
              <div className="p-3 space-y-1">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">
                  {window.location.hostname}
                </span>
                <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                  {currentTitle}
                </p>
                <p className="text-[11px] text-slate-500 line-clamp-1">
                  {currentDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tracks SEO Overview */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Estado de SEO por Perfil Técnico (Tracks)
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            Cada track indexa con sus propias etiquetas personalizadas
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tracks.map((t) => {
            const hasCustomTitle = Boolean(t.seoTitle?.[activeLang] || t.seoTitle?.es);
            const hasCustomDesc = Boolean(t.seoDescription?.[activeLang] || t.seoDescription?.es);
            const isConfigured = hasCustomTitle && hasCustomDesc;

            return (
              <div
                key={t.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                    ?profile={t.id}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isConfigured ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300' : hasCustomTitle ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300' : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                  }`}>
                    {hasCustomTitle ? 'SEO Personalizado' : 'Hereda Global'}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                  {t.name}
                </h4>

                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {t.seoTitle?.[activeLang] || t.titles[activeLang] || 'Sin título específico'}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
