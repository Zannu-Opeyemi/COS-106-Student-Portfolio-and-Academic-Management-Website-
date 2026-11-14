/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, useEffect, useState } from 'react';
import { CertificationLightbox } from './components/CertificationLightbox';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ProjectLightbox } from './components/ProjectLightbox';
import { ViewSkeleton } from './components/ViewSkeleton';
import {
  CertificationItem,
  PageId,
  PROFILE,
  ProjectItem,
} from './data/portfolioData';

const HomeView = lazy(() =>
  import('./components/HomeView').then((m) => ({ default: m.HomeView }))
);
const AboutView = lazy(() =>
  import('./components/AboutView').then((m) => ({ default: m.AboutView }))
);
const ProjectsView = lazy(() =>
  import('./components/ProjectsView').then((m) => ({ default: m.ProjectsView }))
);
const PlannerView = lazy(() =>
  import('./components/PlannerView').then((m) => ({ default: m.PlannerView }))
);
const QuizView = lazy(() =>
  import('./components/QuizView').then((m) => ({ default: m.QuizView }))
);
const ContactView = lazy(() =>
  import('./components/ContactView').then((m) => ({ default: m.ContactView }))
);

const PAGE_TITLES: Record<PageId, string> = {
  home: `Home | ${PROFILE.name}`,
  about: `About Me | ${PROFILE.name}`,
  projects: `Projects | ${PROFILE.name}`,
  planner: `Academic Planner | ${PROFILE.name}`,
  quiz: `Security Quiz | ${PROFILE.name}`,
  contact: `Contact | ${PROFILE.name}`,
};

export type ThemeMode = 'light' | 'dark';

const THEME_STORAGE_KEY = 'zoe_theme';

function getInitialTheme(): ThemeMode {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ) {
      return 'dark';
    }
  } catch {
    // Ignore storage restrictions
  }
  return 'light';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedCertification, setSelectedCertification] =
    useState<CertificationItem | null>(null);
  const [pendingSectionId, setPendingSectionId] = useState<string | null>(null);
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage write errors in private contexts
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    document.title = PAGE_TITLES[currentPage];
  }, [currentPage]);

  useEffect(() => {
    if (!pendingSectionId) return;
    let attempts = 0;
    const maxAttempts = 60;
    const interval = window.setInterval(() => {
      attempts += 1;
      const target = document.getElementById(pendingSectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setPendingSectionId(null);
        window.clearInterval(interval);
      } else if (attempts >= maxAttempts) {
        setPendingSectionId(null);
        window.clearInterval(interval);
      }
    }, 50);

    return () => window.clearInterval(interval);
  }, [currentPage, pendingSectionId]);

  const handleNavigate = (page: PageId, sectionId?: string) => {
    setSelectedProject(null);
    setSelectedCertification(null);
    setCurrentPage(page);
    if (sectionId) {
      setPendingSectionId(sectionId);
    } else {
      setPendingSectionId(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F8FB] dark:bg-[#091526] text-[#17212E] dark:text-[#D9E4F0] transition-colors duration-200 motion-reduce:transition-none">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main className="flex-1">
        <Suspense fallback={<ViewSkeleton view={currentPage} />}>
          {currentPage === 'home' && (
            <HomeView
              onNavigate={handleNavigate}
              onSelectProject={setSelectedProject}
              onSelectCertification={setSelectedCertification}
            />
          )}
          {currentPage === 'about' && (
            <AboutView onSelectCertification={setSelectedCertification} />
          )}
          {currentPage === 'projects' && (
            <ProjectsView
              onSelectProject={setSelectedProject}
              onNavigate={handleNavigate}
            />
          )}
          {currentPage === 'planner' && <PlannerView />}
          {currentPage === 'quiz' && <QuizView onNavigate={handleNavigate} />}
          {currentPage === 'contact' && <ContactView />}
        </Suspense>
      </main>

      <Footer onNavigate={handleNavigate} />

      <ProjectLightbox
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CertificationLightbox
        certification={selectedCertification}
        onClose={() => setSelectedCertification(null)}
      />
    </div>
  );
}
