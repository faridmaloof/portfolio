import type { ProfileData, Language, TrackType, Experience } from '../types';
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

export function generatePDF(data: ProfileData, language: Language, track: TrackType = 'combined'): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const margin = 14;
  const contentWidth = pageWidth - 2 * margin; // 182mm

  let yPos = margin;
  let currentPage = 1;

  // Helper to add clean footer with page numbers
  const addFooter = (pageNum: number) => {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184); // slate-400
    const footerText = `${sanitizeText(data.contact.name)} - Curriculum Vitae | ${pageNum}`;
    doc.text(footerText, pageWidth / 2, pageHeight - 7, { align: 'center' });
  };

  // Helper to check page break and handle page numbering cleanly
  const checkPageBreak = (neededHeight: number) => {
    if (yPos + neededHeight > pageHeight - 15) {
      addFooter(currentPage);
      doc.addPage();
      currentPage++;
      yPos = margin + 2;
    }
  };

  // Helper to draw a crisp vector bullet dot (no reliance on font encoding)
  const drawBulletDot = (x: number, y: number, color: [number, number, number] = [71, 85, 105]) => {
    doc.setFillColor(color[0], color[1], color[2]);
    doc.circle(x, y - 1.0, 0.65, 'F');
  };

  // Section Header helper with modern accent underline
  const renderSectionHeader = (title: string) => {
    checkPageBreak(13);
    yPos += 2;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text(title.toUpperCase(), margin, yPos);

    // Modern thin divider line with colored accent bar
    doc.setDrawColor(203, 213, 225); // slate-300
    doc.setLineWidth(0.35);
    doc.line(margin, yPos + 1.8, margin + contentWidth, yPos + 1.8);

    doc.setDrawColor(37, 99, 235); // blue-600 accent
    doc.setLineWidth(1.1);
    doc.line(margin, yPos + 1.8, margin + 26, yPos + 1.8);

    yPos += 5.8;
  };

  // ==================== HEADER SECTION ====================
  // Dark Navy banner for executive contrast
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 40, 'F');

  // Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(19);
  doc.setFont('helvetica', 'bold');
  doc.text(sanitizeText(data.contact.name), margin, 14);

  // Dynamic Title based on active track
  const rawTitle = getLocalizedTitle(data.titles, track, language);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(147, 197, 253); // blue-300
  doc.text(sanitizeText(rawTitle), margin, 21);

  // Subtitle / Experience Highlights badge
  doc.setFontSize(8.2);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(226, 232, 240); // slate-200
  const expPill = language === 'es' 
    ? '15+ Años de Experiencia | ISTQB Certified | Arquitectura QA & Desarrollo Full Stack' 
    : language === 'pt'
    ? '15+ Anos de Experiência | ISTQB Certified | Arquitetura QA e Desenvolvimento Full Stack'
    : '15+ Years Experience | ISTQB Certified | QA Architecture & Full Stack Engineering';
  doc.text(expPill, margin, 26.8);

  // Contact line with GitHub & LinkedIn (pure ASCII characters to prevent corruption)
  doc.setFontSize(7.8);
  doc.setTextColor(203, 213, 225); // slate-300
  const githubLink = (data.contact.githubUrl || 'https://github.com/faridmaloof/').replace('https://', '');
  const linkedinLink = (data.contact.linkedinUrl || 'https://linkedin.com/in/fmaloofs').replace('https://', '');
  const contactLine = `${data.contact.email}   |   ${data.contact.phone}   |   ${sanitizeText(data.contact.location)}   |   ${githubLink}   |   ${linkedinLink}`;
  doc.text(contactLine, margin, 33.5);

  yPos = 45;

  // ==================== PROFESSIONAL SUMMARY ====================
  const summaryHeading = language === 'es' 
    ? 'Resumen Profesional Ejecutivo' 
    : language === 'pt' 
    ? 'Resumo Profissional Executivo' 
    : 'Executive Professional Summary';
  renderSectionHeader(summaryHeading);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85); // slate-700
  const summaryText = sanitizeText(getLocalizedSummary(data.summary, track, language));
  const splitSummary = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(splitSummary, margin, yPos);
  yPos += splitSummary.length * 3.8 + 2.5;

  // ==================== TECHNICAL SKILLS & STACK ====================
  // Fixed two-column layout: Left column for Category, Right column for Skills list
  const skillsHeading = language === 'es' 
    ? 'Competencias Técnicas y Tecnologías' 
    : language === 'pt' 
    ? 'Competências Técnicas e Tecnologias' 
    : 'Technical Core Competencies';
  renderSectionHeader(skillsHeading);

  const skills = getLocalizedSkills(data.skills, track, language);
  const catColWidth = 50; // Fixed reserved width for category label
  const techColWidth = contentWidth - catColWidth - 2; // Reserved width for technologies (130mm)

  skills.forEach(([category, tech]) => {
    doc.setFontSize(8.2);
    doc.setFont('helvetica', 'bold');
    const cleanCat = `${sanitizeText(category)}:`;
    const splitCat = doc.splitTextToSize(cleanCat, catColWidth - 3);

    doc.setFont('helvetica', 'normal');
    const cleanTech = sanitizeText(tech);
    const splitTech = doc.splitTextToSize(cleanTech, techColWidth);

    const rowLines = Math.max(splitCat.length, splitTech.length);
    const rowHeight = rowLines * 3.6 + 1.0;

    checkPageBreak(rowHeight);

    // Render category on left column
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59); // slate-800
    doc.text(splitCat, margin, yPos);

    // Render technologies on right column (zero overlap)
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105); // slate-600
    doc.text(splitTech, margin + catColWidth, yPos);

    yPos += rowHeight;
  });
  yPos += 2;

  // ==================== WORK EXPERIENCE ====================
  // Atomic block paging to avoid broken cards or orphaned bullets across page boundaries
  const expHeading = language === 'es' 
    ? 'Experiencia Laboral Relevante' 
    : language === 'pt' 
    ? 'Experiência Profissional Relevante' 
    : 'Relevant Professional Experience';
  renderSectionHeader(expHeading);

  // Helper to measure full height of an experience item
  const measureExperienceHeight = (exp: Experience): {
    totalHeight: number;
    splitRole: string[];
    splitDesc: string[];
    splitBullets: string[][];
  } => {
    const role = sanitizeText(getLocalizedRole(exp.role, track, language));
    const dates = sanitizeText(formatExperienceDates(exp.dates, language));
    const details = getLocalizedDetail(exp.detail, track, language);
    const companyDesc = sanitizeText(getLocalizedText(exp.companyDescription, language));

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    const datesWidth = doc.getTextWidth(dates);
    const maxRoleWidth = contentWidth - datesWidth - 4;

    doc.setFontSize(9);
    const splitRole = doc.splitTextToSize(role, maxRoleWidth);

    let totalHeight = splitRole.length * 3.8 + 3.5; // Role + Company row

    const splitDesc: string[] = [];
    if (companyDesc) {
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'italic');
      const descLines = doc.splitTextToSize(companyDesc, contentWidth - 4) as string[];
      splitDesc.push(...descLines);
      totalHeight += descLines.length * 3.3 + 1.0;
    }

    doc.setFontSize(8.2);
    doc.setFont('helvetica', 'normal');
    const splitBullets = details.map((b) => doc.splitTextToSize(sanitizeText(b), contentWidth - 6) as string[]);
    splitBullets.forEach((sb) => {
      totalHeight += sb.length * 3.6 + 0.6;
    });

    totalHeight += 3.5; // Bottom margin between cards
    return { totalHeight, splitRole, splitDesc, splitBullets };
  };

  const experiences = data.experience.slice(0, 5);

  experiences.forEach((exp) => {
    const dates = sanitizeText(formatExperienceDates(exp.dates, language));
    const modality = sanitizeText(formatModality(exp.modality, language));
    const { totalHeight, splitRole, splitDesc, splitBullets } = measureExperienceHeight(exp);

    // Atomic block page-break: if the full experience block doesn't fit and we're not at top of page,
    // move the ENTIRE experience block cleanly to the next page.
    if (yPos + totalHeight > pageHeight - 15 && yPos > margin + 25) {
      addFooter(currentPage);
      doc.addPage();
      currentPage++;
      yPos = margin + 2;
    } else {
      checkPageBreak(18);
    }

    // Role & Dates header row
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text(splitRole, margin, yPos);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(37, 99, 235); // blue-600
    doc.text(dates, margin + contentWidth, yPos, { align: 'right' });
    yPos += splitRole.length * 3.8;

    // Company & Location with Modality badge
    doc.setFontSize(8.2);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85); // slate-700
    const modalityStr = modality ? ` [${modality}]` : '';
    const companyLoc = exp.location 
      ? `${sanitizeText(exp.company)}${modalityStr}  -  ${sanitizeText(exp.location)}` 
      : `${sanitizeText(exp.company)}${modalityStr}`;
    doc.text(companyLoc, margin, yPos);
    yPos += 3.5;

    // Company brief description if present
    if (splitDesc.length > 0) {
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 116, 139); // slate-500
      doc.text(splitDesc, margin + 2, yPos);
      yPos += splitDesc.length * 3.3 + 1.0;
    }

    // Bullet points with crisp native vector dots
    doc.setFontSize(8.2);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85); // slate-700

    splitBullets.forEach((splitBullet) => {
      checkPageBreak(splitBullet.length * 3.6 + 1.0);
      drawBulletDot(margin + 2, yPos, [71, 85, 105]);
      doc.text(splitBullet, margin + 5, yPos);
      yPos += splitBullet.length * 3.6 + 0.6;
    });

    yPos += 2.5;
  });

  // ==================== FEATURED CERTIFICATIONS ====================
  // Uniform 2-line executive layout:
  // Line 1: Title in bold with verification link
  // Line 2: Indented Issuer | Date | ID in muted text
  const certsHeading = language === 'es' 
    ? 'Certificaciones & Licencias Profesionales Destacadas' 
    : language === 'pt' 
    ? 'Certificações e Licenças Profissionais' 
    : 'Key Professional Certifications & Accreditations';
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

    // Vector bullet dot
    drawBulletDot(margin + 1.5, yPos, hasUrl ? [37, 99, 235] : [71, 85, 105]);

    // Title line
    if (hasUrl && cert.url) {
      doc.setTextColor(29, 78, 216); // blue-700
      doc.text(splitTitle, margin + 4.5, yPos);
      doc.link(margin + 4.5, yPos - 3, contentWidth - 6, splitTitle.length * 3.7, { url: cert.url });
    } else {
      doc.setTextColor(15, 23, 42); // slate-900
      doc.text(splitTitle, margin + 4.5, yPos);
    }
    yPos += splitTitle.length * 3.7;

    // Sub-row: Issuer | Date | Credential ID
    doc.setFontSize(7.8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139); // slate-500
    doc.text(certMeta, margin + 4.5, yPos);
    yPos += 4.0;
  });

  // Full LinkedIn Certifications Redirection Link Box (100% compatible vector styling, no broken glyphs)
  const linkedinAllCertsUrl = 'https://www.linkedin.com/in/fmaloofs/details/certifications/';
  checkPageBreak(11);
  yPos += 1;
  
  // Clean clickable banner for LinkedIn certifications
  doc.setFillColor(239, 246, 255); // blue-50
  doc.setDrawColor(191, 219, 254); // blue-200
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, yPos, contentWidth, 8, 2, 2, 'FD');

  // Small brand badge inside banner
  doc.setFillColor(37, 99, 235); // blue-600
  doc.roundedRect(margin + 2.5, yPos + 1.6, 7.5, 4.8, 1, 1, 'F');
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('in', margin + 6.2, yPos + 5.0, { align: 'center' });
  
  doc.setFontSize(7.8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(29, 78, 216); // blue-700
  const linkedinText = language === 'es'
    ? 'Ver catálogo completo (+120 certificaciones oficiales verificadas) en LinkedIn  [Abrir enlace]'
    : language === 'pt'
    ? 'Ver catálogo completo (+120 certificações oficiais verificadas) no LinkedIn  [Abrir link]'
    : 'View full catalog of 120+ official verified certifications on LinkedIn  [Open Link]';
  doc.text(linkedinText, margin + 13, yPos + 5.2);
  doc.link(margin, yPos, contentWidth, 8, { url: linkedinAllCertsUrl });
  yPos += 10.5;

  // ==================== EDUCATION ====================
  const eduHeading = language === 'es' 
    ? 'Educación Universitaria y Posgrados' 
    : language === 'pt' 
    ? 'Educação Superior e Pós-graduação' 
    : 'Higher Education & Postgraduates';
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

    doc.setTextColor(15, 23, 42); // slate-900
    doc.text(splitDegree, margin, yPos);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(37, 99, 235); // blue-600
    doc.text(cleanDates, margin + contentWidth, yPos, { align: 'right' });
    yPos += splitDegree.length * 3.7;

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105); // slate-600
    const gpaText = gpa ? ` | ${sanitizeText(gpa)}` : '';
    doc.text(`${cleanInst}${gpaText}`, margin, yPos);
    yPos += 4.8;
  });

  // ==================== LANGUAGES ====================
  // Rendered as 3 distinct, bounded bullet points to strictly prevent border overflow
  checkPageBreak(18);
  const langHeading = language === 'es' ? 'Idiomas' : language === 'pt' ? 'Idiomas' : 'Languages';
  renderSectionHeader(langHeading);

  const languagesList = data.languages[language] || data.languages.es || data.languages.en || [];
  
  languagesList.forEach((langItem) => {
    checkPageBreak(5);
    const cleanLang = sanitizeText(langItem);
    
    // Vector bullet dot
    drawBulletDot(margin + 1.5, yPos, [37, 99, 235]);

    doc.setFontSize(8.2);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85); // slate-700
    
    // Strict width wrap to guarantee it never touches or exceeds the right margin
    const splitLang = doc.splitTextToSize(cleanLang, contentWidth - 6);
    doc.text(splitLang, margin + 4.5, yPos);
    yPos += splitLang.length * 3.8 + 0.8;
  });

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
