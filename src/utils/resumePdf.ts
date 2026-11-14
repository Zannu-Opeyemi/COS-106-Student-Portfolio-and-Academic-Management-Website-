import { jsPDF } from 'jspdf';
import {
  CERTIFICATIONS,
  EDUCATION,
  EXECUTIVE_CERT_IDS,
  HOBBIES,
  MIVA_COURSES,
  PROFILE,
  PROJECTS,
  SKILLS,
  SkillCategory,
} from '../data/portfolioData';

export type ResumeDensity = 'executive' | 'complete';

const SKILL_CATEGORIES: SkillCategory[] = [
  'Security & Forensics',
  'Systems & Networking',
  'Development',
];

const NAVY: [number, number, number] = [11, 45, 79];
const CRIMSON: [number, number, number] = [230, 60, 54];
const INK: [number, number, number] = [23, 33, 46];
const MUTED: [number, number, number] = [90, 107, 126];
const BORDER: [number, number, number] = [216, 224, 234];
const SURFACE: [number, number, number] = [246, 248, 251];

async function loadPortraitDataUrl(src: string): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    const timeout = window.setTimeout(() => resolve(null), 2500);
    img.onload = () => {
      window.clearTimeout(timeout);
      try {
        const canvas = document.createElement('canvas');
        const targetW = 240;
        const targetH = Math.round((img.naturalHeight / img.naturalWidth) * targetW) || 300;
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(null);
          return;
        }
        ctx.drawImage(img, 0, 0, targetW, targetH);
        resolve(canvas.toDataURL('image/jpeg', 0.88));
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => {
      window.clearTimeout(timeout);
      resolve(null);
    };
    img.src = src;
  });
}

export async function generateResumePdf(options: {
  density: ResumeDensity;
  showPhoto: boolean;
}): Promise<string> {
  const { density, showPhoto } = options;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const pageW = 210;
  const pageH = 297;
  const marginX = 15;
  const contentW = pageW - marginX * 2;
  const bottomLimit = pageH - 16;
  let y = 14;

  const drawTopAccent = () => {
    doc.setFillColor(...NAVY);
    doc.rect(0, 0, pageW * 0.75, 2.5, 'F');
    doc.setFillColor(...CRIMSON);
    doc.rect(pageW * 0.75, 0, pageW * 0.25, 2.5, 'F');
  };

  const ensureSpace = (neededMm: number) => {
    if (y + neededMm > bottomLimit) {
      doc.addPage();
      drawTopAccent();
      y = 14;
    }
  };

  const drawSectionHeading = (title: string, rightNote?: string) => {
    ensureSpace(12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...NAVY);
    doc.text(title.toUpperCase(), marginX, y);

    if (rightNote) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...MUTED);
      doc.text(rightNote, pageW - marginX, y, { align: 'right' });
    }

    y += 1.6;
    doc.setDrawColor(...BORDER);
    doc.setLineWidth(0.35);
    doc.line(marginX, y, pageW - marginX, y);
    y += 4.5;
  };

  drawTopAccent();

  const portraitDataUrl = showPhoto
    ? await loadPortraitDataUrl(PROFILE.portraitUrl)
    : null;

  const photoW = portraitDataUrl ? 21 : 0;
  const photoH = portraitDataUrl ? 26 : 0;
  const headerTextW = portraitDataUrl ? contentW - photoW - 6 : contentW;

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(184, 154, 122);
  doc.text('CURRICULUM VITAE · CYBERSECURITY PORTFOLIO', marginX, y);
  y += 5.5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...NAVY);
  doc.text(PROFILE.name, marginX, y);
  y += 5.5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...INK);
  const roleLines = doc.splitTextToSize(
    'B.Sc. Cybersecurity Undergraduate · Threat Intelligence, Digital Forensics & Defensive Python Engineering',
    headerTextW
  );
  doc.text(roleLines, marginX, y);
  y += roleLines.length * 4.2 + 1.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...MUTED);
  doc.text(
    `Email: ${PROFILE.email}   |   Phone: ${PROFILE.phoneDisplay}`,
    marginX,
    y
  );
  y += 4;
  doc.text(
    `GitHub: github.com/Zannu-Opeyemi   |   ${PROFILE.university} (100L · MIVA-CSC 106)`,
    marginX,
    y
  );

  if (portraitDataUrl) {
    doc.setDrawColor(...BORDER);
    doc.setLineWidth(0.3);
    doc.addImage(
      portraitDataUrl,
      'JPEG',
      pageW - marginX - photoW,
      11,
      photoW,
      photoH
    );
    doc.rect(pageW - marginX - photoW, 11, photoW, photoH);
  }

  y = Math.max(y + 4, portraitDataUrl ? 11 + photoH + 3 : y + 4);
  doc.setDrawColor(...NAVY);
  doc.setLineWidth(0.6);
  doc.line(marginX, y, pageW - marginX, y);
  y += 6;

  // Professional Summary
  drawSectionHeading('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...INK);
  const summaryLines = doc.splitTextToSize(
    'Cybersecurity undergraduate at MIVA Open University combining defensive security engineering, SIEM/log triage, digital forensics investigation, and Python backend development. Completed an applied Cybersecurity Internship at Future Interns (with Letter of Recommendation), earned Microsoft SC-100 & SC-200 training credentials alongside Red Team Leaders CRTOM & CCEP certifications, and built open-source defensive security repositories grounded in structured reporting and reproducible engineering.',
    contentW
  );
  ensureSpace(summaryLines.length * 4.2 + 3);
  doc.text(summaryLines, marginX, y);
  y += summaryLines.length * 4.2 + 5;

  // Technical Skills & Tooling
  drawSectionHeading('Technical Skills & Tooling');
  for (const category of SKILL_CATEGORIES) {
    const categorySkills = SKILLS.filter((s) => s.category === category);
    const skillText = categorySkills
      .map((s) => `${s.name} (${s.tools})`)
      .join('  ·  ');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    const detailLines = doc.splitTextToSize(skillText, contentW - 42);
    ensureSpace(Math.max(1, detailLines.length) * 4 + 3);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.8);
    doc.setTextColor(...NAVY);
    doc.text(`${category}:`, marginX, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...INK);
    doc.text(detailLines, marginX + 40, y);
    y += Math.max(1, detailLines.length) * 4 + 1.8;
  }
  y += 3.5;

  // Selected Cybersecurity Projects
  drawSectionHeading('Selected Cybersecurity Projects');
  for (const project of PROJECTS) {
    const bodyText = density === 'complete' ? project.details : project.summary;
    const bodyLines = doc.splitTextToSize(bodyText, contentW - 6);
    const bulletItems =
      density === 'complete'
        ? [...project.architecture, ...project.controls]
        : [project.architecture[0], project.controls[0]];

    let bulletHeight = 0;
    const wrappedBullets = bulletItems.map((item) => {
      const lines = doc.splitTextToSize(`• ${item}`, contentW - 8);
      bulletHeight += lines.length * 3.8;
      return lines;
    });

    const boxHeight = 14 + bodyLines.length * 4 + bulletHeight + 5;
    ensureSpace(boxHeight);

    doc.setFillColor(...SURFACE);
    doc.setDrawColor(...BORDER);
    doc.setLineWidth(0.25);
    doc.roundedRect(marginX, y - 3, contentW, boxHeight, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...NAVY);
    doc.text(project.title, marginX + 3, y + 1.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.text(
      `Completed ${project.completionDate}`,
      pageW - marginX - 3,
      y + 1.5,
      { align: 'right' }
    );

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...CRIMSON);
    doc.text(
      `${project.category}  ·  Stack: ${project.stack.join(', ')}`,
      marginX + 3,
      y + 5.8
    );

    let innerY = y + 10;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.4);
    doc.setTextColor(...INK);
    doc.text(bodyLines, marginX + 3, innerY);
    innerY += bodyLines.length * 4 + 1;

    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    for (const lines of wrappedBullets) {
      doc.text(lines, marginX + 4, innerY);
      innerY += lines.length * 3.8;
    }

    doc.setFontSize(7.6);
    doc.text(`Repository: ${project.githubUrl}`, marginX + 3, innerY + 1);

    y += boxHeight + 3;
  }
  y += 2;

  // Education
  drawSectionHeading('Education');
  for (const edu of EDUCATION) {
    ensureSpace(10);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.8);
    doc.setTextColor(...NAVY);
    doc.text(edu.institution, marginX, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(...INK);
    doc.text(edu.status, pageW - marginX, y, { align: 'right' });

    y += 3.8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.3);
    doc.setTextColor(...MUTED);
    doc.text(edu.programme, marginX, y);
    y += 5;
  }
  y += 2;

  // Full Coursework Roster in Complete CV Mode
  if (density === 'complete') {
    const totalCredits = MIVA_COURSES.reduce((sum, c) => sum + c.units, 0);
    drawSectionHeading(
      'B.Sc. Cybersecurity 100L Coursework (MIVA Open University)',
      `${MIVA_COURSES.length} courses · ${totalCredits} credit units`
    );

    for (const sem of ['First Semester', 'Second Semester'] as const) {
      const semCourses = MIVA_COURSES.filter((c) => c.semester === sem);
      ensureSpace(semCourses.length * 4 + 8);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.6);
      doc.setTextColor(...NAVY);
      doc.text(
        `${sem} (${sem === 'First Semester' ? 'Completed' : 'Enrolled'})`,
        marginX,
        y
      );
      y += 4.2;

      for (const course of semCourses) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(...INK);
        doc.text(course.code, marginX + 2, y);

        doc.setFont('helvetica', 'normal');
        doc.text(
          `${course.title} (${course.requirement})`,
          marginX + 28,
          y
        );

        doc.setTextColor(...MUTED);
        doc.text(`${course.units}u`, pageW - marginX, y, { align: 'right' });
        y += 3.9;
      }
      y += 2.5;
    }
  }

  // Certifications & Badges
  const certs =
    density === 'executive'
      ? CERTIFICATIONS.filter((c) => EXECUTIVE_CERT_IDS.has(c.id))
      : CERTIFICATIONS;

  drawSectionHeading(
    density === 'executive'
      ? 'Key Certifications, Internships & Digital Badges'
      : `Complete Certifications, Badges & Fellowships (${CERTIFICATIONS.length})`,
    density === 'executive'
      ? `${certs.length} highlights of ${CERTIFICATIONS.length} verified`
      : undefined
  );

  for (const cert of certs) {
    const titleLines = doc.splitTextToSize(cert.title, contentW - 36);
    const metaText = cert.credentialId
      ? `${cert.issuer} · ID: ${cert.credentialId}`
      : cert.issuer;
    const summaryLines =
      density === 'complete'
        ? doc.splitTextToSize(cert.summary, contentW - 4)
        : [];
    const entryH =
      titleLines.length * 3.9 +
      4 +
      (summaryLines.length ? summaryLines.length * 3.6 + 1 : 0) +
      2.2;

    ensureSpace(entryH);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.6);
    doc.setTextColor(...NAVY);
    doc.text(titleLines, marginX, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.text(cert.date, pageW - marginX, y, { align: 'right' });

    let certY = y + titleLines.length * 3.9;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...INK);
    doc.text(metaText, marginX, certY);
    certY += 3.8;

    if (summaryLines.length > 0) {
      doc.setFontSize(7.8);
      doc.setTextColor(...MUTED);
      doc.text(summaryLines, marginX + 2, certY);
      certY += summaryLines.length * 3.6 + 1;
    }

    y = certY + 2;
  }

  // Interests footer block
  ensureSpace(10);
  y += 2;
  doc.setDrawColor(...BORDER);
  doc.line(marginX, y, pageW - marginX, y);
  y += 4.5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(...NAVY);
  doc.text('Interests:', marginX, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...INK);
  doc.text(HOBBIES.join('  ·  '), marginX + 18, y);

  // Page numbers on every page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i += 1) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...MUTED);
    doc.text(
      `${PROFILE.name} — Cybersecurity Portfolio Resume`,
      marginX,
      pageH - 7
    );
    doc.text(`Page ${i} of ${pageCount}`, pageW - marginX, pageH - 7, {
      align: 'right',
    });
  }

  const filename =
    density === 'executive'
      ? 'Zannu_Opeyemi_Emmanuel_Resume.pdf'
      : 'Zannu_Opeyemi_Emmanuel_Academic_CV.pdf';

  doc.save(filename);
  return filename;
}
