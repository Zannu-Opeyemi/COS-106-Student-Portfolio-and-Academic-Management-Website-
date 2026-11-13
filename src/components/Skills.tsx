import { useState } from 'react';
import { SkillCategory, SKILLS } from '../data/portfolioData';

const SKILL_FILTERS: ('All' | SkillCategory)[] = [
  'All',
  'Security & Forensics',
  'Systems & Networking',
  'Development',
];

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | SkillCategory>('All');

  const filteredSkills =
    selectedCategory === 'All'
      ? SKILLS
      : SKILLS.filter((skill) => skill.category === selectedCategory);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#0B2D4F]">
            Technical Skills
          </h2>
          <p className="mt-1 text-sm text-[#5A6B7E]">
            Core proficiencies across security analysis, Linux systems, networking, and Python.
          </p>
        </div>

        <span className="text-xs font-medium text-[#5A6B7E] tabular-nums shrink-0">
          {filteredSkills.length} of {SKILLS.length} skills
        </span>
      </div>

      {/* Category Filter Tabs */}
      <div
        role="group"
        aria-label="Filter technical skills by category"
        className="mb-5 inline-flex flex-wrap items-center gap-1 rounded-xl border border-[#D8E0EA] bg-[#F6F8FB] p-1"
      >
        {SKILL_FILTERS.map((category) => {
          const active = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              aria-pressed={active}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                active
                  ? 'bg-[#0B2D4F] text-white'
                  : 'text-[#5A6B7E] hover:text-[#0B2D4F]'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Skills Proficiency Table */}
      <div className="overflow-x-auto rounded-xl border border-[#D8E0EA] bg-[#F6F8FB]">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Technical skills and proficiency level</caption>
          <thead>
            <tr className="bg-[#0B2D4F] text-white text-xs font-semibold tracking-wide">
              <th scope="col" className="px-5 py-3.5">
                Skill &amp; Applied Focus
              </th>
              <th scope="col" className="px-5 py-3.5 w-44 sm:w-56">
                Proficiency
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D8E0EA] bg-white text-sm">
            {filteredSkills.map((skill) => (
              <tr
                key={skill.name}
                className="hover:bg-[#F6F8FB] transition-colors"
              >
                <td className="px-5 py-4">
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                    <span className="font-semibold text-[#0B2D4F]">{skill.name}</span>
                    <span className="text-xs text-[#5A6B7E]">{skill.category}</span>
                  </div>
                  <p className="mt-1 text-xs text-[#17212E] leading-relaxed">
                    {skill.focus}
                  </p>
                  <p className="mt-1 text-xs text-[#5A6B7E]">{skill.tools}</p>
                </td>
                <td className="px-5 py-4 align-middle">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-2 flex-1 overflow-hidden rounded-full bg-[#D8E0EA]"
                      role="progressbar"
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${skill.name}: ${skill.level} percent`}
                    >
                      <div
                        className="h-full rounded-full bg-[#E63C36]"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-xs font-semibold text-[#0B2D4F] tabular-nums">
                      {skill.level}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
