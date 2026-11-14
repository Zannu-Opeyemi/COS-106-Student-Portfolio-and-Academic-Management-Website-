import { FileDown, Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ThemeMode } from '../App';
import { PageId, PROFILE } from '../data/portfolioData';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenResume: () => void;
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'planner', label: 'Planner' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({
  currentPage,
  onNavigate,
  theme,
  onToggleTheme,
  onOpenResume,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const handleSelect = (page: PageId) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B2D4F]/98 backdrop-blur-xs text-white border-b border-white/10 print:hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 sm:gap-4 lg:gap-8 px-4 sm:px-6 py-4">
        {/* Zone 1: Brand wordmark + MIVA institutional mark */}
        <button
          type="button"
          onClick={() => handleSelect('home')}
          className="flex min-w-0 flex-1 lg:flex-none lg:shrink-0 items-center gap-2.5 sm:gap-3 font-display text-sm sm:text-lg font-bold tracking-tight text-white whitespace-nowrap text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#E63C36] focus-visible:outline-offset-4 rounded"
        >
          {!logoError && (
            <img
              src={PROFILE.mivaLogoDarkBg}
              alt="MIVA Open University"
              referrerPolicy="no-referrer"
              onError={() => setLogoError(true)}
              className="h-6 sm:h-7 w-auto object-contain shrink-0"
            />
          )}
          <span
            aria-hidden="true"
            className={`${logoError ? 'hidden' : 'inline-block'} h-4 sm:h-5 w-px bg-white/25 shrink-0`}
          />
          <span className="truncate">{PROFILE.name}</span>
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-5 lg:gap-7 shrink-0">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#E63C36] focus-visible:outline-offset-4 rounded ${
                  isActive
                    ? 'text-white'
                    : 'text-[#DBE6F2] hover:text-white'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-0.5 bg-[#E63C36] transition-opacity duration-150 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Theme toggle + primary action + mobile menu trigger */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={
              theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            }
            aria-pressed={theme === 'dark'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/25 bg-white/5 px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-medium text-white whitespace-nowrap shrink-0 hover:bg-[#14416F] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-[#DFC5A6]" />
            ) : (
              <Moon className="h-4 w-4 text-[#DBE6F2]" />
            )}
            <span className="hidden lg:inline">
              {theme === 'dark' ? 'Light' : 'Dark'}
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenResume}
            aria-label="Open print-friendly resume and PDF export"
            title="Resume / Export PDF"
            className="hidden md:inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/25 bg-white/5 px-3 py-2 text-xs sm:text-sm font-medium text-white whitespace-nowrap shrink-0 hover:bg-[#14416F] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            <FileDown className="h-4 w-4 text-[#DFC5A6]" />
            <span className="hidden lg:inline">Resume PDF</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelect('contact')}
            className="hidden md:inline-flex items-center justify-center rounded-lg bg-[#E63C36] px-4 py-2 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#C92D28] cursor-pointer focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            Get in Touch
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex md:hidden items-center justify-center rounded-lg border border-white/25 px-3 py-2 text-sm font-medium text-white whitespace-nowrap shrink-0 hover:bg-[#14416F] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="h-4 w-4 mr-1.5" /> : <Menu className="h-4 w-4 mr-1.5" />}
            <span>{mobileOpen ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <nav
          id="mobile-nav-menu"
          aria-label="Mobile navigation"
          className="md:hidden border-t border-white/10 bg-[#092440] px-6 py-4"
        >
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#14416F] text-white'
                        : 'text-[#DBE6F2] hover:bg-[#14416F]/60 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
            <li className="pt-2 mt-1 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenResume();
                }}
                className="flex w-full items-center gap-2 rounded-lg bg-white/10 px-3 py-2.5 text-left text-sm font-semibold text-[#DFC5A6] hover:bg-[#14416F] hover:text-white transition-colors cursor-pointer"
              >
                <FileDown className="h-4 w-4 shrink-0" />
                <span>Resume / Save as PDF</span>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
