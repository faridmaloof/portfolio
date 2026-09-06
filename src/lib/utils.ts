import type { ProfileData, Language, TrackType, WorkModality } from '../types';
import { getTrackConfig } from './db';

export function getLocalizedText(text: { en: string; es: string; pt?: string; [key: string]: string | undefined } | undefined, language: Language): string {
  if (!text) return '';
  return text[language] || text.en || text.es || '';
}

export function resolveTrackObject<T>(
  container: Record<string, T | undefined>,
  track: TrackType
): T | undefined {
  if (!container) return undefined;
  if (container[track]) return container[track];
  
  if (track === 'full' || track === 'combined') {
    return container.full || container.combined || container.dev || container.sdet || container.backend || container.qa;
  }
  if (track === 'sdet') {
    return container.sdet || container.qa || container.combined || container.full;
  }
  if (track === 'backend') {
    return container.backend || container.dev || container.fullstack || container.combined || container.full;
  }
  if (track === 'fullstack') {
    return container.fullstack || container.dev || container.backend || container.combined || container.full;
  }
  if (track === 'qa') {
    return container.qa || container.sdet || container.combined || container.full;
  }
  if (track === 'dev') {
    return container.dev || container.backend || container.fullstack || container.combined || container.full;
  }
  return container.combined || container.full || container.qa || container.dev;
}

export function getLocalizedRole(
  role: { qa: { en: string; es: string; pt?: string; [key: string]: string | undefined }; dev: { en: string; es: string; pt?: string; [key: string]: string | undefined }; [key: string]: any },
  track: TrackType,
  language: Language
): string {
  const roleObj = resolveTrackObject(role, track);
  if (roleObj && typeof roleObj === 'object') {
    return (roleObj as any)[language] || (roleObj as any).en || (roleObj as any).es || '';
  }
  return (role.qa as any)?.[language] || role.qa?.en || role.qa?.es || '';
}

export function getLocalizedDetail(
  detail: {
    qa: { en: string[]; es: string[]; pt?: string[]; [key: string]: string[] | undefined };
    dev: { en: string[]; es: string[]; pt?: string[]; [key: string]: string[] | undefined };
    [key: string]: any;
  },
  track: TrackType,
  language: Language
): string[] {
  const detailObj = resolveTrackObject(detail, track);
  if (detailObj && typeof detailObj === 'object') {
    const list = (detailObj as any)[language] || (detailObj as any).en || (detailObj as any).es;
    if (Array.isArray(list) && list.length > 0) return list;
  }
  return (detail.qa as any)?.[language] || detail.qa?.en || detail.qa?.es || [];
}

export function getLocalizedSkills(
  skills: {
    qa: { en: [string, string][]; es: [string, string][]; pt?: [string, string][]; [key: string]: [string, string][] | undefined };
    dev: { en: [string, string][]; es: [string, string][]; pt?: [string, string][]; [key: string]: [string, string][] | undefined };
    [key: string]: any;
  },
  track: TrackType,
  language: Language
): [string, string][] {
  // Check if configured in custom track definitions
  const customTrack = getTrackConfig(track);
  if (customTrack?.skillsHighlight) {
    const list = (customTrack.skillsHighlight as any)[language] || (customTrack.skillsHighlight as any).es || (customTrack.skillsHighlight as any).en;
    if (Array.isArray(list) && list.length > 0) return list;
  }

  const skillsObj = resolveTrackObject(skills, track);
  if (skillsObj && typeof skillsObj === 'object') {
    const list = (skillsObj as any)[language] || (skillsObj as any).en || (skillsObj as any).es;
    if (Array.isArray(list) && list.length > 0) return list;
  }
  return (skills.qa as any)?.[language] || skills.qa?.en || skills.qa?.es || [];
}

export function getLocalizedSummary(
  summary: { qa: { en: string; es: string; pt?: string; [key: string]: string | undefined }; dev: { en: string; es: string; pt?: string; [key: string]: string | undefined }; [key: string]: any },
  track: TrackType,
  language: Language
): string {
  // Check if configured in custom track definitions
  const customTrack = getTrackConfig(track);
  if (customTrack?.summary) {
    const text = (customTrack.summary as any)[language] || customTrack.summary.es || customTrack.summary.en;
    if (text) return text;
  }

  const summaryObj = resolveTrackObject(summary, track);
  if (summaryObj && typeof summaryObj === 'object') {
    return (summaryObj as any)[language] || (summaryObj as any).en || (summaryObj as any).es || '';
  }
  return (summary.qa as any)?.[language] || summary.qa?.en || summary.qa?.es || '';
}

export function getLocalizedTitle(
  titles: { qa: { en: string; es: string; pt?: string; [key: string]: string | undefined }; dev: { en: string; es: string; pt?: string; [key: string]: string | undefined }; [key: string]: any },
  track: TrackType,
  language: Language
): string {
  // Check if configured in custom track definitions
  const customTrack = getTrackConfig(track);
  if (customTrack?.titles) {
    const text = (customTrack.titles as any)[language] || customTrack.titles.es || customTrack.titles.en;
    if (text) return text;
  }

  const titleObj = resolveTrackObject(titles, track);
  if (titleObj && typeof titleObj === 'object') {
    return (titleObj as any)[language] || (titleObj as any).en || (titleObj as any).es || '';
  }
  return (titles.qa as any)?.[language] || titles.qa?.en || titles.qa?.es || '';
}


export function formatModality(modality: WorkModality | undefined, language: Language): string {
  if (!modality) return '';
  switch (modality) {
    case 'remote':
      if (language === 'es') return 'Remoto';
      if (language === 'pt') return 'Remoto';
      return 'Remote';
    case 'hybrid':
      if (language === 'es') return 'Híbrido';
      if (language === 'pt') return 'Híbrido';
      return 'Hybrid';
    case 'onsite':
      if (language === 'es') return 'Presencial';
      if (language === 'pt') return 'Presencial';
      return 'On-site';
    default:
      return '';
  }
}

export function downloadJSON(data: ProfileData, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function formatExperienceDates(dates: { en: string; es: string; pt?: string; [key: string]: string | undefined }, language: Language): string {
  return (dates as any)[language] || dates.en || dates.es;
}
