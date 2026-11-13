import { useState } from 'react';
import { PageId, PROFILE } from '../data/portfolioData';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

const FOOTER_LINKS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'planner', label: 'Planner' },
  { id: 'quiz', label: 'Security Quiz' },
  { id: 'contact', label: 'Contact' },
];

export function Footer({ onNavigate }: FooterProps) {
  const [logoError, setLogoError] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B2D4F] text-[#DBE6F2] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="flex items-center gap-5">
          {!logoError ? (
            <img
              src={PROFILE.mivaLogoDarkBg}
              alt="MIVA Open University logo"
              referrerPolicy="no-referrer"
              onError={() => setLogoError(true)}
              className="h-10 w-auto object-contain shrink-0"
            />
          ) : (
            <span className="font-display text-base font-bold text-white">
              {PROFILE.university}
            </span>
          )}
          <div className="border-l border-white/20 pl-5 text-sm leading-relaxed">
            <p className="font-semibold text-white">{PROFILE.name}</p>
            <p className="text-[#BFD0E2]">Built for {PROFILE.course}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-sm">
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-5">
            {FOOTER_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => onNavigate(link.id)}
                className="text-[#DBE6F2] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>
          <p className="text-xs text-[#BFD0E2] tabular-nums whitespace-nowrap">
            &copy; {currentYear} {PROFILE.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
