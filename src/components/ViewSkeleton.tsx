import { PageId } from '../data/portfolioData';

export function GitHubActivitySkeleton() {
  return (
    <div
      className="pt-6 space-y-6"
      aria-busy="true"
      aria-label="Loading GitHub repository activity"
    >
      {/* 4 KPI Summary Card Skeletons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((idx) => (
          <div
            key={idx}
            className="rounded-xl border border-[#D8E0EA] bg-[#F6F8FB] p-4 space-y-2.5"
          >
            <div className="h-3 w-24 rounded bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
            <div className="h-7 w-14 rounded bg-[#CED8E5] animate-pulse motion-reduce:animate-none" />
          </div>
        ))}
      </div>

      {/* Repository Table Skeleton */}
      <div className="overflow-hidden rounded-xl border border-[#D8E0EA] bg-white">
        <div className="bg-[#0B2D4F] px-5 py-3 grid grid-cols-12 gap-4">
          <div className="col-span-5 h-3 w-24 rounded bg-white/25" />
          <div className="col-span-3 h-3 w-24 rounded bg-white/25 hidden sm:block" />
          <div className="col-span-2 h-3 w-16 rounded bg-white/25 hidden sm:block" />
          <div className="col-span-2 h-3 w-16 rounded bg-white/25 hidden sm:block" />
        </div>
        <div className="divide-y divide-[#D8E0EA]">
          {[0, 1, 2, 3].map((row) => (
            <div
              key={row}
              className="px-5 py-4 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center"
            >
              <div className="sm:col-span-5 space-y-2">
                <div className="h-4 w-48 max-w-full rounded bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
                <div className="h-3 w-64 max-w-full rounded bg-[#EEF2F6] animate-pulse motion-reduce:animate-none" />
              </div>
              <div className="sm:col-span-3">
                <div className="h-3.5 w-20 rounded bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
              </div>
              <div className="sm:col-span-2">
                <div className="h-3.5 w-14 rounded bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
              </div>
              <div className="sm:col-span-2">
                <div className="h-3.5 w-20 rounded bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PageHeaderSkeleton({ wide = false }: { wide?: boolean }) {
  return (
    <section className="bg-gradient-to-br from-[#0B2D4F] via-[#0B2D4F] to-[#081F37]">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 space-y-3">
        <div className="h-3.5 w-44 rounded bg-white/20 animate-pulse motion-reduce:animate-none" />
        <div className="h-9 w-64 max-w-full rounded-lg bg-white/25 animate-pulse motion-reduce:animate-none" />
        <div
          className={`h-4 rounded bg-white/15 animate-pulse motion-reduce:animate-none ${
            wide ? 'w-full max-w-2xl' : 'w-96 max-w-full'
          }`}
        />
      </div>
    </section>
  );
}

export function ViewSkeleton({ view }: { view: PageId }) {
  if (view === 'home') {
    return (
      <div aria-busy="true" aria-label="Loading Home view">
        {/* Hero Skeleton */}
        <section className="bg-gradient-to-br from-[#0B2D4F] via-[#0B2D4F] to-[#081F37]">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
              <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
                <div className="h-4 w-56 rounded bg-white/20 animate-pulse motion-reduce:animate-none" />
                <div className="space-y-3">
                  <div className="h-11 w-full max-w-lg rounded-lg bg-white/25 animate-pulse motion-reduce:animate-none" />
                  <div className="h-11 w-3/4 max-w-md rounded-lg bg-white/25 animate-pulse motion-reduce:animate-none" />
                </div>
                <div className="space-y-2.5 pt-2">
                  <div className="h-4 w-full max-w-xl rounded bg-white/15 animate-pulse motion-reduce:animate-none" />
                  <div className="h-4 w-5/6 max-w-lg rounded bg-white/15 animate-pulse motion-reduce:animate-none" />
                </div>
                <div className="pt-4 flex flex-wrap gap-4">
                  <div className="h-11 w-40 rounded-lg bg-[#E63C36]/75 animate-pulse motion-reduce:animate-none" />
                  <div className="h-11 w-44 rounded-lg bg-white/15 animate-pulse motion-reduce:animate-none" />
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="w-full max-w-sm lg:max-w-md rounded-2xl bg-white p-2 shadow-2xl">
                  <div className="h-[340px] w-full rounded-xl bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
                  <div className="flex items-center justify-between px-3 pt-3 pb-1.5">
                    <div className="h-3.5 w-36 rounded bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
                    <div className="h-3.5 w-24 rounded bg-[#EEF2F6] animate-pulse motion-reduce:animate-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/15 bg-[#08213B]">
            <div className="mx-auto max-w-7xl px-6 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[0, 1, 2, 3].map((idx) => (
                <div key={idx} className="space-y-2">
                  <div className="h-3 w-24 rounded bg-white/15 animate-pulse motion-reduce:animate-none" />
                  <div className="h-5 w-32 rounded bg-white/25 animate-pulse motion-reduce:animate-none" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Biography & Directory Skeleton */}
        <section className="bg-white border-b border-[#DCE3EC]">
          <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-2">
                <div className="h-3 w-24 rounded bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
                <div className="h-8 w-48 rounded-lg bg-[#CED8E5] animate-pulse motion-reduce:animate-none" />
              </div>
              <div className="space-y-2.5">
                <div className="h-4 w-full rounded bg-[#EEF2F6] animate-pulse motion-reduce:animate-none" />
                <div className="h-4 w-11/12 rounded bg-[#EEF2F6] animate-pulse motion-reduce:animate-none" />
                <div className="h-4 w-4/5 rounded bg-[#EEF2F6] animate-pulse motion-reduce:animate-none" />
              </div>
              <div className="h-28 w-full rounded-2xl border border-[#DCE3EC] bg-[#F6F8FB] animate-pulse motion-reduce:animate-none" />
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-2">
                <div className="h-3 w-24 rounded bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
                <div className="h-8 w-44 rounded-lg bg-[#CED8E5] animate-pulse motion-reduce:animate-none" />
              </div>
              <div className="divide-y divide-[#DCE3EC] border-y border-[#DCE3EC]">
                {[0, 1, 2, 3, 4].map((item) => (
                  <div key={item} className="py-3.5 space-y-2">
                    <div className="h-4 w-40 rounded bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
                    <div className="h-3 w-72 max-w-full rounded bg-[#EEF2F6] animate-pulse motion-reduce:animate-none" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Preview Skeleton */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[0, 1, 2].map((card) => (
              <div
                key={card}
                className="rounded-2xl border border-[#DCE3EC] bg-white overflow-hidden"
              >
                <div className="aspect-[16/10] w-full bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
                <div className="p-6 space-y-3">
                  <div className="h-3 w-36 rounded bg-[#EEF2F6] animate-pulse motion-reduce:animate-none" />
                  <div className="h-6 w-48 rounded bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
                  <div className="h-4 w-full rounded bg-[#EEF2F6] animate-pulse motion-reduce:animate-none" />
                  <div className="h-4 w-4/5 rounded bg-[#EEF2F6] animate-pulse motion-reduce:animate-none" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (view === 'about') {
    return (
      <div aria-busy="true" aria-label="Loading About view">
        <PageHeaderSkeleton />
        <section className="mx-auto max-w-7xl px-6 py-14 space-y-8">
          <div className="h-8 w-64 rounded-lg bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 rounded-xl border border-[#D8E0EA] bg-white overflow-hidden">
              <div className="h-11 bg-[#0B2D4F]" />
              <div className="divide-y divide-[#D8E0EA] p-5 space-y-4">
                {[0, 1, 2].map((row) => (
                  <div key={row} className="pt-3 first:pt-0 grid grid-cols-3 gap-4">
                    <div className="h-4 w-4/5 rounded bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
                    <div className="h-4 w-3/4 rounded bg-[#EEF2F6] animate-pulse motion-reduce:animate-none" />
                    <div className="h-4 w-1/2 rounded bg-[#EEF2F6] animate-pulse motion-reduce:animate-none" />
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-4 h-64 rounded-xl bg-[#0B2D4F]/90 p-6 flex flex-col justify-between">
              <div className="h-32 w-full rounded-lg bg-white/10 animate-pulse motion-reduce:animate-none" />
              <div className="space-y-2 border-t border-white/15 pt-4">
                <div className="h-4 w-36 rounded bg-white/20 animate-pulse motion-reduce:animate-none" />
                <div className="h-3 w-48 rounded bg-white/15 animate-pulse motion-reduce:animate-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-4">
            {[0, 1, 2, 3].map((card) => (
              <div
                key={card}
                className="h-36 rounded-xl border border-[#D8E0EA] bg-white p-5 space-y-3"
              >
                <div className="h-3 w-20 rounded bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
                <div className="h-5 w-40 rounded bg-[#CED8E5] animate-pulse motion-reduce:animate-none" />
                <div className="h-3 w-28 rounded bg-[#EEF2F6] animate-pulse motion-reduce:animate-none" />
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (view === 'projects') {
    return (
      <div aria-busy="true" aria-label="Loading Projects view">
        <PageHeaderSkeleton />
        <section className="mx-auto max-w-7xl px-6 py-14 space-y-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="h-10 w-80 max-w-full rounded-xl border border-[#DCE3EC] bg-white animate-pulse motion-reduce:animate-none" />
            <div className="h-4 w-32 rounded bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {[0, 1, 2].map((card) => (
              <div
                key={card}
                className="rounded-2xl border border-[#DCE3EC] bg-white overflow-hidden"
              >
                <div className="aspect-[16/10] w-full bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
                <div className="p-6 space-y-3">
                  <div className="h-3 w-40 rounded bg-[#EEF2F6] animate-pulse motion-reduce:animate-none" />
                  <div className="h-6 w-52 max-w-full rounded bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
                  <div className="h-4 w-full rounded bg-[#EEF2F6] animate-pulse motion-reduce:animate-none" />
                  <div className="h-4 w-5/6 rounded bg-[#EEF2F6] animate-pulse motion-reduce:animate-none" />
                  <div className="pt-4 border-t border-[#DCE3EC] flex justify-between">
                    <div className="h-4 w-24 rounded bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
                    <div className="h-4 w-24 rounded bg-[#EEF2F6] animate-pulse motion-reduce:animate-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-[#D8E0EA] bg-white p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D8E0EA] pb-5">
              <div className="space-y-2">
                <div className="h-7 w-60 rounded bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
                <div className="h-4 w-48 rounded bg-[#EEF2F6] animate-pulse motion-reduce:animate-none" />
              </div>
              <div className="flex gap-3">
                <div className="h-9 w-28 rounded-lg bg-[#EEF2F6] animate-pulse motion-reduce:animate-none" />
                <div className="h-9 w-28 rounded-lg bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
              </div>
            </div>
            <GitHubActivitySkeleton />
          </div>
        </section>
      </div>
    );
  }

  if (view === 'planner') {
    return (
      <div aria-busy="true" aria-label="Loading Academic Planner view">
        <PageHeaderSkeleton wide />
        <section className="mx-auto max-w-7xl px-6 py-14 space-y-8">
          <div className="rounded-2xl border border-[#D8E0EA] bg-white p-6 grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5 h-11 rounded-lg bg-[#EEF2F6] animate-pulse motion-reduce:animate-none" />
            <div className="md:col-span-3 h-11 rounded-lg bg-[#EEF2F6] animate-pulse motion-reduce:animate-none" />
            <div className="md:col-span-2 h-11 rounded-lg bg-[#EEF2F6] animate-pulse motion-reduce:animate-none" />
            <div className="md:col-span-2 h-11 rounded-lg bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
          </div>

          <div className="flex justify-between items-center">
            <div className="h-5 w-64 rounded bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
            <div className="h-9 w-48 rounded-lg bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
          </div>

          <div className="space-y-3">
            {[0, 1, 2].map((row) => (
              <div
                key={row}
                className="h-20 rounded-xl border border-[#D8E0EA] bg-white px-5 py-4 flex items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-64 max-w-full rounded bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
                  <div className="h-3 w-40 rounded bg-[#EEF2F6] animate-pulse motion-reduce:animate-none" />
                </div>
                <div className="h-8 w-20 rounded-lg bg-[#EEF2F6] animate-pulse motion-reduce:animate-none" />
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (view === 'quiz') {
    return (
      <div aria-busy="true" aria-label="Loading Security Quiz view">
        <PageHeaderSkeleton wide />
        <section className="mx-auto max-w-7xl px-6 py-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-4">
            <div className="h-3.5 w-28 rounded bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
            <div className="h-8 w-56 rounded-lg bg-[#CED8E5] animate-pulse motion-reduce:animate-none" />
            <div className="h-20 w-full rounded-xl bg-[#EEF2F6] animate-pulse motion-reduce:animate-none" />
            <div className="h-14 w-full rounded-xl border border-[#DCE3EC] bg-white animate-pulse motion-reduce:animate-none" />
          </div>
          <div className="lg:col-span-8 rounded-2xl border border-[#DCE3EC] bg-white p-6 sm:p-8 space-y-5">
            <div className="h-4 w-36 rounded bg-[#EEF2F6] animate-pulse motion-reduce:animate-none" />
            <div className="h-7 w-4/5 rounded bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
            <div className="space-y-3 pt-2">
              {[0, 1, 2, 3].map((opt) => (
                <div
                  key={opt}
                  className="h-12 w-full rounded-xl border border-[#DCE3EC] bg-[#F6F8FB] animate-pulse motion-reduce:animate-none"
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div aria-busy="true" aria-label="Loading Contact view">
      <PageHeaderSkeleton wide />
      <section className="mx-auto max-w-7xl px-6 py-14 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 rounded-2xl border border-[#D8E0EA] bg-white p-6 sm:p-8 space-y-5">
          {[0, 1, 2].map((field) => (
            <div key={field} className="space-y-2">
              <div className="h-4 w-28 rounded bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
              <div className="h-11 w-full rounded-lg bg-[#EEF2F6] animate-pulse motion-reduce:animate-none" />
            </div>
          ))}
          <div className="space-y-2">
            <div className="h-4 w-24 rounded bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
            <div className="h-32 w-full rounded-lg bg-[#EEF2F6] animate-pulse motion-reduce:animate-none" />
          </div>
          <div className="h-11 w-36 rounded-lg bg-[#E63C36]/75 animate-pulse motion-reduce:animate-none" />
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="h-8 w-52 rounded-lg bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
          <div className="rounded-2xl border border-[#D8E0EA] bg-white divide-y divide-[#D8E0EA]">
            {[0, 1, 2, 3].map((channel) => (
              <div key={channel} className="p-5 space-y-2">
                <div className="h-3 w-20 rounded bg-[#EEF2F6] animate-pulse motion-reduce:animate-none" />
                <div className="h-4 w-48 rounded bg-[#DCE3EC] animate-pulse motion-reduce:animate-none" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
