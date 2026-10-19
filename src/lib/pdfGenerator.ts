import type { ProfileData, Language, TrackType, CVTemplateType } from '../types';
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

// Helper to sanitize text and replace non-standard Unicode with clean universal ASCII equivalents
function sanitizeText(str: string): string {
  if (!str) return '';
  return str
    .replace(/™/g, '(TM)')
    .replace(/®/g, '(R)')
    .replace(/[—–]/g, '-')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[•·]/g, '')
    .replace(/↗/g, '')
    .replace(/🔗/g, '')
    .trim();
}

// Draw a crisp vector bullet dot
function drawBulletDot(doc: jsPDF, x: number, y: number, color: [number, number, number] = [71, 85, 105], radius = 0.65) {
  doc.setFillColor(color[0], color[1], color[2]);
  doc.circle(x, y - 1.0, radius, 'F');
}

// Draw candidate avatar or fallback monogram
function drawAvatar(doc: jsPDF, data: ProfileData, x: number, y: number, size: number, bgColor: [number, number, number] = [30, 41, 59]): void {
  try {
    if (data.contact.avatarUrl && (data.contact.avatarUrl.startsWith('data:image/') || data.contact.avatarUrl.startsWith('http'))) {
      doc.addImage(data.contact.avatarUrl, 'JPEG', x, y, size, size);
      return;
    }
  } catch {
    // Fallback to monogram
  }
  // Draw sleek monogram seal
  doc.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
  doc.circle(x + size / 2, y + size / 2, size / 2, 'F');
  doc.setFontSize(size * 0.45);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('FM', x + size / 2, y + size / 2 + size * 0.15, { align: 'center' });
}

// ============================================================================
// TEMPLATE 1: EXECUTIVE TECH LEAD (Corporate Navy Banner with Avatar)
// ============================================================================
function renderExecutiveTemplate(doc: jsPDF, data: ProfileData, language: Language, track: TrackType): void {
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - 2 * margin; // 182mm

  let yPos = margin;
  let currentPage = 1;

  const addFooter = (pageNum: number) => {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    const footerText = `${sanitizeText(data.contact.name)} - Curriculum Vitae | ${pageNum}`;
    doc.text(footerText, pageWidth / 2, pageHeight - 7, { align: 'center' });
  };

  const checkPageBreak = (neededHeight: number) => {
    if (yPos + neededHeight > pageHeight - 15) {
      addFooter(currentPage);
      doc.addPage();
      currentPage++;
      yPos = margin + 2;
    }
  };

  const renderSectionHeader = (title: string) => {
    checkPageBreak(13);
    yPos += 2;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text(title.toUpperCase(), margin, yPos);

    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.35);
    doc.line(margin, yPos + 1.8, margin + contentWidth, yPos + 1.8);

    doc.setDrawColor(37, 99, 235); // blue-600
    doc.setLineWidth(1.1);
    doc.line(margin, yPos + 1.8, margin + 26, yPos + 1.8);
    yPos += 5.8;
  };

  // Header Banner
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Avatar inside banner
  drawAvatar(doc, data, margin, 7, 26, [37, 99, 235]);

  // Name & Titles
  const textX = margin + 31;
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(sanitizeText(data.contact.name), textX, 15);

  const rawTitle = getLocalizedTitle(data.titles, track, language);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(147, 197, 253); // blue-300
  doc.text(sanitizeText(rawTitle), textX, 22);

  doc.setFontSize(7.8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(226, 232, 240);
  const expPill = language === 'es' 
    ? '15+ Años de Experiencia | ISTQB Certified | Arquitectura QA & Desarrollo Full Stack' 
    : '15+ Years Experience | ISTQB Certified | QA Architecture & Full Stack Engineering';
  doc.text(expPill, textX, 28);

  // Contact line
  doc.setFontSize(7.5);
  doc.setTextColor(203, 213, 225);
  const githubLink = (data.contact.githubUrl || 'https://github.com/faridmaloof/').replace('https://', '');
  const linkedinLink = (data.contact.linkedinUrl || 'https://linkedin.com/in/fmaloofs').replace('https://', '');
  const contactLine = `${data.contact.email}  |  ${data.contact.phone}  |  ${sanitizeText(data.contact.location)}  |  ${githubLink}  |  ${linkedinLink}`;
  doc.text(contactLine, textX, 34);

  yPos = 47;

  // Summary
  const summaryHeading = language === 'es' ? 'Resumen Profesional Ejecutivo' : 'Executive Professional Summary';
  renderSectionHeader(summaryHeading);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  const summaryText = sanitizeText(getLocalizedSummary(data.summary, track, language));
  const splitSummary = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(splitSummary, margin, yPos);
  yPos += splitSummary.length * 3.8 + 2.5;

  // Skills
  const skillsHeading = language === 'es' ? 'Competencias Técnicas y Tecnologías' : 'Technical Core Competencies';
  renderSectionHeader(skillsHeading);
  const skills = getLocalizedSkills(data.skills, track, language);
  const catColWidth = 50;
  const techColWidth = contentWidth - catColWidth - 2;

  skills.forEach(([category, tech]) => {
    doc.setFontSize(8.2);
    doc.setFont('helvetica', 'bold');
    const splitCat = doc.splitTextToSize(`${sanitizeText(category)}:`, catColWidth - 3);

    doc.setFont('helvetica', 'normal');
    const splitTech = doc.splitTextToSize(sanitizeText(tech), techColWidth);

    const rowHeight = Math.max(splitCat.length, splitTech.length) * 3.6 + 1.0;
    checkPageBreak(rowHeight);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(splitCat, margin, yPos);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(splitTech, margin + catColWidth, yPos);
    yPos += rowHeight;
  });
  yPos += 2;

  // Experience
  const expHeading = language === 'es' ? 'Experiencia Laboral Relevante' : 'Relevant Professional Experience';
  renderSectionHeader(expHeading);

  const experiences = data.experience.slice(0, 5);
  experiences.forEach((exp) => {
    const role = sanitizeText(getLocalizedRole(exp.role, track, language));
    const dates = sanitizeText(formatExperienceDates(exp.dates, language));
    const details = getLocalizedDetail(exp.detail, track, language);
    const modality = sanitizeText(formatModality(exp.modality, language));
    const companyDesc = sanitizeText(getLocalizedText(exp.companyDescription, language));

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    const datesWidth = doc.getTextWidth(dates);
    const maxRoleWidth = contentWidth - datesWidth - 4;

    doc.setFontSize(9);
    const splitRole = doc.splitTextToSize(role, maxRoleWidth);

    let totalH = splitRole.length * 3.8 + 3.5;
    const splitDesc: string[] = [];
    if (companyDesc) {
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'italic');
      splitDesc.push(...(doc.splitTextToSize(companyDesc, contentWidth - 4) as string[]));
      totalH += splitDesc.length * 3.3 + 1.0;
    }
    const splitBullets = details.map((b) => doc.splitTextToSize(sanitizeText(b), contentWidth - 6) as string[]);
    splitBullets.forEach(sb => { totalH += sb.length * 3.6 + 0.6; });
    totalH += 3.5;

    if (yPos + totalH > pageHeight - 15 && yPos > margin + 25) {
      addFooter(currentPage);
      doc.addPage();
      currentPage++;
      yPos = margin + 2;
    } else {
      checkPageBreak(18);
    }

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(splitRole, margin, yPos);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(37, 99, 235);
    doc.text(dates, margin + contentWidth, yPos, { align: 'right' });
    yPos += splitRole.length * 3.8;

    doc.setFontSize(8.2);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    const modalityStr = modality ? ` [${modality}]` : '';
    const companyLoc = exp.location 
      ? `${sanitizeText(exp.company)}${modalityStr}  -  ${sanitizeText(exp.location)}` 
      : `${sanitizeText(exp.company)}${modalityStr}`;
    doc.text(companyLoc, margin, yPos);
    yPos += 3.5;

    if (splitDesc.length > 0) {
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 116, 139);
      doc.text(splitDesc, margin + 2, yPos);
      yPos += splitDesc.length * 3.3 + 1.0;
    }

    doc.setFontSize(8.2);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    splitBullets.forEach((sb) => {
      checkPageBreak(sb.length * 3.6 + 1.0);
      drawBulletDot(doc, margin + 2, yPos, [71, 85, 105]);
      doc.text(sb, margin + 5, yPos);
      yPos += sb.length * 3.6 + 0.6;
    });
    yPos += 2.5;
  });

  // Certifications
  const certsHeading = language === 'es' ? 'Certificaciones & Licencias Profesionales Destacadas' : 'Key Professional Certifications & Accreditations';
  renderSectionHeader(certsHeading);

  const featuredCerts = getFeaturedCertifications(track, 6);
  featuredCerts.forEach((cert) => {
    checkPageBreak(9);
    const hasUrl = Boolean(cert.url);
    const linkBadge = hasUrl ? ' [Ver Credencial]' : '';
    const cleanTitle = `${sanitizeText(cert.title)}${linkBadge}`;
    const certMeta = cert.credentialId 
      ? `${sanitizeText(cert.issuer)} (${sanitizeText(cert.date)}) | ID: ${sanitizeText(cert.credentialId)}` 
      : `${sanitizeText(cert.issuer)} (${sanitizeText(cert.date)})`;

    doc.setFontSize(8.3);
    doc.setFont('helvetica', 'bold');
    const splitTitle = doc.splitTextToSize(cleanTitle, contentWidth - 6);

    drawBulletDot(doc, margin + 1.5, yPos, hasUrl ? [37, 99, 235] : [71, 85, 105]);

    if (hasUrl && cert.url) {
      doc.setTextColor(29, 78, 216);
      doc.text(splitTitle, margin + 4.5, yPos);
      doc.link(margin + 4.5, yPos - 3, contentWidth - 6, splitTitle.length * 3.7, { url: cert.url });
    } else {
      doc.setTextColor(15, 23, 42);
      doc.text(splitTitle, margin + 4.5, yPos);
    }
    yPos += splitTitle.length * 3.7;

    doc.setFontSize(7.8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(certMeta, margin + 4.5, yPos);
    yPos += 4.0;
  });

  // LinkedIn Certifications Link Box
  const linkedinAllCertsUrl = 'https://www.linkedin.com/in/fmaloofs/details/certifications/';
  checkPageBreak(11);
  yPos += 1;
  doc.setFillColor(239, 246, 255);
  doc.setDrawColor(191, 219, 254);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, yPos, contentWidth, 8, 2, 2, 'FD');

  doc.setFillColor(37, 99, 235);
  doc.roundedRect(margin + 2.5, yPos + 1.6, 7.5, 4.8, 1, 1, 'F');
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('in', margin + 6.2, yPos + 5.0, { align: 'center' });
  
  doc.setFontSize(7.8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(29, 78, 216);
  const linkedinText = language === 'es'
    ? 'Ver catálogo completo (+120 certificaciones oficiales verificadas) en LinkedIn  [Abrir enlace]'
    : 'View full catalog of 120+ official verified certifications on LinkedIn  [Open Link]';
  doc.text(linkedinText, margin + 13, yPos + 5.2);
  doc.link(margin, yPos, contentWidth, 8, { url: linkedinAllCertsUrl });
  yPos += 10.5;

  // Education
  const eduHeading = language === 'es' ? 'Educación Universitaria y Posgrados' : 'Higher Education & Postgraduates';
  renderSectionHeader(eduHeading);

  const eduList = data.education[language] || data.education.es || data.education.en || [];
  eduList.forEach((item) => {
    const tuple = item[language] || item.es || item.en;
    if (!tuple) return;
    const [institution, degree, dates, gpa] = tuple;

    const cleanDegree = sanitizeText(degree);
    const cleanDates = sanitizeText(dates);
    const cleanInst = sanitizeText(institution);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    const datesWidth = doc.getTextWidth(cleanDates);
    const maxDegreeWidth = contentWidth - datesWidth - 4;

    doc.setFontSize(8.5);
    const splitDegree = doc.splitTextToSize(cleanDegree, maxDegreeWidth);
    const neededHeight = splitDegree.length * 3.7 + 4.8;
    checkPageBreak(neededHeight);

    doc.setTextColor(15, 23, 42);
    doc.text(splitDegree, margin, yPos);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(37, 99, 235);
    doc.text(cleanDates, margin + contentWidth, yPos, { align: 'right' });
    yPos += splitDegree.length * 3.7;

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const gpaText = gpa ? ` | ${sanitizeText(gpa)}` : '';
    doc.text(`${cleanInst}${gpaText}`, margin, yPos);
    yPos += 4.8;
  });

  // Languages
  checkPageBreak(18);
  const langHeading = language === 'es' ? 'Idiomas' : 'Languages';
  renderSectionHeader(langHeading);

  const languagesList = data.languages[language] || data.languages.es || data.languages.en || [];
  languagesList.forEach((langItem) => {
    checkPageBreak(5);
    const cleanLang = sanitizeText(langItem);
    drawBulletDot(doc, margin + 1.5, yPos, [37, 99, 235]);

    doc.setFontSize(8.2);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    const splitLang = doc.splitTextToSize(cleanLang, contentWidth - 6);
    doc.text(splitLang, margin + 4.5, yPos);
    yPos += splitLang.length * 3.8 + 0.8;
  });

  addFooter(currentPage);
}

// ============================================================================
// TEMPLATE 2: MINIMALIST ATS (Harvard / Stanford Pure Clean Text - 0% Bias, 100% Parsing)
// ============================================================================
function renderMinimalistTemplate(doc: jsPDF, data: ProfileData, language: Language, track: TrackType): void {
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 16;
  const contentWidth = pageWidth - 2 * margin; // 178mm

  let yPos = margin;
  let currentPage = 1;

  const addFooter = (pageNum: number) => {
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(`${sanitizeText(data.contact.name)} - Page ${pageNum}`, pageWidth / 2, pageHeight - 8, { align: 'center' });
  };

  const checkPageBreak = (neededHeight: number) => {
    if (yPos + neededHeight > pageHeight - 14) {
      addFooter(currentPage);
      doc.addPage();
      currentPage++;
      yPos = margin;
    }
  };

  // Pure ATS Section Header: Uppercase with thin solid 0.3mm rule
  const renderAtsHeader = (title: string) => {
    checkPageBreak(12);
    yPos += 2;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text(title.toUpperCase(), margin, yPos);

    doc.setDrawColor(71, 85, 105); // slate-600
    doc.setLineWidth(0.3);
    doc.line(margin, yPos + 1.5, margin + contentWidth, yPos + 1.5);
    yPos += 5.2;
  };

  // Clean Centered ATS Header (No photos, no colored banners)
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(sanitizeText(data.contact.name).toUpperCase(), pageWidth / 2, yPos, { align: 'center' });
  yPos += 5;

  const rawTitle = getLocalizedTitle(data.titles, track, language);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  doc.text(sanitizeText(rawTitle), pageWidth / 2, yPos, { align: 'center' });
  yPos += 4.5;

  doc.setFontSize(7.8);
  doc.setTextColor(71, 85, 105);
  const githubLink = (data.contact.githubUrl || 'https://github.com/faridmaloof/').replace('https://', '');
  const linkedinLink = (data.contact.linkedinUrl || 'https://linkedin.com/in/fmaloofs').replace('https://', '');
  const contactText = `${data.contact.email}  *  ${data.contact.phone}  *  ${sanitizeText(data.contact.location)}  *  ${githubLink}  *  ${linkedinLink}`;
  doc.text(contactText, pageWidth / 2, yPos, { align: 'center' });
  yPos += 5;

  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.line(margin, yPos, margin + contentWidth, yPos);
  yPos += 4;

  // Professional Summary
  renderAtsHeader(language === 'es' ? 'Resumen Profesional' : 'Professional Summary');
  doc.setFontSize(8.2);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 41, 59);
  const summaryText = sanitizeText(getLocalizedSummary(data.summary, track, language));
  const splitSummary = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(splitSummary, margin, yPos);
  yPos += splitSummary.length * 3.7 + 2;

  // Technical Core Competencies (ATS Inline comma list format)
  renderAtsHeader(language === 'es' ? 'Competencias Técnicas' : 'Technical Skills');
  const skills = getLocalizedSkills(data.skills, track, language);
  skills.forEach(([cat, tech]) => {
    checkPageBreak(5);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    const catLabel = `${sanitizeText(cat)}: `;
    const catW = doc.getTextWidth(catLabel);
    doc.text(catLabel, margin, yPos);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    const splitTech = doc.splitTextToSize(sanitizeText(tech), contentWidth - catW);
    doc.text(splitTech, margin + catW, yPos);
    yPos += splitTech.length * 3.5 + 0.8;
  });
  yPos += 2;

  // Experience
  renderAtsHeader(language === 'es' ? 'Experiencia Laboral' : 'Professional Experience');
  const experiences = data.experience.slice(0, 5);
  experiences.forEach((exp) => {
    const role = sanitizeText(getLocalizedRole(exp.role, track, language));
    const dates = sanitizeText(formatExperienceDates(exp.dates, language));
    const details = getLocalizedDetail(exp.detail, track, language);
    const company = sanitizeText(exp.company);
    const location = exp.location ? sanitizeText(exp.location) : '';

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    const datesW = doc.getTextWidth(dates);

    doc.setFontSize(8.8);
    doc.setFont('helvetica', 'bold');
    const splitRole = doc.splitTextToSize(role, contentWidth - datesW - 4);
    const splitBullets = details.map((b) => doc.splitTextToSize(`-  ${sanitizeText(b)}`, contentWidth - 4) as string[]);

    let expH = splitRole.length * 3.6 + 3.5;
    splitBullets.forEach(sb => { expH += sb.length * 3.5 + 0.5; });

    if (yPos + expH > pageHeight - 14 && yPos > margin + 20) {
      addFooter(currentPage);
      doc.addPage();
      currentPage++;
      yPos = margin;
    } else {
      checkPageBreak(15);
    }

    // Role & Dates
    doc.setFontSize(8.8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(splitRole, margin, yPos);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(dates, margin + contentWidth, yPos, { align: 'right' });
    yPos += splitRole.length * 3.6;

    // Company & Location
    doc.setFontSize(8.2);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(51, 65, 85);
    doc.text(company, margin, yPos);

    if (location) {
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 116, 139);
      doc.text(location, margin + contentWidth, yPos, { align: 'right' });
    }
    yPos += 3.5;

    // Bullets
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 41, 59);
    splitBullets.forEach((sb) => {
      checkPageBreak(sb.length * 3.5 + 0.8);
      doc.text(sb, margin + 2, yPos);
      yPos += sb.length * 3.5 + 0.5;
    });
    yPos += 2.5;
  });

  // Education
  renderAtsHeader(language === 'es' ? 'Educación' : 'Education');
  const eduList = data.education[language] || data.education.es || data.education.en || [];
  eduList.forEach((item) => {
    const tuple = item[language] || item.es || item.en;
    if (!tuple) return;
    const [inst, deg, dts, gpa] = tuple;
    checkPageBreak(7);

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(sanitizeText(deg), margin, yPos);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(sanitizeText(dts), margin + contentWidth, yPos, { align: 'right' });
    yPos += 3.5;

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    const gpaStr = gpa ? ` | ${sanitizeText(gpa)}` : '';
    doc.text(`${sanitizeText(inst)}${gpaStr}`, margin, yPos);
    yPos += 4.5;
  });

  // Certifications
  renderAtsHeader(language === 'es' ? 'Certificaciones' : 'Certifications');
  const featuredCerts = getFeaturedCertifications(track, 6);
  featuredCerts.forEach((cert) => {
    checkPageBreak(6.5);
    doc.setFontSize(8.2);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(`*  ${sanitizeText(cert.title)}`, margin, yPos);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const meta = `${sanitizeText(cert.issuer)} (${sanitizeText(cert.date)})`;
    doc.text(meta, margin + contentWidth, yPos, { align: 'right' });
    yPos += 3.8;
  });

  // Languages
  checkPageBreak(12);
  renderAtsHeader(language === 'es' ? 'Idiomas' : 'Languages');
  const languagesList = data.languages[language] || data.languages.es || data.languages.en || [];
  languagesList.forEach((langItem) => {
    checkPageBreak(4.5);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 41, 59);
    doc.text(`*  ${sanitizeText(langItem)}`, margin + 2, yPos);
    yPos += 3.8;
  });

  addFooter(currentPage);
}

// ============================================================================
// TEMPLATE 3: SIDEBAR SPLIT (Swiss 2-Column Layout: Sidebar 56mm | Main 124mm)
// ============================================================================
function renderSidebarTemplate(doc: jsPDF, data: ProfileData, language: Language, track: TrackType): void {
  const pageWidth = 210;
  const pageHeight = 297;
  const sidebarWidth = 60;
  const sidebarPadding = 7;
  const colWidth = sidebarWidth - (sidebarPadding * 2); // 46mm strictly bounded
  const mainX = sidebarWidth + 8; // 68mm
  const mainWidth = pageWidth - mainX - 10; // 132mm

  let currentPage = 1;

  const drawSidebarBackground = () => {
    doc.setFillColor(248, 250, 252); // slate-50
    doc.rect(0, 0, sidebarWidth, pageHeight, 'F');
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.4);
    doc.line(sidebarWidth, 0, sidebarWidth, pageHeight);
  };

  const addFooter = (pageNum: number) => {
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text(`${sanitizeText(data.contact.name)} | Page ${pageNum}`, mainX, pageHeight - 7);
  };

  drawSidebarBackground();

  // SIDEBAR CONTENT
  let sY = 14;
  drawAvatar(doc, data, (sidebarWidth - 28) / 2, sY, 28, [30, 41, 59]);
  sY += 34;

  const renderSidebarSectionHeader = (title: string) => {
    sY += 2;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59); // slate-800
    doc.text(title.toUpperCase(), sidebarPadding, sY);

    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(0.8);
    doc.line(sidebarPadding, sY + 1.5, sidebarWidth - sidebarPadding, sY + 1.5);
    sY += 4.5;
  };

  // Sidebar: Contact
  renderSidebarSectionHeader(language === 'es' ? 'Contacto' : 'Contact');
  doc.setFontSize(7.2);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);

  const contactItems = [
    data.contact.email,
    data.contact.phone,
    sanitizeText(data.contact.location),
    (data.contact.githubUrl || 'github.com/faridmaloof').replace('https://', ''),
    (data.contact.linkedinUrl || 'linkedin.com/in/fmaloofs').replace('https://', '')
  ];
  contactItems.forEach(ci => {
    const splitCi = doc.splitTextToSize(ci, colWidth);
    doc.text(splitCi, sidebarPadding, sY);
    sY += splitCi.length * 3.1 + 0.8;
  });
  sY += 2;

  // Sidebar: Skills
  renderSidebarSectionHeader(language === 'es' ? 'Habilidades Core' : 'Core Skills');
  const skills = getLocalizedSkills(data.skills, track, language);
  skills.slice(0, 5).forEach(([cat, tech]) => {
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    const splitCat = doc.splitTextToSize(sanitizeText(cat), colWidth);
    doc.text(splitCat, sidebarPadding, sY);
    sY += splitCat.length * 3.0 + 0.4;

    doc.setFontSize(6.8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const splitTech = doc.splitTextToSize(sanitizeText(tech), colWidth);
    doc.text(splitTech, sidebarPadding, sY);
    sY += splitTech.length * 2.8 + 1.6;
  });
  sY += 1;

  // Sidebar: Education
  renderSidebarSectionHeader(language === 'es' ? 'Educación' : 'Education');
  const eduList = data.education[language] || data.education.es || data.education.en || [];
  eduList.slice(0, 3).forEach((item) => {
    const tuple = item[language] || item.es || item.en;
    if (!tuple) return;
    const [inst, deg, dts] = tuple;
    
    // Degree title wrapped strictly to colWidth
    doc.setFontSize(7.2);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    const splitDeg = doc.splitTextToSize(sanitizeText(deg), colWidth);
    doc.text(splitDeg, sidebarPadding, sY);
    sY += splitDeg.length * 2.8 + 0.5;

    // Institution and dates wrapped strictly to colWidth
    doc.setFontSize(6.8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    const instAndDates = `${sanitizeText(inst)} (${sanitizeText(dts)})`;
    const splitInst = doc.splitTextToSize(instAndDates, colWidth);
    doc.text(splitInst, sidebarPadding, sY);
    sY += splitInst.length * 2.7 + 1.8;
  });

  // Sidebar: Languages
  renderSidebarSectionHeader(language === 'es' ? 'Idiomas' : 'Languages');
  const languagesList = data.languages[language] || data.languages.es || data.languages.en || [];
  languagesList.forEach(lang => {
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    const cleanLang = sanitizeText(lang);
    const splitLang = doc.splitTextToSize(cleanLang, colWidth - 4);
    drawBulletDot(doc, sidebarPadding + 1, sY, [37, 99, 235], 0.5);
    doc.text(splitLang, sidebarPadding + 3.5, sY);
    sY += splitLang.length * 2.8 + 1.4;
  });

  // MAIN COLUMN CONTENT
  let mY = 16;

  const renderMainSectionHeader = (title: string) => {
    if (mY + 12 > pageHeight - 15) {
      addFooter(currentPage);
      doc.addPage();
      currentPage++;
      drawSidebarBackground();
      mY = 16;
    }
    mY += 2;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(title.toUpperCase(), mainX, mY);

    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(1.0);
    doc.line(mainX, mY + 1.8, mainX + 28, mY + 1.8);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.35);
    doc.line(mainX + 28, mY + 1.8, mainX + mainWidth, mY + 1.8);
    mY += 5.5;
  };

  // Name & Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(sanitizeText(data.contact.name), mainX, mY);
  mY += 6;

  const rawTitle = getLocalizedTitle(data.titles, track, language);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(37, 99, 235);
  doc.text(sanitizeText(rawTitle), mainX, mY);
  mY += 6;

  // Summary
  renderMainSectionHeader(language === 'es' ? 'Perfil Profesional' : 'Professional Profile');
  doc.setFontSize(8.2);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  const summaryText = sanitizeText(getLocalizedSummary(data.summary, track, language));
  const splitSummary = doc.splitTextToSize(summaryText, mainWidth);
  doc.text(splitSummary, mainX, mY);
  mY += splitSummary.length * 3.6 + 4;

  // Experience
  renderMainSectionHeader(language === 'es' ? 'Trayectoria Profesional' : 'Work Experience');
  const experiences = data.experience.slice(0, 5);
  experiences.forEach((exp) => {
    const role = sanitizeText(getLocalizedRole(exp.role, track, language));
    const dates = sanitizeText(formatExperienceDates(exp.dates, language));
    const details = getLocalizedDetail(exp.detail, track, language);
    const company = sanitizeText(exp.company);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    const datesW = doc.getTextWidth(dates);

    doc.setFontSize(9);
    const splitRole = doc.splitTextToSize(role, mainWidth - datesW - 4);
    const splitBullets = details.map(b => doc.splitTextToSize(sanitizeText(b), mainWidth - 6) as string[]);

    let expH = splitRole.length * 3.6 + 3.5;
    splitBullets.forEach(sb => { expH += sb.length * 3.4 + 0.5; });

    if (mY + expH > pageHeight - 15 && mY > 30) {
      addFooter(currentPage);
      doc.addPage();
      currentPage++;
      drawSidebarBackground();
      mY = 16;
    }

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(splitRole, mainX, mY);

    doc.setFontSize(8);
    doc.setTextColor(37, 99, 235);
    doc.text(dates, mainX + mainWidth, mY, { align: 'right' });
    mY += splitRole.length * 3.6;

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(company, mainX, mY);
    mY += 3.5;

    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    splitBullets.forEach((sb) => {
      drawBulletDot(doc, mainX + 2, mY, [71, 85, 105]);
      doc.text(sb, mainX + 5, mY);
      mY += sb.length * 3.4 + 0.5;
    });
    mY += 3;
  });

  // Certifications
  renderMainSectionHeader(language === 'es' ? 'Certificaciones Principales' : 'Key Certifications');
  const featuredCerts = getFeaturedCertifications(track, 6);
  featuredCerts.forEach((cert) => {
    doc.setFontSize(8.2);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    const splitTitle = doc.splitTextToSize(`* ${sanitizeText(cert.title)}`, mainWidth);
    doc.text(splitTitle, mainX, mY);
    mY += splitTitle.length * 3.4;

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    const meta = `${sanitizeText(cert.issuer)} (${sanitizeText(cert.date)})${cert.credentialId ? ` | ID: ${sanitizeText(cert.credentialId)}` : ''}`;
    const splitMeta = doc.splitTextToSize(meta, mainWidth - 4);
    doc.text(splitMeta, mainX + 4, mY);
    mY += splitMeta.length * 3.3 + 1.2;
  });

  addFooter(currentPage);
}

// ============================================================================
// TEMPLATE 4: ENGINEERING QA (Precision Emerald/Teal Quality-First Specification)
// ============================================================================
function renderEngineeringTemplate(doc: jsPDF, data: ProfileData, language: Language, track: TrackType): void {
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - 2 * margin; // 182mm

  let yPos = margin;
  let currentPage = 1;

  const addFooter = (pageNum: number) => {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    const footerText = `${sanitizeText(data.contact.name)} - Engineering Quality Specification | ${pageNum}`;
    doc.text(footerText, pageWidth / 2, pageHeight - 7, { align: 'center' });
  };

  const checkPageBreak = (neededHeight: number) => {
    if (yPos + neededHeight > pageHeight - 15) {
      addFooter(currentPage);
      doc.addPage();
      currentPage++;
      yPos = margin + 2;
    }
  };

  const renderSectionHeader = (title: string) => {
    checkPageBreak(13);
    yPos += 2;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(13, 78, 62); // emerald-900 / teal-900
    doc.text(title.toUpperCase(), margin, yPos);

    doc.setDrawColor(204, 251, 241); // teal-100
    doc.setLineWidth(0.35);
    doc.line(margin, yPos + 1.8, margin + contentWidth, yPos + 1.8);

    doc.setDrawColor(13, 148, 136); // teal-600
    doc.setLineWidth(1.2);
    doc.line(margin, yPos + 1.8, margin + 30, yPos + 1.8);
    yPos += 5.8;
  };

  // Engineering Header with Avatar and Quality Card
  doc.setFillColor(13, 78, 62); // deep teal
  doc.rect(0, 0, pageWidth, 42, 'F');

  drawAvatar(doc, data, margin, 7, 26, [13, 148, 136]);

  const textX = margin + 31;
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(sanitizeText(data.contact.name), textX, 15);

  const rawTitle = getLocalizedTitle(data.titles, track, language);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(153, 246, 228); // teal-200
  doc.text(sanitizeText(rawTitle), textX, 22);

  doc.setFontSize(7.8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(240, 253, 250);
  const specPill = 'ISTQB Certified SDET | Shift-Left Automation | Performance & Resilient Microservices';
  doc.text(specPill, textX, 28);

  doc.setFontSize(7.5);
  doc.setTextColor(204, 251, 241);
  const githubLink = (data.contact.githubUrl || 'https://github.com/faridmaloof/').replace('https://', '');
  const linkedinLink = (data.contact.linkedinUrl || 'https://linkedin.com/in/fmaloofs').replace('https://', '');
  const contactLine = `${data.contact.email}  |  ${data.contact.phone}  |  ${sanitizeText(data.contact.location)}  |  ${githubLink}  |  ${linkedinLink}`;
  doc.text(contactLine, textX, 34);

  yPos = 47;

  // Summary
  renderSectionHeader(language === 'es' ? 'Declaración de Ingeniería de Calidad' : 'Quality Engineering Specification');
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  const summaryText = sanitizeText(getLocalizedSummary(data.summary, track, language));
  const splitSummary = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(splitSummary, margin, yPos);
  yPos += splitSummary.length * 3.8 + 2.5;

  // Skills
  renderSectionHeader(language === 'es' ? 'Matriz Técnica de Automatización & Arquitectura' : 'Technical Automation Matrix');
  const skills = getLocalizedSkills(data.skills, track, language);
  const catColWidth = 52;
  const techColWidth = contentWidth - catColWidth - 2;

  skills.forEach(([category, tech]) => {
    doc.setFontSize(8.2);
    doc.setFont('helvetica', 'bold');
    const splitCat = doc.splitTextToSize(`${sanitizeText(category)}:`, catColWidth - 3);

    doc.setFont('helvetica', 'normal');
    const splitTech = doc.splitTextToSize(sanitizeText(tech), techColWidth);
    const rowHeight = Math.max(splitCat.length, splitTech.length) * 3.6 + 1.0;
    checkPageBreak(rowHeight);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(13, 78, 62);
    doc.text(splitCat, margin, yPos);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(splitTech, margin + catColWidth, yPos);
    yPos += rowHeight;
  });
  yPos += 2;

  // Experience with Core Stack tags
  renderSectionHeader(language === 'es' ? 'Trayectoria & Sistemas Validados' : 'Verified Engineering Track Record');
  const experiences = data.experience.slice(0, 5);
  experiences.forEach((exp) => {
    const role = sanitizeText(getLocalizedRole(exp.role, track, language));
    const dates = sanitizeText(formatExperienceDates(exp.dates, language));
    const details = getLocalizedDetail(exp.detail, track, language);
    const modality = sanitizeText(formatModality(exp.modality, language));

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    const datesWidth = doc.getTextWidth(dates);
    const maxRoleWidth = contentWidth - datesWidth - 4;

    doc.setFontSize(9);
    const splitRole = doc.splitTextToSize(role, maxRoleWidth);
    const splitBullets = details.map((b) => doc.splitTextToSize(sanitizeText(b), contentWidth - 6) as string[]);

    let totalH = splitRole.length * 3.8 + 7.5;
    splitBullets.forEach(sb => { totalH += sb.length * 3.6 + 0.6; });

    if (yPos + totalH > pageHeight - 15 && yPos > margin + 25) {
      addFooter(currentPage);
      doc.addPage();
      currentPage++;
      yPos = margin + 2;
    } else {
      checkPageBreak(18);
    }

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(13, 78, 62);
    doc.text(splitRole, margin, yPos);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(13, 148, 136);
    doc.text(dates, margin + contentWidth, yPos, { align: 'right' });
    yPos += splitRole.length * 3.8;

    doc.setFontSize(8.2);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    const modalityStr = modality ? ` [${modality}]` : '';
    const companyLoc = exp.location 
      ? `${sanitizeText(exp.company)}${modalityStr}  -  ${sanitizeText(exp.location)}` 
      : `${sanitizeText(exp.company)}${modalityStr}`;
    doc.text(companyLoc, margin, yPos);
    yPos += 3.5;

    // Tech stack tag row
    if (exp.technologies && exp.technologies.length > 0) {
      doc.setFontSize(7.2);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(13, 148, 136);
      const techList = exp.technologies.slice(0, 8).join('  *  ');
      doc.text(`[Stack: ${techList}]`, margin + 2, yPos);
      yPos += 3.5;
    }

    doc.setFontSize(8.2);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    splitBullets.forEach((sb) => {
      checkPageBreak(sb.length * 3.6 + 1.0);
      drawBulletDot(doc, margin + 2, yPos, [13, 148, 136]);
      doc.text(sb, margin + 5, yPos);
      yPos += sb.length * 3.6 + 0.6;
    });
    yPos += 2.5;
  });

  // Certifications
  renderSectionHeader(language === 'es' ? 'Certificaciones & Acreditaciones Técnicas' : 'Key Certifications & Accreditations');
  const featuredCerts = getFeaturedCertifications(track, 6);
  featuredCerts.forEach((cert) => {
    checkPageBreak(9);
    const hasUrl = Boolean(cert.url);
    const linkBadge = hasUrl ? ' [Ver Credencial]' : '';
    const cleanTitle = `${sanitizeText(cert.title)}${linkBadge}`;
    const certMeta = cert.credentialId 
      ? `${sanitizeText(cert.issuer)} (${sanitizeText(cert.date)}) | ID: ${sanitizeText(cert.credentialId)}` 
      : `${sanitizeText(cert.issuer)} (${sanitizeText(cert.date)})`;

    doc.setFontSize(8.3);
    doc.setFont('helvetica', 'bold');
    const splitTitle = doc.splitTextToSize(cleanTitle, contentWidth - 6);

    drawBulletDot(doc, margin + 1.5, yPos, [13, 148, 136]);

    if (hasUrl && cert.url) {
      doc.setTextColor(13, 148, 136);
      doc.text(splitTitle, margin + 4.5, yPos);
      doc.link(margin + 4.5, yPos - 3, contentWidth - 6, splitTitle.length * 3.7, { url: cert.url });
    } else {
      doc.setTextColor(13, 78, 62);
      doc.text(splitTitle, margin + 4.5, yPos);
    }
    yPos += splitTitle.length * 3.7;

    doc.setFontSize(7.8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(certMeta, margin + 4.5, yPos);
    yPos += 4.0;
  });

  // Education & Languages
  renderSectionHeader(language === 'es' ? 'Educación & Idiomas' : 'Education & Languages');
  const eduList = data.education[language] || data.education.es || data.education.en || [];
  eduList.slice(0, 3).forEach((item) => {
    const tuple = item[language] || item.es || item.en;
    if (!tuple) return;
    const [inst, deg, dts] = tuple;

    const cleanDeg = sanitizeText(deg);
    const cleanDts = sanitizeText(dts);
    const cleanInst = sanitizeText(inst);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    const dtsW = doc.getTextWidth(cleanDts);
    const maxDegW = contentWidth - dtsW - 4;

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(13, 78, 62);
    const splitDeg = doc.splitTextToSize(cleanDeg, maxDegW);
    checkPageBreak(splitDeg.length * 3.5 + 5.0);
    doc.text(splitDeg, margin, yPos);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(13, 148, 136);
    doc.text(cleanDts, margin + contentWidth, yPos, { align: 'right' });
    yPos += splitDeg.length * 3.5;

    doc.setFontSize(7.8);
    doc.setTextColor(71, 85, 105);
    const splitInst = doc.splitTextToSize(cleanInst, contentWidth);
    doc.text(splitInst, margin, yPos);
    yPos += splitInst.length * 3.3 + 1.8;
  });

  const languagesList = data.languages[language] || data.languages.es || data.languages.en || [];
  languagesList.forEach((langItem) => {
    const cleanLang = sanitizeText(langItem);
    const splitLang = doc.splitTextToSize(cleanLang, contentWidth - 6);
    checkPageBreak(splitLang.length * 3.5 + 1.0);
    drawBulletDot(doc, margin + 1.5, yPos, [13, 148, 136]);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    doc.text(splitLang, margin + 4.5, yPos);
    yPos += splitLang.length * 3.5 + 0.8;
  });

  addFooter(currentPage);
}

// ============================================================================
// TEMPLATE 5: NORDIC COMPACT (Silicon Valley High-Density 2-Page CV)
// ============================================================================
function renderCompactTemplate(doc: jsPDF, data: ProfileData, language: Language, track: TrackType): void {
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 12;
  const contentWidth = pageWidth - 2 * margin; // 186mm

  let yPos = margin;
  let currentPage = 1;

  const addFooter = (pageNum: number) => {
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text(`${sanitizeText(data.contact.name)} | High-Density CV | Page ${pageNum}`, pageWidth / 2, pageHeight - 6, { align: 'center' });
  };

  const checkPageBreak = (neededHeight: number) => {
    if (yPos + neededHeight > pageHeight - 12) {
      addFooter(currentPage);
      doc.addPage();
      currentPage++;
      yPos = margin;
    }
  };

  const renderSectionHeader = (title: string) => {
    checkPageBreak(10);
    yPos += 1.5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59); // slate-800
    doc.text(title.toUpperCase(), margin, yPos);

    doc.setDrawColor(99, 102, 241); // indigo-500
    doc.setLineWidth(0.8);
    doc.line(margin, yPos + 1.2, margin + 22, yPos + 1.2);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin + 22, yPos + 1.2, margin + contentWidth, yPos + 1.2);
    yPos += 4.5;
  };

  // Compact Header
  drawAvatar(doc, data, margin, yPos, 18, [79, 70, 229]);

  const textX = margin + 22;
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(sanitizeText(data.contact.name), textX, yPos + 5);

  const rawTitle = getLocalizedTitle(data.titles, track, language);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(79, 70, 229); // indigo-600
  doc.text(sanitizeText(rawTitle), textX, yPos + 10);

  doc.setFontSize(7.2);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  const githubLink = (data.contact.githubUrl || 'https://github.com/faridmaloof/').replace('https://', '');
  const linkedinLink = (data.contact.linkedinUrl || 'https://linkedin.com/in/fmaloofs').replace('https://', '');
  const contactText = `${data.contact.email}  *  ${data.contact.phone}  *  ${sanitizeText(data.contact.location)}  *  ${githubLink}  *  ${linkedinLink}`;
  doc.text(contactText, textX, yPos + 15);
  yPos += 22;

  // Summary
  renderSectionHeader(language === 'es' ? 'Resumen Ejecutivo' : 'Executive Summary');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  const summaryText = sanitizeText(getLocalizedSummary(data.summary, track, language));
  const splitSummary = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(splitSummary, margin, yPos);
  yPos += splitSummary.length * 3.4 + 2;

  // Skills
  renderSectionHeader(language === 'es' ? 'Stack Tecnológico' : 'Tech Stack');
  const skills = getLocalizedSkills(data.skills, track, language);
  const catColWidth = 48;
  const techColWidth = contentWidth - catColWidth - 2;

  skills.forEach(([category, tech]) => {
    doc.setFontSize(7.8);
    doc.setFont('helvetica', 'bold');
    const splitCat = doc.splitTextToSize(`${sanitizeText(category)}:`, catColWidth - 2);

    doc.setFont('helvetica', 'normal');
    const splitTech = doc.splitTextToSize(sanitizeText(tech), techColWidth);
    const rowHeight = Math.max(splitCat.length, splitTech.length) * 3.2 + 0.8;
    checkPageBreak(rowHeight);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(splitCat, margin, yPos);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(splitTech, margin + catColWidth, yPos);
    yPos += rowHeight;
  });
  yPos += 2;

  // Experience
  renderSectionHeader(language === 'es' ? 'Experiencia Profesional' : 'Experience');
  const experiences = data.experience.slice(0, 5);
  experiences.forEach((exp) => {
    const role = sanitizeText(getLocalizedRole(exp.role, track, language));
    const dates = sanitizeText(formatExperienceDates(exp.dates, language));
    const details = getLocalizedDetail(exp.detail, track, language);
    const company = sanitizeText(exp.company);

    doc.setFontSize(7.8);
    doc.setFont('helvetica', 'bold');
    const datesW = doc.getTextWidth(dates);

    doc.setFontSize(8.5);
    const splitRole = doc.splitTextToSize(role, contentWidth - datesW - 4);
    const splitBullets = details.map((b) => doc.splitTextToSize(sanitizeText(b), contentWidth - 5) as string[]);

    let expH = splitRole.length * 3.4 + 3.2;
    splitBullets.forEach(sb => { expH += sb.length * 3.2 + 0.4; });

    if (yPos + expH > pageHeight - 12 && yPos > margin + 20) {
      addFooter(currentPage);
      doc.addPage();
      currentPage++;
      yPos = margin;
    }

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(splitRole, margin, yPos);

    doc.setFontSize(7.8);
    doc.setTextColor(79, 70, 229);
    doc.text(dates, margin + contentWidth, yPos, { align: 'right' });
    yPos += splitRole.length * 3.4;

    doc.setFontSize(7.8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(company, margin, yPos);
    yPos += 3.2;

    doc.setFontSize(7.8);
    doc.setTextColor(51, 65, 85);
    splitBullets.forEach((sb) => {
      checkPageBreak(sb.length * 3.2 + 0.6);
      drawBulletDot(doc, margin + 1.5, yPos, [79, 70, 229], 0.55);
      doc.text(sb, margin + 4.5, yPos);
      yPos += sb.length * 3.2 + 0.4;
    });
    yPos += 2;
  });

  // Certifications
  renderSectionHeader(language === 'es' ? 'Certificaciones' : 'Certifications');
  const featuredCerts = getFeaturedCertifications(track, 6);
  featuredCerts.forEach((cert) => {
    checkPageBreak(6.5);
    doc.setFontSize(7.8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(`* ${sanitizeText(cert.title)}`, margin, yPos);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(`${sanitizeText(cert.issuer)} (${sanitizeText(cert.date)})`, margin + contentWidth, yPos, { align: 'right' });
    yPos += 3.5;
  });

  // Education & Languages
  renderSectionHeader(language === 'es' ? 'Educación & Idiomas' : 'Education & Languages');
  const eduList = data.education[language] || data.education.es || data.education.en || [];
  eduList.slice(0, 3).forEach((item) => {
    const tuple = item[language] || item.es || item.en;
    if (!tuple) return;
    const [inst, deg, dts] = tuple;

    const cleanDeg = sanitizeText(deg);
    const cleanDts = sanitizeText(dts);
    const cleanInst = sanitizeText(inst);

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    const dtsW = doc.getTextWidth(cleanDts);
    const maxDegW = contentWidth - dtsW - 4;

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    const splitDeg = doc.splitTextToSize(cleanDeg, maxDegW);
    checkPageBreak(splitDeg.length * 3.3 + 4.5);
    doc.text(splitDeg, margin, yPos);

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(79, 70, 229);
    doc.text(cleanDts, margin + contentWidth, yPos, { align: 'right' });
    yPos += splitDeg.length * 3.3;

    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    const splitInst = doc.splitTextToSize(cleanInst, contentWidth);
    doc.text(splitInst, margin, yPos);
    yPos += splitInst.length * 3.0 + 1.5;
  });

  const languagesList = data.languages[language] || data.languages.es || data.languages.en || [];
  languagesList.forEach((langItem) => {
    const cleanLang = sanitizeText(langItem);
    const splitLang = doc.splitTextToSize(cleanLang, contentWidth - 6);
    checkPageBreak(splitLang.length * 3.2 + 0.8);
    drawBulletDot(doc, margin + 1.5, yPos, [79, 70, 229], 0.5);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    doc.text(splitLang, margin + 4, yPos);
    yPos += splitLang.length * 3.2 + 0.6;
  });

  addFooter(currentPage);
}

// ============================================================================
// MAIN GENERATOR DISPATCHER
// ============================================================================
export function generatePDF(
  data: ProfileData, 
  language: Language, 
  track: TrackType = 'combined', 
  template: CVTemplateType = 'executive'
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  switch (template) {
    case 'minimalist':
      renderMinimalistTemplate(doc, data, language, track);
      break;
    case 'sidebar':
      renderSidebarTemplate(doc, data, language, track);
      break;
    case 'engineering':
      renderEngineeringTemplate(doc, data, language, track);
      break;
    case 'compact':
      renderCompactTemplate(doc, data, language, track);
      break;
    case 'executive':
    default:
      renderExecutiveTemplate(doc, data, language, track);
      break;
  }

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

  const filename = `CV-Farid-Maloof-${template.toUpperCase()}-${trackSuffix}-${language.toUpperCase()}.pdf`;
  doc.save(filename);
}
