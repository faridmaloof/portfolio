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
  avatarUrl?: string;
}

export interface TranslatableText {
  en: string;
  es: string;
  pt?: string;
  [key: string]: string | undefined;
}

export interface Titles {
  qa: TranslatableText;
  dev: TranslatableText;
  combined?: TranslatableText;
  sdet?: TranslatableText;
  backend?: TranslatableText;
  fullstack?: TranslatableText;
  [key: string]: TranslatableText | undefined;
}

export interface Summary {
  qa: TranslatableText;
  dev: TranslatableText;
  combined?: TranslatableText;
  sdet?: TranslatableText;
  backend?: TranslatableText;
  fullstack?: TranslatableText;
  [key: string]: TranslatableText | undefined;
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
    pt?: SkillTuple[];
    [key: string]: SkillTuple[] | undefined;
  };
  dev: {
    en: SkillTuple[];
    es: SkillTuple[];
    pt?: SkillTuple[];
    [key: string]: SkillTuple[] | undefined;
  };
  combined?: {
    en: SkillTuple[];
    es: SkillTuple[];
    pt?: SkillTuple[];
    [key: string]: SkillTuple[] | undefined;
  };
  sdet?: {
    en: SkillTuple[];
    es: SkillTuple[];
    pt?: SkillTuple[];
    [key: string]: SkillTuple[] | undefined;
  };
  backend?: {
    en: SkillTuple[];
    es: SkillTuple[];
    pt?: SkillTuple[];
    [key: string]: SkillTuple[] | undefined;
  };
  fullstack?: {
    en: SkillTuple[];
    es: SkillTuple[];
    pt?: SkillTuple[];
    [key: string]: SkillTuple[] | undefined;
  };
  [key: string]: any;
}

export interface ExperienceDetail {
  qa: {
    en: string[];
    es: string[];
    pt?: string[];
    [key: string]: string[] | undefined;
  };
  dev: {
    en: string[];
    es: string[];
    pt?: string[];
    [key: string]: string[] | undefined;
  };
  combined?: {
    en: string[];
    es: string[];
    pt?: string[];
    [key: string]: string[] | undefined;
  };
  sdet?: {
    en: string[];
    es: string[];
    pt?: string[];
    [key: string]: string[] | undefined;
  };
  backend?: {
    en: string[];
    es: string[];
    pt?: string[];
    [key: string]: string[] | undefined;
  };
  fullstack?: {
    en: string[];
    es: string[];
    pt?: string[];
    [key: string]: string[] | undefined;
  };
  [key: string]: any;
}

export interface ExperienceRole {
  qa: TranslatableText;
  dev: TranslatableText;
  combined?: TranslatableText;
  sdet?: TranslatableText;
  backend?: TranslatableText;
  fullstack?: TranslatableText;
  [key: string]: TranslatableText | undefined;
}

export type WorkModality = 'remote' | 'hybrid' | 'onsite';

export interface Experience {
  company: string;
  role: ExperienceRole;
  location: string;
  modality?: WorkModality; // 'remote' | 'hybrid' | 'onsite'
  companyDescription?: TranslatableText;
  dates: TranslatableText;
  detail: ExperienceDetail;
}

export type EarlyCareerTuple = [string, string, string, string]; // [company, role, location, description]

export interface EarlyCareerItem {
  en: EarlyCareerTuple;
  es: EarlyCareerTuple;
  pt?: EarlyCareerTuple;
}

export interface EarlyCareer {
  heading: TranslatableText;
  items: {
    en: EarlyCareerItem[];
    es: EarlyCareerItem[];
    pt?: EarlyCareerItem[];
    [key: string]: EarlyCareerItem[] | undefined;
  };
}

export type EducationTuple = [string, string, string, string]; // [institution, degree, dates, gpa]

export interface EducationItem {
  en: EducationTuple;
  es: EducationTuple;
  pt?: EducationTuple;
  [key: string]: EducationTuple | undefined;
}

export interface Education {
  en: EducationItem[];
  es: EducationItem[];
  pt?: EducationItem[];
  [key: string]: EducationItem[] | undefined;
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
  pt?: {
    summary: string;
    skills: string;
    certifications: string;
    languages: string;
    experience: string;
    education: string;
  };
  [key: string]: any;
}

export interface Certifications {
  en: string[];
  es: string[];
  pt?: string[];
  [key: string]: string[] | undefined;
}

export interface Languages {
  en: string[];
  es: string[];
  pt?: string[];
  [key: string]: string[] | undefined;
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

export interface CertificationRecord {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
  skills?: string[];
  category: 'qa' | 'dev' | 'cloud' | 'database' | 'data' | 'agile' | 'ai' | 'management' | 'security' | 'other';
  isFeaturedQA?: boolean;
  isFeaturedDev?: boolean;
  isFeaturedCombined?: boolean;
}

export type TrackType = 'qa' | 'sdet' | 'dev' | 'backend' | 'fullstack' | 'combined' | string;
export type Language = 'en' | 'es' | 'pt';

export interface ProfileTrackConfig {
  id: string; // e.g. 'sdet', 'qa', 'backend', 'fullstack', 'combined', 'dev', 'devops', etc.
  name: string; // Friendly name for admin display
  badge: string; // Short badge label, e.g. 'SDET Core', 'Backend .NET'
  isSystem?: boolean; // System default tracks vs user created
  isActive: boolean;
  titles: {
    es: string;
    en: string;
    pt?: string;
    [key: string]: string | undefined;
  };
  summary: {
    es: string;
    en: string;
    pt?: string;
    [key: string]: string | undefined;
  };
  skillsHighlight?: {
    es: [string, string][];
    en: [string, string][];
    pt?: [string, string][];
    [key: string]: [string, string][] | undefined;
  };
  seoTitle?: {
    es?: string;
    en?: string;
    pt?: string;
  };
  seoDescription?: {
    es?: string;
    en?: string;
    pt?: string;
  };
}

export interface SystemVariables {
  fullName: string;
  professionalTagline: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  location: string;
  availabilityStatus: string;
  yearsOfExperience: string;
  linkedinUrl: string;
  githubUrl: string;
  calendlyUrl?: string;
  defaultProfile: TrackType;
  defaultLanguage: Language;
  autoDetectLanguage: boolean;
  allowUrlProfileOverride: boolean;
  pdfFilenamePrefix: string;
  copyrightText: string;
  brandName: string;
}

