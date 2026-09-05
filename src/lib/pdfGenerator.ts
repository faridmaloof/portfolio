import type { ProfileData, Language, TrackType } from '../types';
import jsPDF from 'jspdf';
import { getFeaturedCertifications } from '../data/certificationsData';
import { 
  getLocalizedRole, 
  getLocalizedDetail, 
  getLocalizedSummary, 
  getLocalizedTitle, 
  getLocalizedSkills, 
  formatModality, 
  getLocalizedText,
  formatExperienceDates 
} from './utils';

export function generatePDF(data: ProfileData, language: Language, track: TrackType = 'combined'): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - 2 * margin;

  let yPos = margin;
  let currentPage = 1;

  // Helper to add footer with page numbers
  const addFooter = (pageNum: number) => {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184); // slate-400
    const footerText = `${data.contact.name} — Curriculum Vitae | ${pageNum}`;
    doc.text(footerText, pageWidth / 2, pageHeight - 8, { align: 'center' });
  };

  // Helper to check page break
  const checkPageBreak = (neededHeight: number) => {
    if (yPos + neededHeight > pageHeight - 16) {
      addFooter(currentPage);
      doc.addPage();
      currentPage++;
      yPos = margin + 4;
    }
  };

  // Section Header helper
  const renderSectionHeader = (title: string) => {
    checkPageBreak(14);
    yPos += 3;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text(title.toUpperCase(), margin, yPos);

    // Modern thin divider line with colored accent bar
    doc.setDrawColor(203, 213, 225); // slate-300
    doc.setLineWidth(0.4);
    doc.line(margin, yPos + 2, margin + contentWidth, yPos + 2);

    doc.setDrawColor(37, 99, 235); // blue-600 accent
    doc.setLineWidth(1.2);
    doc.line(margin, yPos + 2, margin + 28, yPos + 2);

    yPos += 7;
  };

  // ==================== HEADER SECTION ====================
  // Dark Navy banner for executive contrast
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(data.contact.name, margin, 15);

  // Dynamic Title based on active track
  const title = getLocalizedTitle(data.titles, track, language);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(147, 197, 253); // blue-300
  doc.text(title, margin, 22);

  // Subtitle / Experience Highlights badge
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(226, 232, 240); // slate-200
  const expPill = language === 'es' 
    ? '15+ Años de Experiencia | ISTQB Certified | Arquitectura QA & Desarrollo Full Stack' 
    : '15+ Years Experience | ISTQB Certified | QA Architecture & Full Stack Engineering';
  doc.text(expPill, margin, 28);

  // Contact line with GitHub & LinkedIn
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225); // slate-300
  const githubLink = data.contact.githubUrl || 'https://github.com/faridmaloof/';
  const linkedinLink = data.contact.linkedinUrl || 'https://linkedin.com/in/fmaloofs';
  const contactLine = `${data.contact.email}   |   ${data.contact.phone}   |   ${data.contact.location}   |   ${githubLink.replace('https://', '')}   |   ${linkedinLink.replace('https://', '')}`;
  doc.text(contactLine, margin, 35);

  yPos = 48;

  // ==================== PROFESSIONAL SUMMARY ====================
  const summaryHeading = language === 'es' ? 'Resumen Profesional Ejecutivo' : 'Executive Professional Summary';
  renderSectionHeader(summaryHeading);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85); // slate-700
  const summaryText = getLocalizedSummary(data.summary, track, language);
  const splitSummary = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(splitSummary, margin, yPos);
  yPos += splitSummary.length * 4.2 + 4;

  // ==================== TECHNICAL SKILLS & STACK ====================
  const skillsHeading = language === 'es' ? 'Competencias Técnicas y Tecnologías' : 'Technical Core Competencies';
  renderSectionHeader(skillsHeading);

  const skills = getLocalizedSkills(data.skills, track, language);
  skills.forEach(([category, tech]) => {
    checkPageBreak(9);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59); // slate-800
    doc.text(`${category}:`, margin, yPos);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105); // slate-600
    const catWidth = doc.getTextWidth(`${category}: `);
    const splitTech = doc.splitTextToSize(tech, contentWidth - catWidth - 2);
    
    if (splitTech.length === 1) {
      doc.text(tech, margin + catWidth, yPos);
      yPos += 4.5;
    } else {
      doc.text(splitTech, margin + catWidth, yPos);
      yPos += splitTech.length * 4.2 + 1;
    }
  });
  yPos += 3;

  // ==================== WORK EXPERIENCE ====================
  const expHeading = language === 'es' ? 'Experiencia Laboral Relevante' : 'Relevant Professional Experience';
  renderSectionHeader(expHeading);

  // Render top 5 experiences
  const experiences = data.experience.slice(0, 5);
  experiences.forEach((exp) => {
    const role = getLocalizedRole(exp.role, track, language);
    const dates = formatExperienceDates(exp.dates, language);
    const details = getLocalizedDetail(exp.detail, track, language);
    const modality = formatModality(exp.modality, language);
    const companyDesc = getLocalizedText(exp.companyDescription, language);

    checkPageBreak(22);

    // Role & Dates header row
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text(role, margin, yPos);

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(37, 99, 235); // blue-600
    doc.text(dates, margin + contentWidth, yPos, { align: 'right' });
    yPos += 4.2;

    // Company & Location with Modality badge
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85); // slate-700
    const modalityStr = modality ? ` [${modality}]` : '';
    const companyLoc = exp.location ? `${exp.company}${modalityStr}  —  ${exp.location}` : `${exp.company}${modalityStr}`;
    doc.text(companyLoc, margin, yPos);
    yPos += 3.8;

    // Company brief description if present
    if (companyDesc) {
      doc.setFontSize(7.8);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 116, 139); // slate-500
      const splitDesc = doc.splitTextToSize(companyDesc, contentWidth - 4);
      doc.text(splitDesc, margin + 2, yPos);
      yPos += splitDesc.length * 3.6 + 1.2;
    }

    // Bullet points
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85); // slate-700
    details.forEach((bullet) => {
      checkPageBreak(8);
      const splitBullet = doc.splitTextToSize(`•  ${bullet}`, contentWidth - 4);
      doc.text(splitBullet, margin + 2, yPos);
      yPos += splitBullet.length * 4.1;
    });

    yPos += 3;
  });

  // ==================== FEATURED CERTIFICATIONS ====================
  const certsHeading = language === 'es' ? 'Certificaciones & Licencias Profesionales Destacadas' : 'Key Professional Certifications & Accreditations';
  renderSectionHeader(certsHeading);

  const featuredCerts = getFeaturedCertifications(track, 6);
  featuredCerts.forEach((cert) => {
    checkPageBreak(8);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    
    // Check if certification has a direct verification URL
    if (cert.url) {
      doc.setTextColor(29, 78, 216); // blue-700
      const titleWithBadge = `•  ${cert.title} [↗]`;
      doc.textWithLink(titleWithBadge, margin, yPos, { url: cert.url });
    } else {
      doc.setTextColor(15, 23, 42);
      doc.text(`•  ${cert.title}`, margin, yPos);
    }

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const certMeta = cert.credentialId 
      ? `${cert.issuer} (${cert.date}) | ID: ${cert.credentialId}` 
      : `${cert.issuer} (${cert.date})`;
    doc.text(certMeta, margin + contentWidth, yPos, { align: 'right' });
    yPos += 4.5;
  });

  // Full LinkedIn Certifications Redirection Link Box
  const linkedinAllCertsUrl = 'https://www.linkedin.com/in/fmaloofs/details/certifications/';
  checkPageBreak(12);
  yPos += 1.5;
  
  // Clean clickable banner for LinkedIn certifications
  doc.setFillColor(239, 246, 255); // blue-50
  doc.setDrawColor(191, 219, 254); // blue-200
  doc.roundedRect(margin, yPos, contentWidth, 8.5, 2, 2, 'FD');
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(29, 78, 216); // blue-700
  const linkedinText = language === 'es'
    ? '🔗 Ver catálogo completo (+120 certificaciones oficiales verificadas) en LinkedIn ↗'
    : '🔗 View full catalog of 120+ official verified certifications on LinkedIn ↗';
  doc.textWithLink(linkedinText, margin + 4, yPos + 5.5, { url: linkedinAllCertsUrl });
  doc.link(margin, yPos, contentWidth, 8.5, { url: linkedinAllCertsUrl });
  yPos += 12;

  // ==================== EDUCATION ====================
  const eduHeading = language === 'es' ? 'Educación Universitaria y Posgrados' : language === 'pt' ? 'Educação Superior e Pós-graduação' : 'Higher Education & Postgraduates';
  renderSectionHeader(eduHeading);

  const eduList = data.education[language] || data.education.es || data.education.en || [];
  eduList.forEach((item) => {
    checkPageBreak(12);
    const tuple = item[language] || item.es || item.en;
    if (!tuple) return;
    const [institution, degree, dates, gpa] = tuple;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(degree, margin, yPos);

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(37, 99, 235);
    doc.text(dates, margin + contentWidth, yPos, { align: 'right' });
    yPos += 4.2;

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const gpaText = gpa ? ` | ${gpa}` : '';
    doc.text(`${institution}${gpaText}`, margin, yPos);
    yPos += 5.5;
  });

  // ==================== LANGUAGES ====================
  checkPageBreak(14);
  const langHeading = language === 'es' ? 'Idiomas' : language === 'pt' ? 'Idiomas' : 'Languages';
  renderSectionHeader(langHeading);

  const languagesList = data.languages[language] || data.languages.es || data.languages.en || [];
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  const langSummary = languagesList.join('   |   ');
  doc.text(langSummary, margin, yPos);
  yPos += 6;

  // Final footer on last page
  addFooter(currentPage);

  // Save the PDF with a clean, descriptive name
  const trackSuffix = track === 'sdet' 
    ? 'sdet-lead' 
    : track === 'qa' 
    ? 'qa-specialist' 
    : track === 'fullstack' 
    ? 'fullstack-dev' 
    : track === 'backend' 
    ? 'backend-dev' 
    : track === 'dev' 
    ? 'software-dev' 
    : 'senior-engineer';
  const filename = `CV-Farid-Maloof-${trackSuffix}-${language.toUpperCase()}.pdf`;
  doc.save(filename);
}
