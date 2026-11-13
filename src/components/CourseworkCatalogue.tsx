import { BookOpen, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { MIVA_COURSES } from '../data/portfolioData';

type SemesterFilter = 'All' | 'First Semester' | 'Second Semester';

const SEMESTER_FILTERS: SemesterFilter[] = [
  'All',
  'First Semester',
  'Second Semester',
];

export function CourseworkCatalogue() {
  const [semester, setSemester] = useState<SemesterFilter>('All');

  const visibleCourses =
    semester === 'All'
      ? MIVA_COURSES
      : MIVA_COURSES.filter((course) => course.semester === semester);

  const totalUnits = visibleCourses.reduce((sum, c) => sum + c.units, 0);

  return (
    <section
      aria-labelledby="miva-courses-heading"
      className="bg-white border-t border-[#DCE3EC]"
    >
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h2
              id="miva-courses-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-[#0B2D4F]"
            >
              MIVA Open University Coursework (100L)
            </h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-[#5A6B7E]">
              First Semester completed courses and Second Semester modules currently in
              progress.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <p className="text-xs font-semibold text-[#0B2D4F] tabular-nums">
              {visibleCourses.length} courses · {totalUnits} units
            </p>

            <div
              role="group"
              aria-label="Filter courses by semester"
              className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-[#D8E0EA] bg-[#F6F8FB] p-1"
            >
              {SEMESTER_FILTERS.map((item) => {
                const active = semester === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSemester(item)}
                    aria-pressed={active}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#0B2D4F] text-white'
                        : 'text-[#5A6B7E] hover:text-[#0B2D4F]'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleCourses.map((course) => {
            const isCompleted = course.status === 'Completed';
            return (
              <article
                key={course.code}
                className="flex flex-col justify-between rounded-xl border border-[#D8E0EA] bg-[#F6F8FB] p-5"
              >
                <div>
                  <p className="text-xs font-medium text-[#5A6B7E] tabular-nums">
                    {course.level} · {course.semester}
                  </p>
                  <h3 className="font-display mt-1.5 text-base font-bold text-[#0B2D4F] leading-snug">
                    {course.title}
                  </h3>
                  <p className="mt-1.5 text-xs font-semibold text-[#17212E] tabular-nums">
                    {course.code} · {course.units}{' '}
                    {course.units === 1 ? 'Unit' : 'Units'} · {course.requirement}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#D8E0EA] flex items-center gap-1.5 text-xs font-semibold">
                  {isCompleted ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#2F8F5B] shrink-0" />
                      <span className="text-[#17523A]">Completed</span>
                    </>
                  ) : (
                    <>
                      <BookOpen className="h-3.5 w-3.5 text-[#0B2D4F] shrink-0" />
                      <span className="text-[#0B2D4F]">Enrolled</span>
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
