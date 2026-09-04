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

export interface Skills {
  qa: {
    en: SkillCategory[];
    es: SkillCategory[];
  };
  dev: {
    en: SkillCategory[];
    es: SkillCategory[];
  };
  combined?: {
    en: SkillCategory[];
    es: SkillCategory[];
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

export interface Experience {
  company: string;
  role: {
    qa: TranslatableText;
    dev: TranslatableText;
    combined?: TranslatableText;
  };
  location: string;
  dates: TranslatableText;
  detail: ExperienceDetail;
}

export interface EarlyCareerItem {
  en: [string, string, string, string]; // [company, role, location, description]
  es: [string, string, string, string];
}

export interface EarlyCareer {
  heading: TranslatableText;
  items: {
    en: EarlyCareerItem[];
    es: EarlyCareerItem[];
  };
}

export interface EducationItem {
  en: [string, string, string, string]; // [institution, degree, dates, gpa]
  es: [string, string, string, string];
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
