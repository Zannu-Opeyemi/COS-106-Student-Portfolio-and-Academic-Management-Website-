import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import { useState } from 'react';

interface QuizQuestion {
  id: string;
  topic: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'cia-triad',
    topic: 'Core Principles',
    prompt:
      'Which pillar of the CIA triad ensures that data has not been altered without authorisation during storage or transit?',
    options: [
      'Confidentiality',
      'Integrity',
      'Availability',
      'Non-repudiation',
    ],
    correctIndex: 1,
    explanation:
      'Integrity guarantees that information remains accurate and unaltered unless modified by an authorised party.',
  },
  {
    id: 'forensic-hashing',
    topic: 'Digital Forensics',
    prompt:
      'Why do forensic investigators compute a SHA-256 hash immediately after acquiring a digital evidence file?',
    options: [
      'To compress the evidence archive before uploading',
      'To encrypt the file so attackers cannot read it',
      'To verify evidence integrity and prove it was not modified',
      'To convert event timestamps to UTC automatically',
    ],
    correctIndex: 2,
    explanation:
      'A cryptographic hash like SHA-256 produces a unique fingerprint; any single-bit change alters the digest, preserving chain-of-custody verification.',
  },
  {
    id: 'honeypot-purpose',
    topic: 'Threat Intelligence',
    prompt:
      'What is the primary defensive purpose of deploying a Cowrie SSH/Telnet honeypot in a controlled lab?',
    options: [
      'To capture attacker commands, payloads, and source-IP indicators safely',
      'To speed up production SSH logins for authorised staff',
      'To replace firewall rules across the entire network',
      'To automatically patch vulnerable kernel packages',
    ],
    correctIndex: 0,
    explanation:
      'Honeypots act as instrumented decoys that log attacker tactics, credentials, and source IPs so defenders can build threat intelligence.',
  },
  {
    id: 'least-privilege',
    topic: 'Access Control',
    prompt:
      'Under the Principle of Least Privilege, what permissions should a standard user or service account receive?',
    options: [
      'Full administrative access during business hours',
      'Only the minimum permissions required to perform its intended task',
      'Read and write access to all system configuration folders',
      'Identical permissions to every other member in the department',
    ],
    correctIndex: 1,
    explanation:
      'Restricting accounts to minimum necessary privileges limits the blast radius if an account or service is compromised.',
  },
  {
    id: 'utc-timelines',
    topic: 'Incident Response',
    prompt:
      'When merging logs from multiple servers during an investigation, why is normalising timestamps to UTC important?',
    options: [
      'It reduces the total disk size of the log files',
      'It hides internal IP addresses from analysts',
      'It prevents timezone offsets from distorting the chronological sequence of events',
      'It automatically removes duplicate failed-login entries',
    ],
    correctIndex: 2,
    explanation:
      'Converting distributed logs to Coordinated Universal Time (UTC) ensures events from different regions align accurately on a single timeline.',
  },
];

export function SecurityQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const hasAnswered = selectedOption !== null;
  const isLastQuestion = currentIndex === QUIZ_QUESTIONS.length - 1;
  const progressPercent = Math.round(
    ((currentIndex + (hasAnswered ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100
  );

  const handleSelectOption = (optionIndex: number) => {
    if (hasAnswered) return;
    setSelectedOption(optionIndex);
    if (optionIndex === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setFinished(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <section
      aria-labelledby="security-quiz-panel-heading"
      className="mx-auto max-w-7xl px-6 py-14"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <aside className="lg:col-span-4 rounded-2xl border border-[#DCE3EC] dark:border-[#1F3756] bg-white dark:bg-[#10243E] p-6 sm:p-7 space-y-5">
          <div>
            <h2
              id="security-quiz-panel-heading"
              className="font-display text-xl font-bold text-[#0B2D4F] dark:text-[#F0F5FA]"
            >
              Session Summary
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-[#5A6B7E] dark:text-[#98AFC7]">
              Select the best answer for each scenario. Explanations appear immediately
              after your selection.
            </p>
          </div>

          <div className="border-t border-[#DCE3EC] dark:border-[#1F3756] pt-4 space-y-3 text-sm tabular-nums">
            <div className="flex items-center justify-between">
              <span className="text-[#5A6B7E] dark:text-[#98AFC7]">Progress</span>
              <span className="font-semibold text-[#0B2D4F] dark:text-[#F0F5FA]">
                {finished ? QUIZ_QUESTIONS.length : currentIndex + 1} /{' '}
                {QUIZ_QUESTIONS.length}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#E6ECF3] dark:bg-[#1F3756]">
              <div
                className="h-full rounded-full bg-[#0B2D4F] dark:bg-[#5D8AB8] transition-all duration-200"
                style={{ width: `${finished ? 100 : progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[#5A6B7E] dark:text-[#98AFC7]">Current Score</span>
              <span className="font-semibold text-[#0B2D4F] dark:text-[#F0F5FA]">
                {score} / {QUIZ_QUESTIONS.length}
              </span>
            </div>
          </div>

          <div className="border-t border-[#DCE3EC] dark:border-[#1F3756] pt-4">
            <p className="text-xs font-medium text-[#5A6B7E] dark:text-[#98AFC7]">
              Topics covered: CIA Triad · SHA-256 Hashing · Honeypots · Least
              Privilege · UTC Timelines
            </p>
          </div>
        </aside>

        <div className="lg:col-span-8 rounded-2xl border border-[#DCE3EC] dark:border-[#1F3756] bg-white dark:bg-[#10243E] p-6 sm:p-8 shadow-xs">
          {finished ? (
            <div className="space-y-5">
              <p className="text-xs font-semibold text-[#5A6B7E] dark:text-[#98AFC7]">Quiz Complete</p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0B2D4F] dark:text-[#F0F5FA] tabular-nums">
                You scored {score} out of {QUIZ_QUESTIONS.length}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#17212E] dark:text-[#D9E4F0]">
                {score === QUIZ_QUESTIONS.length
                  ? 'Full marks. You answered every core principle and forensic workflow question accurately.'
                  : score >= 3
                  ? 'Solid foundation across core defensive concepts. Retake the quiz anytime to review the explanations.'
                  : 'Good starting attempt. Retake the quiz to review integrity hashing, least privilege, and timeline analysis.'}
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-lg bg-[#0B2D4F] dark:bg-[#194775] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#14416F] dark:hover:bg-[#21578D] transition-colors cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Retake Quiz</span>
              </button>
            </div>
          ) : (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#DCE3EC] dark:border-[#1F3756]">
                <span className="text-xs font-semibold text-[#5A6B7E] dark:text-[#98AFC7]">
                  {currentQuestion.topic}
                </span>
                <span className="text-xs font-semibold text-[#0B2D4F] dark:text-[#F0F5FA] tabular-nums">
                  Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}
                </span>
              </div>

              <h3 className="font-display mt-5 text-lg sm:text-xl font-bold text-[#0B2D4F] dark:text-[#F0F5FA] leading-snug">
                {currentQuestion.prompt}
              </h3>

              <div
                className="mt-5 space-y-2.5"
                role="radiogroup"
                aria-label={currentQuestion.prompt}
              >
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQuestion.correctIndex;

                  let stateClasses =
                    'border-[#DCE3EC] dark:border-[#1F3756] bg-[#F6F8FB] dark:bg-[#0B192C] text-[#17212E] dark:text-[#D9E4F0] hover:border-[#0B2D4F] dark:hover:border-[#5D8AB8] hover:bg-white dark:hover:bg-[#162C49]';

                  if (hasAnswered) {
                    if (isCorrect) {
                      stateClasses =
                        'border-[#2F8F5B] bg-[#E6F4EC] dark:bg-[#123325] text-[#17523A] dark:text-[#7FE3AB]';
                    } else if (isSelected && !isCorrect) {
                      stateClasses =
                        'border-[#B3261E] bg-[#FCECEB] dark:bg-[#3A1618] text-[#B3261E] dark:text-[#FF9A94]';
                    } else {
                      stateClasses =
                        'border-[#DCE3EC] dark:border-[#1F3756] bg-[#F6F8FB]/70 dark:bg-[#0B192C]/60 text-[#5A6B7E] dark:text-[#98AFC7]';
                    }
                  }

                  return (
                    <button
                      key={option}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => handleSelectOption(idx)}
                      disabled={hasAnswered}
                      className={`w-full flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-colors ${stateClasses} ${
                        hasAnswered ? 'cursor-default' : 'cursor-pointer'
                      }`}
                    >
                      <span>{option}</span>
                      {hasAnswered && isCorrect && (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#2F8F5B] dark:text-[#7FE3AB]" />
                      )}
                      {hasAnswered && isSelected && !isCorrect && (
                        <XCircle className="h-4 w-4 shrink-0 text-[#B3261E] dark:text-[#FF9A94]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {hasAnswered && (
                <div className="mt-5 rounded-xl border border-[#DCE3EC] dark:border-[#1F3756] bg-[#F6F8FB] dark:bg-[#0B192C] p-4 space-y-3">
                  <p className="text-xs font-bold text-[#0B2D4F] dark:text-[#F0F5FA]">
                    {selectedOption === currentQuestion.correctIndex
                      ? 'Correct'
                      : 'Incorrect'}
                  </p>
                  <p className="text-sm leading-relaxed text-[#17212E] dark:text-[#D9E4F0]">
                    {currentQuestion.explanation}
                  </p>
                  <div className="pt-1 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs font-semibold text-[#5A6B7E] dark:text-[#98AFC7] hover:text-[#0B2D4F] dark:hover:text-[#F0F5FA] transition-colors cursor-pointer"
                    >
                      Restart Quiz
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center justify-center rounded-lg bg-[#E63C36] px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-[#C92D28] transition-colors cursor-pointer"
                    >
                      {isLastQuestion ? 'View Results' : 'Next Question'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
