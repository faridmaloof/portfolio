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
  [key: string]: EarlyCareerTuple | undefined;
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

export type TrackType = 'qa' | 'sdet' | 'dev' | 'backend' | 'fullstack' | 'full' | 'combined' | string;
export type Language = 'en' | 'es' | 'pt' | string;

export type SchedulingProvider = 'calendly' | 'google_calendar' | 'outlook' | 'custom' | 'none';

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag?: string;
  isActive: boolean;
}

export type LanguageConfig = LanguageOption;

export interface ServiceItem {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  icon: string;
  keywords: string[];
  trackIds?: string[];
}

export interface ProfileTrackConfig {
  id: string; // e.g. 'sdet', 'qa', 'backend', 'fullstack', 'full', 'combined'
  name: string; // Friendly name for admin display
  badge: string; // Short badge label, e.g. 'SDET Core', 'Backend .NET', 'Full Stack 360'
  isSystem?: boolean; // System default tracks vs user created
  isActive: boolean;
  // 1. Resumen profesional y títulos multilingües
  titles: Record<string, string>;
  summary: Record<string, string>;
  skillsHighlight?: Record<string, [string, string][] | undefined>;
  
  // 2. Experiencia profesional adaptada al stack
  featuredCompanies?: string[];
  customExperienceNotes?: Record<string, string>;
  
  // 3. Certificaciones específicas para este stack
  featuredCertifications?: string[];
  initialVisibleCertsCount?: number;
  certCategories?: ('qa' | 'dev' | 'cloud' | 'database' | 'data' | 'agile' | 'ai' | 'management' | 'security' | 'other')[];
  
  // 4. Servicios de Consultoría y Liderazgo Técnico específicos
  serviceIds?: string[];
  customServices?: ServiceItem[];
  
  // 5. SEO por cada stack técnico
  seoTitle?: Record<string, string>;
  seoDescription?: Record<string, string>;
  seoKeywords?: Record<string, string>;
  ogImage?: string;

  // 6. Visibilidad opcional por stack
  visibility?: {
    hero?: boolean;
    summary?: boolean;
    experience?: boolean;
    certifications?: boolean;
    services?: boolean;
    githubProjects?: boolean;
    education?: boolean;
    languages?: boolean;
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
  // Agendamiento multicanal (Calendly, Google Calendar, Outlook, Personalizado)
  calendlyUrl?: string; // Compatibilidad legacy
  schedulingUrl?: string;
  schedulingProvider?: SchedulingProvider;
  schedulingCtaText?: Record<string, string>;
  // Comportamiento de idiomas dinámicos
  defaultProfile: TrackType;
  defaultLanguage: Language;
  availableLanguages?: LanguageOption[];
  autoDetectLanguage: boolean;
  allowUrlProfileOverride: boolean;
  pdfFilenamePrefix: string;
  copyrightText: string;
  brandName: string;
  // SEO por defecto global
  defaultSeoTitle?: Record<string, string>;
  defaultSeoDescription?: Record<string, string>;
  defaultSeoKeywords?: Record<string, string>;
  defaultOgImage?: string;
  // Personalización Visual y Templates de Frontend
  designConfig?: FrontendDesignConfig;
}

export type TemplatePreset = 'executive' | 'minimalist' | 'compact' | 'bento';
export type ColorPalette = 'indigo' | 'emerald' | 'violet' | 'blue' | 'amber' | 'monochrome';
export type FontPairing = 'modern-sans' | 'tech-mono' | 'editorial' | 'geometric';
export type CardBorderRadius = 'rounded' | 'soft' | 'sharp';
export type HeroLayout = 'classic' | 'centered' | 'compact';
export type SectionId = 'summary' | 'services' | 'experience' | 'githubProjects' | 'certifications' | 'education' | 'languages';

export interface FrontendDesignConfig {
  templatePreset: TemplatePreset;
  colorPalette: ColorPalette;
  fontPairing: FontPairing;
  cardRadius: CardBorderRadius;
  heroLayout: HeroLayout;
  sectionOrder: SectionId[];
}

