import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PageId } from '../data/portfolioData';
import { SecurityQuiz } from './SecurityQuiz';

interface QuizViewProps {
  onNavigate: (page: PageId) => void;
}

export function QuizView({ onNavigate }: QuizViewProps) {
  return (
    <div>
      {/* Editorial Page Header */}
      <section className="bg-gradient-to-br from-[#0B2D4F] via-[#0B2D4F] to-[#081F37] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
          <p className="text-xs font-semibold tracking-wide text-[#DFC5A6]">
            Interactive Study Check · Cybersecurity Fundamentals
          </p>
          <h1 className="font-display mt-2 text-3xl sm:text-4xl font-bold text-white text-balance">
            Security Knowledge Quiz
          </h1>
          <p className="mt-3 max-w-2xl text-base text-[#DBE6F2]">
            Test your understanding of foundational cybersecurity concepts—including the
            CIA triad, SHA-256 evidence hashing, Cowrie honeypot telemetry, least
            privilege, and UTC log timelines.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-semibold">
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-1.5 text-white hover:text-[#DFC5A6] transition-colors cursor-pointer"
            >
              <span>Explore Cybersecurity Projects</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <span aria-hidden="true" className="text-white/30">
              ·
            </span>
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 text-[#DBE6F2] hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </section>

      <SecurityQuiz />
    </div>
  );
}
