import { Award, Check, ExternalLink, FileText, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CertificationItem } from '../data/portfolioData';

interface CertificationLightboxProps {
  certification: CertificationItem | null;
  onClose: () => void;
}

type ImageViewMode = 'primary' | 'secondary';

export function CertificationLightbox({
  certification,
  onClose,
}: CertificationLightboxProps) {
  const [viewMode, setViewMode] = useState<ImageViewMode>('primary');
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [failedSrcs, setFailedSrcs] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setViewMode('primary');
  }, [certification?.id]);

  useEffect(() => {
    if (!certification) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setViewMode('primary');
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [certification, onClose]);

  const handleClose = () => {
    setViewMode('primary');
    onClose();
  };

  if (!certification) return null;

  const primaryImageUrl = certification.fullImage ?? certification.previewImage;
  const secondaryImageUrl =
    certification.secondaryFullImage ?? certification.secondaryPreviewImage;

  const preferredImageUrl =
    viewMode === 'secondary' && secondaryImageUrl
      ? secondaryImageUrl
      : primaryImageUrl;

  const fallbackThumbUrl =
    viewMode === 'secondary'
      ? certification.secondaryPreviewImage
      : certification.previewImage;

  const activeImageUrl =
    failedSrcs[preferredImageUrl] &&
    fallbackThumbUrl &&
    fallbackThumbUrl !== preferredImageUrl
      ? fallbackThumbUrl
      : preferredImageUrl;

  const hasImageFailed = Boolean(failedSrcs[activeImageUrl]);
  const isImageLoaded = loadedSrc === activeImageUrl;

  const activeDocUrl =
    viewMode === 'secondary' && certification.secondaryDocumentUrl
      ? certification.secondaryDocumentUrl
      : certification.documentUrl;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4 sm:p-6 backdrop-blur-xs print:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-lightbox-title"
      onClick={handleClose}
    >
      <div
        className="relative flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white dark:bg-[#10243E] border border-[#DCE3EC] dark:border-[#1F3756] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Modal Header */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-[#DCE3EC] dark:border-[#1F3756] bg-white dark:bg-[#10243E] px-5 sm:px-6 py-3.5">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#5A6B7E] dark:text-[#98AFC7]">
            <span className="font-semibold text-[#0B2D4F] dark:text-[#F0F5FA]">
              {certification.category}
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{certification.date}</span>
            {certification.credentialId && (
              <>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">ID: {certification.credentialId}</span>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close certificate details"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCE3EC] dark:border-[#294568] bg-[#F6F8FB] dark:bg-[#0B192C] px-3 py-1.5 text-xs font-semibold text-[#0B2D4F] dark:text-[#F0F5FA] hover:bg-[#E63C36] hover:text-white hover:border-[#E63C36] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
            <span>Close</span>
          </button>
        </div>

        {/* Scrollable Certificate Details & Preview */}
        <div className="flex-1 overflow-y-auto">
          <div className="bg-[#0E1B2C] p-4 sm:p-6 space-y-3">
            {certification.secondaryPreviewImage && (
              <div
                role="group"
                aria-label="Select credential view"
                className="inline-flex flex-wrap items-center gap-1 rounded-lg bg-[#14263D] p-1 border border-white/10"
              >
                <button
                  type="button"
                  onClick={() => setViewMode('primary')}
                  className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                    viewMode === 'primary'
                      ? 'bg-white text-[#0B2D4F]'
                      : 'text-[#DBE6F2] hover:text-white'
                  }`}
                >
                  Official Certificate
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('secondary')}
                  className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                    viewMode === 'secondary'
                      ? 'bg-white text-[#0B2D4F]'
                      : 'text-[#DBE6F2] hover:text-white'
                  }`}
                >
                  {certification.secondaryDocumentLabel ?? 'Badge & Proficiency'}
                </button>
              </div>
            )}

            {!hasImageFailed ? (
              <div className="relative mx-auto flex min-h-[200px] items-center justify-center rounded-lg bg-white p-2 sm:p-3">
                {!isImageLoaded && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-2 sm:inset-3 rounded bg-[#EEF2F6] animate-pulse motion-reduce:animate-none"
                  />
                )}
                <img
                  key={activeImageUrl}
                  ref={(el) => {
                    if (
                      el?.complete &&
                      el.naturalWidth > 0 &&
                      loadedSrc !== activeImageUrl
                    ) {
                      setLoadedSrc(activeImageUrl);
                    }
                  }}
                  src={activeImageUrl}
                  alt={certification.title}
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onLoad={() => setLoadedSrc(activeImageUrl)}
                  onError={() =>
                    setFailedSrcs((prev) => ({ ...prev, [activeImageUrl]: true }))
                  }
                  className="relative z-10 mx-auto max-h-[420px] w-auto max-w-full rounded object-contain"
                />
              </div>
            ) : (
              <div className="flex h-56 w-full flex-col items-center justify-center rounded-lg bg-[#14263D] text-white/80">
                <Award className="h-8 w-8 mb-2 text-[#DFC5A6]" />
                <span className="text-sm font-medium">{certification.title}</span>
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8 space-y-5">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#B89A7A] dark:text-[#DFC5A6]">
                {certification.issuer}
              </p>
              <h3
                id="cert-lightbox-title"
                className="font-display mt-1 text-2xl sm:text-3xl font-bold text-[#0B2D4F] dark:text-[#F0F5FA]"
              >
                {certification.title}
              </h3>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#17212E] dark:text-[#D9E4F0]">
                {certification.summary}
              </p>
            </div>

            <div className="border-t border-[#DCE3EC] dark:border-[#1F3756] pt-5 space-y-3">
              <h4 className="font-display text-lg font-bold text-[#0B2D4F] dark:text-[#F0F5FA]">
                Key Competencies &amp; Focus Areas
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-[#17212E] dark:text-[#D9E4F0]">
                {certification.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded bg-[#F6F8FB] dark:bg-[#123325] border border-[#DCE3EC] dark:border-[#2F8F5B]/45 text-[#2F8F5B] dark:text-[#7FE3AB] shrink-0">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sticky Modal Footer */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-[#DCE3EC] dark:border-[#1F3756] bg-[#F6F8FB] dark:bg-[#0B192C] px-5 sm:px-6 py-3.5">
          <div className="flex flex-wrap items-center gap-3">
            {(activeDocUrl || activeImageUrl) && (
              <a
                href={activeDocUrl ?? activeImageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#0B2D4F] dark:bg-[#194775] px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-[#14416F] dark:hover:bg-[#21578D] transition-colors whitespace-nowrap shrink-0"
              >
                <FileText className="h-4 w-4" />
                <span>{activeDocUrl ? 'Open Original PDF' : 'Open Full Image'}</span>
              </a>
            )}
            {certification.verifyUrl && (
              <a
                href={certification.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#DCE3EC] dark:border-[#294568] bg-white dark:bg-[#10243E] px-4 py-2 text-xs sm:text-sm font-semibold text-[#0B2D4F] dark:text-[#F0F5FA] hover:bg-[#EEF3F9] dark:hover:bg-[#162C49] transition-colors whitespace-nowrap shrink-0"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Verify Credential</span>
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCE3EC] dark:border-[#294568] bg-white dark:bg-[#10243E] px-4 py-2 text-xs sm:text-sm font-semibold text-[#17212E] dark:text-[#D9E4F0] hover:bg-[#EEF3F9] dark:hover:bg-[#162C49] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Exit Details</span>
          </button>
        </div>
      </div>
    </div>
  );
}
