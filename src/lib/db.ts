import { useState, useEffect } from 'react';
import type { ProfileData, Language, TrackType, ProfileTrackConfig, SystemVariables } from '../types';
import { defaultProfileData } from '../data/profile';

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
  systemVariables?: SystemVariables;
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
  defaultProfile: "combined",
  defaultLanguage: "es",
  autoDetectLanguage: true,
  allowUrlProfileOverride: true,
  pdfFilenamePrefix: "CV-Farid-Maloof",
  copyrightText: "© 2026 Farid Maloof Suarez. Todos los derechos reservados.",
  brandName: "FM · Farid Maloof"
};

export const DEFAULT_TRACK_CONFIGS: ProfileTrackConfig[] = [
  {
    id: 'combined',
    name: 'Perfil Integral (Senior Software Engineer & SDET Lead)',
    badge: '15+ Años Exp.',
    isSystem: true,
    isActive: true,
    titles: {
      es: defaultProfileData.titles.combined.es,
      en: defaultProfileData.titles.combined.en,
      pt: defaultProfileData.titles.combined.pt || defaultProfileData.titles.combined.es,
    },
    summary: {
      es: defaultProfileData.summary.combined.es,
      en: defaultProfileData.summary.combined.en,
      pt: defaultProfileData.summary.combined.pt || defaultProfileData.summary.combined.es,
    },
    skillsHighlight: defaultProfileData.skills.combined,
    seoTitle: {
      es: 'Farid Maloof Suarez | Ingeniero de Software Senior & SDET Architecture Lead (15+ Años)',
      en: 'Farid Maloof Suarez | Senior Software Engineer & SDET Architecture Lead (15+ Yrs)',
      pt: 'Farid Maloof Suarez | Engenheiro de Software Sênior & Líder de Arquitetura SDET'
    },
    seoDescription: {
      es: 'Portafolio técnico de Farid Maloof Suarez. Más de 15 años de trayectoria en ingeniería de software, arquitectura de automatización QA / SDET, desarrollo full-stack, cloud computing y liderazgo técnico.',
      en: 'Technical Portfolio of Farid Maloof Suarez. 15+ years of enterprise software engineering, test automation architecture (SDET), full-stack development, cloud computing, and technical leadership.',
      pt: 'Portfólio técnico de Farid Maloof Suarez. Mais de 15 anos de trajetória em engenharia de software, arquitetura de automação QA / SDET e liderança técnica.'
    }
  },
  {
    id: 'sdet',
    name: 'SDET (Software Development Engineer in Test)',
    badge: 'Automation Core',
    isSystem: true,
    isActive: true,
    titles: {
      es: defaultProfileData.titles.sdet.es,
      en: defaultProfileData.titles.sdet.en,
      pt: defaultProfileData.titles.sdet.pt || defaultProfileData.titles.sdet.es,
    },
    summary: {
      es: defaultProfileData.summary.sdet.es,
      en: defaultProfileData.summary.sdet.en,
      pt: defaultProfileData.summary.sdet.pt || defaultProfileData.summary.sdet.es,
    },
    skillsHighlight: defaultProfileData.skills.sdet,
    seoTitle: {
      es: 'Farid Maloof | Senior SDET Lead & Arquitecto de Automatización de Pruebas',
      en: 'Farid Maloof | Senior SDET Lead & Test Automation Architect',
      pt: 'Farid Maloof | Líder SDET Sênior & Arquiteto de Automação de Testes'
    },
    seoDescription: {
      es: 'Portafolio técnico de Farid Maloof Suarez. Senior SDET Lead con más de 15 años de experiencia. Arquitectura de pruebas, Playwright, Selenium, Robot Framework, CI/CD pipelines, automatización de APIs y testing con Inteligencia Artificial.',
      en: 'Technical Portfolio & ATS CV of Farid Maloof Suarez. Senior SDET Lead with 15+ years of experience in test automation architecture, Playwright, Selenium, Robot Framework, CI/CD gates, and AI testing.',
      pt: 'Portfólio técnico de Farid Maloof Suarez. Líder SDET Sênior com mais de 15 anos de experiência em arquitetura de automação, Playwright, Selenium, Robot Framework e testes com IA.'
    }
  },
  {
    id: 'qa',
    name: 'QA Specialist & Quality Assurance Lead',
    badge: 'ISTQB v4.0',
    isSystem: true,
    isActive: true,
    titles: {
      es: defaultProfileData.titles.qa.es,
      en: defaultProfileData.titles.qa.en,
      pt: defaultProfileData.titles.qa.pt || defaultProfileData.titles.qa.es,
    },
    summary: {
      es: defaultProfileData.summary.qa.es,
      en: defaultProfileData.summary.qa.en,
      pt: defaultProfileData.summary.qa.pt || defaultProfileData.summary.qa.es,
    },
    skillsHighlight: defaultProfileData.skills.qa,
    seoTitle: {
      es: 'Farid Maloof | Especialista Senior en Automatización QA & Calidad de Software',
      en: 'Farid Maloof | Senior QA Automation Specialist & Quality Lead',
      pt: 'Farid Maloof | Especialista Sênior em Automação de QA & Qualidade de Software'
    },
    seoDescription: {
      es: 'Portafolio profesional de Farid Maloof Suarez. Especialista en QA Automation certificado ISTQB CTFL v4.0. Estrategia de calidad, gestión de pruebas funcionales y regresivas, Cypress, Appium y pruebas de rendimiento.',
      en: 'Professional Portfolio of Farid Maloof Suarez. ISTQB CTFL v4.0 Certified QA Automation Specialist, quality strategy, functional/regression test suites, Cypress, Appium and performance.',
      pt: 'Portfólio profissional de Farid Maloof Suarez. Especialista em automação de QA certificado ISTQB CTFL v4.0, estratégias de testes funcionais e regressivos.'
    }
  },
  {
    id: 'backend',
    name: 'Senior Backend Engineer & Cloud APIs',
    badge: '.NET · Java · SQL',
    isSystem: true,
    isActive: true,
    titles: {
      es: defaultProfileData.titles.backend.es,
      en: defaultProfileData.titles.backend.en,
      pt: defaultProfileData.titles.backend.pt || defaultProfileData.titles.backend.es,
    },
    summary: {
      es: defaultProfileData.summary.backend.es,
      en: defaultProfileData.summary.backend.en,
      pt: defaultProfileData.summary.backend.pt || defaultProfileData.summary.backend.es,
    },
    skillsHighlight: defaultProfileData.skills.backend,
    seoTitle: {
      es: 'Farid Maloof | Desarrollador Senior Backend (.NET 9 · Java Spring Boot · APIs REST)',
      en: 'Farid Maloof | Senior Backend Engineer (.NET 9 · Java Spring Boot · REST APIs)',
      pt: 'Farid Maloof | Desenvolvedor Backend Sênior (.NET 9 · Java Spring Boot · APIs REST)'
    },
    seoDescription: {
      es: 'Portafolio técnico de Farid Maloof Suarez. Desarrollador Senior Backend enfocado en C# .NET 9, Java Spring Boot, arquitectura de microservicios, bases de datos PostgreSQL, SQL Server, Redis y Docker.',
      en: 'Technical Portfolio of Farid Maloof Suarez. Senior Backend Engineer specializing in .NET 9, C#, Java Spring Boot, microservices, PostgreSQL, SQL Server, Redis, and cloud containers.',
      pt: 'Portfólio técnico de Farid Maloof Suarez. Desenvolvedor Backend Sênior com foco em .NET 9, Java Spring Boot, microsserviços, PostgreSQL e arquiteturas em nuvem.'
    }
  },
  {
    id: 'fullstack',
    name: 'Senior Full Stack Developer (React · TypeScript · .NET)',
    badge: 'React · .NET Core',
    isSystem: true,
    isActive: true,
    titles: {
      es: defaultProfileData.titles.fullstack.es,
      en: defaultProfileData.titles.fullstack.en,
      pt: defaultProfileData.titles.fullstack.pt || defaultProfileData.titles.fullstack.es,
    },
    summary: {
      es: defaultProfileData.summary.fullstack.es,
      en: defaultProfileData.summary.fullstack.en,
      pt: defaultProfileData.summary.fullstack.pt || defaultProfileData.summary.fullstack.es,
    },
    skillsHighlight: defaultProfileData.skills.fullstack,
    seoTitle: {
      es: 'Farid Maloof | Desarrollador Senior Full Stack (.NET · React · TypeScript · Cloud)',
      en: 'Farid Maloof | Senior Full Stack Developer (.NET · React · TypeScript · Cloud)',
      pt: 'Farid Maloof | Desenvolvedor Full Stack Sênior (.NET · React · TypeScript · Cloud)'
    },
    seoDescription: {
      es: 'Portafolio técnico de Farid Maloof Suarez. Desarrollador Senior Full Stack especializado en React, TypeScript, Next.js, .NET Core, diseño de APIs seguras y despliegues en AWS y Azure.',
      en: 'Technical Portfolio of Farid Maloof Suarez. Senior Full Stack Engineer specializing in React, TypeScript, modern UI architectures, .NET Core backends, and cloud deployments.',
      pt: 'Portfólio técnico de Farid Maloof Suarez. Desenvolvedor Full Stack Sênior com expertise em React, TypeScript, .NET Core e soluções em nuvem.'
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
    seoTitle: {
      es: 'Farid Maloof | Ingeniero de Software Senior (.NET · Java · Microservicios · Cloud)',
      en: 'Farid Maloof | Senior Software Engineer (.NET · Java · Microservices · Cloud)',
      pt: 'Farid Maloof | Engenheiro de Software Sênior (.NET · Java · Microsserviços · Cloud)'
    },
    seoDescription: {
      es: 'Portafolio técnico de Farid Maloof Suarez. Más de 15 años diseñando e implementando arquitecturas de software empresarial resilientes, microservicios y soluciones de nube de alto rendimiento.',
      en: 'Technical Portfolio of Farid Maloof Suarez. 15+ years delivering enterprise software architectures, robust microservices, and high-performance cloud engineering.',
      pt: 'Portfólio técnico de Farid Maloof Suarez. Mais de 15 anos entregando arquiteturas de software corporativo e microsserviços.'
    }
  }
];


export interface ServiceItem {
  id: string;
  title: { es: string; en: string };
  description: { es: string; en: string };
  icon: string;
  keywords: string[];
}

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 's-1',
    title: {
      es: 'Automatización de Pruebas QA & SDET',
      en: 'QA Automation & SDET Services'
    },
    description: {
      es: 'Estrategia completa de automatización con Playwright, Cypress y Selenium. Diseño de frameworks mantenibles e integración en pipelines CI/CD.',
      en: 'End-to-end test automation strategy with Playwright, Cypress, and Selenium. Enterprise framework architecture and CI/CD integration.'
    },
    icon: 'Bot',
    keywords: ['Playwright', 'Cypress', 'Selenium', 'CI/CD', 'SDET', 'Cucumber']
  },
  {
    id: 's-2',
    title: {
      es: 'Desarrollo Backend & APIs Escalables',
      en: 'Backend Development & Scalable APIs'
    },
    description: {
      es: 'Arquitectura y desarrollo de microservicios robustos en Java (Spring Boot) y .NET Core / C#, con bases de datos relacionales y NoSQL.',
      en: 'Robust microservices architecture in Java (Spring Boot) and .NET Core / C# with relational and NoSQL databases.'
    },
    icon: 'Server',
    keywords: ['Java', 'Spring Boot', '.NET Core', 'REST APIs', 'PostgreSQL', 'Docker']
  },
  {
    id: 's-3',
    title: {
      es: 'Consultoría Técnica & Auditoría de Código',
      en: 'Technical Consulting & Code Auditing'
    },
    description: {
      es: 'Evaluación de arquitectura de software, optimización de pipelines DevOps, mejora de cobertura de pruebas y mentoría técnica a equipos.',
      en: 'Software architecture review, DevOps pipeline optimization, test coverage enhancement, and technical team mentoring.'
    },
    icon: 'ShieldCheck',
    keywords: ['Architecture', 'DevOps', 'Code Review', 'Quality Assurance']
  },
  {
    id: 's-4',
    title: {
      es: 'Pruebas de Rendimiento & Seguridad',
      en: 'Performance & Reliability Testing'
    },
    description: {
      es: 'Pruebas de carga y estrés con JMeter y k6. Diagnóstico de cuellos de botella y optimización de latencia en aplicaciones de alto tráfico.',
      en: 'Load and stress testing with JMeter and k6. Bottleneck diagnostics and latency optimization for high-throughput applications.'
    },
    icon: 'Gauge',
    keywords: ['JMeter', 'k6', 'Performance', 'Reliability', 'Stress Testing']
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
  return saveDB(db);
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
  return saveDB(db);
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

  return saveDB(db);
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

  // If deleted profile was default, fallback to 'combined'
  if (db.settings && db.settings.defaultProfile === cleanId) {
    db.settings.defaultProfile = 'combined';
  }
  if (db.systemVariables && db.systemVariables.defaultProfile === cleanId) {
    db.systemVariables.defaultProfile = 'combined';
  }

  saveDB(db);
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

  return saveDB(db);
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

