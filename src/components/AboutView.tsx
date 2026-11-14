import { Check } from 'lucide-react';
import { useState } from 'react';
import {
  CertificationItem,
  EDUCATION,
  HOBBIES,
  PROFILE,
} from '../data/portfolioData';
import { CertificationsCatalogue } from './CertificationsCatalogue';
import { CourseworkCatalogue } from './CourseworkCatalogue';
import { ScrollProgressBar } from './ScrollProgressBar';
import { Skills } from './Skills';

interface AboutViewProps {
  onSelectCertification: (cert: CertificationItem) => void;
}

export function AboutView({ onSelectCertification }: AboutViewProps) {
  const [cardLogoError, setCardLogoError] = useState(false);
  const [tableLogoErrors, setTableLogoErrors] = useState<Record<string, boolean>>({});

  return (
    <div>
      <ScrollProgressBar />
      {/* Editorial Page Header */}
      <section className="bg-gradient-to-br from-[#0B2D4F] via-[#0B2D4F] to-[#081F37] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
          <p className="text-xs font-semibold tracking-wide text-[#DFC5A6]">
            Academic Profile · B.Sc. Cybersecurity
          </p>
          <h1 className="font-display mt-2 text-3xl sm:text-4xl font-bold text-white text-balance">
            About Me
          </h1>
          <p className="mt-2.5 max-w-2xl text-base text-[#DBE6F2]">
            Who I am, what I know, and where I am heading in defensive cybersecurity.
          </p>
        </div>
      </section>

      {/* Educational Background & University Affiliation */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B2D4F] dark:text-[#F0F5FA] mb-6">
          Educational Background
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-8 overflow-x-auto rounded-xl border border-[#D8E0EA] dark:border-[#1F3756] bg-white dark:bg-[#10243E]">
            <table className="w-full h-full border-collapse text-left">
              <caption className="sr-only">Education summary</caption>
              <thead>
                <tr className="bg-[#0B2D4F] dark:bg-[#152D4B] text-white text-xs font-semibold tracking-wide">
                  <th scope="col" className="px-5 py-3.5">
                    Institution
                  </th>
                  <th scope="col" className="px-5 py-3.5">
                    Programme / Level
                  </th>
                  <th scope="col" className="px-5 py-3.5">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D8E0EA] dark:divide-[#1F3756] text-sm">
                {EDUCATION.map((item) => (
                  <tr
                    key={item.institution}
                    className="hover:bg-[#F6F8FB] dark:hover:bg-[#162C49] transition-colors"
                  >
                    <td className="px-5 py-4 font-semibold text-[#0B2D4F] dark:text-[#F0F5FA]">
                      <div className="flex flex-col gap-2">
                        {item.logoUrl && !tableLogoErrors[item.institution] && (
                          <img
                            src={item.logoUrl}
                            alt={`${item.institution} logo`}
                            referrerPolicy="no-referrer"
                            onError={() =>
                              setTableLogoErrors((prev) => ({
                                ...prev,
                                [item.institution]: true,
                              }))
                            }
                            className="h-7 w-auto self-start object-contain dark:rounded dark:bg-white dark:px-1.5 dark:py-0.5"
                          />
                        )}
                        <span>{item.institution}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[#17212E] dark:text-[#D9E4F0]">{item.programme}</td>
                    <td className="px-5 py-4 font-medium text-[#5A6B7E] dark:text-[#98AFC7]">
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside className="lg:col-span-4 rounded-xl bg-[#0B2D4F] text-white border border-[#0B2D4F] dark:border-[#1F3756] p-6 flex flex-col justify-between gap-5">
            {!cardLogoError ? (
              <div className="flex items-center justify-center rounded-lg overflow-hidden bg-[#0B2D4F]">
                <img
                  src={PROFILE.mivaLogoCard}
                  alt="MIVA Open University emblem"
                  referrerPolicy="no-referrer"
                  onError={() => setCardLogoError(true)}
                  className="h-36 w-auto object-contain"
                />
              </div>
            ) : (
              <p className="font-display text-xl font-bold text-white">
                {PROFILE.university}
              </p>
            )}
            <div className="border-t border-white/15 pt-4 text-sm">
              <p className="font-semibold text-white">B.Sc. Cybersecurity</p>
              <p className="mt-1 text-xs text-[#DBE6F2]">{PROFILE.course}</p>
            </div>
          </aside>
        </div>
      </section>

      {/* Career Aspirations, Hobbies & Integrated Skills Component */}
      <section className="bg-white dark:bg-[#0D1E34] border-t border-[#DCE3EC] dark:border-[#1F3756]">
        <div className="mx-auto max-w-7xl px-6 py-14 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-10">
            <article>
              <h2 className="font-display text-2xl font-bold text-[#0B2D4F] dark:text-[#F0F5FA]">
                Career Aspirations
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#17212E] dark:text-[#D9E4F0]">
                I want to build a career in cybersecurity as a security analyst,
                working in threat intelligence and digital forensics. My goal is to
                help organisations detect attacks early, investigate incidents
                carefully, and report findings clearly.
              </p>
            </article>

            <article className="border-t border-[#D8E0EA] dark:border-[#1F3756] pt-8">
              <h2 className="font-display text-2xl font-bold text-[#0B2D4F] dark:text-[#F0F5FA]">
                Hobbies and Interests
              </h2>
              <ul className="mt-4 space-y-3">
                {HOBBIES.map((hobby) => (
                  <li
                    key={hobby}
                    className="flex items-center gap-3 text-sm sm:text-base text-[#17212E] dark:text-[#D9E4F0]"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-[#F6F8FB] dark:bg-[#10243E] border border-[#D8E0EA] dark:border-[#294568] text-[#E63C36] dark:text-[#FF746E] shrink-0">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span>{hobby}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="lg:col-span-7">
            <Skills />
          </div>
        </div>
      </section>

      <CertificationsCatalogue onSelectCertification={onSelectCertification} />

      <CourseworkCatalogue />
    </div>
  );
}
