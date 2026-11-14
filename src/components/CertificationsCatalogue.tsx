import { Award, ExternalLink, FileText, Maximize2, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  CERTIFICATIONS,
  CertificationCategory,
  CertificationItem,
} from '../data/portfolioData';

interface CertificationsCatalogueProps {
  onSelectCertification: (cert: CertificationItem) => void;
}

type CategoryFilter = 'All' | CertificationCategory;

const CATEGORY_FILTERS: CategoryFilter[] = [
  'All',
  'Cybersecurity',
  'Cloud & Microsoft',
  'Systems & Programming',
  'Leadership & Research',
];

export function CertificationsCatalogue({
  onSelectCertification,
}: CertificationsCatalogueProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const badgeCredentials = useMemo(
    () => CERTIFICATIONS.filter((cert) => cert.isBadge),
    []
  );

  const visibleCertifications = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return CERTIFICATIONS.filter((cert) => {
      const matchesCategory =
        selectedCategory === 'All' || cert.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!query) return true;
      const searchable = [
        cert.title,
        cert.issuer,
        cert.category,
        cert.credentialId ?? '',
        cert.summary,
        ...cert.highlights,
      ]
        .join(' ')
        .toLowerCase();
      return searchable.includes(query);
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section
      id="certifications-section"
      aria-labelledby="certifications-heading"
      className="scroll-mt-20 bg-[#F6F8FB] dark:bg-[#091526] border-t border-[#DCE3EC] dark:border-[#1F3756]"
    >
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#B89A7A] dark:text-[#DFC5A6]">
              Verified Credentials · {CERTIFICATIONS.length} Earned
            </p>
            <h2
              id="certifications-heading"
              className="font-display mt-1 text-2xl sm:text-3xl font-bold text-[#0B2D4F] dark:text-[#F0F5FA]"
            >
              Certifications, Badges &amp; Professional Training
            </h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-[#5A6B7E] dark:text-[#98AFC7]">
              Industry certifications, digital badges, cybersecurity internship records,
              and leadership fellowships completed alongside my degree studies. Click any
              certificate or badge to inspect it in full detail.
            </p>
          </div>

          <div className="w-full lg:w-80">
            <label htmlFor="certification-search" className="sr-only">
              Search certifications
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5A6B7E] dark:text-[#98AFC7]" />
              <input
                id="certification-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title, issuer, or ID..."
                className="w-full rounded-xl border border-[#D8E0EA] dark:border-[#294568] bg-white dark:bg-[#10243E] pl-10 pr-4 py-2.5 text-sm text-[#17212E] dark:text-[#D9E4F0] placeholder:text-[#7A8B9E] dark:placeholder:text-[#7891AB] focus:border-[#0B2D4F] dark:focus:border-[#5D8AB8] focus:outline-none focus:ring-2 focus:ring-[#0B2D4F]/15 dark:focus:ring-[#5D8AB8]/25"
              />
            </div>
          </div>
        </div>

        {/* Dedicated Digital Badges Showcase */}
        {badgeCredentials.length > 0 && (
          <div className="mb-10 rounded-2xl border border-[#D8E0EA] dark:border-[#1F3756] bg-white dark:bg-[#10243E] p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
              <div>
                <h3 className="font-display text-lg font-bold text-[#0B2D4F] dark:text-[#F0F5FA]">
                  Digital Badges &amp; Verified Standings
                </h3>
                <p className="text-xs sm:text-sm text-[#5A6B7E] dark:text-[#98AFC7]">
                  Official credential badges earned from ISC2, McKinsey.org, and Cisco
                  Networking Academy.
                </p>
              </div>
              <span className="text-xs font-medium text-[#5A6B7E] dark:text-[#98AFC7] tabular-nums">
                {badgeCredentials.length} Badges
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {badgeCredentials.map((badge) => {
                const badgeImg = badge.secondaryPreviewImage ?? badge.previewImage;
                return (
                  <button
                    key={badge.id}
                    type="button"
                    onClick={() => onSelectCertification(badge)}
                    className="group flex items-center gap-4 rounded-xl border border-[#D8E0EA] dark:border-[#1F3756] bg-[#F6F8FB] dark:bg-[#0B192C] p-4 text-left transition-colors hover:border-[#9FB1C8] dark:hover:border-[#3A5A84] hover:bg-white dark:hover:bg-[#162C49] cursor-pointer"
                  >
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#DCE3EC] dark:border-[#1F3756] bg-white p-1.5">
                      <img
                        src={badgeImg}
                        alt={badge.title}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105 motion-reduce:transform-none"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#5A6B7E] dark:text-[#98AFC7]">
                        {badge.issuer}
                      </p>
                      <p className="font-display mt-0.5 text-sm sm:text-base font-bold text-[#0B2D4F] dark:text-[#F0F5FA] group-hover:text-[#E63C36] dark:group-hover:text-[#FF746E] transition-colors leading-snug">
                        {badge.title}
                      </p>
                      <p className="mt-1 text-xs text-[#5A6B7E] dark:text-[#98AFC7] tabular-nums">
                        {badge.date}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Filter Controls */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div
            role="group"
            aria-label="Filter certifications by domain"
            className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-[#D8E0EA] dark:border-[#1F3756] bg-white dark:bg-[#10243E] p-1"
          >
            {CATEGORY_FILTERS.map((category) => {
              const active = selectedCategory === category;
              const count =
                category === 'All'
                  ? CERTIFICATIONS.length
                  : CERTIFICATIONS.filter((c) => c.category === category).length;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={active}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#0B2D4F] dark:bg-[#194775] text-white'
                      : 'text-[#5A6B7E] dark:text-[#98AFC7] hover:text-[#0B2D4F] dark:hover:text-white'
                  }`}
                >
                  {category} ({count})
                </button>
              );
            })}
          </div>

          <p className="text-xs font-medium text-[#5A6B7E] dark:text-[#98AFC7] tabular-nums">
            Showing {visibleCertifications.length} of {CERTIFICATIONS.length} credentials
          </p>
        </div>

        {/* All 27 Certification Cards with Visible Certificate / Badge Images */}
        {visibleCertifications.length === 0 ? (
          <div className="rounded-2xl border border-[#D8E0EA] dark:border-[#1F3756] bg-white dark:bg-[#10243E] px-6 py-12 text-center space-y-3">
            <p className="text-sm font-medium text-[#5A6B7E] dark:text-[#98AFC7]">
              No certifications match "{searchQuery.trim()}".
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="rounded-lg bg-[#0B2D4F] dark:bg-[#194775] px-4 py-2 text-xs font-semibold text-white hover:bg-[#14416F] dark:hover:bg-[#21578D] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleCertifications.map((cert) => {
              const imgFailed = failedImages[cert.id];
              return (
                <article
                  key={cert.id}
                  className="group flex flex-col justify-between rounded-2xl border border-[#D8E0EA] dark:border-[#1F3756] bg-white dark:bg-[#10243E] overflow-hidden transition-[transform,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[#9FB1C8] dark:hover:border-[#3A5A84] hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <div>
                    {/* Certificate / Badge Image Frame */}
                    <button
                      type="button"
                      onClick={() => onSelectCertification(cert)}
                      aria-label={`Inspect ${cert.title}`}
                      className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden border-b border-[#DCE3EC] dark:border-[#1F3756] bg-[#EEF2F6] dark:bg-white p-3 text-left cursor-pointer"
                    >
                      {!imgFailed ? (
                        <img
                          src={cert.previewImage}
                          alt={cert.title}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setFailedImages((prev) => ({
                              ...prev,
                              [cert.id]: true,
                            }))
                          }
                          className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-[1.03] motion-reduce:transform-none"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-[#5A6B7E]">
                          <Award className="h-8 w-8 text-[#E63C36] mb-1.5" />
                          <span className="text-xs font-medium">{cert.issuer}</span>
                        </div>
                      )}
                      <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-md bg-[#0B2D4F]/90 px-2 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <Maximize2 className="h-3 w-3" />
                        <span>Inspect</span>
                      </span>
                    </button>

                    <div className="p-5 sm:p-6">
                      <p className="text-xs font-medium text-[#5A6B7E] dark:text-[#98AFC7]">
                        {cert.category} ·{' '}
                        <span className="tabular-nums">{cert.date}</span>
                      </p>

                      <h3 className="font-display mt-1.5 text-lg font-bold text-[#0B2D4F] dark:text-[#F0F5FA] leading-snug">
                        {cert.title}
                      </h3>

                      <p className="mt-1 text-xs font-semibold text-[#17212E] dark:text-[#D9E4F0]">
                        {cert.issuer}
                        {cert.credentialId ? (
                          <span className="font-normal text-[#5A6B7E] dark:text-[#98AFC7] tabular-nums">
                            {' '}
                            · ID: {cert.credentialId}
                          </span>
                        ) : null}
                      </p>

                      <p className="mt-3 text-sm leading-relaxed text-[#17212E] dark:text-[#D9E4F0]">
                        {cert.summary}
                      </p>

                      <p className="mt-3 text-xs font-medium text-[#5A6B7E] dark:text-[#98AFC7]">
                        {cert.highlights.join(' · ')}
                      </p>
                    </div>
                  </div>

                  <div className="mx-5 sm:mx-6 mb-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#DCE3EC] dark:border-[#1F3756] pt-3.5 text-xs sm:text-sm font-semibold">
                    <button
                      type="button"
                      onClick={() => onSelectCertification(cert)}
                      className="inline-flex items-center gap-1.5 text-[#E63C36] dark:text-[#FF746E] hover:text-[#C92D28] dark:hover:text-[#FF948F] transition-colors cursor-pointer"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span>View Full Details</span>
                    </button>

                    <div className="flex items-center gap-3">
                      {cert.verifyUrl && (
                        <a
                          href={cert.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#0B2D4F] dark:text-[#F0F5FA] hover:text-[#E63C36] dark:hover:text-[#FF746E] transition-colors"
                        >
                          <span>Verify</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {cert.documentUrl && !cert.verifyUrl && (
                        <a
                          href={cert.documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#5A6B7E] dark:text-[#98AFC7] hover:text-[#0B2D4F] dark:hover:text-[#F0F5FA] transition-colors"
                        >
                          <span>PDF</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
