import { useState } from 'react';
import type { ProfileData, Experience, WorkModality } from '../../types';
import { getLanguages, getProfiles, saveProfile, getSystemVariables, saveSystemVariables } from '../../lib/db';
import { defaultProfileData } from '../../data/profile';
import { LanguageTabSelector } from './LanguageTabSelector';
import { 
  Briefcase, 
  User, 
  GraduationCap, 
  Languages as LanguagesIcon,
  Plus, 
  Trash2, 
  Edit3, 
  ArrowUp, 
  ArrowDown, 
  Check, 
  X, 
  Upload, 
  Building2, 
  MapPin, 
  Sparkles,
  FileText,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

// LinkedIn Icon
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

interface CVExperienceManagerProps {
  onNotify: (type: 'success' | 'error', message: string) => void;
}

const TRACK_KEYS = [
  { id: 'combined', label: 'Integral / Lead SDET & Full Stack' },
  { id: 'sdet', label: 'SDET (Test Automation Architect)' },
  { id: 'qa', label: 'QA Specialist & Quality Lead' },
  { id: 'dev', label: 'Software Developer' },
  { id: 'backend', label: 'Backend Engineer (.NET / Java)' },
  { id: 'fullstack', label: 'Full Stack Engineer (React / .NET)' }
];

export function CVExperienceManager({ onNotify }: CVExperienceManagerProps) {
  const languages = getLanguages().filter(l => l.isActive);
  const [activeLang, setActiveLang] = useState<string>(languages[0]?.code || 'es');
  const [activeSection, setActiveSection] = useState<'contact' | 'summaries' | 'experience' | 'education' | 'languages'>('experience');
  
  // Profile data with guaranteed fallback to defaultProfileData
  const [profiles, setProfiles] = useState<ProfileData[]>(() => {
    const list = getProfiles();
    return list.length > 0 ? list : [defaultProfileData];
  });
  const currentProfile = profiles[0] || defaultProfileData;
  const [profileData, setProfileData] = useState<ProfileData>(() => JSON.parse(JSON.stringify(currentProfile)));

  // Selected track for summary editing
  const [selectedSummaryTrack, setSelectedSummaryTrack] = useState<string>('combined');

  // Experience modal state
  const [editingExpIndex, setEditingExpIndex] = useState<number | null>(null);
  const [editingExpData, setEditingExpData] = useState<Experience | null>(null);
  const [isNewExp, setIsNewExp] = useState(false);
  const [selectedExpTrack, setSelectedExpTrack] = useState<string>('combined');

  // Education state
  const [editingEduIndex, setEditingEduIndex] = useState<number | null>(null);
  const [editingEduData, setEditingEduData] = useState<{ institution: string; degree: string; dates: string; gpa: string } | null>(null);
  const [isNewEdu, setIsNewEdu] = useState(false);

  // Languages state
  const [editingLangIndex, setEditingLangIndex] = useState<number | null>(null);
  const [editingLangText, setEditingLangText] = useState<string>('');
  const [isNewLang, setIsNewLang] = useState(false);

  // LinkedIn Synchronization State
  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState(false);
  const [linkedInText, setLinkedInText] = useState('');
  const [linkedInUrlInput, setLinkedInUrlInput] = useState(profileData.contact.linkedinUrl || 'https://www.linkedin.com/in/fmaloofs/');
  const [parsedLinkedInExps, setParsedLinkedInExps] = useState<Experience[]>([]);
  const [linkedInSyncMode, setLinkedInSyncMode] = useState<'append' | 'replace'>('append');

  // LinkedIn Parser Engine
  const handleParseLinkedIn = () => {
    if (!linkedInText.trim()) {
      alert('Pega el texto o JSON de tu perfil de LinkedIn (sección Experiencia o perfil exportado).');
      return;
    }

    // Attempt JSON parsing first
    if (linkedInText.trim().startsWith('{') || linkedInText.trim().startsWith('[')) {
      try {
        const parsed = JSON.parse(linkedInText.trim());
        const arr = Array.isArray(parsed) ? parsed : (parsed.positions || parsed.experience || [parsed]);
        const mapped: Experience[] = arr.map((item: any) => {
          const company = item.companyName || item.company || 'Empresa';
          const title = item.title || item.role || 'Ingeniero de Software';
          const dates = item.dates || item.timePeriod || '2023 - Presente';
          const loc = item.location || 'Remoto';
          const modality: WorkModality = (item.modality || (loc.toLowerCase().includes('remot') ? 'remote' : loc.toLowerCase().includes('hibrid') || loc.toLowerCase().includes('hybrid') ? 'hybrid' : 'onsite')) as WorkModality;
          const bullets = Array.isArray(item.description) ? item.description : typeof item.description === 'string' ? item.description.split('\n').map((l: string) => l.trim()).filter(Boolean) : [];

          return {
            company,
            location: loc,
            modality,
            dates: { es: dates, en: dates, pt: dates },
            companyDescription: { es: item.companyDescription || '', en: item.companyDescription || '', pt: item.companyDescription || '' },
            technologies: Array.isArray(item.skills) ? item.skills : Array.isArray(item.technologies) ? item.technologies : ['Automation', 'QA', 'CI/CD'],
            role: {
              combined: { es: title, en: title, pt: title },
              sdet: { es: title, en: title, pt: title },
              qa: { es: title, en: title, pt: title },
              dev: { es: title, en: title, pt: title },
              backend: { es: title, en: title, pt: title },
              fullstack: { es: title, en: title, pt: title }
            },
            detail: {
              combined: { es: bullets.length > 0 ? bullets : ['Liderazgo y ejecución en proyectos estratégicos.'], en: bullets.length > 0 ? bullets : ['Strategic leadership and execution.'], pt: bullets.length > 0 ? bullets : ['Liderança e execução estratégica.'] },
              sdet: { es: bullets, en: bullets, pt: bullets },
              qa: { es: bullets, en: bullets, pt: bullets },
              dev: { es: bullets, en: bullets, pt: bullets },
              backend: { es: bullets, en: bullets, pt: bullets },
              fullstack: { es: bullets, en: bullets, pt: bullets }
            }
          };
        });

        if (mapped.length > 0) {
          setParsedLinkedInExps(mapped);
          return;
        }
      } catch {
        // Fallback to text parsing
      }
    }

    // Smart Text Parser for LinkedIn copy/paste blocks
    const lines = linkedInText.split('\n').map(l => l.trim()).filter(Boolean);
    const techDictionary = ['Playwright', 'Selenium', 'TypeScript', 'JavaScript', 'C#', '.NET', 'Java', 'Python', 'React', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Postman', 'Newman', 'JMeter', 'SQL', 'PostgreSQL', 'Jenkins', 'Git', 'CI/CD', 'BDD', 'Cucumber', 'REST APIs'];

    const items: Experience[] = [];
    let currentItem: Partial<Experience> | null = null;
    let currentBullets: string[] = [];

    const flush = () => {
      if (currentItem && currentItem.company) {
        const bulletsToSave = currentBullets.length > 0 
          ? currentBullets 
          : ['Liderazgo y diseño de estrategias técnicas en el marco de proyectos clave.', 'Automatización y aseguramiento continuo de entregables de alta calidad.'];

        const fullExp: Experience = {
          company: currentItem.company,
          location: currentItem.location || 'Remoto',
          modality: (currentItem.modality || 'remote') as WorkModality,
          dates: currentItem.dates || { es: 'Período no especificado', en: 'Not specified', pt: 'Não especificado' },
          companyDescription: currentItem.companyDescription || { es: '', en: '', pt: '' },
          technologies: currentItem.technologies && currentItem.technologies.length > 0 
            ? currentItem.technologies 
            : techDictionary.filter(t => linkedInText.toLowerCase().includes(t.toLowerCase())).slice(0, 6),
          role: currentItem.role || {
            combined: { es: 'Especialista en Ingeniería de Software', en: 'Software Engineering Specialist', pt: 'Especialista em Engenharia de Software' },
            sdet: { es: '', en: '', pt: '' },
            qa: { es: '', en: '', pt: '' },
            dev: { es: '', en: '', pt: '' },
            backend: { es: '', en: '', pt: '' },
            fullstack: { es: '', en: '', pt: '' }
          },
          detail: {
            combined: { es: bulletsToSave, en: bulletsToSave, pt: bulletsToSave },
            sdet: { es: bulletsToSave, en: bulletsToSave, pt: bulletsToSave },
            qa: { es: bulletsToSave, en: bulletsToSave, pt: bulletsToSave },
            dev: { es: bulletsToSave, en: bulletsToSave, pt: bulletsToSave },
            backend: { es: bulletsToSave, en: bulletsToSave, pt: bulletsToSave },
            fullstack: { es: bulletsToSave, en: bulletsToSave, pt: bulletsToSave }
          }
        };
        items.push(fullExp);
      }
      currentItem = null;
      currentBullets = [];
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check for date range line
      const isDate = /\b(19\d\d|20\d\d|presente|present|actualidad|enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.|feb\.|mar\.|abr\.|may\.|jun\.|jul\.|ago\.|sep\.|oct\.|nov\.|dic\.|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\b/i.test(line) && line.length < 90;
      const isBullet = line.startsWith('•') || line.startsWith('-') || line.startsWith('*') || /^\d+[.)]\s/.test(line);

      if (isBullet) {
        currentBullets.push(line.replace(/^[•\-*\d.)\s]+/, ''));
      } else if (isDate) {
        if (!currentItem) {
          currentItem = { company: 'Empresa', dates: { es: line, en: line, pt: line } };
        } else {
          currentItem.dates = { es: line, en: line, pt: line };
        }
      } else if (!currentItem) {
        // Start of a new experience block
        let mod: WorkModality = 'remote';
        if (line.toLowerCase().includes('hibrid') || line.toLowerCase().includes('hybrid')) mod = 'hybrid';
        if (line.toLowerCase().includes('presencial') || line.toLowerCase().includes('on-site')) mod = 'onsite';

        currentItem = {
          company: line.replace(/\s*·.*$/, ''),
          modality: mod,
          role: {
            combined: { es: line, en: line, pt: line },
            sdet: { es: line, en: line, pt: line },
            qa: { es: line, en: line, pt: line },
            dev: { es: line, en: line, pt: line },
            backend: { es: line, en: line, pt: line },
            fullstack: { es: line, en: line, pt: line }
          }
        };
      } else if (currentItem && !currentItem.dates) {
        // Line following company is usually the job title
        const roleName = line.replace(/\s*·.*$/, '');
        currentItem.role = {
          combined: { es: roleName, en: roleName, pt: roleName },
          sdet: { es: roleName, en: roleName, pt: roleName },
          qa: { es: roleName, en: roleName, pt: roleName },
          dev: { es: roleName, en: roleName, pt: roleName },
          backend: { es: roleName, en: roleName, pt: roleName },
          fullstack: { es: roleName, en: roleName, pt: roleName }
        };
      } else {
        // Additional text: check if modality/location, or bullet point
        if (line.toLowerCase().includes('remoto') || line.toLowerCase().includes('remote')) {
          currentItem.modality = 'remote';
        } else if (line.toLowerCase().includes('híbrido') || line.toLowerCase().includes('hybrid')) {
          currentItem.modality = 'hybrid';
        } else if (line.toLowerCase().includes('presencial') || line.toLowerCase().includes('on-site')) {
          currentItem.modality = 'onsite';
        } else {
          currentBullets.push(line);
        }
      }
    }
    flush();

    if (items.length === 0) {
      alert('No se detectaron bloques de experiencia con fechas. Por favor verifica que el texto contenga el nombre de la empresa, cargo y fechas.');
      return;
    }

    setParsedLinkedInExps(items);
  };

  const handleApplyLinkedInSync = () => {
    if (parsedLinkedInExps.length === 0) {
      alert('No hay experiencias extraídas para aplicar.');
      return;
    }

    const updatedExperience = linkedInSyncMode === 'replace'
      ? [...parsedLinkedInExps]
      : [...profileData.experience, ...parsedLinkedInExps];

    const updatedProfile: ProfileData = {
      ...profileData,
      experience: updatedExperience,
      contact: {
        ...profileData.contact,
        linkedinUrl: linkedInUrlInput || profileData.contact.linkedinUrl
      }
    };

    setProfileData(updatedProfile);
    saveProfile(updatedProfile);

    // Synchronize system variables
    const sysVars = getSystemVariables();
    saveSystemVariables({
      ...sysVars,
      linkedinUrl: linkedInUrlInput || sysVars.linkedinUrl
    });

    setIsLinkedInModalOpen(false);
    setParsedLinkedInExps([]);
    setLinkedInText('');
    onNotify('success', `¡Sincronización de LinkedIn exitosa! Se integraron ${parsedLinkedInExps.length} empresas a la trayectoria.`);
  };

  const handleSaveAll = () => {
    const ok = saveProfile(profileData);
    if (ok) {
      // Synchronize contact variables with system variables
      const sysVars = getSystemVariables();
      saveSystemVariables({
        ...sysVars,
        fullName: profileData.contact.name,
        email: profileData.contact.email,
        phone: profileData.contact.phone,
        location: profileData.contact.location,
        linkedinUrl: profileData.contact.linkedinUrl || profileData.contact.linkedin,
        githubUrl: profileData.contact.githubUrl || profileData.contact.github
      });
      setProfiles([profileData]);
      onNotify('success', 'CV Principal y Experiencia guardados correctamente.');
    } else {
      onNotify('error', 'Error al guardar información del CV.');
    }
  };

  // Reorder experience
  const moveExp = (index: number, direction: 'up' | 'down') => {
    const list = [...profileData.experience];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= list.length) return;
    const temp = list[index];
    list[index] = list[target];
    list[target] = temp;
    setProfileData({ ...profileData, experience: list });
  };

  // Delete experience
  const handleDeleteExp = (index: number) => {
    if (!confirm('¿Deseas eliminar este registro de experiencia laboral?')) return;
    const list = profileData.experience.filter((_, i) => i !== index);
    setProfileData({ ...profileData, experience: list });
    onNotify('success', 'Experiencia eliminada.');
  };

  // Open edit experience modal
  const openEditExp = (index: number) => {
    setEditingExpIndex(index);
    const exp = JSON.parse(JSON.stringify(profileData.experience[index]));
    if (!exp.technologies) exp.technologies = [];
    setEditingExpData(exp);
    setIsNewExp(false);
  };

  // Open new experience modal
  const openNewExp = () => {
    const newExp: Experience = {
      company: '',
      location: 'Bogotá, Colombia (Remoto)',
      modality: 'remote',
      dates: { es: '', en: '', pt: '' },
      companyDescription: { es: '', en: '', pt: '' },
      technologies: [],
      role: {
        combined: { es: '', en: '', pt: '' },
        sdet: { es: '', en: '', pt: '' },
        qa: { es: '', en: '', pt: '' },
        dev: { es: '', en: '', pt: '' },
        backend: { es: '', en: '', pt: '' },
        fullstack: { es: '', en: '', pt: '' }
      },
      detail: {
        combined: { es: [''], en: [''], pt: [''] },
        sdet: { es: [''], en: [''], pt: [''] },
        qa: { es: [''], en: [''], pt: [''] },
        dev: { es: [''], en: [''], pt: [''] },
        backend: { es: [''], en: [''], pt: [''] },
        fullstack: { es: [''], en: [''], pt: [''] }
      }
    };
    setEditingExpIndex(null);
    setEditingExpData(newExp);
    setIsNewExp(true);
  };

  const handleSaveModalExp = () => {
    if (!editingExpData || !editingExpData.company.trim()) {
      alert('Por favor ingresa el nombre de la empresa');
      return;
    }

    const updatedList = [...profileData.experience];
    if (isNewExp) {
      updatedList.unshift(editingExpData);
    } else if (editingExpIndex !== null) {
      updatedList[editingExpIndex] = editingExpData;
    }

    setProfileData({ ...profileData, experience: updatedList });
    setEditingExpData(null);
    setEditingExpIndex(null);
    onNotify('success', isNewExp ? 'Nueva experiencia agregada.' : 'Experiencia actualizada.');
  };

  // Education Helpers
  const getEduItemTuple = (edu: any, lang: string): [string, string, string, string] => {
    if (Array.isArray(edu)) {
      return [edu[0] || '', edu[1] || '', edu[2] || '', edu[3] || ''];
    }
    if (edu && typeof edu === 'object') {
      const t = edu[lang] || edu.es || edu.en;
      if (Array.isArray(t)) {
        return [t[0] || '', t[1] || '', t[2] || '', t[3] || ''];
      }
      return [edu.institution || '', edu.degree || '', edu.dates || '', edu.gpa || ''];
    }
    return ['', '', '', ''];
  };

  const openNewEdu = () => {
    setEditingEduIndex(null);
    setEditingEduData({ institution: '', degree: '', dates: '', gpa: '' });
    setIsNewEdu(true);
  };

  const openEditEdu = (index: number) => {
    const list = ((profileData.education as any)?.[activeLang] || (profileData.education as any)?.es || []);
    const item = list[index];
    const tuple = getEduItemTuple(item, activeLang);
    setEditingEduIndex(index);
    setEditingEduData({
      institution: tuple[0],
      degree: tuple[1],
      dates: tuple[2],
      gpa: tuple[3]
    });
    setIsNewEdu(false);
  };

  const handleSaveEdu = () => {
    if (!editingEduData || !editingEduData.institution.trim() || !editingEduData.degree.trim()) {
      alert('Ingresa la institución y el título obtenido.');
      return;
    }
    const currentList = [...((profileData.education as any)?.[activeLang] || (profileData.education as any)?.es || [])];
    const newTuple = [editingEduData.institution.trim(), editingEduData.degree.trim(), editingEduData.dates.trim(), editingEduData.gpa.trim()];

    if (isNewEdu) {
      currentList.push({
        es: newTuple,
        en: newTuple,
        pt: newTuple
      });
    } else if (editingEduIndex !== null) {
      const existing = currentList[editingEduIndex];
      if (existing && typeof existing === 'object' && !Array.isArray(existing)) {
        existing[activeLang] = newTuple;
        currentList[editingEduIndex] = { ...existing };
      } else {
        currentList[editingEduIndex] = newTuple;
      }
    }

    const updatedEducation = {
      ...profileData.education,
      [activeLang]: currentList,
      es: activeLang === 'es' ? currentList : ((profileData.education as any)?.es || currentList)
    };

    setProfileData({ ...profileData, education: updatedEducation });
    setEditingEduData(null);
    setEditingEduIndex(null);
    onNotify('success', isNewEdu ? 'Título académico añadido.' : 'Título académico actualizado.');
  };

  const handleDeleteEdu = (index: number) => {
    if (!confirm('¿Deseas eliminar este registro educativo?')) return;
    const currentList = [...((profileData.education as any)?.[activeLang] || (profileData.education as any)?.es || [])];
    currentList.splice(index, 1);
    const updatedEducation = {
      ...profileData.education,
      [activeLang]: currentList
    };
    setProfileData({ ...profileData, education: updatedEducation });
    onNotify('success', 'Título educativo eliminado.');
  };

  const moveEdu = (index: number, direction: 'up' | 'down') => {
    const currentList = [...((profileData.education as any)?.[activeLang] || (profileData.education as any)?.es || [])];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= currentList.length) return;
    const temp = currentList[index];
    currentList[index] = currentList[target];
    currentList[target] = temp;
    const updatedEducation = {
      ...profileData.education,
      [activeLang]: currentList
    };
    setProfileData({ ...profileData, education: updatedEducation });
  };

  // Languages Helpers
  const openNewLang = () => {
    setEditingLangIndex(null);
    setEditingLangText('');
    setIsNewLang(true);
  };

  const openEditLang = (index: number) => {
    const list = ((profileData.languages as any)?.[activeLang] || (profileData.languages as any)?.es || []);
    setEditingLangIndex(index);
    setEditingLangText(list[index] || '');
    setIsNewLang(false);
  };

  const handleSaveLang = () => {
    if (!editingLangText.trim()) {
      alert('Ingresa el idioma y nivel de competencia');
      return;
    }
    const currentList = [...((profileData.languages as any)?.[activeLang] || (profileData.languages as any)?.es || [])];
    if (isNewLang) {
      currentList.push(editingLangText.trim());
    } else if (editingLangIndex !== null) {
      currentList[editingLangIndex] = editingLangText.trim();
    }

    const updatedLanguages = {
      ...profileData.languages,
      [activeLang]: currentList
    };
    setProfileData({ ...profileData, languages: updatedLanguages });
    setEditingLangText('');
    setEditingLangIndex(null);
    onNotify('success', isNewLang ? 'Idioma añadido.' : 'Idioma actualizado.');
  };

  const handleDeleteLang = (index: number) => {
    if (!confirm('¿Deseas eliminar este idioma?')) return;
    const currentList = [...((profileData.languages as any)?.[activeLang] || (profileData.languages as any)?.es || [])];
    currentList.splice(index, 1);
    const updatedLanguages = {
      ...profileData.languages,
      [activeLang]: currentList
    };
    setProfileData({ ...profileData, languages: updatedLanguages });
    onNotify('success', 'Idioma eliminado.');
  };

  const moveLang = (index: number, direction: 'up' | 'down') => {
    const currentList = [...((profileData.languages as any)?.[activeLang] || (profileData.languages as any)?.es || [])];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= currentList.length) return;
    const temp = currentList[index];
    currentList[index] = currentList[target];
    currentList[target] = temp;
    const updatedLanguages = {
      ...profileData.languages,
      [activeLang]: currentList
    };
    setProfileData({ ...profileData, languages: updatedLanguages });
  };

  return (
    <div className="space-y-8">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
              <Briefcase className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              CV Principal & Experiencia Profesional
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Administra los datos curriculares, empresas, roles por track técnico, logros de impacto y resúmenes en todos los idiomas configurados.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSaveAll}
            className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Guardar Todo el CV</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
        {[
          { id: 'experience', label: 'Experiencia Laboral & Logros', icon: Briefcase },
          { id: 'summaries', label: 'Resúmenes Profesionales por Track', icon: FileText },
          { id: 'contact', label: 'Contacto & Foto de Perfil', icon: User },
          { id: 'education', label: 'Educación Académica', icon: GraduationCap },
          { id: 'languages', label: 'Idiomas & Dominio', icon: LanguagesIcon }
        ].map((tab) => {
          const Icon = tab.icon;
          const isCurrent = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSection(tab.id as any)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                isCurrent
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-SECTION 1: EXPERIENCIA LABORAL */}
      {activeSection === 'experience' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Historial de Trayectoria Profesional ({profileData.experience.length} Empresas)
              </h3>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setIsLinkedInModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/50 hover:bg-sky-100 dark:hover:bg-sky-900/50 border border-sky-200 dark:border-sky-800 rounded-xl transition-all cursor-pointer shadow-sm"
              >
                <LinkedinIcon className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Sincronizar desde LinkedIn</span>
              </button>

              <button
                type="button"
                onClick={openNewExp}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-sm transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir Nueva Empresa / Experiencia</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {profileData.experience.map((exp, idx) => {
              const currentRole = exp.role?.combined?.[activeLang] || 
                                  exp.role?.sdet?.[activeLang] || 
                                  exp.role?.qa?.[activeLang] || 
                                  exp.role?.dev?.[activeLang] || 
                                  'Rol no definido';
              const dates = exp.dates?.[activeLang] || exp.dates?.es || exp.dates?.en || '—';

              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-blue-400 dark:hover:border-blue-500 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {exp.company}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono">
                        {dates}
                      </span>
                      {exp.modality && (
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          {exp.modality}
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                      {currentRole}
                    </p>

                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 self-end md:self-center">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveExp(idx, 'up')}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-20 cursor-pointer"
                      title="Mover arriba"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      disabled={idx === profileData.experience.length - 1}
                      onClick={() => moveExp(idx, 'down')}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-20 cursor-pointer"
                      title="Mover abajo"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => openEditExp(idx)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Editar</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteExp(idx)}
                      className="p-1.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                      title="Eliminar experiencia"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-SECTION 2: RESÚMENES PROFESIONALES POR TRACK */}
      {activeSection === 'summaries' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Resúmenes Profesionales Adaptados por Especialidad Técnica
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personaliza cómo se describe tu trayectoria según el track seleccionado y en cada idioma activo.
            </p>
          </div>

          {/* Track selector */}
          <div className="flex flex-wrap gap-2">
            {TRACK_KEYS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedSummaryTrack(t.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedSummaryTrack === t.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Language tabs */}
          <LanguageTabSelector
            activeLang={activeLang}
            onSelectLang={setActiveLang}
            languages={languages}
            label={`Editando idioma para track [${selectedSummaryTrack.toUpperCase()}]:`}
          />

          {/* Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Título Profesional para ({activeLang.toUpperCase()})
              </label>
              <input
                type="text"
                value={profileData.titles?.[selectedSummaryTrack]?.[activeLang] || ''}
                onChange={(e) => {
                  const currentTitles: any = { ...profileData.titles };
                  const trackTitles = { ...currentTitles[selectedSummaryTrack] };
                  trackTitles[activeLang] = e.target.value;
                  currentTitles[selectedSummaryTrack] = trackTitles;
                  setProfileData({ ...profileData, titles: currentTitles });
                }}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="ej. Senior Software Engineer & SDET Architecture Lead"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Resumen Ejecutivo ({activeLang.toUpperCase()})
              </label>
              <textarea
                rows={5}
                value={(profileData.summary as any)?.[selectedSummaryTrack]?.[activeLang] || ''}
                onChange={(e) => {
                  const currentSummary: any = { ...profileData.summary };
                  const trackSummary = { ...currentSummary[selectedSummaryTrack] };
                  trackSummary[activeLang] = e.target.value;
                  currentSummary[selectedSummaryTrack] = trackSummary;
                  setProfileData({ ...profileData, summary: currentSummary });
                }}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 leading-relaxed"
                placeholder="Redacta la síntesis profesional para este track e idioma..."
              />
            </div>
          </div>
        </div>
      )}

      {/* SUB-SECTION 3: CONTACTO & FOTO */}
      {activeSection === 'contact' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Información de Contacto y Presencia Profesional
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Datos personales mostrados en el encabezado (Hero), footer y metadatos de CV.
            </p>
          </div>

          {/* Photo Uploader */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-700 border-2 border-blue-500/50 flex-shrink-0 flex items-center justify-center">
              {profileData.contact.avatarUrl ? (
                <img
                  src={profileData.contact.avatarUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '';
                  }}
                />
              ) : (
                <User className="w-8 h-8 text-slate-400" />
              )}
            </div>

            <div className="flex-1 w-full space-y-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Foto de Perfil Profesional (URL o Carga Directa)
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={profileData.contact.avatarUrl || ''}
                  onChange={(e) => setProfileData({
                    ...profileData,
                    contact: { ...profileData.contact, avatarUrl: e.target.value }
                  })}
                  placeholder="https://... o ruta de imagen"
                  className="flex-1 text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700"
                />
                <label className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Subir Imagen</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          setProfileData({
                            ...profileData,
                            contact: {
                              ...profileData.contact,
                              avatarUrl: ev.target?.result as string
                            }
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Nombre Completo:
              </label>
              <input
                type="text"
                value={profileData.contact.name}
                onChange={(e) => setProfileData({
                  ...profileData,
                  contact: { ...profileData.contact, name: e.target.value }
                })}
                className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Correo Electrónico:
              </label>
              <input
                type="email"
                value={profileData.contact.email}
                onChange={(e) => setProfileData({
                  ...profileData,
                  contact: { ...profileData.contact, email: e.target.value }
                })}
                className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Teléfono / WhatsApp:
              </label>
              <input
                type="text"
                value={profileData.contact.phone}
                onChange={(e) => setProfileData({
                  ...profileData,
                  contact: { ...profileData.contact, phone: e.target.value }
                })}
                className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Ubicación Geográfica:
              </label>
              <input
                type="text"
                value={profileData.contact.location}
                onChange={(e) => setProfileData({
                  ...profileData,
                  contact: { ...profileData.contact, location: e.target.value }
                })}
                className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Enlace LinkedIn:
              </label>
              <input
                type="url"
                value={profileData.contact.linkedinUrl || profileData.contact.linkedin}
                onChange={(e) => setProfileData({
                  ...profileData,
                  contact: { 
                    ...profileData.contact, 
                    linkedinUrl: e.target.value,
                    linkedin: e.target.value.replace(/^https?:\/\/(www\.)?/, '')
                  }
                })}
                className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Enlace GitHub:
              </label>
              <input
                type="url"
                value={profileData.contact.githubUrl || profileData.contact.github}
                onChange={(e) => setProfileData({
                  ...profileData,
                  contact: { 
                    ...profileData.contact, 
                    githubUrl: e.target.value,
                    github: e.target.value.replace(/^https?:\/\/(www\.)?/, '')
                  }
                })}
                className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700"
              />
            </div>
          </div>
        </div>
      )}

      {/* SUB-SECTION 4: EDUCACIÓN */}
      {activeSection === 'education' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-700 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Educación Académica y Títulos
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Gestiona instituciones, títulos universitarios y posgrados en todos los idiomas activos.
              </p>
            </div>
            <button
              type="button"
              onClick={openNewEdu}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all cursor-pointer w-fit"
            >
              <Plus className="w-4 h-4" />
              <span>Añadir Título Académico</span>
            </button>
          </div>

          <LanguageTabSelector
            activeLang={activeLang}
            onSelectLang={setActiveLang}
            languages={languages}
            label="Visualizando y editando títulos en idioma:"
          />

          {/* Education list */}
          <div className="space-y-3">
            {((profileData.education as any)?.[activeLang] || (profileData.education as any)?.es || []).map((edu: any, index: number) => {
              const tuple = getEduItemTuple(edu, activeLang);
              const institution = tuple[0];
              const degree = tuple[1];
              const dates = tuple[2];
              const gpa = tuple[3];

              return (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {degree}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                      {institution}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                      <span>{dates}</span>
                      {gpa && (
                        <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-semibold">
                          {gpa}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 self-end sm:self-center">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => moveEdu(index, 'up')}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-20 cursor-pointer"
                      title="Mover arriba"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={index === ((profileData.education as any)?.[activeLang] || []).length - 1}
                      onClick={() => moveEdu(index, 'down')}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-20 cursor-pointer"
                      title="Mover abajo"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditEdu(index)}
                      className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 cursor-pointer"
                      title="Editar título"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteEdu(index)}
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 cursor-pointer"
                      title="Eliminar título"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Education Form Modal */}
          {editingEduData && (
            <div className="p-5 bg-blue-50/50 dark:bg-slate-900/60 border border-blue-200 dark:border-slate-700 rounded-2xl space-y-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>{isNewEdu ? 'Nuevo Título Académico' : 'Editar Título Académico'} ({activeLang.toUpperCase()})</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Institución / Universidad (*):
                  </label>
                  <input
                    type="text"
                    value={editingEduData.institution}
                    onChange={(e) => setEditingEduData({ ...editingEduData, institution: e.target.value })}
                    placeholder="ej. Universidad del Valle"
                    className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Título Obtenido / Grado (*):
                  </label>
                  <input
                    type="text"
                    value={editingEduData.degree}
                    onChange={(e) => setEditingEduData({ ...editingEduData, degree: e.target.value })}
                    placeholder="ej. Ingeniería de Sistemas"
                    className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Período / Fechas:
                  </label>
                  <input
                    type="text"
                    value={editingEduData.dates}
                    onChange={(e) => setEditingEduData({ ...editingEduData, dates: e.target.value })}
                    placeholder="ej. Feb 2020 – Mar 2023"
                    className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Distinción / Promedio / GPA:
                  </label>
                  <input
                    type="text"
                    value={editingEduData.gpa}
                    onChange={(e) => setEditingEduData({ ...editingEduData, gpa: e.target.value })}
                    placeholder="ej. Promedio 4.8/5.0 o GPA 4.0"
                    className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingEduData(null)}
                  className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSaveEdu}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm cursor-pointer"
                >
                  Guardar Título
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-SECTION 5: IDIOMAS */}
      {activeSection === 'languages' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-700 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Idiomas y Nivel de Dominio
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Gestiona los idiomas y su nivel de fluencia (CEFR / descripción) para cada idioma del portafolio.
              </p>
            </div>
            <button
              type="button"
              onClick={openNewLang}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all cursor-pointer w-fit"
            >
              <Plus className="w-4 h-4" />
              <span>Añadir Idioma</span>
            </button>
          </div>

          <LanguageTabSelector
            activeLang={activeLang}
            onSelectLang={setActiveLang}
            languages={languages}
            label="Visualizando y editando idiomas en:"
          />

          {/* Languages list */}
          <div className="space-y-2.5">
            {((profileData.languages as any)?.[activeLang] || (profileData.languages as any)?.es || []).map((langStr: string, index: number) => (
              <div
                key={index}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2">
                  <LanguagesIcon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                    {langStr}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => moveLang(index, 'up')}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-20 cursor-pointer"
                    title="Mover arriba"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={index === ((profileData.languages as any)?.[activeLang] || []).length - 1}
                    onClick={() => moveLang(index, 'down')}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-20 cursor-pointer"
                    title="Mover abajo"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => openEditLang(index)}
                    className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 cursor-pointer"
                    title="Editar idioma"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteLang(index)}
                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 cursor-pointer"
                    title="Eliminar idioma"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Language Form Card */}
          {(isNewLang || editingLangIndex !== null) && (
            <div className="p-5 bg-blue-50/50 dark:bg-slate-900/60 border border-blue-200 dark:border-slate-700 rounded-2xl space-y-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <LanguagesIcon className="w-4 h-4 text-blue-600" />
                <span>{isNewLang ? 'Añadir Idioma' : 'Editar Idioma'} ({activeLang.toUpperCase()})</span>
              </h4>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Idioma y Nivel (*):
                </label>
                <input
                  type="text"
                  value={editingLangText}
                  onChange={(e) => setEditingLangText(e.target.value)}
                  placeholder="ej. Español — Nativo (C2) / Inglés — Profesional Avanzado (B2/C1)"
                  className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsNewLang(false);
                    setEditingLangIndex(null);
                    setEditingLangText('');
                  }}
                  className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSaveLang}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm cursor-pointer"
                >
                  Guardar Idioma
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODAL: EDIT / CREATE EXPERIENCE ENTRY */}
      {editingExpData && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {isNewExp ? 'Nueva Experiencia Laboral' : `Editar: ${editingExpData.company || 'Empresa'}`}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Diligencia los detalles de la empresa, roles por especialidad y logros clave en todos los idiomas activos.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingExpData(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Basic Company Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Empresa (*):
                  </label>
                  <input
                    type="text"
                    value={editingExpData.company}
                    onChange={(e) => setEditingExpData({ ...editingExpData, company: e.target.value })}
                    placeholder="ej. Globant / Evertec"
                    className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Ubicación (*):
                  </label>
                  <input
                    type="text"
                    value={editingExpData.location}
                    onChange={(e) => setEditingExpData({ ...editingExpData, location: e.target.value })}
                    placeholder="Bogotá, Colombia"
                    className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Modalidad:
                  </label>
                  <select
                    value={editingExpData.modality || 'remote'}
                    onChange={(e) => setEditingExpData({ ...editingExpData, modality: e.target.value as WorkModality })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    <option value="remote">Remoto (Remote)</option>
                    <option value="hybrid">Híbrido (Hybrid)</option>
                    <option value="onsite">Presencial (Onsite)</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Language Selector for Dates & Description */}
              <LanguageTabSelector
                activeLang={activeLang}
                onSelectLang={setActiveLang}
                languages={languages}
                label="Idioma de textos informativos:"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Fechas del Período ({activeLang.toUpperCase()}):
                  </label>
                  <input
                    type="text"
                    value={editingExpData.dates?.[activeLang] || ''}
                    onChange={(e) => {
                      const dates = { ...editingExpData.dates, [activeLang]: e.target.value };
                      setEditingExpData({ ...editingExpData, dates: dates as any });
                    }}
                    placeholder={activeLang === 'es' ? 'Ene 2022 – Presente' : 'Jan 2022 – Present'}
                    className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Descripción Corta de la Empresa ({activeLang.toUpperCase()}):
                  </label>
                  <input
                    type="text"
                    value={editingExpData.companyDescription?.[activeLang] || ''}
                    onChange={(e) => {
                      const desc = { ...editingExpData.companyDescription, [activeLang]: e.target.value };
                      setEditingExpData({ ...editingExpData, companyDescription: desc as any });
                    }}
                    placeholder="Multinacional de desarrollo y soluciones financieras..."
                    className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Technologies & Tech Stack Input */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 space-y-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Tecnologías & Stack de Herramientas (separadas por coma):
                </label>
                <input
                  type="text"
                  value={(editingExpData.technologies || []).join(', ')}
                  onChange={(e) => {
                    const tags = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    setEditingExpData({ ...editingExpData, technologies: tags });
                  }}
                  placeholder="ej. Playwright, TypeScript, Java, Spring Boot, CI/CD, Docker, Jest, Postman"
                  className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
                <div className="flex flex-wrap gap-1 pt-1">
                  {(editingExpData.technologies || []).map((tech, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[11px] font-mono font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Role & Achievements Per Technical Track */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Roles y Logros por Especialidad Técnica
                    </span>
                  </div>

                  {/* Track selector */}
                  <div className="flex flex-wrap gap-1.5">
                    {TRACK_KEYS.map((t) => {
                      const hasData = ((editingExpData.detail?.[t.id]?.[activeLang] || []) as string[]).filter((b: string) => b.trim()).length > 0;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setSelectedExpTrack(t.id)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                            selectedExpTrack === t.id
                              ? 'bg-blue-600 text-white shadow-sm'
                              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                          }`}
                        >
                          <span>{t.label.split(' ')[0]}</span>
                          {hasData && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Role Title in active language */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Título del Rol en Track [{selectedExpTrack.toUpperCase()}] ({activeLang.toUpperCase()}):
                  </label>
                  <input
                    type="text"
                    value={editingExpData.role?.[selectedExpTrack]?.[activeLang] || ''}
                    onChange={(e) => {
                      const currentRole: any = { ...editingExpData.role };
                      const trackRole = { ...currentRole[selectedExpTrack] };
                      trackRole[activeLang] = e.target.value;
                      currentRole[selectedExpTrack] = trackRole;
                      setEditingExpData({ ...editingExpData, role: currentRole });
                    }}
                    placeholder="ej. Senior SDET Lead Engineer"
                    className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                {/* Bullet Points in active language */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Logros y Responsabilidades Clave ({activeLang.toUpperCase()}):
                    </label>
                    <div className="flex items-center gap-2">
                      {/* Copy from combined button if current track is not combined and combined has data */}
                      {selectedExpTrack !== 'combined' && (editingExpData.detail?.combined?.[activeLang] || []).length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            const source = editingExpData.detail?.combined?.[activeLang] || [];
                            const detail = { ...editingExpData.detail };
                            if (!detail[selectedExpTrack]) detail[selectedExpTrack] = {} as any;
                            detail[selectedExpTrack][activeLang] = [...source];
                            setEditingExpData({ ...editingExpData, detail });
                          }}
                          className="text-[11px] text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium underline cursor-pointer"
                        >
                          Copiar logros de Integral
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          const detail = { ...editingExpData.detail };
                          if (!detail[selectedExpTrack]) detail[selectedExpTrack] = {} as any;
                          if (!detail[selectedExpTrack][activeLang]) detail[selectedExpTrack][activeLang] = [];
                          detail[selectedExpTrack][activeLang].push('');
                          setEditingExpData({ ...editingExpData, detail });
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Agregar Logro</span>
                      </button>
                    </div>
                  </div>

                  {((editingExpData.detail?.[selectedExpTrack]?.[activeLang]) || ['']).map((bullet: string, bIdx: number) => (
                    <div key={bIdx} className="flex items-center gap-2">
                      <span className="text-blue-500 font-bold text-xs">•</span>
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) => {
                          const detail = { ...editingExpData.detail };
                          if (!detail[selectedExpTrack]) detail[selectedExpTrack] = {} as any;
                          if (!detail[selectedExpTrack][activeLang]) detail[selectedExpTrack][activeLang] = [];
                          detail[selectedExpTrack][activeLang][bIdx] = e.target.value;
                          setEditingExpData({ ...editingExpData, detail });
                        }}
                        placeholder="Descripción del logro cuantitativo o técnico alcanzado..."
                        className="flex-1 text-xs px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const detail = { ...editingExpData.detail };
                          detail[selectedExpTrack][activeLang] = detail[selectedExpTrack][activeLang].filter((_: any, i: number) => i !== bIdx);
                          setEditingExpData({ ...editingExpData, detail });
                        }}
                        className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-end gap-3 bg-slate-50 dark:bg-slate-900/50">
              <button
                type="button"
                onClick={() => setEditingExpData(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveModalExp}
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
              >
                {isNewExp ? 'Crear Experiencia' : 'Guardar Cambios'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LINKEDIN SYNCHRONIZATION MODAL */}
      {isLinkedInModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-3xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-sky-50/50 dark:bg-sky-950/20">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-sm flex-shrink-0">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Sincronización de Experiencia desde LinkedIn
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Importa tu trayectoria profesional como única fuente de conocimiento para tu portafolio
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsLinkedInModalOpen(false);
                  setParsedLinkedInExps([]);
                }}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Profile URL Input */}
              <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Enlace de tu Perfil de LinkedIn
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={linkedInUrlInput}
                    onChange={(e) => setLinkedInUrlInput(e.target.value)}
                    placeholder="https://www.linkedin.com/in/tu-perfil/"
                    className="flex-1 text-xs px-3.5 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
                  />
                  <a
                    href={linkedInUrlInput}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-900/40 hover:bg-sky-200 rounded-xl transition-colors"
                  >
                    <span>Abrir</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50/70 dark:bg-blue-950/30 p-4 rounded-xl border border-blue-200 dark:border-blue-900/50 flex gap-3 text-xs text-blue-900 dark:text-blue-200">
                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold">¿Cómo sincronizar tu contenido de LinkedIn?</p>
                  <p className="leading-relaxed text-blue-800 dark:text-blue-300">
                    Copia y pega aquí la información de tu sección <strong>Experiencia</strong> de LinkedIn (o el texto copiado de tu PDF de perfil en <em>Más &gt; Guardar en PDF</em>, o formato JSON). Nuestro motor extraerá automáticamente las empresas, cargos, períodos, modalidades (remoto, híbrido, presencial), logros y tecnologías.
                  </p>
                </div>
              </div>

              {/* Text Area for LinkedIn Content */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Texto o JSON de Experiencia de LinkedIn
                </label>
                <textarea
                  rows={7}
                  value={linkedInText}
                  onChange={(e) => setLinkedInText(e.target.value)}
                  placeholder={`Ejemplo de texto pegado de LinkedIn:

Mercado Libre
Lead SDET & Test Automation Specialist · Jornada completa
ene. 2022 - actualidad · 3 años
Bogotá, Colombia · En remoto
• Diseñé e implementé el framework empresarial de automatización con Playwright y TypeScript.
• Reduje los tiempos de regresión en un 65% integrando pipelines en CI/CD con Azure DevOps.
Aptitudes: Playwright, TypeScript, Azure DevOps, Docker`}
                  className="w-full text-xs font-mono p-3.5 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white leading-relaxed focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                />
              </div>

              {/* Parse Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleParseLinkedIn}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Analizar y Extraer Experiencias</span>
                </button>
              </div>

              {/* Preview of Parsed Items */}
              {parsedLinkedInExps.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>{parsedLinkedInExps.length} Empresas Detectadas Listas para Integrar</span>
                    </h4>
                    
                    {/* Sync Mode Selector */}
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Modo:</span>
                      <select
                        value={linkedInSyncMode}
                        onChange={(e) => setLinkedInSyncMode(e.target.value as any)}
                        className="px-2.5 py-1 text-xs border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 font-semibold"
                      >
                        <option value="append">Agregar a la lista existente</option>
                        <option value="replace">Reemplazar lista actual</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {parsedLinkedInExps.map((pExp, pIdx) => (
                      <div
                        key={pIdx}
                        className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              {pExp.company}
                            </span>
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                              {pExp.dates.es}
                            </span>
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                              {pExp.modality}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setParsedLinkedInExps(parsedLinkedInExps.filter((_, i) => i !== pIdx));
                            }}
                            className="text-slate-400 hover:text-red-500 text-xs p-1"
                            title="Descartar este ítem"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                          {pExp.role?.combined?.es || 'Rol no especificado'}
                        </p>

                        {(pExp.detail?.combined?.es && pExp.detail.combined.es.length > 0) && (
                          <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                            {(pExp.detail?.combined?.es || []).slice(0, 3).map((b, bi) => (
                              <li key={bi} className="truncate">{b}</li>
                            ))}
                          </ul>
                        )}

                        {pExp.technologies && pExp.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {pExp.technologies.map((t, ti) => (
                              <span key={ti} className="text-[10px] px-2 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-700 dark:text-slate-300">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
              <button
                type="button"
                onClick={() => {
                  setIsLinkedInModalOpen(false);
                  setParsedLinkedInExps([]);
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleApplyLinkedInSync}
                disabled={parsedLinkedInExps.length === 0}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl shadow-md transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Confirmar e Integrar en Portafolio ({parsedLinkedInExps.length})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
