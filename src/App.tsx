/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ProjectLightbox } from './components/ProjectLightbox';
import { ViewSkeleton } from './components/ViewSkeleton';
import { PageId, PROFILE, ProjectItem } from './data/portfolioData';

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

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    document.title = PAGE_TITLES[currentPage];
  }, [currentPage]);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F8FB] text-[#17212E]">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="flex-1">
        <Suspense fallback={<ViewSkeleton view={currentPage} />}>
          {currentPage === 'home' && (
            <HomeView
              onNavigate={handleNavigate}
              onSelectProject={setSelectedProject}
            />
          )}
          {currentPage === 'about' && <AboutView />}
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
    </div>
  );
}
