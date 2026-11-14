import { Check, ExternalLink, FileText, Shield, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectLightboxProps {
  project: ProjectItem | null;
  onClose: () => void;
}

const WORDS_PER_MINUTE = 160;

function getCaseStudyReadingStats(project: ProjectItem): {
  wordCount: number;
  minutes: number;
} {
  const fullText = [
    project.title,
    project.details,
    ...project.architecture,
    ...project.controls,
  ].join(' ');
  const wordCount = fullText.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
  return { wordCount, minutes };
}

export function ProjectLightbox({ project, onClose }: ProjectLightboxProps) {
  const [imgError, setImgError] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const updateScrollProgress = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll <= 0) {
      setScrollProgress(1);
      return;
    }
    const ratio = Math.min(1, Math.max(0, el.scrollTop / maxScroll));
    setScrollProgress(ratio);
  }, []);

  useEffect(() => {
    setImgError(false);
    setScrollProgress(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    const raf = window.requestAnimationFrame(updateScrollProgress);
    return () => window.cancelAnimationFrame(raf);
  }, [project?.id, updateScrollProgress]);

  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', updateScrollProgress);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, [project, onClose, updateScrollProgress]);

  useEffect(() => {
    if (!project) return;
    const raf = window.requestAnimationFrame(updateScrollProgress);
    return () => window.cancelAnimationFrame(raf);
  }, [imgError, project, updateScrollProgress]);

  if (!project) return null;

  const progressPercent = Math.round(scrollProgress * 100);
  const { wordCount, minutes } = getCaseStudyReadingStats(project);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4 sm:p-6 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white dark:bg-[#10243E] border border-[#DCE3EC] dark:border-[#1F3756] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Case Study Reading Progress Bar */}
        <div
          className="h-[3px] w-full shrink-0 bg-[#EEF2F6] dark:bg-[#1F3756]"
          role="progressbar"
          aria-label="Case study reading progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressPercent}
        >
          <div
            className="h-full w-full bg-[#E63C36] origin-left transition-transform duration-75 ease-out motion-reduce:transition-none"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>

        {/* Sticky Modal Header with Explicit Close Button */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-[#DCE3EC] dark:border-[#1F3756] bg-white dark:bg-[#10243E] px-5 sm:px-6 py-3.5">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#5A6B7E] dark:text-[#98AFC7]">
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">Completed {project.completionDate}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{minutes} min read</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums text-[#0B2D4F] dark:text-[#F0F5FA] font-semibold">
              {progressPercent}% read
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCE3EC] dark:border-[#294568] bg-[#F6F8FB] dark:bg-[#0B192C] px-3 py-1.5 text-xs font-semibold text-[#0B2D4F] dark:text-[#F0F5FA] hover:bg-[#E63C36] hover:text-white hover:border-[#E63C36] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
            <span>Close</span>
          </button>
        </div>

        {/* Scrollable Case Study Content */}
        <div
          ref={scrollContainerRef}
          onScroll={updateScrollProgress}
          className="flex-1 overflow-y-auto"
        >
          <div className="bg-[#0E1B2C] p-4 sm:p-6">
            {!imgError ? (
              <img
                src={project.image}
                alt={project.imageAlt}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                onLoad={updateScrollProgress}
                className="mx-auto max-h-[340px] w-full rounded-lg object-contain"
              />
            ) : (
              <div className="flex h-56 w-full flex-col items-center justify-center rounded-lg bg-[#14263D] text-white/80">
                <Shield className="h-8 w-8 mb-2 text-[#DFC5A6]" />
                <span className="text-sm font-medium">{project.title}</span>
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h3
                id="lightbox-title"
                className="font-display text-2xl sm:text-3xl font-bold text-[#0B2D4F] dark:text-[#F0F5FA]"
              >
                {project.title}
              </h3>
              <p className="mt-2 text-xs font-medium text-[#5A6B7E] dark:text-[#98AFC7] tabular-nums">
                Completed {project.completionDate} · {minutes} min read ({wordCount} words) ·{' '}
                {project.stack.join(' · ')}
              </p>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#17212E] dark:text-[#D9E4F0]">
                {project.details}
              </p>
            </div>

            <div className="border-t border-[#DCE3EC] dark:border-[#1F3756] pt-5 space-y-3">
              <h4 className="font-display text-lg font-bold text-[#0B2D4F] dark:text-[#F0F5FA]">
                Architecture &amp; Workflow
              </h4>
              <ol className="space-y-2.5 text-sm leading-relaxed text-[#17212E] dark:text-[#D9E4F0]">
                {project.architecture.map((step, index) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="font-semibold text-[#B89A7A] dark:text-[#DFC5A6] tabular-nums shrink-0">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border-t border-[#DCE3EC] dark:border-[#1F3756] pt-5 space-y-3">
              <h4 className="font-display text-lg font-bold text-[#0B2D4F] dark:text-[#F0F5FA]">
                Defensive Security Controls
              </h4>
              <ul className="space-y-2.5 text-sm leading-relaxed text-[#17212E] dark:text-[#D9E4F0]">
                {project.controls.map((control) => (
                  <li key={control} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded bg-[#F6F8FB] dark:bg-[#123325] border border-[#DCE3EC] dark:border-[#2F8F5B]/45 text-[#2F8F5B] dark:text-[#7FE3AB] shrink-0">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span>{control}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sticky Modal Footer with Repository Links & Exit Button */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-[#DCE3EC] dark:border-[#1F3756] bg-[#F6F8FB] dark:bg-[#0B192C] px-5 sm:px-6 py-3.5">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#0B2D4F] dark:bg-[#194775] px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-[#14416F] dark:hover:bg-[#21578D] transition-colors whitespace-nowrap shrink-0"
            >
              <ExternalLink className="h-4 w-4" />
              <span>View on GitHub</span>
            </a>
            <a
              href={project.readmeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[#DCE3EC] dark:border-[#294568] bg-white dark:bg-[#10243E] px-4 py-2 text-xs sm:text-sm font-semibold text-[#0B2D4F] dark:text-[#F0F5FA] hover:bg-[#EEF3F9] dark:hover:bg-[#162C49] transition-colors whitespace-nowrap shrink-0"
            >
              <FileText className="h-4 w-4" />
              <span>Read the README</span>
            </a>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCE3EC] dark:border-[#294568] bg-white dark:bg-[#10243E] px-4 py-2 text-xs sm:text-sm font-semibold text-[#17212E] dark:text-[#D9E4F0] hover:bg-[#EEF3F9] dark:hover:bg-[#162C49] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Exit Details</span>
          </button>
        </div>
      </div>
    </div>
  );
}
