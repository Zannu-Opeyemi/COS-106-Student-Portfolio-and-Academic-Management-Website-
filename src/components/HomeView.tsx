import { ArrowRight, Award, ExternalLink, FileDown, FileText, Pause, Play, Shield, Volume2 } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CERTIFICATIONS,
  CertificationItem,
  PageId,
  PROFILE,
  ProjectItem,
  PROJECTS,
} from '../data/portfolioData';
import { CybersecurityDailyTip } from './CybersecurityDailyTip';

interface HomeViewProps {
  onNavigate: (page: PageId, sectionId?: string) => void;
  onSelectProject: (project: ProjectItem) => void;
  onSelectCertification: (cert: CertificationItem) => void;
  onOpenResume: () => void;
}

const EXPLORE_ITEMS: { num: string; page: PageId; title: string; desc: string }[] = [
  {
    num: '01.',
    page: 'about',
    title: 'About Me',
    desc: 'Education, 27 certifications, 100L MIVA coursework, skills and interests',
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

export function HomeView({
  onNavigate,
  onSelectProject,
  onSelectCertification,
  onOpenResume,
}: HomeViewProps) {
  const [portraitLoaded, setPortraitLoaded] = useState(false);
  const [portraitError, setPortraitError] = useState(false);
  const [mivaLogoError, setMivaLogoError] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [loadedCertImages, setLoadedCertImages] = useState<
    Record<string, boolean>
  >({});
  const [failedCertImages, setFailedCertImages] = useState<
    Record<string, boolean>
  >({});
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const portraitImgRef = useRef<HTMLImageElement | null>(null);
  const spokeFromButtonRef = useRef(false);
  const utteranceIdRef = useRef(0);
  const speechActiveRef = useRef(false);

  useEffect(() => {
    if (
      portraitImgRef.current?.complete &&
      portraitImgRef.current.naturalWidth > 0
    ) {
      setPortraitLoaded(true);
    }
  }, []);

  const syncPlayingState = useCallback(() => {
    const audioPlaying = Boolean(
      audioRef.current && !audioRef.current.paused && !audioRef.current.ended
    );
    setIsPlaying(speechActiveRef.current || audioPlaying);
  }, []);

  const stopSpeech = useCallback(() => {
    utteranceIdRef.current += 1;
    speechActiveRef.current = false;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const speakWelcomeMessage = useCallback(
    (onBlocked?: () => void) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        return false;
      }

      const nextId = ++utteranceIdRef.current;
      speechActiveRef.current = false;
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance('Welcome to my portfolio.');
      utterance.lang = 'en-US';
      utterance.rate = 0.95;
      utterance.pitch = 1;

      const safetyTimer = window.setTimeout(() => {
        if (utteranceIdRef.current === nextId && !speechActiveRef.current) {
          syncPlayingState();
        }
      }, 1500);

      utterance.onstart = () => {
        window.clearTimeout(safetyTimer);
        if (utteranceIdRef.current !== nextId) return;
        speechActiveRef.current = true;
        try {
          sessionStorage.setItem('zoe_welcome_spoken', '1');
        } catch {
          // Ignore storage restrictions
        }
        setIsPlaying(true);
      };

      utterance.onend = () => {
        window.clearTimeout(safetyTimer);
        if (utteranceIdRef.current !== nextId) return;
        speechActiveRef.current = false;
        syncPlayingState();
      };

      utterance.onerror = (event) => {
        window.clearTimeout(safetyTimer);
        if (utteranceIdRef.current !== nextId) return;
        speechActiveRef.current = false;
        syncPlayingState();
        if (event.error === 'not-allowed' && onBlocked) {
          onBlocked();
        }
      };

      window.speechSynthesis.speak(utterance);
      return true;
    },
    [syncPlayingState]
  );

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
        const handleFirstGesture = (event: Event) => {
          if (
            event.target instanceof Element &&
            event.target.closest('[data-welcome-audio-card]')
          ) {
            cleanupInteraction?.();
            cleanupInteraction = undefined;
            return;
          }
          cleanupInteraction?.();
          cleanupInteraction = undefined;
          try {
            if (sessionStorage.getItem('zoe_welcome_spoken') === '1') return;
          } catch {
            // Ignore storage restrictions
          }
          speakWelcomeMessage();
        };
        window.addEventListener('pointerdown', handleFirstGesture);
        window.addEventListener('keydown', handleFirstGesture);
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
        stopSpeech();
      };
    }

    return () => {
      stopSpeech();
    };
  }, [speakWelcomeMessage, stopSpeech]);

  const toggleWelcomeAudio = () => {
    const audio = audioRef.current;
    try {
      sessionStorage.setItem('zoe_welcome_spoken', '1');
    } catch {
      // Ignore storage restrictions
    }

    if (isPlaying) {
      stopSpeech();
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      setIsPlaying(false);
      return;
    }

    spokeFromButtonRef.current = true;
    const speechStarted = speakWelcomeMessage();
    if (audio) {
      audio.volume = 0.25;
      audio.currentTime = 0;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          spokeFromButtonRef.current = false;
          if (!speechStarted) {
            setIsPlaying(false);
          }
        });
    } else if (!speechStarted) {
      setIsPlaying(false);
    }
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
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold text-[#DFC5A6] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#14416F] hover:text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                >
                  <FileDown className="h-4 w-4" />
                  <span>Resume / PDF</span>
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
                      className="relative z-10 h-full min-h-[320px] max-h-[440px] w-full object-cover object-[50%_22%]"
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
      <section className="bg-white dark:bg-[#0D1E34] border-b border-[#DCE3EC] dark:border-[#1F3756]">
        <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <article className="lg:col-span-6 space-y-5">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#B89A7A] dark:text-[#DFC5A6]">
                Introduction
              </p>
              <h2 className="font-display mt-1 text-2xl sm:text-3xl font-bold text-[#0B2D4F] dark:text-[#F0F5FA]">
                Brief Biography
              </h2>
            </div>

            <div className="space-y-4 text-base leading-relaxed text-[#17212E] dark:text-[#D9E4F0] max-w-[65ch]">
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
            <div className="pt-2" data-welcome-audio-card>
              <div className="rounded-2xl border border-[#DCE3EC] dark:border-[#1F3756] bg-[#F6F8FB] dark:bg-[#091526] p-4 sm:p-5 space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <button
                      type="button"
                      onClick={toggleWelcomeAudio}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0B2D4F] dark:bg-[#194775] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#14416F] dark:hover:bg-[#21578D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
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
                    <div className="flex items-center gap-2 text-sm text-[#17212E] dark:text-[#F0F5FA] font-medium">
                      <Volume2 className="h-4 w-4 shrink-0 text-[#0B2D4F] dark:text-[#DFC5A6]" />
                      <span>“Welcome to my portfolio.”</span>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[#5A6B7E] dark:text-[#98AFC7] tabular-nums">
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
                    syncPlayingState();
                  }}
                  onEnded={() => {
                    syncPlayingState();
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
              <p className="text-xs font-semibold tracking-wide text-[#B89A7A] dark:text-[#DFC5A6]">
                Site Directory
              </p>
              <h2 className="font-display mt-1 text-2xl sm:text-3xl font-bold text-[#0B2D4F] dark:text-[#F0F5FA]">
                Explore the Site
              </h2>
            </div>

            <ul className="divide-y divide-[#DCE3EC] dark:divide-[#1F3756] border-y border-[#DCE3EC] dark:border-[#1F3756]">
              {EXPLORE_ITEMS.map((item) => (
                <li key={item.page}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.page)}
                    className="group w-full py-3.5 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors hover:bg-[#F6F8FB] dark:hover:bg-[#10243E] px-2 -mx-2 rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-bold text-[#0B2D4F] dark:text-[#F0F5FA] group-hover:text-[#E63C36] dark:group-hover:text-[#FF746E] transition-colors">
                        <span className="tabular-nums mr-2.5 text-[#B89A7A] dark:text-[#DFC5A6]">
                          {item.num}
                        </span>
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-xs sm:text-sm text-[#5A6B7E] dark:text-[#98AFC7] pl-7">
                        {item.desc}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#5A6B7E] dark:text-[#98AFC7] group-hover:text-[#E63C36] dark:group-hover:text-[#FF746E] group-hover:translate-x-0.5 transition-all shrink-0" />
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
            <p className="text-xs font-semibold tracking-wide text-[#B89A7A] dark:text-[#DFC5A6]">
              Portfolio Work
            </p>
            <h2 className="font-display mt-1 text-2xl sm:text-3xl font-bold text-[#0B2D4F] dark:text-[#F0F5FA]">
              Selected Cybersecurity Builds
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#5A6B7E] dark:text-[#98AFC7]">
              Three defensive Python and web projects built around synthetic datasets.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B2D4F] dark:text-[#F0F5FA] hover:text-[#E63C36] dark:hover:text-[#FF746E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Open full projects page</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              className="flex flex-col rounded-2xl border border-[#DCE3EC] dark:border-[#1F3756] bg-white dark:bg-[#10243E] overflow-hidden transition-all duration-150 hover:border-[#B8C6D8] dark:hover:border-[#345682] hover:shadow-sm"
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
                    ref={(el) => {
                      if (el?.complete && el.naturalWidth > 0 && !loadedImages[project.id]) {
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
                    className="relative z-10 h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02] motion-reduce:transition-none"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center p-6 text-white/80">
                    <Shield className="h-8 w-8 text-[#DFC5A6]" />
                  </div>
                )}
              </button>

              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-medium text-[#5A6B7E] dark:text-[#98AFC7]">
                  {project.category} ·{' '}
                  <span className="tabular-nums">Completed {project.completionDate}</span>
                </p>
                <h3 className="font-display mt-1.5 text-xl font-bold text-[#0B2D4F] dark:text-[#F0F5FA]">
                  {project.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[#17212E] dark:text-[#D9E4F0]">
                  {project.summary}
                </p>
                <p className="mt-4 text-xs font-medium text-[#5A6B7E] dark:text-[#98AFC7]">
                  {project.stack.join(' · ')}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-[#DCE3EC] dark:border-[#1F3756] pt-4 text-sm font-semibold">
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="text-[#0B2D4F] dark:text-[#F0F5FA] hover:text-[#E63C36] dark:hover:text-[#FF746E] transition-colors cursor-pointer"
                  >
                    Inspect Details
                  </button>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#0B2D4F] dark:text-[#F0F5FA] hover:text-[#E63C36] dark:hover:text-[#FF746E] transition-colors"
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

      {/* Featured Certifications & Badges Strip */}
      <section className="bg-white dark:bg-[#0D1E34] border-t border-[#DCE3EC] dark:border-[#1F3756]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#B89A7A] dark:text-[#DFC5A6]">
                Verified Training · {CERTIFICATIONS.length} Credentials
              </p>
              <h2 className="font-display mt-1 text-2xl sm:text-3xl font-bold text-[#0B2D4F] dark:text-[#F0F5FA]">
                Featured Certifications &amp; Badges
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#5A6B7E] dark:text-[#98AFC7]">
                Selected industry certifications, digital badges, and internship
                credentials.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('about', 'certifications-section')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B2D4F] dark:text-[#F0F5FA] hover:text-[#E63C36] dark:hover:text-[#FF746E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>View all {CERTIFICATIONS.length} certifications</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATIONS.filter((cert) => cert.featured).map((cert) => (
              <article
                key={cert.id}
                className="group flex flex-col justify-between rounded-2xl border border-[#DCE3EC] dark:border-[#1F3756] bg-[#F6F8FB] dark:bg-[#10243E] overflow-hidden transition-colors hover:border-[#9FB1C8] dark:hover:border-[#345682]"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => onSelectCertification(cert)}
                    aria-label={`Inspect ${cert.title}`}
                    className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden border-b border-[#DCE3EC] dark:border-[#1F3756] bg-white p-3 text-left cursor-pointer"
                  >
                    {!loadedCertImages[cert.id] && !failedCertImages[cert.id] && (
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[#DCE3EC] animate-pulse motion-reduce:animate-none"
                      />
                    )}
                    {!failedCertImages[cert.id] ? (
                      <img
                        ref={(el) => {
                          if (
                            el?.complete &&
                            el.naturalWidth > 0 &&
                            !loadedCertImages[cert.id]
                          ) {
                            setLoadedCertImages((prev) => ({
                              ...prev,
                              [cert.id]: true,
                            }));
                          }
                        }}
                        src={cert.previewImage}
                        alt={cert.title}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onLoad={() =>
                          setLoadedCertImages((prev) => ({
                            ...prev,
                            [cert.id]: true,
                          }))
                        }
                        onError={() =>
                          setFailedCertImages((prev) => ({
                            ...prev,
                            [cert.id]: true,
                          }))
                        }
                        className="relative z-10 h-full w-full object-contain transition-transform duration-200 group-hover:scale-[1.03] motion-reduce:transform-none"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-[#5A6B7E]">
                        <Award className="h-8 w-8 text-[#E63C36] mb-1.5" />
                        <span className="text-xs font-medium">{cert.issuer}</span>
                      </div>
                    )}
                  </button>

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-medium text-[#5A6B7E] dark:text-[#98AFC7]">
                        {cert.category}
                      </span>
                      <span className="text-xs font-medium text-[#5A6B7E] dark:text-[#98AFC7] tabular-nums">
                        {cert.date}
                      </span>
                    </div>
                    <h3 className="font-display text-base font-bold text-[#0B2D4F] dark:text-[#F0F5FA] leading-snug">
                      {cert.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-[#17212E] dark:text-[#D9E4F0]">
                      {cert.issuer}
                    </p>
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#5A6B7E] dark:text-[#98AFC7] line-clamp-3">
                      {cert.summary}
                    </p>
                  </div>
                </div>

                <div className="mx-5 mb-5 pt-3 border-t border-[#DCE3EC] dark:border-[#1F3756] flex items-center justify-between gap-2 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => onSelectCertification(cert)}
                    className="inline-flex items-center gap-1.5 text-[#E63C36] dark:text-[#FF746E] hover:text-[#C92D28] dark:hover:text-[#FF948F] transition-colors cursor-pointer"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>Inspect Certificate</span>
                  </button>
                  {cert.verifyUrl ? (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#0B2D4F] dark:text-[#F0F5FA] hover:text-[#E63C36] dark:hover:text-[#FF746E] transition-colors"
                    >
                      <span>Verify</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[#5A6B7E] dark:text-[#98AFC7]">
                      <Award className="h-3.5 w-3.5 text-[#B89A7A] dark:text-[#DFC5A6]" />
                      <span>{cert.isBadge ? 'Digital Badge' : 'Certificate'}</span>
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
