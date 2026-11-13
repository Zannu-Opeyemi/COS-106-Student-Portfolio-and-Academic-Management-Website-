import { ArrowRight, ExternalLink, Pause, Play, Shield, Volume2 } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PageId, PROFILE, ProjectItem, PROJECTS } from '../data/portfolioData';
import { CybersecurityDailyTip } from './CybersecurityDailyTip';

interface HomeViewProps {
  onNavigate: (page: PageId) => void;
  onSelectProject: (project: ProjectItem) => void;
}

const EXPLORE_ITEMS: { num: string; page: PageId; title: string; desc: string }[] = [
  {
    num: '01.',
    page: 'about',
    title: 'About Me',
    desc: 'Education, 100L MIVA coursework, technical skills and interests',
  },
  {
    num: '02.',
    page: 'projects',
    title: 'Projects',
    desc: 'Three defensive cybersecurity builds and live GitHub activity',
  },
  {
    num: '03.',
    page: 'planner',
    title: 'Academic Planner',
    desc: 'Add, complete and track coursework tasks locally',
  },
  {
    num: '04.',
    page: 'quiz',
    title: 'Security Knowledge Quiz',
    desc: 'Interactive check on CIA triad, hashing, honeypots and forensics',
  },
  {
    num: '05.',
    page: 'contact',
    title: 'Contact',
    desc: 'Send a validated message or reach me directly',
  },
];

export function HomeView({ onNavigate, onSelectProject }: HomeViewProps) {
  const [portraitLoaded, setPortraitLoaded] = useState(false);
  const [portraitError, setPortraitError] = useState(false);
  const [mivaLogoError, setMivaLogoError] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const portraitImgRef = useRef<HTMLImageElement | null>(null);
  const spokeFromButtonRef = useRef(false);

  useEffect(() => {
    if (
      portraitImgRef.current?.complete &&
      portraitImgRef.current.naturalWidth > 0
    ) {
      setPortraitLoaded(true);
    }
  }, []);

  const speakWelcomeMessage = useCallback((onBlocked?: () => void) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance('Welcome to my portfolio.');
    utterance.lang = 'en-US';
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.onstart = () => {
      try {
        sessionStorage.setItem('zoe_welcome_spoken', '1');
      } catch {
        // Ignore storage restrictions
      }
      setIsPlaying(true);
    };
    utterance.onend = () => {
      if (!audioRef.current || audioRef.current.paused) {
        setIsPlaying(false);
      }
    };
    utterance.onerror = (event) => {
      if (!audioRef.current || audioRef.current.paused) {
        setIsPlaying(false);
      }
      if (event.error === 'not-allowed' && onBlocked) {
        onBlocked();
      }
    };
    window.speechSynthesis.speak(utterance);
  }, []);

  useEffect(() => {
    let alreadySpoken = false;
    try {
      alreadySpoken = sessionStorage.getItem('zoe_welcome_spoken') === '1';
    } catch {
      alreadySpoken = false;
    }

    let cleanupInteraction: (() => void) | undefined;

    if (!alreadySpoken && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const attachFirstGestureFallback = () => {
        if (cleanupInteraction) return;
        const handleFirstGesture = () => {
          cleanupInteraction?.();
          cleanupInteraction = undefined;
          try {
            if (sessionStorage.getItem('zoe_welcome_spoken') === '1') return;
          } catch {
            // Ignore storage restrictions
          }
          speakWelcomeMessage();
        };
        window.addEventListener('pointerdown', handleFirstGesture, { once: true });
        window.addEventListener('keydown', handleFirstGesture, { once: true });
        cleanupInteraction = () => {
          window.removeEventListener('pointerdown', handleFirstGesture);
          window.removeEventListener('keydown', handleFirstGesture);
        };
      };

      const timer = window.setTimeout(() => {
        speakWelcomeMessage(attachFirstGestureFallback);
      }, 250);

      return () => {
        window.clearTimeout(timer);
        cleanupInteraction?.();
        window.speechSynthesis.cancel();
      };
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [speakWelcomeMessage]);

  const toggleWelcomeAudio = () => {
    const audio = audioRef.current;
    try {
      sessionStorage.setItem('zoe_welcome_spoken', '1');
    } catch {
      // Ignore storage restrictions
    }

    if (isPlaying) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      setIsPlaying(false);
      return;
    }

    spokeFromButtonRef.current = true;
    speakWelcomeMessage();
    if (audio) {
      audio.volume = 0.25;
      audio.currentTime = 0;
      audio.play().catch(() => {
        spokeFromButtonRef.current = false;
      });
    }
    setIsPlaying(true);
  };

  return (
    <div>
      {/* Split-Screen Editorial Hero */}
      <section className="bg-gradient-to-br from-[#0B2D4F] via-[#0B2D4F] to-[#081F37] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="text-sm font-semibold tracking-wide text-[#DFC5A6]">
                {PROFILE.role}
              </p>
              <h1 className="font-display mt-3 text-4xl sm:text-5xl lg:text-[3.65rem] font-bold leading-[1.1] tracking-tight text-white text-balance">
                Welcome. I’m {PROFILE.name}.
              </h1>
              <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-[#DBE6F2]">
                This is my academic portfolio. Here you can read about my background,
                explore the defensive cybersecurity projects I have built, and use the
                coursework planner I created to stay organised.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('projects')}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#E63C36] px-6 py-3 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#C92D28] cursor-pointer focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                >
                  <span>View My Projects</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#14416F] cursor-pointer focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                >
                  About &amp; Coursework
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <figure className="w-full max-w-sm lg:max-w-md rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-white/15 flex flex-col">
                <div className="relative flex-1 overflow-hidden rounded-xl bg-[#EEF2F6]">
                  {!portraitLoaded && !portraitError && (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[#DCE3EC] animate-pulse motion-reduce:animate-none"
                    />
                  )}
                  {!portraitError ? (
                    <img
                      ref={portraitImgRef}
                      src={PROFILE.portraitUrl}
                      alt={PROFILE.portraitAlt}
                      referrerPolicy="no-referrer"
                      onLoad={() => setPortraitLoaded(true)}
                      onError={() => setPortraitError(true)}
                      className={`h-full min-h-[320px] max-h-[440px] w-full object-cover object-[50%_22%] transition-opacity duration-200 motion-reduce:transition-none ${
                        portraitLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ) : (
                    <div className="flex min-h-[340px] w-full flex-col items-center justify-center bg-[#14416F] p-8 text-center text-white">
                      <Shield className="h-10 w-10 text-[#DFC5A6] mb-3" />
                      <span className="font-display text-lg font-bold">{PROFILE.name}</span>
                    </div>
                  )}
                </div>
                <figcaption className="flex items-center justify-between px-3 pt-2.5 pb-1 text-xs font-medium text-[#5A6B7E]">
                  <span className="font-semibold text-[#0B2D4F]">{PROFILE.name}</span>
                  <span>100L Cybersecurity</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* Full-width academic overview strip below hero split */}
        <div className="border-t border-white/15 bg-[#08213B]">
          <div className="mx-auto max-w-7xl px-6 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/10 items-center">
            <div className="lg:pr-6">
              <p className="text-xs text-[#BFD0E2] mb-1.5">Institution</p>
              {!mivaLogoError ? (
                <img
                  src={PROFILE.mivaLogoDarkBg}
                  alt="MIVA Open University"
                  referrerPolicy="no-referrer"
                  onError={() => setMivaLogoError(true)}
                  className="h-7 w-auto object-contain"
                />
              ) : (
                <p className="text-sm font-semibold text-white">{PROFILE.university}</p>
              )}
            </div>
            <div className="lg:px-6">
              <p className="text-xs text-[#BFD0E2]">Discipline</p>
              <p className="mt-1 text-sm font-semibold text-white">Cybersecurity</p>
            </div>
            <div className="lg:px-6">
              <p className="text-xs text-[#BFD0E2]">Coursework Module</p>
              <p className="mt-1 text-sm font-semibold text-white tabular-nums">
                MIVA-CSC 106
              </p>
            </div>
            <div className="lg:pl-6">
              <p className="text-xs text-[#BFD0E2]">Featured Builds</p>
              <p className="mt-1 text-sm font-semibold text-white tabular-nums">
                3 Defensive Repositories
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Biography & Site Exploration Band */}
      <section className="bg-white border-b border-[#DCE3EC]">
        <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <article className="lg:col-span-6 space-y-5">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#B89A7A]">
                Introduction
              </p>
              <h2 className="font-display mt-1 text-2xl sm:text-3xl font-bold text-[#0B2D4F]">
                Brief Biography
              </h2>
            </div>

            <div className="space-y-4 text-base leading-relaxed text-[#17212E] max-w-[65ch]">
              <p>
                I am a Cybersecurity student at MIVA Open University. I am learning how
                to defend systems and I build practical projects to prove it, from
                honeypot log analysis to digital forensics case reports.
              </p>
              <p>
                In COS 106 I am learning to build the web pages that present this work.
                Outside class I enjoy reading and playing football.
              </p>
            </div>

            {/* Welcome Audio Player */}
            <div className="pt-2">
              <div className="rounded-2xl border border-[#DCE3EC] bg-[#F6F8FB] p-4 sm:p-5 space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <button
                      type="button"
                      onClick={toggleWelcomeAudio}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0B2D4F] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#14416F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="h-4 w-4" />
                          <span>Stop Greeting</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" />
                          <span>Play Welcome Audio</span>
                        </>
                      )}
                    </button>
                    <div className="flex items-center gap-2 text-sm text-[#17212E] font-medium">
                      <Volume2 className="h-4 w-4 shrink-0 text-[#0B2D4F]" />
                      <span>“Welcome to my portfolio.”</span>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[#5A6B7E] tabular-nums">
                    {isPlaying ? 'Speaking' : 'Audio Ready'}
                  </span>
                </div>

                <audio
                  ref={audioRef}
                  controls
                  preload="none"
                  aria-label="Welcome audio saying Welcome to my portfolio"
                  onPlay={() => {
                    setIsPlaying(true);
                    if (spokeFromButtonRef.current) {
                      spokeFromButtonRef.current = false;
                      return;
                    }
                    if (audioRef.current) {
                      audioRef.current.volume = 0.25;
                    }
                    speakWelcomeMessage();
                  }}
                  onPause={() => {
                    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                      if (!window.speechSynthesis.speaking) {
                        setIsPlaying(false);
                      }
                    } else {
                      setIsPlaying(false);
                    }
                  }}
                  onEnded={() => {
                    if (
                      typeof window === 'undefined' ||
                      !('speechSynthesis' in window) ||
                      !window.speechSynthesis.speaking
                    ) {
                      setIsPlaying(false);
                    }
                  }}
                  className="w-full h-9"
                >
                  <source src={PROFILE.welcomeAudioUrl} type="audio/wav" />
                  Your browser does not support audio playback.
                </audio>
              </div>
            </div>
          </article>

          <aside className="lg:col-span-6">
            <div className="mb-4">
              <p className="text-xs font-semibold tracking-wide text-[#B89A7A]">
                Site Directory
              </p>
              <h2 className="font-display mt-1 text-2xl sm:text-3xl font-bold text-[#0B2D4F]">
                Explore the Site
              </h2>
            </div>

            <ul className="divide-y divide-[#DCE3EC] border-y border-[#DCE3EC]">
              {EXPLORE_ITEMS.map((item) => (
                <li key={item.page}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.page)}
                    className="group w-full py-3.5 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors hover:bg-[#F6F8FB] px-2 -mx-2 rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-bold text-[#0B2D4F] group-hover:text-[#E63C36] transition-colors">
                        <span className="tabular-nums mr-2.5 text-[#B89A7A]">
                          {item.num}
                        </span>
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-xs sm:text-sm text-[#5A6B7E] pl-7">
                        {item.desc}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#5A6B7E] group-hover:text-[#E63C36] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <CybersecurityDailyTip />

      {/* Selected Projects Preview */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#B89A7A]">
              Portfolio Work
            </p>
            <h2 className="font-display mt-1 text-2xl sm:text-3xl font-bold text-[#0B2D4F]">
              Selected Cybersecurity Builds
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#5A6B7E]">
              Three defensive Python and web projects built around synthetic datasets.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B2D4F] hover:text-[#E63C36] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Open full projects page</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              className="flex flex-col rounded-2xl border border-[#DCE3EC] bg-white overflow-hidden transition-all duration-150 hover:border-[#B8C6D8] hover:shadow-sm"
            >
              <button
                type="button"
                onClick={() => onSelectProject(project)}
                className="group relative block w-full bg-[#0E1B2C] aspect-[16/10] overflow-hidden text-left cursor-pointer"
              >
                {!loadedImages[project.id] && !failedImages[project.id] && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[#14263D] animate-pulse motion-reduce:animate-none"
                  />
                )}
                {!failedImages[project.id] ? (
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    referrerPolicy="no-referrer"
                    onLoad={() =>
                      setLoadedImages((prev) => ({ ...prev, [project.id]: true }))
                    }
                    onError={() =>
                      setFailedImages((prev) => ({ ...prev, [project.id]: true }))
                    }
                    className={`h-full w-full object-cover transition-[transform,opacity] duration-200 group-hover:scale-[1.02] motion-reduce:transition-none ${
                      loadedImages[project.id] ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center p-6 text-white/80">
                    <Shield className="h-8 w-8 text-[#DFC5A6]" />
                  </div>
                )}
              </button>

              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-medium text-[#5A6B7E]">
                  {project.category} ·{' '}
                  <span className="tabular-nums">Completed {project.completionDate}</span>
                </p>
                <h3 className="font-display mt-1.5 text-xl font-bold text-[#0B2D4F]">
                  {project.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[#17212E]">
                  {project.summary}
                </p>
                <p className="mt-4 text-xs font-medium text-[#5A6B7E]">
                  {project.stack.join(' · ')}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-[#DCE3EC] pt-4 text-sm font-semibold">
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="text-[#0B2D4F] hover:text-[#E63C36] transition-colors cursor-pointer"
                  >
                    Inspect Details
                  </button>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#0B2D4F] hover:text-[#E63C36] transition-colors"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
