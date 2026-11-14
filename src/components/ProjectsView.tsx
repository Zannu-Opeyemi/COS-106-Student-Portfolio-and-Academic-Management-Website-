import { ArrowRight, ExternalLink, FileText, Maximize2, Shield } from 'lucide-react';
import { useState } from 'react';
import { PageId, ProjectItem, PROJECTS } from '../data/portfolioData';
import { GitHubActivity } from './GitHubActivity';

interface ProjectsViewProps {
  onSelectProject: (project: ProjectItem) => void;
  onNavigate: (page: PageId) => void;
}

const FILTER_CATEGORIES = [
  'All',
  'Threat Intelligence',
  'Digital Forensics',
  'Security Training',
] as const;

type FilterCategory = (typeof FILTER_CATEGORIES)[number];

export function ProjectsView({ onSelectProject, onNavigate }: ProjectsViewProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const visibleProjects =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <div>
      {/* Editorial Page Header */}
      <section className="bg-gradient-to-br from-[#0B2D4F] via-[#0B2D4F] to-[#081F37] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
          <p className="text-xs font-semibold tracking-wide text-[#DFC5A6]">
            Portfolio Builds · Defensive Security
          </p>
          <h1 className="font-display mt-2 text-3xl sm:text-4xl font-bold text-white text-balance">
            Projects
          </h1>
          <p className="mt-2.5 max-w-2xl text-base text-[#DBE6F2]">
            Three cybersecurity projects, all built with synthetic data and defensive goals.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        {/* Interactive Category Filter Control */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div
            role="group"
            aria-label="Filter projects by discipline"
            className="inline-flex flex-wrap items-center gap-1 rounded-xl bg-white dark:bg-[#10243E] border border-[#DCE3EC] dark:border-[#1F3756] p-1"
          >
            {FILTER_CATEGORIES.map((category) => {
              const selected = activeFilter === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveFilter(category)}
                  aria-pressed={selected}
                  className={`rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    selected
                      ? 'bg-[#0B2D4F] dark:bg-[#194775] text-white'
                      : 'text-[#5A6B7E] dark:text-[#98AFC7] hover:text-[#0B2D4F] dark:hover:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <p className="text-xs font-medium text-[#5A6B7E] dark:text-[#98AFC7] tabular-nums">
            Showing {visibleProjects.length} of {PROJECTS.length} builds
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {visibleProjects.map((project) => (
            <article
              key={project.id}
              className="group/card relative flex flex-col rounded-2xl border border-[#DCE3EC] dark:border-[#1F3756] bg-white dark:bg-[#10243E] overflow-hidden transition-[transform,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#9FB1C8] dark:hover:border-[#3A5A84] hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-0.5 bg-[#E63C36] scale-x-0 origin-left transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-x-100 motion-reduce:transition-none"
              />

              <button
                type="button"
                onClick={() => onSelectProject(project)}
                aria-label={`Inspect ${project.title} diagram`}
                className="relative block w-full bg-[#0E1B2C] aspect-[16/10] overflow-hidden text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#E63C36] focus-visible:outline-offset-[-2px]"
              >
                {!loadedImages[project.id] && !failedImages[project.id] && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[#14263D] animate-pulse motion-reduce:animate-none"
                  />
                )}
                {!failedImages[project.id] ? (
                  <img
                    ref={(el) => {
                      if (
                        el?.complete &&
                        el.naturalWidth > 0 &&
                        !loadedImages[project.id]
                      ) {
                        setLoadedImages((prev) => ({ ...prev, [project.id]: true }));
                      }
                    }}
                    src={project.image}
                    alt={project.imageAlt}
                    referrerPolicy="no-referrer"
                    onLoad={() =>
                      setLoadedImages((prev) => ({ ...prev, [project.id]: true }))
                    }
                    onError={() =>
                      setFailedImages((prev) => ({ ...prev, [project.id]: true }))
                    }
                    className="relative z-10 h-full w-full object-cover transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center p-6 text-white/80">
                    <Shield className="h-8 w-8 text-[#DFC5A6]" />
                  </div>
                )}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover/card:opacity-100 motion-reduce:transition-none"
                />
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-[#0B2D4F]/90 px-2.5 py-1 text-xs font-medium text-white opacity-0 translate-y-1 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:opacity-100 group-hover/card:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none">
                  <Maximize2 className="h-3 w-3" />
                  <span>Inspect</span>
                </span>
              </button>

              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-medium text-[#5A6B7E] dark:text-[#98AFC7]">
                  {project.category} ·{' '}
                  <span className="tabular-nums">Completed {project.completionDate}</span>
                </p>
                <h2 className="font-display mt-1.5 text-xl font-bold text-[#0B2D4F] dark:text-[#F0F5FA] transition-colors duration-150 group-hover/card:text-[#14416F] dark:group-hover/card:text-[#DFC5A6]">
                  {project.title}
                </h2>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[#17212E] dark:text-[#D9E4F0]">
                  {project.summary}
                </p>
                <p className="mt-4 text-xs font-medium text-[#5A6B7E] dark:text-[#98AFC7]">
                  {project.stack.join(' · ')}
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#DCE3EC] dark:border-[#1F3756] pt-4 text-sm font-semibold">
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="text-[#E63C36] dark:text-[#FF746E] hover:text-[#C92D28] dark:hover:text-[#FF948F] transition-colors duration-150 whitespace-nowrap cursor-pointer"
                  >
                    Inspect Details
                  </button>
                  <div className="flex items-center gap-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-1.5 text-[#0B2D4F] dark:text-[#F0F5FA] hover:text-[#E63C36] dark:hover:text-[#FF746E] transition-colors duration-150 whitespace-nowrap"
                    >
                      <span>GitHub</span>
                      <ExternalLink className="h-3.5 w-3.5 transition-transform duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transform-none" />
                    </a>
                    <a
                      href={project.readmeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/readme inline-flex items-center gap-1.5 text-[#5A6B7E] dark:text-[#98AFC7] hover:text-[#0B2D4F] dark:hover:text-[#F0F5FA] transition-colors duration-150 whitespace-nowrap"
                    >
                      <FileText className="h-3.5 w-3.5 transition-transform duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/readme:translate-x-0.5 motion-reduce:transform-none" />
                      <span>README</span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 rounded-2xl border border-[#DCE3EC] dark:border-[#1F3756] bg-white dark:bg-[#10243E] px-6 py-4 text-xs sm:text-sm text-[#5A6B7E] dark:text-[#98AFC7]">
          The images above are illustrations of each project’s interface and output,
          drawn from its README. Click any preview to enlarge, or open the GitHub
          repositories to inspect the source code.
        </p>

        <GitHubActivity />

        {/* Study Check Invitation linking to dedicated Quiz section */}
        <div className="mt-10 rounded-2xl border border-[#DCE3EC] dark:border-[#1F3756] bg-white dark:bg-[#10243E] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold text-[#B89A7A] dark:text-[#DFC5A6]">
              Concept Check
            </p>
            <h2 className="font-display mt-1 text-xl sm:text-2xl font-bold text-[#0B2D4F] dark:text-[#F0F5FA]">
              Test Your Defensive Security Fundamentals
            </h2>
            <p className="mt-1.5 text-sm text-[#5A6B7E] dark:text-[#98AFC7] max-w-2xl">
              Review the principles behind these projects—including SHA-256 verification,
              Cowrie honeypots, and UTC timelines—in the dedicated Security Knowledge Quiz.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('quiz')}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0B2D4F] dark:bg-[#194775] px-5 py-3 text-sm font-semibold text-white hover:bg-[#14416F] dark:hover:bg-[#21578D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Open Security Quiz</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
