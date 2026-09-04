// Portfolio data types

export interface Contact {
  name: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  linkedinUrl: string;
  github?: string;
  githubUrl?: string;
}

export interface TranslatableText {
  en: string;
  es: string;
}

export interface Titles {
  qa: TranslatableText;
  dev: TranslatableText;
  combined?: TranslatableText;
}

export interface Summary {
  qa: TranslatableText;
  dev: TranslatableText;
  combined?: TranslatableText;
}

export interface SkillCategory {
  category: string;
  tech: string;
}

export type SkillTuple = [string, string];

export interface Skills {
  qa: {
    en: SkillTuple[];
    es: SkillTuple[];
  };
  dev: {
    en: SkillTuple[];
    es: SkillTuple[];
  };
  combined?: {
    en: SkillTuple[];
    es: SkillTuple[];
  };
}

export interface ExperienceDetail {
  qa: {
    en: string[];
    es: string[];
  };
  dev: {
    en: string[];
    es: string[];
  };
  combined?: {
    en: string[];
    es: string[];
  };
}

export interface ExperienceRole {
  qa: TranslatableText;
  dev: TranslatableText;
  combined?: TranslatableText;
}

export interface Experience {
  company: string;
  role: ExperienceRole;
  location: string;
  dates: TranslatableText;
  detail: ExperienceDetail;
}

export type EarlyCareerTuple = [string, string, string, string]; // [company, role, location, description]

export interface EarlyCareerItem {
  en: EarlyCareerTuple;
  es: EarlyCareerTuple;
}

export interface EarlyCareer {
  heading: TranslatableText;
  items: {
    en: EarlyCareerItem[];
    es: EarlyCareerItem[];
  };
}

export type EducationTuple = [string, string, string, string]; // [institution, degree, dates, gpa]

export interface EducationItem {
  en: EducationTuple;
  es: EducationTuple;
}

export interface Education {
  en: EducationItem[];
  es: EducationItem[];
}

export interface Labels {
  en: {
    summary: string;
    skills: string;
    certifications: string;
    languages: string;
    experience: string;
    education: string;
  };
  es: {
    summary: string;
    skills: string;
    certifications: string;
    languages: string;
    experience: string;
    education: string;
  };
}

export interface Certifications {
  en: string[];
  es: string[];
}

export interface Languages {
  en: string[];
  es: string[];
}

export interface ProfileData {
  contact: Contact;
  titles: Titles;
  summary: Summary;
  skills: Skills;
  certifications: Certifications;
  languages: Languages;
  experience: Experience[];
  earlyCareer: EarlyCareer;
  education: Education;
  labels: Labels;
}

export type TrackType = 'qa' | 'dev' | 'combined';
export type Language = 'en' | 'es';
