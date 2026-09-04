import type { ProfileData, Language, TrackType } from '../types';

export function getLocalizedText(text: { en: string; es: string }, language: Language): string {
  return text[language];
}

export function getLocalizedRole(
  role: { qa: { en: string; es: string }; dev: { en: string; es: string }; combined?: { en: string; es: string } },
  track: TrackType,
  language: Language
): string {
  if (track === 'combined' && role.combined) {
    return role.combined[language];
  }
  return role[track][language];
}

export function getLocalizedDetail(
  detail: {
    qa: { en: string[]; es: string[] };
    dev: { en: string[]; es: string[] };
    combined?: { en: string[]; es: string[] };
  },
  track: TrackType,
  language: Language
): string[] {
  if (track === 'combined' && detail.combined) {
    return detail.combined[language];
  }
  return detail[track][language];
}

export function getLocalizedSkills(
  skills: {
    qa: { en: [string, string][]; es: [string, string][] };
    dev: { en: [string, string][]; es: [string, string][] };
    combined?: { en: [string, string][]; es: [string, string][] };
  },
  track: TrackType,
  language: Language
): [string, string][] {
  if (track === 'combined' && skills.combined) {
    return skills.combined[language];
  }
  return skills[track][language];
}

export function getLocalizedSummary(
  summary: { qa: { en: string; es: string }; dev: { en: string; es: string }; combined?: { en: string; es: string } },
  track: TrackType,
  language: Language
): string {
  if (track === 'combined' && summary.combined) {
    return summary.combined[language];
  }
  return summary[track][language];
}

export function getLocalizedTitle(
  titles: { qa: { en: string; es: string }; dev: { en: string; es: string }; combined?: { en: string; es: string } },
  track: TrackType,
  language: Language
): string {
  if (track === 'combined' && titles.combined) {
    return titles.combined[language];
  }
  return titles[track][language];
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

export function formatExperienceDates(dates: { en: string; es: string }, language: Language): string {
  return dates[language];
}
