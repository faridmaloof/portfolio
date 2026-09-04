import type { ProfileData, Language } from '../types';
import jsPDF from 'jspdf';

export function generatePDF(data: ProfileData, language: Language): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;

  let yPos = margin;

  // Header with gradient-like effect
  doc.setFillColor(30, 41, 59);
  doc.rect(0, 0, pageWidth, 50, 'F');

  // Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(data.contact.name, margin, 20);

  // Title
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(147, 197, 253);
  const title = language === 'es' ? 'Especialista en Automatización de Pruebas / SDET' : 'QA Automation Engineer / SDET';
  doc.text(title, margin, 28);

  // Contact info
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  const contactLine = `${data.contact.email} | ${data.contact.phone} | ${data.contact.location}`;
  doc.text(contactLine, margin, 36);

  yPos = 55;

  // Summary section
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, yPos - 5, contentWidth, 8, 'F');
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(data.labels[language].summary, margin + 3, yPos);

  yPos += 10;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  
  const summaryText = data.summary.qa[language];
  const splitSummary = doc.splitTextToSize(summaryText, contentWidth - 6);
  doc.text(splitSummary, margin + 3, yPos);
  yPos += splitSummary.length * 5 + 5;

  // Skills section
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, yPos - 5, contentWidth, 8, 'F');
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(data.labels[language].skills, margin + 3, yPos);

  yPos += 10;
  const skills = data.skills.qa[language];
  skills.forEach(([category, tech]) => {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(category, margin + 3, yPos);
    
    doc.setFont('helvetica', 'normal');
    const splitTech = doc.splitTextToSize(tech, contentWidth - 40);
    doc.text(splitTech, margin + 3, yPos + 5);
    yPos += splitTech.length * 5 + 8;
  });

  // Experience section
  if (yPos > 200) {
    doc.addPage();
    yPos = margin;
  }

  doc.setFillColor(241, 245, 249);
  doc.rect(margin, yPos - 5, contentWidth, 8, 'F');
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(data.labels[language].experience, margin + 3, yPos);

  yPos += 10;

  data.experience.forEach((exp) => {
    if (yPos > 250) {
      doc.addPage();
      yPos = margin;
    }

    const role = exp.role.qa[language];
    const dates = exp.dates[language];

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(role, margin + 3, yPos);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(`${exp.company} | ${dates}`, margin + 3, yPos + 5);
    
    doc.setTextColor(51, 65, 85);
    const details = exp.detail.qa[language];
    details.forEach((detail) => {
      yPos += 8;
      if (yPos > 270) {
        doc.addPage();
        yPos = margin + 10;
      }
      const splitDetail = doc.splitTextToSize(`• ${detail}`, contentWidth - 6);
      doc.text(splitDetail, margin + 5, yPos);
      yPos += splitDetail.length * 5;
    });
    
    yPos += 5;
  });

  // Education section
  if (yPos > 200) {
    doc.addPage();
    yPos = margin;
  }

  doc.setFillColor(241, 245, 249);
  doc.rect(margin, yPos - 5, contentWidth, 8, 'F');
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(data.labels[language].education, margin + 3, yPos);

  yPos += 10;
  const educationItems = data.education[language];
  educationItems.forEach((item: { en: [string, string, string, string]; es: [string, string, string, string] }) => {
    const [institution, degree, dates, gpa] = item[language];
    if (yPos > 250) {
      doc.addPage();
      yPos = margin;
    }
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(degree, margin + 3, yPos);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(institution, margin + 3, yPos + 5);
    
    doc.setTextColor(51, 65, 85);
    doc.text(`${dates} | ${gpa}`, margin + 3, yPos + 10);
    
    yPos += 18;
  });

  // Save the PDF
  const filename = `cv-${data.contact.name.toLowerCase().replace(/\s+/g, '-')}-${language}.pdf`;
  doc.save(filename);
}
