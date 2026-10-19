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

  // Helper to add clean footer with page numbers
  const addFooter = (pageNum: number) => {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184); // slate-400
    const footerText = `${data.contact.name} — Curriculum Vitae | ${pageNum}`;
    doc.text(footerText, pageWidth / 2, pageHeight - 8, { align: 'center' });
  };

  // Helper to check page break and handle page numbering
  const checkPageBreak = (neededHeight: number) => {
    if (yPos + neededHeight > pageHeight - 16) {
      addFooter(currentPage);
      doc.addPage();
      currentPage++;
      yPos = margin + 4;
    }
  };

  // Section Header helper with modern accent underline
  const renderSectionHeader = (title: string) => {
    checkPageBreak(14);
    yPos += 2.5;
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

    yPos += 6.5;
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
    : language === 'pt'
    ? '15+ Anos de Experiência | ISTQB Certified | Arquitetura QA e Desenvolvimento Full Stack'
    : '15+ Years Experience | ISTQB Certified | QA Architecture & Full Stack Engineering';
  doc.text(expPill, margin, 28);

  // Contact line with GitHub & LinkedIn (pure ASCII characters to prevent corruption)
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225); // slate-300
  const githubLink = data.contact.githubUrl || 'https://github.com/faridmaloof/';
  const linkedinLink = data.contact.linkedinUrl || 'https://linkedin.com/in/fmaloofs';
  const contactLine = `${data.contact.email}   |   ${data.contact.phone}   |   ${data.contact.location}   |   ${githubLink.replace('https://', '')}   |   ${linkedinLink.replace('https://', '')}`;
  doc.text(contactLine, margin, 35);

  yPos = 48;

  // ==================== PROFESSIONAL SUMMARY ====================
  const summaryHeading = language === 'es' 
    ? 'Resumen Profesional Ejecutivo' 
    : language === 'pt' 
    ? 'Resumo Profissional Executivo' 
    : 'Executive Professional Summary';
  renderSectionHeader(summaryHeading);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85); // slate-700
  const summaryText = getLocalizedSummary(data.summary, track, language);
  const splitSummary = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(splitSummary, margin, yPos);
  yPos += splitSummary.length * 4.2 + 3.5;

  // ==================== TECHNICAL SKILLS & STACK ====================
  // Fixed two-column layout: Left column for Category, Right column for Skills list
  const skillsHeading = language === 'es' 
    ? 'Competencias Técnicas y Tecnologías' 
    : language === 'pt' 
    ? 'Competências Técnicas e Tecnologias' 
    : 'Technical Core Competencies';
  renderSectionHeader(skillsHeading);

  const skills = getLocalizedSkills(data.skills, track, language);
  const catColWidth = 52; // Fixed reserved width for category label
  const techColWidth = contentWidth - catColWidth - 2; // Reserved width for technologies

  skills.forEach(([category, tech]) => {
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    const splitCat = doc.splitTextToSize(`${category}:`, catColWidth - 3);

    doc.setFont('helvetica', 'normal');
    const splitTech = doc.splitTextToSize(tech, techColWidth);

    const rowLines = Math.max(splitCat.length, splitTech.length);
    const rowHeight = rowLines * 3.8 + 1.2;

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
  yPos += 2.5;

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
    splitDesc: string[] | null;
    splitBullets: string[][];
  } => {
    const role = getLocalizedRole(exp.role, track, language);
    const dates = formatExperienceDates(exp.dates, language);
    const details = getLocalizedDetail(exp.detail, track, language);
    const companyDesc = getLocalizedText(exp.companyDescription, language);

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    const datesWidth = doc.getTextWidth(dates);
    const maxRoleWidth = contentWidth - datesWidth - 4;

    doc.setFontSize(9.5);
    const splitRole = doc.splitTextToSize(role, maxRoleWidth);

    let totalHeight = splitRole.length * 4.2 + 3.8; // Role + Company row

    const splitDesc: string[] = [];
    if (companyDesc) {
      doc.setFontSize(7.8);
      doc.setFont('helvetica', 'italic');
      const descLines = doc.splitTextToSize(companyDesc, contentWidth - 4) as string[];
      splitDesc.push(...descLines);
      totalHeight += descLines.length * 3.6 + 1.2;
    }

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    const splitBullets = details.map((b) => doc.splitTextToSize(`•  ${b}`, contentWidth - 4) as string[]);
    splitBullets.forEach((sb) => {
      totalHeight += sb.length * 4.0;
    });

    totalHeight += 4; // Bottom margin between cards
    return { totalHeight, splitRole, splitDesc, splitBullets };
  };

  const experiences = data.experience.slice(0, 5);

  experiences.forEach((exp) => {
    const dates = formatExperienceDates(exp.dates, language);
    const modality = formatModality(exp.modality, language);
    const { totalHeight, splitRole, splitDesc, splitBullets } = measureExperienceHeight(exp);

    // Atomic block page-break: if the full experience block doesn't fit and we're not at top of page,
    // move the ENTIRE experience block cleanly to the next page.
    if (yPos + totalHeight > pageHeight - 16 && yPos > margin + 25) {
      addFooter(currentPage);
      doc.addPage();
      currentPage++;
      yPos = margin + 4;
    } else {
      checkPageBreak(20);
    }

    // Role & Dates header row
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text(splitRole, margin, yPos);

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(37, 99, 235); // blue-600
    doc.text(dates, margin + contentWidth, yPos, { align: 'right' });
    yPos += splitRole.length * 4.2;

    // Company & Location with Modality badge
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85); // slate-700
    const modalityStr = modality ? ` [${modality}]` : '';
    const companyLoc = exp.location 
      ? `${exp.company}${modalityStr}  —  ${exp.location}` 
      : `${exp.company}${modalityStr}`;
    doc.text(companyLoc, margin, yPos);
    yPos += 3.8;

    // Company brief description if present
    if (splitDesc && splitDesc.length > 0) {
      doc.setFontSize(7.8);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 116, 139); // slate-500
      doc.text(splitDesc, margin + 2, yPos);
      yPos += splitDesc.length * 3.6 + 1.2;
    }

    // Bullet points
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85); // slate-700
    splitBullets.forEach((splitBullet) => {
      checkPageBreak(splitBullet.length * 4.0 + 1);
      doc.text(splitBullet, margin + 2, yPos);
      yPos += splitBullet.length * 4.0;
    });

    yPos += 3;
  });

  // ==================== FEATURED CERTIFICATIONS ====================
  // Safe layout preventing overlap between long certification titles and issuer/date metadata
  const certsHeading = language === 'es' 
    ? 'Certificaciones & Licencias Profesionales Destacadas' 
    : language === 'pt' 
    ? 'Certificações e Licenças Profissionais' 
    : 'Key Professional Certifications & Accreditations';
  renderSectionHeader(certsHeading);

  const featuredCerts = getFeaturedCertifications(track, 6);

  featuredCerts.forEach((cert) => {
    const hasUrl = Boolean(cert.url);
    const linkBadge = hasUrl ? ' [Ver Credencial]' : '';
    const titleText = `•  ${cert.title}${linkBadge}`;
    const certMeta = cert.credentialId 
      ? `${cert.issuer} (${cert.date}) | ID: ${cert.credentialId}` 
      : `${cert.issuer} (${cert.date})`;

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    const titleWidth = doc.getTextWidth(titleText);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    const metaWidth = doc.getTextWidth(certMeta);

    // If both fit on a single line with safe margin, place title left and meta right
    if (titleWidth + metaWidth + 10 <= contentWidth) {
      checkPageBreak(5.5);
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'bold');
      if (hasUrl && cert.url) {
        doc.setTextColor(29, 78, 216); // blue-700
        doc.textWithLink(titleText, margin, yPos, { url: cert.url });
      } else {
        doc.setTextColor(15, 23, 42); // slate-900
        doc.text(titleText, margin, yPos);
      }

      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105); // slate-600
      doc.text(certMeta, margin + contentWidth, yPos, { align: 'right' });
      yPos += 4.5;
    } else {
      // Two-line structured layout for long titles/IDs to prevent any collision
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'bold');
      const splitTitle = doc.splitTextToSize(titleText, contentWidth - 4);
      const neededH = splitTitle.length * 4.0 + 4.2;
      checkPageBreak(neededH);

      if (hasUrl && cert.url) {
        doc.setTextColor(29, 78, 216); // blue-700
        doc.textWithLink(splitTitle, margin, yPos, { url: cert.url });
      } else {
        doc.setTextColor(15, 23, 42);
        doc.text(splitTitle, margin, yPos);
      }
      yPos += splitTitle.length * 4.0;

      // Sub-row for issuer, date and credential ID with subtle indent
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139); // slate-500
      doc.text(certMeta, margin + 4, yPos);
      yPos += 4.5;
    }
  });

  // Full LinkedIn Certifications Redirection Link Box (100% compatible vector styling, no broken glyphs)
  const linkedinAllCertsUrl = 'https://www.linkedin.com/in/fmaloofs/details/certifications/';
  checkPageBreak(12);
  yPos += 1.5;
  
  // Clean clickable banner for LinkedIn certifications
  doc.setFillColor(239, 246, 255); // blue-50
  doc.setDrawColor(191, 219, 254); // blue-200
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, yPos, contentWidth, 8.5, 2, 2, 'FD');

  // Small brand badge inside banner
  doc.setFillColor(37, 99, 235); // blue-600
  doc.roundedRect(margin + 2.5, yPos + 1.8, 8, 5, 1, 1, 'F');
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('in', margin + 6.5, yPos + 5.3, { align: 'center' });
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(29, 78, 216); // blue-700
  const linkedinText = language === 'es'
    ? 'Ver catálogo completo (+120 certificaciones oficiales verificadas) en LinkedIn  [Abrir enlace]'
    : language === 'pt'
    ? 'Ver catálogo completo (+120 certificações oficiais verificadas) no LinkedIn  [Abrir link]'
    : 'View full catalog of 120+ official verified certifications on LinkedIn  [Open Link]';
  doc.textWithLink(linkedinText, margin + 14, yPos + 5.5, { url: linkedinAllCertsUrl });
  doc.link(margin, yPos, contentWidth, 8.5, { url: linkedinAllCertsUrl });
  yPos += 12;

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

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    const datesWidth = doc.getTextWidth(dates);
    const maxDegreeWidth = contentWidth - datesWidth - 4;

    doc.setFontSize(9);
    const splitDegree = doc.splitTextToSize(degree, maxDegreeWidth);
    const neededHeight = splitDegree.length * 4.0 + 5.5;

    checkPageBreak(neededHeight);

    doc.setTextColor(15, 23, 42); // slate-900
    doc.text(splitDegree, margin, yPos);

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(37, 99, 235); // blue-600
    doc.text(dates, margin + contentWidth, yPos, { align: 'right' });
    yPos += splitDegree.length * 4.0;

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105); // slate-600
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
  const splitLang = doc.splitTextToSize(langSummary, contentWidth);
  doc.text(splitLang, margin, yPos);
  yPos += splitLang.length * 4.5 + 4;

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
