import { useState, useEffect } from 'react';
import type { 
  ProfileData, 
  Language, 
  TrackType, 
  ProfileTrackConfig, 
  SystemVariables,
  ServiceItem,
  LanguageOption,
  SchedulingProvider,
  FrontendDesignConfig
} from '../types';
import { defaultProfileData } from '../data/profile';

export type { ServiceItem, LanguageOption, LanguageOption as LanguageConfig, FrontendDesignConfig } from '../types';

const DB_NAME = 'portfolio_db';
const ADMIN_EMAIL = 'faridmaloof@gmail.com';
const DEFAULT_PASSWORD = 'Admin123!';
const DEFAULT_USERNAME = 'admin';

export interface AdminUser {
  id: string;
  email: string;
  username: string;
  password: string;
  role: 'superadmin' | 'admin' | 'editor';
  mustChangePassword: boolean;
  resetCode: string | null;
  resetCodeExpiry: number | null;
  createdAt: string;
}

export interface PortfolioSettings {
  defaultProfile: TrackType;
  defaultLanguage: Language;
  autoDetectLanguage?: boolean;
  allowUrlProfileOverride?: boolean;
  theme: 'light' | 'dark' | 'blue';
  visibility: {
    hero: boolean;
    summary: boolean;
    experience: boolean;
    earlyCareer: boolean;
    education: boolean;
    certifications: boolean;
    skills: boolean;
    languages: boolean;
    services: boolean;
    githubProjects: boolean;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    ogImage: string;
  };
  designConfig?: FrontendDesignConfig;
  systemVariables?: SystemVariables;
}

export const DEFAULT_DESIGN_CONFIG: FrontendDesignConfig = {
  templatePreset: 'executive',
  colorPalette: 'indigo',
  fontPairing: 'modern-sans',
  cardRadius: 'rounded',
  heroLayout: 'classic',
  sectionOrder: ['summary', 'services', 'experience', 'githubProjects', 'certifications', 'education', 'languages']
};

export const DEFAULT_LANGUAGES: LanguageOption[] = [
  { code: 'es', name: 'Español', nativeName: 'Español', flag: '🇪🇸', isActive: true },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', isActive: true },
  { code: 'pt', name: 'Português', nativeName: 'Português', flag: '🇧🇷', isActive: true },
];

export function detectSchedulingProvider(url: string): SchedulingProvider {
  if (!url || !url.trim()) return 'none';
  const u = url.trim().toLowerCase();
  if (u.includes('calendly.com')) return 'calendly';
  if (u.includes('calendar.google.com') || u.includes('calendar.app.google')) return 'google_calendar';
  if (u.includes('outlook.office.com') || u.includes('outlook.live.com') || u.includes('bookwithme')) return 'outlook';
  return 'custom';
}

export const DEFAULT_SYSTEM_VARIABLES: SystemVariables = {
  fullName: "Farid Maloof S.",
  professionalTagline: "Senior Software Engineer & SDET Architecture Lead",
  email: "faridmaloof@gmail.com",
  phone: "+57 300 235 7202",
  whatsappNumber: "+573002357202",
  location: "Bogotá, D.C., Colombia",
  availabilityStatus: "Disponible para Contratación Inmediata",
  yearsOfExperience: "15+",
  linkedinUrl: "https://www.linkedin.com/in/fmaloofs/",
  githubUrl: "https://github.com/faridmaloof/",
  calendlyUrl: "",
  schedulingUrl: "",
  schedulingProvider: "calendly",
  schedulingCtaText: {
    es: "Agendar Llamada / Entrevista",
    en: "Schedule Technical Call",
    pt: "Agendar Reunião Técnica"
  },
  defaultProfile: "full",
  defaultLanguage: "es",
  availableLanguages: DEFAULT_LANGUAGES,
  autoDetectLanguage: true,
  allowUrlProfileOverride: true,
  pdfFilenamePrefix: "CV-Farid-Maloof",
  copyrightText: "© 2026 Farid Maloof Suarez. Todos los derechos reservados.",
  brandName: "FM · Farid Maloof",
  defaultSeoTitle: {
    es: "Farid Maloof | Senior Software Engineer & SDET Architecture Lead",
    en: "Farid Maloof | Senior Software Engineer & SDET Architecture Lead",
    pt: "Farid Maloof | Engenheiro de Software Sênior & Líder SDET"
  },
  defaultSeoDescription: {
    es: "Portafolio profesional y técnico de Farid Maloof Suarez. Más de 15 años de experiencia liderando ingeniería de software, arquitectura de automatización QA/SDET, microservicios y desarrollo full-stack.",
    en: "Professional technical portfolio of Farid Maloof Suarez. 15+ years leading software engineering, test automation architecture (SDET), microservices, and full-stack development.",
    pt: "Portfólio profissional de Farid Maloof Suarez. Mais de 15 anos de experiência liderando engenharia de software e arquitetura SDET."
  },
  defaultSeoKeywords: {
    es: "Farid Maloof, SDET, QA Automation, Tech Lead, Full Stack, .NET Core, Java, React, Playwright, Microservicios, Cloud",
    en: "Farid Maloof, SDET, QA Automation, Tech Lead, Full Stack, .NET Core, Java, React, Playwright, Microservices, Cloud",
    pt: "Farid Maloof, SDET, QA Automation, Tech Lead, Full Stack, .NET Core, Java, React, Playwright, Microsserviços"
  },
  designConfig: DEFAULT_DESIGN_CONFIG
};

export const DEFAULT_TRACK_CONFIGS: ProfileTrackConfig[] = [
  {
    id: 'full',
    name: 'Perfil Integral (Full Tech Lead & SDET Lead)',
    badge: 'Full Stack & SDET Lead',
    isSystem: true,
    isActive: true,
    titles: {
      es: 'Ingeniero de Software Senior | Tech Lead & SDET Architect',
      en: 'Senior Software Engineer | Tech Lead & SDET Architect',
      pt: 'Engenheiro de Software Sênior | Tech Lead & SDET Architect',
    },
    summary: {
      es: 'Ingeniero de Software Senior y Líder Técnico con más de 15 años de trayectoria unificando el desarrollo de sistemas distribuidos de alto rendimiento con arquitecturas de aseguramiento de calidad de nivel corporativo. Especialista en la creación de ecosistemas de software resilientes, pipelines CI/CD automatizados, microservicios (.NET Core / Java Spring Boot) y aplicaciones modernas en React / TypeScript.',
      en: 'Senior Software Engineer & Technical Lead with 15+ years of experience bridging high-performance distributed systems engineering with enterprise-grade quality assurance architectures. Expert in resilient software ecosystems, automated CI/CD pipelines, microservices (.NET Core / Java Spring Boot), and modern React / TypeScript applications.',
      pt: 'Engenheiro de Software Sênior e Líder Técnico com mais de 15 anos de experiência unindo desenvolvimento de microsserviços distribuídos de alto desempenho com arquiteturas corporativas de garantia de qualidade e automação de testes.',
    },
    skillsHighlight: defaultProfileData.skills.combined,
    serviceIds: ['s-1', 's-2', 's-3', 's-4'],
    featuredCertifications: ['cert-2026-03', 'cert-2026-02', 'cert-2026-04', 'cert-2025-01', 'cert-2025-03', 'cert-hist-03'],
    seoTitle: {
      es: 'Farid Maloof Suarez | Tech Lead, SDET Architect & Senior Full Stack (15+ Años)',
      en: 'Farid Maloof Suarez | Tech Lead, SDET Architect & Senior Full Stack Engineer',
      pt: 'Farid Maloof Suarez | Tech Lead, Arquiteto SDET & Full Stack Sênior'
    },
    seoDescription: {
      es: 'Portafolio profesional integral y CV técnico de Farid Maloof Suarez. Más de 15 años liderando ingeniería de software, arquitectura SDET y microservicios escalables.',
      en: 'Professional technical portfolio of Farid Maloof Suarez. 15+ years leading software engineering, test automation architectures, and enterprise cloud systems.',
      pt: 'Portfólio técnico de Farid Maloof Suarez. Mais de 15 anos de trajetória em engenharia de software e liderança técnica.'
    },
    seoKeywords: {
      es: 'Farid Maloof, Tech Lead, SDET, Full Stack, Software Engineer, .NET Core, Java, React, Playwright, Cloud',
      en: 'Farid Maloof, Tech Lead, SDET, Full Stack, Software Engineer, .NET Core, Java, React, Playwright, Cloud',
      pt: 'Farid Maloof, Tech Lead, SDET, Full Stack, Software Engineer'
    }
  },
  {
    id: 'combined',
    name: 'Perfil Integral (Senior Software Engineer & SDET Lead)',
    badge: '15+ Años Exp.',
    isSystem: true,
    isActive: true,
    titles: {
      es: defaultProfileData.titles?.combined?.es || 'Ingeniero de Software Senior | SDET | Full Stack',
      en: defaultProfileData.titles?.combined?.en || 'Senior Software Engineer | SDET | Full Stack',
      pt: defaultProfileData.titles?.combined?.pt || defaultProfileData.titles?.combined?.es || 'Engenheiro de Software Sênior | SDET | Full Stack',
    },
    summary: {
      es: defaultProfileData.summary?.combined?.es || '',
      en: defaultProfileData.summary?.combined?.en || '',
      pt: defaultProfileData.summary?.combined?.pt || defaultProfileData.summary?.combined?.es || '',
    },
    skillsHighlight: defaultProfileData.skills.combined,
    serviceIds: ['s-1', 's-2', 's-3', 's-4'],
    featuredCertifications: ['cert-2026-03', 'cert-2026-02', 'cert-2026-04', 'cert-2025-01', 'cert-2025-03'],
    seoTitle: {
      es: 'Farid Maloof Suarez | Ingeniero de Software Senior & SDET Architecture Lead (15+ Años)',
      en: 'Farid Maloof Suarez | Senior Software Engineer & SDET Architecture Lead (15+ Yrs)',
      pt: 'Farid Maloof Suarez | Engenheiro de Software Sênior & Líder de Arquitetura SDET'
    },
    seoDescription: {
      es: 'Portafolio técnico de Farid Maloof Suarez. Más de 15 años de trayectoria en ingeniería de software, arquitectura de automatización QA / SDET, desarrollo full-stack, cloud computing y liderazgo técnico.',
      en: 'Technical Portfolio of Farid Maloof Suarez. 15+ years of enterprise software engineering, test automation architecture (SDET), full-stack development, cloud computing, and technical leadership.',
      pt: 'Portfólio técnico de Farid Maloof Suarez. Mais de 15 anos de trajetória em engenharia de software, arquitetura de automação QA / SDET e liderança técnica.'
    },
    seoKeywords: {
      es: 'Farid Maloof, SDET, QA Automation, Tech Lead, Full Stack, .NET Core, Java, React, Playwright, Cloud',
      en: 'Farid Maloof, SDET, QA Automation, Tech Lead, Full Stack, .NET Core, Java, React, Playwright, Cloud',
      pt: 'Farid Maloof, SDET, QA Automation, Tech Lead, Full Stack'
    }
  },
  {
    id: 'sdet',
    name: 'SDET (Software Development Engineer in Test)',
    badge: 'Automation Core',
    isSystem: true,
    isActive: true,
    titles: {
      es: defaultProfileData.titles?.sdet?.es || 'Ingeniero de Desarrollo de Software en Pruebas (SDET)',
      en: defaultProfileData.titles?.sdet?.en || 'Software Development Engineer in Test (SDET)',
      pt: defaultProfileData.titles?.sdet?.pt || defaultProfileData.titles?.sdet?.es || 'Engenheiro de Software em Teste (SDET)',
    },
    summary: {
      es: defaultProfileData.summary?.sdet?.es || '',
      en: defaultProfileData.summary?.sdet?.en || '',
      pt: defaultProfileData.summary?.sdet?.pt || defaultProfileData.summary?.sdet?.es || '',
    },
    skillsHighlight: defaultProfileData.skills.sdet,
    serviceIds: ['s-1', 's-3', 's-4'],
    featuredCertifications: ['cert-2026-03', 'cert-2026-04', 'cert-2025-01', 'cert-2025-02', 'cert-2024-01'],
    certCategories: ['qa', 'ai'],
    seoTitle: {
      es: 'Farid Maloof | Senior SDET Lead & Arquitecto de Automatización de Pruebas',
      en: 'Farid Maloof | Senior SDET Lead & Test Automation Architect',
      pt: 'Farid Maloof | Líder SDET Sênior & Arquiteto de Automação de Testes'
    },
    seoDescription: {
      es: 'Portafolio técnico de Farid Maloof Suarez. Senior SDET Lead con más de 15 años de experiencia. Arquitectura de pruebas, Playwright, Selenium, Robot Framework, CI/CD pipelines, automatización de APIs y testing con Inteligencia Artificial.',
      en: 'Technical Portfolio & ATS CV of Farid Maloof Suarez. Senior SDET Lead with 15+ years of experience in test automation architecture, Playwright, Selenium, Robot Framework, CI/CD gates, and AI testing.',
      pt: 'Portfólio técnico de Farid Maloof Suarez. Líder SDET Sênior com mais de 15 anos de experiência em arquitetura de automação, Playwright, Selenium, Robot Framework e testes com IA.'
    },
    seoKeywords: {
      es: 'Farid Maloof, SDET, QA Automation, Playwright, Cypress, Selenium, Robot Framework, CI/CD, JMeter, Test Automation Architect',
      en: 'Farid Maloof, SDET, QA Automation, Playwright, Cypress, Selenium, Robot Framework, CI/CD, JMeter, Test Automation Architect',
      pt: 'Farid Maloof, SDET, QA Automation, Playwright, Cypress, Selenium'
    }
  },
  {
    id: 'qa',
    name: 'QA Specialist & Quality Assurance Lead',
    badge: 'ISTQB v4.0',
    isSystem: true,
    isActive: true,
    titles: {
      es: defaultProfileData.titles?.qa?.es || 'Líder de Automatización de Pruebas QA / Especialista Senior',
      en: defaultProfileData.titles?.qa?.en || 'QA Automation Lead Engineer / Senior QA Specialist',
      pt: defaultProfileData.titles?.qa?.pt || defaultProfileData.titles?.qa?.es || 'Líder de Automação de Testes QA',
    },
    summary: {
      es: defaultProfileData.summary?.qa?.es || '',
      en: defaultProfileData.summary?.qa?.en || '',
      pt: defaultProfileData.summary?.qa?.pt || defaultProfileData.summary?.qa?.es || '',
    },
    skillsHighlight: defaultProfileData.skills.qa,
    serviceIds: ['s-1', 's-3'],
    featuredCertifications: ['cert-2026-04', 'cert-2026-01', 'cert-2025-01'],
    certCategories: ['qa', 'agile'],
    seoTitle: {
      es: 'Farid Maloof | Especialista Senior en Automatización QA & Calidad de Software',
      en: 'Farid Maloof | Senior QA Automation Specialist & Quality Lead',
      pt: 'Farid Maloof | Especialista Sênior em Automação de QA & Qualidade de Software'
    },
    seoDescription: {
      es: 'Portafolio profesional de Farid Maloof Suarez. Especialista en QA Automation certificado ISTQB CTFL v4.0. Estrategia de calidad, gestión de pruebas funcionales y regresivas, Cypress, Appium y pruebas de rendimiento.',
      en: 'Professional Portfolio of Farid Maloof Suarez. ISTQB CTFL v4.0 Certified QA Automation Specialist, quality strategy, functional/regression test suites, Cypress, Appium and performance.',
      pt: 'Portfólio profissional de Farid Maloof Suarez. Especialista em automação de QA certificado ISTQB CTFL v4.0, estratégias de testes funcionais e regressivos.'
    },
    seoKeywords: {
      es: 'Farid Maloof, QA Lead, ISTQB, Quality Assurance, Test Strategy, Shift-Left, Cypress, Software Testing',
      en: 'Farid Maloof, QA Lead, ISTQB, Quality Assurance, Test Strategy, Shift-Left, Cypress, Software Testing',
      pt: 'Farid Maloof, QA Lead, ISTQB, Quality Assurance'
    }
  },
  {
    id: 'backend',
    name: 'Senior Backend Engineer & Cloud APIs',
    badge: '.NET · Java · SQL',
    isSystem: true,
    isActive: true,
    titles: {
      es: defaultProfileData.titles?.backend?.es || 'Ingeniero Backend Senior | .NET Core · Java Spring Boot',
      en: defaultProfileData.titles?.backend?.en || 'Senior Backend Engineer | .NET Core · Java Spring Boot',
      pt: defaultProfileData.titles?.backend?.pt || defaultProfileData.titles?.backend?.es || 'Engenheiro Backend Sênior',
    },
    summary: {
      es: defaultProfileData.summary?.backend?.es || '',
      en: defaultProfileData.summary?.backend?.en || '',
      pt: defaultProfileData.summary?.backend?.pt || defaultProfileData.summary?.backend?.es || '',
    },
    skillsHighlight: defaultProfileData.skills.backend,
    serviceIds: ['s-2', 's-3', 's-4'],
    featuredCertifications: ['cert-2026-02', 'cert-2025-03', 'cert-2024-03', 'cert-hist-03'],
    certCategories: ['dev', 'cloud', 'database'],
    seoTitle: {
      es: 'Farid Maloof | Desarrollador Senior Backend (.NET 9 · Java Spring Boot · APIs REST)',
      en: 'Farid Maloof | Senior Backend Engineer (.NET 9 · Java Spring Boot · REST APIs)',
      pt: 'Farid Maloof | Desenvolvedor Backend Sênior (.NET 9 · Java Spring Boot · APIs REST)'
    },
    seoDescription: {
      es: 'Portafolio técnico de Farid Maloof Suarez. Desarrollador Senior Backend enfocado en C# .NET 9, Java Spring Boot, arquitectura de microservicios, bases de datos PostgreSQL, SQL Server, Redis y Docker.',
      en: 'Technical Portfolio of Farid Maloof Suarez. Senior Backend Engineer specializing in .NET 9, C#, Java Spring Boot, microservices, PostgreSQL, SQL Server, Redis, and cloud containers.',
      pt: 'Portfólio técnico de Farid Maloof Suarez. Desenvolvedor Backend Sênior com foco em .NET 9, Java Spring Boot, microsserviços, PostgreSQL e arquiteturas em nuvem.'
    },
    seoKeywords: {
      es: 'Farid Maloof, Backend Engineer, .NET Core, C#, Java Spring Boot, REST APIs, PostgreSQL, Docker, Microservicios',
      en: 'Farid Maloof, Backend Engineer, .NET Core, C#, Java Spring Boot, REST APIs, PostgreSQL, Docker, Microservices',
      pt: 'Farid Maloof, Backend Engineer, .NET Core, C#, Java Spring Boot'
    }
  },
  {
    id: 'fullstack',
    name: 'Senior Full Stack Developer (React · TypeScript · .NET)',
    badge: 'React · .NET Core',
    isSystem: true,
    isActive: true,
    titles: {
      es: defaultProfileData.titles?.fullstack?.es || 'Ingeniero Full Stack Senior | React · TypeScript · .NET',
      en: defaultProfileData.titles?.fullstack?.en || 'Senior Full Stack Engineer | React · TypeScript · .NET',
      pt: defaultProfileData.titles?.fullstack?.pt || defaultProfileData.titles?.fullstack?.es || 'Engenheiro Full Stack Sênior',
    },
    summary: {
      es: defaultProfileData.summary?.fullstack?.es || '',
      en: defaultProfileData.summary?.fullstack?.en || '',
      pt: defaultProfileData.summary?.fullstack?.pt || defaultProfileData.summary?.fullstack?.es || '',
    },
    skillsHighlight: defaultProfileData.skills.fullstack,
    serviceIds: ['s-2', 's-3', 's-1'],
    featuredCertifications: ['cert-2026-02', 'cert-2025-03', 'cert-2024-04'],
    certCategories: ['dev', 'cloud'],
    seoTitle: {
      es: 'Farid Maloof | Desarrollador Senior Full Stack (.NET · React · TypeScript · Cloud)',
      en: 'Farid Maloof | Senior Full Stack Developer (.NET · React · TypeScript · Cloud)',
      pt: 'Farid Maloof | Desenvolvedor Full Stack Sênior (.NET · React · TypeScript · Cloud)'
    },
    seoDescription: {
      es: 'Portafolio técnico de Farid Maloof Suarez. Desarrollador Senior Full Stack especializado en React, TypeScript, Next.js, .NET Core, diseño de APIs seguras y despliegues en AWS y Azure.',
      en: 'Technical Portfolio of Farid Maloof Suarez. Senior Full Stack Engineer specializing in React, TypeScript, modern UI architectures, .NET Core backends, and cloud deployments.',
      pt: 'Portfólio técnico de Farid Maloof Suarez. Desenvolvedor Full Stack Sênior com expertise em React, TypeScript, .NET Core e soluções em nuvem.'
    },
    seoKeywords: {
      es: 'Farid Maloof, Full Stack Developer, React, TypeScript, .NET Core, Node.js, Web Development, Tailwind CSS',
      en: 'Farid Maloof, Full Stack Developer, React, TypeScript, .NET Core, Node.js, Web Development, Tailwind CSS',
      pt: 'Farid Maloof, Full Stack Developer, React, TypeScript, .NET Core'
    }
  },
  {
    id: 'dev',
    name: 'Senior Software Engineer & Distributed Architecture',
    badge: 'Architecture',
    isSystem: true,
    isActive: true,
    titles: {
      es: defaultProfileData.titles.dev.es,
      en: defaultProfileData.titles.dev.en,
      pt: defaultProfileData.titles.dev.pt || defaultProfileData.titles.dev.es,
    },
    summary: {
      es: defaultProfileData.summary.dev.es,
      en: defaultProfileData.summary.dev.en,
      pt: defaultProfileData.summary.dev.pt || defaultProfileData.summary.dev.es,
    },
    skillsHighlight: defaultProfileData.skills.dev,
    serviceIds: ['s-2', 's-3', 's-4'],
    featuredCertifications: ['cert-2026-02', 'cert-2025-03', 'cert-hist-03'],
    certCategories: ['dev', 'cloud'],
    seoTitle: {
      es: 'Farid Maloof | Ingeniero de Software Senior (.NET · Java · Microservicios · Cloud)',
      en: 'Farid Maloof | Senior Software Engineer (.NET · Java · Microservices · Cloud)',
      pt: 'Farid Maloof | Engenheiro de Software Sênior (.NET · Java · Microsserviços · Cloud)'
    },
    seoDescription: {
      es: 'Portafolio técnico de Farid Maloof Suarez. Más de 15 años diseñando e implementando arquitecturas de software empresarial resilientes, microservicios y soluciones de nube de alto rendimiento.',
      en: 'Technical Portfolio of Farid Maloof Suarez. 15+ years delivering enterprise software architectures, robust microservices, and high-performance cloud engineering.',
      pt: 'Portfólio técnico de Farid Maloof Suarez. Mais de 15 anos entregando arquiteturas de software corporativo e microsserviços.'
    },
    seoKeywords: {
      es: 'Farid Maloof, Software Engineer, Architecture, Microservices, .NET Core, Java, Cloud',
      en: 'Farid Maloof, Software Engineer, Architecture, Microservices, .NET Core, Java, Cloud',
      pt: 'Farid Maloof, Software Engineer, Architecture, Microservices'
    }
  }
];

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 's-1',
    title: {
      es: 'Automatización de Pruebas QA & SDET',
      en: 'QA Automation & SDET Architecture',
      pt: 'Automação de Testes QA & SDET'
    },
    description: {
      es: 'Estrategia completa de automatización con Playwright, Cypress y Selenium. Diseño de frameworks mantenibles e integración en pipelines CI/CD.',
      en: 'End-to-end test automation strategy with Playwright, Cypress, and Selenium. Enterprise framework architecture and CI/CD integration.',
      pt: 'Estratégia completa de automação com Playwright, Cypress e Selenium. Arquitetura de frameworks sustentáveis e integração em CI/CD.'
    },
    icon: 'Bot',
    keywords: ['Playwright', 'Cypress', 'Selenium', 'CI/CD', 'SDET', 'Cucumber'],
    trackIds: ['sdet', 'qa', 'combined', 'full']
  },
  {
    id: 's-2',
    title: {
      es: 'Desarrollo Backend & APIs Escalables',
      en: 'Backend Development & Scalable APIs',
      pt: 'Desenvolvimento Backend & APIs Escaláveis'
    },
    description: {
      es: 'Arquitectura y desarrollo de microservicios robustos en Java (Spring Boot) y .NET Core / C#, con bases de datos relacionales y NoSQL.',
      en: 'Robust microservices architecture in Java (Spring Boot) and .NET Core / C# with relational and NoSQL databases.',
      pt: 'Arquitetura e desenvolvimento de microsserviços robustos em Java (Spring Boot) e .NET Core / C#.'
    },
    icon: 'Server',
    keywords: ['Java', 'Spring Boot', '.NET Core', 'REST APIs', 'PostgreSQL', 'Docker'],
    trackIds: ['backend', 'fullstack', 'dev', 'combined', 'full']
  },
  {
    id: 's-3',
    title: {
      es: 'Consultoría Técnica & Auditoría de Código',
      en: 'Technical Consulting & Code Auditing',
      pt: 'Consultoria Técnica & Auditoria de Código'
    },
    description: {
      es: 'Evaluación de arquitectura de software, optimización de pipelines DevOps, mejora de cobertura de pruebas y mentoría técnica a equipos.',
      en: 'Software architecture review, DevOps pipeline optimization, test coverage enhancement, and technical team mentoring.',
      pt: 'Avaliação de arquitetura de software, otimização de pipelines DevOps e mentoria técnica para equipes.'
    },
    icon: 'ShieldCheck',
    keywords: ['Architecture', 'DevOps', 'Code Review', 'Quality Assurance'],
    trackIds: ['sdet', 'backend', 'qa', 'fullstack', 'dev', 'combined', 'full']
  },
  {
    id: 's-4',
    title: {
      es: 'Pruebas de Rendimiento & Seguridad',
      en: 'Performance & Reliability Testing',
      pt: 'Testes de Performance & Confiabilidade'
    },
    description: {
      es: 'Pruebas de carga y estrés con JMeter y k6. Diagnóstico de cuellos de botella y optimización de latencia en aplicaciones de alto tráfico.',
      en: 'Load and stress testing with JMeter and k6. Bottleneck diagnostics and latency optimization for high-throughput applications.',
      pt: 'Testes de carga e estresse com JMeter e k6. Diagnóstico de gargalos e otimização de latência.'
    },
    icon: 'Gauge',
    keywords: ['JMeter', 'k6', 'Performance', 'Reliability', 'Stress Testing'],
    trackIds: ['sdet', 'backend', 'qa', 'combined', 'full']
  }
];

// Initialize database with default admin and profile data
export function initDB(): void {
  try {
    console.log('📦 [DB] Initializing database (portfolio_db)...');
    let db = localStorage.getItem(DB_NAME);
    
    if (!db) {
      console.log('📦 [DB] No existing database found. Creating initial seed data...');
      const initialDB = {
        profiles: [],
        admins: [{
          id: '1',
          email: ADMIN_EMAIL,
          username: DEFAULT_USERNAME,
          password: DEFAULT_PASSWORD,
          role: 'superadmin',
          mustChangePassword: false,
          resetCode: null,
          resetCodeExpiry: null,
          createdAt: new Date().toISOString()
        }],
        settings: {
          defaultProfile: 'combined',
          defaultLanguage: 'es',
          theme: 'light',
          visibility: {
            hero: true,
            summary: true,
            experience: true,
            earlyCareer: false,
            education: true,
            certifications: true,
            skills: true,
            languages: true,
            services: true,
            githubProjects: true
          },
          seo: {
            metaTitle: 'Farid Maloof S. | QA Automation Engineer & Full Stack Developer',
            metaDescription: 'Portafolio profesional de Farid Maloof S. Especialista en Automatización de Pruebas QA (SDET) y Desarrollador Full Stack (Java, .NET, React).',
            keywords: 'Farid Maloof, QA Automation, SDET, Playwright, Selenium, Java, Spring Boot, .NET, Full Stack, React',
            ogImage: '/profile-placeholder.jpg'
          }
        },
        services: DEFAULT_SERVICES,
        tracks: DEFAULT_TRACK_CONFIGS,
        systemVariables: DEFAULT_SYSTEM_VARIABLES
      };
      localStorage.setItem(DB_NAME, JSON.stringify(initialDB));
      console.log('✅ [DB] Database initialized successfully with default admin:', ADMIN_EMAIL, '/', DEFAULT_USERNAME);
    } else {
      const parsedDB = JSON.parse(db);
      console.log('📦 [DB] Database loaded. Verifying schema and default credentials...');
      
      let updated = false;

      // Ensure admins exist and default admin is valid
      if (!parsedDB.admins || parsedDB.admins.length === 0) {
        parsedDB.admins = [{
          id: '1',
          email: ADMIN_EMAIL,
          username: DEFAULT_USERNAME,
          password: DEFAULT_PASSWORD,
          role: 'superadmin',
          mustChangePassword: false,
          resetCode: null,
          resetCodeExpiry: null,
          createdAt: new Date().toISOString()
        }];
        updated = true;
      } else {
        // Ensure default admin exists in the list
        const defaultAdmin = parsedDB.admins.find(
          (a: any) => (a.email || '').toLowerCase() === ADMIN_EMAIL.toLowerCase() ||
                      (a.username || '').toLowerCase() === DEFAULT_USERNAME.toLowerCase()
        );

        if (!defaultAdmin) {
          parsedDB.admins.push({
            id: String(Date.now()),
            email: ADMIN_EMAIL,
            username: DEFAULT_USERNAME,
            password: DEFAULT_PASSWORD,
            role: 'superadmin',
            mustChangePassword: false,
            resetCode: null,
            resetCodeExpiry: null,
            createdAt: new Date().toISOString()
          });
          updated = true;
        } else {
          // If default admin had mustChangePassword true blocking login, set to false
          if (defaultAdmin.mustChangePassword) {
            defaultAdmin.mustChangePassword = false;
            updated = true;
          }
        }
      }
      
      // Ensure settings exist
      if (!parsedDB.settings) {
        parsedDB.settings = {
          defaultProfile: 'combined',
          defaultLanguage: 'es',
          theme: 'light',
          visibility: {
            hero: true,
            summary: true,
            experience: true,
            earlyCareer: false,
            education: true,
            certifications: true,
            skills: true,
            languages: true,
            services: true,
            githubProjects: true
          },
          seo: {
            metaTitle: 'Farid Maloof S. | QA Automation Engineer & Full Stack Developer',
            metaDescription: 'Portafolio profesional de Farid Maloof S. Especialista en Automatización de Pruebas QA (SDET) y Desarrollador Full Stack (Java, .NET, React).',
            keywords: 'Farid Maloof, QA Automation, SDET, Playwright, Selenium, Java, Spring Boot, .NET, Full Stack, React',
            ogImage: '/profile-placeholder.jpg'
          }
        };
        updated = true;
      }

      if (!parsedDB.services || parsedDB.services.length === 0) {
        parsedDB.services = DEFAULT_SERVICES;
        updated = true;
      }

      if (!parsedDB.tracks || parsedDB.tracks.length === 0) {
        parsedDB.tracks = DEFAULT_TRACK_CONFIGS;
        updated = true;
      }

      if (!parsedDB.systemVariables) {
        parsedDB.systemVariables = DEFAULT_SYSTEM_VARIABLES;
        updated = true;
      }
      
      if (updated) {
        localStorage.setItem(DB_NAME, JSON.stringify(parsedDB));
        console.log('✅ [DB] Database schema updated and synced.');
      } else {
        console.log('✅ [DB] Database is up to date.');
      }
    }
  } catch (error) {
    console.error('❌ [DB] Error initializing database:', error);
  }
}

// Get database
export function getDB(): any {
  try {
    const db = localStorage.getItem(DB_NAME);
    if (!db) {
      initDB();
      const newDb = localStorage.getItem(DB_NAME);
      return newDb ? JSON.parse(newDb) : null;
    }
    return JSON.parse(db);
  } catch (error) {
    console.error('❌ [DB] Error reading database:', error);
    return null;
  }
}

// Save database
export function saveDB(db: any): boolean {
  try {
    localStorage.setItem(DB_NAME, JSON.stringify(db));
    return true;
  } catch (error) {
    console.error('❌ [DB] Error saving database:', error);
    return false;
  }
}

// Get all profiles
export function getProfiles(): ProfileData[] {
  const db = getDB();
  return db?.profiles || [];
}

// Save profile
export function saveProfile(profile: ProfileData): boolean {
  const db = getDB();
  if (!db) return false;
  
  if (!db.profiles) db.profiles = [];

  const existingIndex = db.profiles.findIndex((p: ProfileData) => p.contact.email === profile.contact.email);
  
  if (existingIndex >= 0) {
    db.profiles[existingIndex] = profile;
  } else {
    db.profiles.push(profile);
  }
  
  return saveDB(db);
}

// Delete profile
export function deleteProfile(email: string): boolean {
  const db = getDB();
  if (!db || !db.profiles) return false;
  
  db.profiles = db.profiles.filter((p: ProfileData) => p.contact.email !== email);
  return saveDB(db);
}

// Authenticate admin by email or username
export function authenticateAdmin(identifier: string, password: string): { success: boolean; admin?: AdminUser; error?: string } {
  console.group('🔐 [Auth Service] Authenticating user');
  console.log('1. Querying identifier:', identifier);

  const db = getDB();
  if (!db || !db.admins) {
    console.error('❌ Database not available or no admins found');
    console.groupEnd();
    return { success: false, error: 'Database not initialized. Please refresh.' };
  }

  const cleanIdentifier = identifier.trim().toLowerCase();
  const cleanPassword = password.trim();

  console.log(`2. Searching among ${db.admins.length} registered admins...`);
  
  const admin = db.admins.find((a: any) => {
    const emailMatch = (a.email || '').trim().toLowerCase() === cleanIdentifier;
    const usernameMatch = (a.username || '').trim().toLowerCase() === cleanIdentifier;
    return (emailMatch || usernameMatch) && (a.password || '').trim() === cleanPassword;
  });

  if (!admin) {
    console.warn('❌ Authentication FAILED: Invalid credentials for identifier:', identifier);
    console.groupEnd();
    return { success: false, error: 'Credenciales inválidas. Verifica tu correo/usuario y contraseña.' };
  }

  console.log('✅ Authentication SUCCESSFUL for admin:', admin.email, `(Role: ${admin.role || 'admin'})`);
  console.groupEnd();
  return { success: true, admin };
}

// Get admin list
export function getAdmins(): AdminUser[] {
  const db = getDB();
  return db?.admins || [];
}

// Add or update admin
export function saveAdmin(admin: AdminUser): boolean {
  const db = getDB();
  if (!db) return false;
  if (!db.admins) db.admins = [];

  const idx = db.admins.findIndex((a: AdminUser) => a.id === admin.id || a.email.toLowerCase() === admin.email.toLowerCase());
  if (idx >= 0) {
    db.admins[idx] = { ...db.admins[idx], ...admin };
  } else {
    db.admins.push(admin);
  }
  return saveDB(db);
}

// Delete admin
export function deleteAdmin(adminId: string): { success: boolean; error?: string } {
  const db = getDB();
  if (!db || !db.admins) return { success: false, error: 'Database error' };

  if (db.admins.length <= 1) {
    return { success: false, error: 'No se puede eliminar el único administrador restante.' };
  }

  db.admins = db.admins.filter((a: AdminUser) => a.id !== adminId);
  saveDB(db);
  return { success: true };
}

// Get admin by email or username
export function getAdminByIdentifier(identifier: string): AdminUser | null {
  const db = getDB();
  if (!db || !db.admins) return null;
  const clean = identifier.trim().toLowerCase();
  return db.admins.find((a: AdminUser) => 
    (a.email || '').toLowerCase() === clean || 
    (a.username || '').toLowerCase() === clean
  ) || null;
}

// Generate reset code
export function generateResetCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Request password reset
export function requestPasswordReset(identifier: string): { success: boolean; error?: string } {
  const db = getDB();
  if (!db || !db.admins) return { success: false, error: 'Database not initialized' };
  
  const admin = getAdminByIdentifier(identifier);
  if (!admin) {
    return { success: false, error: 'No se encontró un administrador con ese correo o usuario.' };
  }
  
  const resetCode = generateResetCode();
  const expiryTime = Date.now() + (15 * 60 * 1000);
  
  const adminIndex = db.admins.findIndex((a: AdminUser) => a.id === admin.id);
  if (adminIndex >= 0) {
    db.admins[adminIndex].resetCode = resetCode;
    db.admins[adminIndex].resetCodeExpiry = expiryTime;
    saveDB(db);
    
    console.log(`[Reset] Code for ${admin.email}: ${resetCode}`);
    alert(`Código de recuperación para ${admin.email}:\n\n${resetCode}\n\n(Válido por 15 minutos)`);
    return { success: true };
  }
  
  return { success: false, error: 'No se pudo generar el código.' };
}

// Verify reset code
export function verifyResetCode(identifier: string, code: string): { valid: boolean; error?: string } {
  const db = getDB();
  if (!db || !db.admins) return { valid: false, error: 'Database not initialized' };
  
  const admin = getAdminByIdentifier(identifier);
  if (!admin || !admin.resetCode || !admin.resetCodeExpiry) {
    return { valid: false, error: 'No se encontró solicitud de recuperación pendiente.' };
  }
  
  if (Date.now() > admin.resetCodeExpiry) {
    return { valid: false, error: 'El código ha expirado. Por favor solicita uno nuevo.' };
  }
  
  if (admin.resetCode.trim() !== code.trim()) {
    return { valid: false, error: 'El código ingresado es incorrecto.' };
  }
  
  return { valid: true };
}

// Reset password with code
export function resetPasswordWithCode(identifier: string, code: string, newPassword: string): { success: boolean; error?: string } {
  const verification = verifyResetCode(identifier, code);
  if (!verification.valid) {
    return { success: false, error: verification.error };
  }
  
  const db = getDB();
  if (!db || !db.admins) return { success: false, error: 'Database error' };
  
  const admin = getAdminByIdentifier(identifier);
  if (!admin) return { success: false, error: 'Admin no encontrado' };
  
  const adminIndex = db.admins.findIndex((a: AdminUser) => a.id === admin.id);
  if (adminIndex >= 0) {
    db.admins[adminIndex].password = newPassword.trim();
    db.admins[adminIndex].resetCode = null;
    db.admins[adminIndex].resetCodeExpiry = null;
    db.admins[adminIndex].mustChangePassword = false;
    saveDB(db);
    return { success: true };
  }
  
  return { success: false, error: 'Error al actualizar contraseña' };
}

// Change admin password
export function changeAdminPassword(adminId: string, newPassword: string): { success: boolean; error?: string } {
  const db = getDB();
  if (!db || !db.admins) return { success: false, error: 'Database error' };
  
  const adminIndex = db.admins.findIndex((a: AdminUser) => a.id === adminId);
  if (adminIndex >= 0) {
    db.admins[adminIndex].password = newPassword.trim();
    db.admins[adminIndex].mustChangePassword = false;
    saveDB(db);
    return { success: true };
  }
  
  return { success: false, error: 'Admin no encontrado' };
}

// Get settings
export function getSettings(): PortfolioSettings {
  const db = getDB();
  return db?.settings || {
    defaultProfile: 'combined',
    defaultLanguage: 'es',
    theme: 'light',
    visibility: {
      hero: true,
      summary: true,
      experience: true,
      earlyCareer: false,
      education: true,
      certifications: true,
      skills: true,
      languages: true,
      services: true,
      githubProjects: true
    },
    seo: {
      metaTitle: 'Farid Maloof S. | QA Automation Engineer & Full Stack Developer',
      metaDescription: 'Portafolio profesional de Farid Maloof S.',
      keywords: 'Farid Maloof, QA Automation, SDET, Full Stack',
      ogImage: '/profile-placeholder.jpg'
    }
  };
}

// Save settings
export function saveSettings(settings: Partial<PortfolioSettings>): boolean {
  const db = getDB();
  if (!db) return false;
  
  db.settings = { ...getSettings(), ...settings };
  const ok = saveDB(db);
  if (ok && typeof window !== 'undefined') {
    fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(db.settings)
    }).catch(err => console.warn('[SQLite Sync] Could not sync settings:', err));
  }
  return ok;
}

// Services CRUD
export function getServices(): ServiceItem[] {
  const db = getDB();
  return db?.services || DEFAULT_SERVICES;
}

export function saveServices(services: ServiceItem[]): boolean {
  const db = getDB();
  if (!db) return false;
  db.services = services;
  const ok = saveDB(db);
  if (ok && typeof window !== 'undefined') {
    fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(services)
    }).catch(err => console.warn('[SQLite Sync] Could not sync services:', err));
  }
  return ok;
}

// Get services tailored for a specific technical stack (with fallback to all active services)
export function getServicesForTrack(track: TrackType): ServiceItem[] {
  const allServices = getServices();
  const trackConfig = getTrackConfig(track);

  // 1. If the track defines specific custom services
  if (trackConfig?.customServices && trackConfig.customServices.length > 0) {
    return trackConfig.customServices;
  }

  // 2. If the track specifies explicit serviceIds
  if (trackConfig?.serviceIds && trackConfig.serviceIds.length > 0) {
    const filtered = allServices.filter(s => trackConfig.serviceIds!.includes(s.id));
    if (filtered.length > 0) return filtered;
  }

  // 3. Match by service trackIds
  const cleanTrack = (track || '').toLowerCase();
  const matched = allServices.filter(s => {
    if (!s.trackIds || s.trackIds.length === 0) return true;
    return s.trackIds.includes(cleanTrack) || s.trackIds.includes('combined') || s.trackIds.includes('full');
  });

  if (matched.length > 0) return matched;

  // Fallback to all services
  return allServices;
}

// Get featured certifications IDs or filter for a specific technical track
export function getFeaturedCertificationsForTrack(track: TrackType): string[] | undefined {
  const trackConfig = getTrackConfig(track);
  if (trackConfig?.featuredCertifications && trackConfig.featuredCertifications.length > 0) {
    return trackConfig.featuredCertifications;
  }
  return undefined;
}

// Track / Profile Configuration CRUD
export function getTrackConfigs(): ProfileTrackConfig[] {
  const db = getDB();
  if (!db || !db.tracks || db.tracks.length === 0) {
    return DEFAULT_TRACK_CONFIGS;
  }
  return db.tracks;
}

export function getTrackConfig(id: string): ProfileTrackConfig | undefined {
  const tracks = getTrackConfigs();
  const clean = (id || '').trim().toLowerCase();
  return tracks.find((t) => t.id.toLowerCase() === clean);
}

export function saveTrackConfig(config: ProfileTrackConfig): boolean {
  const db = getDB();
  if (!db) return false;
  if (!db.tracks) db.tracks = [...DEFAULT_TRACK_CONFIGS];

  const cleanId = config.id.trim().toLowerCase();
  const cleanConfig = { ...config, id: cleanId };

  const idx = db.tracks.findIndex((t: ProfileTrackConfig) => t.id.toLowerCase() === cleanId);
  if (idx >= 0) {
    db.tracks[idx] = { ...db.tracks[idx], ...cleanConfig };
  } else {
    db.tracks.push(cleanConfig);
  }

  // Also synchronize directly with active ProfileData in db.profiles[0]
  if (db.profiles && db.profiles.length > 0) {
    const profile = db.profiles[0];
    if (!profile.titles) profile.titles = {} as any;
    if (!profile.summary) profile.summary = {} as any;
    if (!profile.skills) profile.skills = {} as any;

    profile.titles[cleanId] = cleanConfig.titles;
    profile.summary[cleanId] = cleanConfig.summary;
    if (cleanConfig.skillsHighlight) {
      profile.skills[cleanId] = cleanConfig.skillsHighlight;
    }
  }

  const ok = saveDB(db);
  if (ok && typeof window !== 'undefined') {
    fetch('/api/tracks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cleanConfig)
    }).catch(err => console.warn('[SQLite Sync] Could not sync track:', err));
  }
  return ok;
}

export function deleteTrackConfig(id: string): { success: boolean; error?: string } {
  const db = getDB();
  if (!db || !db.tracks) return { success: false, error: 'Base de datos no disponible' };

  const cleanId = id.trim().toLowerCase();
  const track = db.tracks.find((t: ProfileTrackConfig) => t.id.toLowerCase() === cleanId);
  if (!track) return { success: false, error: 'Perfil no encontrado' };

  if (track.isSystem) {
    return { success: false, error: 'No es posible eliminar perfiles estructurales base del sistema. Puedes desactivarlo o editar su contenido.' };
  }

  db.tracks = db.tracks.filter((t: ProfileTrackConfig) => t.id.toLowerCase() !== cleanId);

  // If deleted profile was default, fallback to 'full' or 'combined'
  if (db.settings && db.settings.defaultProfile === cleanId) {
    db.settings.defaultProfile = 'full';
  }
  if (db.systemVariables && db.systemVariables.defaultProfile === cleanId) {
    db.systemVariables.defaultProfile = 'full';
  }

  const ok = saveDB(db);
  if (ok && typeof window !== 'undefined') {
    fetch(`/api/tracks/${cleanId}`, {
      method: 'DELETE'
    }).catch(err => console.warn('[SQLite Sync] Could not delete track from sqlite:', err));
  }
  return { success: true };
}

// System Variables & Standard Configuration
export function getSystemVariables(): SystemVariables {
  const db = getDB();
  if (!db || !db.systemVariables) {
    return DEFAULT_SYSTEM_VARIABLES;
  }
  return { ...DEFAULT_SYSTEM_VARIABLES, ...db.systemVariables };
}

export function saveSystemVariables(vars: Partial<SystemVariables>): boolean {
  const db = getDB();
  if (!db) return false;

  const current = getSystemVariables();
  const updated: SystemVariables = { ...current, ...vars };
  db.systemVariables = updated;

  // Mirror variables into settings and profile contact for zero-desync across components
  if (!db.settings) db.settings = getSettings();
  if (updated.defaultProfile) db.settings.defaultProfile = updated.defaultProfile;
  if (updated.defaultLanguage) db.settings.defaultLanguage = updated.defaultLanguage;
  if (typeof updated.autoDetectLanguage === 'boolean') {
    db.settings.autoDetectLanguage = updated.autoDetectLanguage;
  }
  if (typeof updated.allowUrlProfileOverride === 'boolean') {
    db.settings.allowUrlProfileOverride = updated.allowUrlProfileOverride;
  }

  if (db.profiles && db.profiles.length > 0) {
    const profile = db.profiles[0];
    if (profile.contact) {
      if (updated.fullName) profile.contact.name = updated.fullName;
      if (updated.email) profile.contact.email = updated.email;
      if (updated.phone) profile.contact.phone = updated.phone;
      if (updated.location) profile.contact.location = updated.location;
      if (updated.linkedinUrl) {
        profile.contact.linkedinUrl = updated.linkedinUrl;
        profile.contact.linkedin = updated.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '');
      }
      if (updated.githubUrl) {
        profile.contact.githubUrl = updated.githubUrl;
        profile.contact.github = updated.githubUrl.replace(/^https?:\/\/(www\.)?/, '');
      }
    }
  }

  const ok = saveDB(db);
  if (ok && typeof window !== 'undefined') {
    fetch('/api/system-variables', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    }).catch(err => console.warn('[SQLite Sync] Could not sync system variables:', err));
  }
  return ok;
}

// Languages CRUD
export function getLanguages(): LanguageOption[] {
  const db = getDB();
  if (db?.systemVariables?.availableLanguages && db.systemVariables.availableLanguages.length > 0) {
    return db.systemVariables.availableLanguages;
  }
  return DEFAULT_LANGUAGES;
}

export function saveLanguages(languages: LanguageOption[]): boolean {
  const current = getSystemVariables();
  return saveSystemVariables({ ...current, availableLanguages: languages });
}

export function getDesignConfig(): FrontendDesignConfig {
  const vars = getSystemVariables();
  return vars.designConfig || DEFAULT_DESIGN_CONFIG;
}

export function saveDesignConfig(design: FrontendDesignConfig): boolean {
  const current = getSystemVariables();
  return saveSystemVariables({ ...current, designConfig: design });
}

// Full Export / Import Helpers
export function exportFullBackup(): string {
  const db = getDB();
  const data = {
    version: '2.0',
    exportDate: new Date().toISOString(),
    systemVariables: getSystemVariables(),
    tracks: getTrackConfigs(),
    services: getServices(),
    settings: getSettings(),
    profiles: db?.profiles || []
  };
  return JSON.stringify(data, null, 2);
}

export function importFullBackup(payload: any): { success: boolean; error?: string } {
  try {
    const data = typeof payload === 'string' ? JSON.parse(payload) : payload;
    if (!data || typeof data !== 'object') return { success: false, error: 'Formato no válido' };
    const db = getDB() || {};

    if (data.systemVariables) {
      db.systemVariables = { ...DEFAULT_SYSTEM_VARIABLES, ...data.systemVariables };
    }
    if (Array.isArray(data.tracks)) {
      db.tracks = data.tracks;
    }
    if (Array.isArray(data.services)) {
      db.services = data.services;
    }
    if (data.settings) {
      db.settings = { ...getSettings(), ...data.settings };
    }
    if (Array.isArray(data.profiles)) {
      db.profiles = data.profiles;
    }

    const ok = saveDB(db);
    if (ok && typeof window !== 'undefined') {
      // Send full import to backend SQLite
      fetch('/api/backup/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).catch(err => console.warn('[SQLite Sync] Could not sync backup import:', err));
    }
    return { success: ok };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Error al procesar JSON' };
  }
}

// Initial Sync from Backend SQLite to LocalStorage
export async function syncWithBackendDatabase(): Promise<boolean> {
  if (typeof window === 'undefined') return true;
  try {
    const res = await fetch('/api/all-data');
    if (res.ok) {
      const data = await res.json();
      if (data && data.systemVariables) {
        const db = getDB() || {};
        db.systemVariables = { ...DEFAULT_SYSTEM_VARIABLES, ...data.systemVariables };
        if (Array.isArray(data.tracks) && data.tracks.length > 0) {
          db.tracks = data.tracks;
        }
        if (Array.isArray(data.services) && data.services.length > 0) {
          db.services = data.services;
        }
        if (data.settings) {
          db.settings = { ...getSettings(), ...data.settings };
        }
        saveDB(db);
        return true;
      }
    }
    return false;
  } catch (err) {
    // Graceful fallback to client storage
    console.debug('[SQLite Sync] Using local storage state:', err);
    return false;
  }
}


// Current user management with dual storage for reliability
export function getCurrentUser(): AdminUser | null {
  const userId = sessionStorage.getItem('currentAdminId') || localStorage.getItem('currentAdminId');
  if (!userId) return null;
  
  const db = getDB();
  if (!db || !db.admins) return null;
  
  return db.admins.find((a: AdminUser) => a.id === userId) || null;
}

export function setCurrentUser(adminId: string): void {
  sessionStorage.setItem('currentAdminId', adminId);
  localStorage.setItem('currentAdminId', adminId);
  sessionStorage.setItem('isAdminAuthenticated', 'true');
  localStorage.setItem('isAdminAuthenticated', 'true');
}

export function isUserAuthenticated(): boolean {
  return sessionStorage.getItem('isAdminAuthenticated') === 'true' || 
         localStorage.getItem('isAdminAuthenticated') === 'true';
}

export function logout(): void {
  sessionStorage.removeItem('currentAdminId');
  sessionStorage.removeItem('isAdminAuthenticated');
  localStorage.removeItem('currentAdminId');
  localStorage.removeItem('isAdminAuthenticated');
}

// Hook to manage profile data
export function useProfileData() {
  const [profiles, setProfiles] = useState<ProfileData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initDB();
    const loadedProfiles = getProfiles();
    setProfiles(loadedProfiles);
    setLoading(false);
  }, []);

  const addProfile = (profile: ProfileData) => {
    const success = saveProfile(profile);
    if (success) {
      setProfiles(getProfiles());
    }
    return success;
  };

  const removeProfile = (email: string) => {
    const success = deleteProfile(email);
    if (success) {
      setProfiles(getProfiles());
    }
    return success;
  };

  return { profiles, loading, addProfile, removeProfile };
}

