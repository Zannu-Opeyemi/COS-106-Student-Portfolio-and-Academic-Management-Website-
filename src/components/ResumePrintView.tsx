import {
  ArrowLeft,
  Award,
  Check,
  CheckCircle2,
  Download,
  Github,
  Globe,
  Mail,
  Phone,
  Printer,
} from 'lucide-react';
import { useEffect, useState } from 'react';
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
import type { ResumeDensity } from '../utils/resumePdf';

interface ResumePrintViewProps {
  onExit: () => void;
}

const SKILL_CATEGORIES: SkillCategory[] = [
  'Security & Forensics',
  'Systems & Networking',
  'Development',
];

export function ResumePrintView({ onExit }: ResumePrintViewProps) {
  const [density, setDensity] = useState<ResumeDensity>('executive');
  const [showPhoto, setShowPhoto] = useState(true);
  const [photoError, setPhotoError] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    const prevTitle = document.title;
    document.title = `${PROFILE.name} — Cybersecurity Resume`;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.title = prevTitle;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onExit]);

  const handleDownloadPdf = async () => {
    if (isExporting) return;
    setIsExporting(true);
    setExportNotice(null);
    try {
      const { generateResumePdf } = await import('../utils/resumePdf');
      const filename = await generateResumePdf({ density, showPhoto });
      setExportNotice(`Downloaded ${filename}`);
    } catch {
      setExportNotice(
        'Direct PDF generation encountered an issue. Try the Print button instead.'
      );
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrintPage = () => {
    const isEmbedded = (() => {
      try {
        return window.self !== window.top;
      } catch {
        return true;
      }
    })();

    try {
      window.print();
      if (isEmbedded) {
        setExportNotice(
          'Print dialog requested. If the preview frame blocks printing, use Download PDF to save the file directly.'
        );
      }
    } catch {
      setExportNotice(
        'Print dialog is blocked in this preview frame — use Download PDF to save the file directly.'
      );
    }
  };

  const displayedCertifications =
    density === 'executive'
      ? CERTIFICATIONS.filter((cert) => EXECUTIVE_CERT_IDS.has(cert.id))
      : CERTIFICATIONS;

  const firstSemesterCourses = MIVA_COURSES.filter(
    (c) => c.semester === 'First Semester'
  );
  const secondSemesterCourses = MIVA_COURSES.filter(
    (c) => c.semester === 'Second Semester'
  );
  const totalCredits = MIVA_COURSES.reduce((sum, c) => sum + c.units, 0);

  return (
    <div className="min-h-screen bg-[#E9EEF5] text-[#17212E] print:min-h-0 print:bg-white">
      {/* Sticky Print Toolbar (hidden during printing / PDF export) */}
      <div className="sticky top-0 z-40 border-b border-[#D0DAE6] bg-[#0B2D4F] text-white shadow-sm print:hidden">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onExit}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/25 bg-white/10 px-3 py-1.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#14416F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Portfolio</span>
            </button>
            <div className="hidden md:block border-l border-white/20 pl-3">
              <p className="text-xs font-semibold text-white">
                Print-Friendly Resume Mode
              </p>
              <p className="text-[11px] text-[#BFD0E2]">
                Formatted for A4 / US Letter PDF export
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <div
              role="group"
              aria-label="Resume detail level"
              className="inline-flex items-center rounded-lg border border-white/20 bg-[#08213B] p-0.5"
            >
              <button
                type="button"
                onClick={() => {
                  setDensity('executive');
                  setExportNotice(null);
                }}
                aria-pressed={density === 'executive'}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  density === 'executive'
                    ? 'bg-white text-[#0B2D4F]'
                    : 'text-[#DBE6F2] hover:text-white'
                }`}
              >
                Executive Resume
              </button>
              <button
                type="button"
                onClick={() => {
                  setDensity('complete');
                  setExportNotice(null);
                }}
                aria-pressed={density === 'complete'}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  density === 'complete'
                    ? 'bg-white text-[#0B2D4F]'
                    : 'text-[#DBE6F2] hover:text-white'
                }`}
              >
                Full CV ({CERTIFICATIONS.length} Certs)
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowPhoto((prev) => !prev)}
              aria-pressed={showPhoto}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-white/25 bg-white/5 px-3 py-1.5 text-xs font-semibold text-[#DBE6F2] hover:bg-[#14416F] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{showPhoto ? 'Hide Photo' : 'Show Photo'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrintPage}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/25 bg-white/10 px-3 py-1.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#14416F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isExporting}
              className="inline-flex items-center gap-2 rounded-lg bg-[#E63C36] px-4 py-1.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#C92D28] disabled:opacity-70 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>{isExporting ? 'Generating...' : 'Download PDF'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Helper & Export Confirmation Notice on Screen */}
      <div className="mx-auto max-w-[210mm] px-4 pt-5 pb-2 print:hidden space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#DCE3EC] bg-white px-4 py-2.5 text-xs text-[#5A6B7E]">
          <p className="flex items-center gap-2">
            <Download className="h-3.5 w-3.5 text-[#0B2D4F] shrink-0" />
            <span>
              Click <strong className="text-[#0B2D4F]">Download PDF</strong> to save an
              A4 PDF file directly, or <strong className="text-[#0B2D4F]">Print</strong>{' '}
              for system print formatting.
            </span>
          </p>
          <span className="font-medium text-[#0B2D4F] tabular-nums">
            {density === 'executive' ? 'Concise Resume Layout' : 'Full Academic Dossier'}
          </span>
        </div>

        {exportNotice && (
          <div
            role="status"
            className="flex items-center gap-2 rounded-xl border border-[#2F8F5B]/30 bg-[#E6F4EC] px-4 py-2 text-xs font-semibold text-[#17523A]"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{exportNotice}</span>
          </div>
        )}
      </div>

      {/* Printable Resume Sheet */}
      <div className="mx-auto max-w-[210mm] px-4 py-4 pb-14 print:max-w-none print:p-0">
        <article className="overflow-hidden rounded-xl bg-white text-[#17212E] shadow-xl ring-1 ring-[#D8E0EA] print:rounded-none print:shadow-none print:ring-0">
          {/* Top Navy/Crimson Accent Strip */}
          <div className="flex h-2 w-full">
            <div className="w-3/4 bg-[#0B2D4F]" />
            <div className="w-1/4 bg-[#E63C36]" />
          </div>

          <div className="p-7 sm:p-10 print:p-0 space-y-6">
            {/* Header Section */}
            <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 border-b-2 border-[#0B2D4F] pb-5">
              <div className="space-y-2 flex-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#B89A7A]">
                  Curriculum Vitae · Cybersecurity Portfolio
                </p>
                <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B2D4F]">
                  {PROFILE.name}
                </h1>
                <p className="text-sm sm:text-base font-semibold text-[#17212E]">
                  B.Sc. Cybersecurity Undergraduate · Threat Intelligence, Digital Forensics
                  &amp; Defensive Python Engineering
                </p>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-[#334155]">
                  <span className="inline-flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-[#0B2D4F] shrink-0" />
                    <span>{PROFILE.email}</span>
                  </span>
                  <span className="inline-flex items-center gap-2 tabular-nums">
                    <Phone className="h-3.5 w-3.5 text-[#0B2D4F] shrink-0" />
                    <span>{PROFILE.phoneDisplay}</span>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Github className="h-3.5 w-3.5 text-[#0B2D4F] shrink-0" />
                    <span>github.com/Zannu-Opeyemi</span>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Globe className="h-3.5 w-3.5 text-[#0B2D4F] shrink-0" />
                    <span>{PROFILE.university} (100L · MIVA-CSC 106)</span>
                  </span>
                </div>
              </div>

              {showPhoto && !photoError && (
                <div className="shrink-0 self-start">
                  <img
                    src={PROFILE.portraitUrl}
                    alt={PROFILE.name}
                    onError={() => setPhotoError(true)}
                    className="h-24 w-20 sm:h-28 sm:w-24 rounded-lg border border-[#D8E0EA] object-cover object-[50%_20%]"
                  />
                </div>
              )}
            </header>

            {/* Professional Profile */}
            <section className="print-break-inside-avoid space-y-1.5">
              <h2 className="print-break-after-avoid font-display text-sm font-bold uppercase tracking-[0.1em] text-[#0B2D4F] border-b border-[#DCE3EC] pb-1">
                Professional Summary
              </h2>
              <p className="text-xs sm:text-[13px] leading-relaxed text-[#17212E]">
                Cybersecurity undergraduate at MIVA Open University combining defensive
                security engineering, SIEM/log triage, digital forensics investigation, and
                Python backend development. Completed an applied Cybersecurity Internship at
                Future Interns (with Letter of Recommendation), earned Microsoft SC-100 &amp;
                SC-200 training credentials alongside Red Team Leaders CRTOM &amp; CCEP
                certifications, and built open-source defensive security repositories
                grounded in structured reporting and reproducible engineering.
              </p>
            </section>

            {/* Technical Skills Matrix */}
            <section className="print-break-inside-avoid space-y-2.5">
              <h2 className="print-break-after-avoid font-display text-sm font-bold uppercase tracking-[0.1em] text-[#0B2D4F] border-b border-[#DCE3EC] pb-1">
                Technical Skills &amp; Tooling
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                {SKILL_CATEGORIES.map((category) => {
                  const categorySkills = SKILLS.filter((s) => s.category === category);
                  return (
                    <div
                      key={category}
                      className="rounded-lg border border-[#DCE3EC] bg-[#F8FAFC] p-3 space-y-1.5"
                    >
                      <h3 className="font-bold text-[#0B2D4F] text-xs">{category}</h3>
                      <ul className="space-y-1.5">
                        {categorySkills.map((skill) => (
                          <li key={skill.name} className="leading-snug">
                            <span className="font-semibold text-[#17212E]">
                              {skill.name}:
                            </span>{' '}
                            <span className="text-[#475569]">{skill.tools}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Projects & Defensive Builds */}
            <section className="space-y-3">
              <h2 className="print-break-after-avoid font-display text-sm font-bold uppercase tracking-[0.1em] text-[#0B2D4F] border-b border-[#DCE3EC] pb-1">
                Selected Cybersecurity Projects
              </h2>
              <div className="space-y-3.5">
                {PROJECTS.map((project) => (
                  <div
                    key={project.id}
                    className="print-break-inside-avoid rounded-lg border border-[#E2E8F0] p-3.5 space-y-1.5"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <h3 className="font-display text-sm font-bold text-[#0B2D4F]">
                          {project.title}
                        </h3>
                        <p className="text-[11px] font-semibold text-[#E63C36]">
                          {project.category} · Stack: {project.stack.join(', ')}
                        </p>
                      </div>
                      <span className="text-[11px] font-medium text-[#5A6B7E] tabular-nums">
                        Completed {project.completionDate}
                      </span>
                    </div>

                    <p className="text-xs leading-relaxed text-[#17212E]">
                      {density === 'complete' ? project.details : project.summary}
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-0.5 text-[11px] text-[#334155]">
                      {(density === 'complete'
                        ? [...project.architecture, ...project.controls]
                        : [project.architecture[0], project.controls[0]]
                      ).map((point) => (
                        <li key={point} className="flex items-start gap-1.5">
                          <Check className="mt-0.5 h-3 w-3 text-[#2F8F5B] shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="text-[11px] text-[#5A6B7E]">
                      Repository: <span className="underline">{project.githubUrl}</span>
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="print-break-inside-avoid space-y-2.5">
              <h2 className="print-break-after-avoid font-display text-sm font-bold uppercase tracking-[0.1em] text-[#0B2D4F] border-b border-[#DCE3EC] pb-1">
                Education
              </h2>
              <div className="divide-y divide-[#E2E8F0] border border-[#E2E8F0] rounded-lg">
                {EDUCATION.map((edu) => (
                  <div
                    key={edu.institution}
                    className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 text-xs"
                  >
                    <div>
                      <p className="font-bold text-[#0B2D4F]">{edu.institution}</p>
                      <p className="text-[#475569]">{edu.programme}</p>
                    </div>
                    <span className="font-semibold text-[#17212E] tabular-nums">
                      {edu.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Coursework Roster (Full Academic Dossier mode) */}
            {density === 'complete' && (
              <section className="print-break-inside-avoid space-y-2.5">
                <div className="print-break-after-avoid flex items-baseline justify-between border-b border-[#DCE3EC] pb-1">
                  <h2 className="font-display text-sm font-bold uppercase tracking-[0.1em] text-[#0B2D4F]">
                    B.Sc. Cybersecurity 100L Coursework (MIVA Open University)
                  </h2>
                  <span className="text-[11px] font-semibold text-[#5A6B7E] tabular-nums">
                    {MIVA_COURSES.length} Courses · {totalCredits} Credit Units
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px]">
                  {[
                    { label: 'First Semester (Completed)', items: firstSemesterCourses },
                    { label: 'Second Semester (Enrolled)', items: secondSemesterCourses },
                  ].map((group) => (
                    <div
                      key={group.label}
                      className="rounded-lg border border-[#E2E8F0] p-3 space-y-1.5"
                    >
                      <h3 className="font-bold text-[#0B2D4F]">{group.label}</h3>
                      <ul className="space-y-1">
                        {group.items.map((course) => (
                          <li
                            key={course.code}
                            className="flex items-baseline justify-between gap-2 text-[#17212E]"
                          >
                            <span>
                              <strong className="tabular-nums text-[#0B2D4F]">
                                {course.code}
                              </strong>{' '}
                              — {course.title}
                            </span>
                            <span className="shrink-0 text-[#5A6B7E] tabular-nums">
                              {course.units}u
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications, Internships & Digital Badges */}
            <section className="space-y-2.5">
              <div className="print-break-after-avoid flex flex-wrap items-baseline justify-between gap-2 border-b border-[#DCE3EC] pb-1">
                <h2 className="font-display text-sm font-bold uppercase tracking-[0.1em] text-[#0B2D4F]">
                  {density === 'executive'
                    ? 'Key Certifications, Internships & Digital Badges'
                    : `Complete Certifications, Badges & Fellowships (${CERTIFICATIONS.length})`}
                </h2>
                {density === 'executive' && (
                  <span className="text-[11px] font-medium text-[#5A6B7E] tabular-nums">
                    Showing {displayedCertifications.length} key highlights of{' '}
                    {CERTIFICATIONS.length} verified credentials
                  </span>
                )}
              </div>

              <div
                className={
                  density === 'executive'
                    ? 'grid grid-cols-1 sm:grid-cols-2 gap-2.5'
                    : 'space-y-2'
                }
              >
                {displayedCertifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="print-break-inside-avoid rounded-lg border border-[#E2E8F0] px-3 py-2 text-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-bold text-[#0B2D4F] leading-snug">
                        {cert.title}
                      </p>
                      <span className="shrink-0 text-[11px] font-medium text-[#5A6B7E] tabular-nums">
                        {cert.date}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] font-medium text-[#475569]">
                      {cert.issuer}
                      {cert.credentialId ? ` · ID: ${cert.credentialId}` : ''}
                    </p>
                    {density === 'complete' && (
                      <p className="mt-1 text-[11px] leading-relaxed text-[#334155]">
                        {cert.summary}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Footer Note / Interests */}
            <footer className="print-break-inside-avoid flex flex-wrap items-center justify-between gap-2 border-t border-[#DCE3EC] pt-3 text-[11px] text-[#5A6B7E]">
              <p className="flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5 text-[#B89A7A] shrink-0" />
                <span>
                  <strong className="text-[#0B2D4F]">Interests:</strong>{' '}
                  {HOBBIES.join(' · ')}
                </span>
              </p>
              <p className="tabular-nums">
                Academic Portfolio Resume · {PROFILE.course}
              </p>
            </footer>
          </div>
        </article>
      </div>
    </div>
  );
}
