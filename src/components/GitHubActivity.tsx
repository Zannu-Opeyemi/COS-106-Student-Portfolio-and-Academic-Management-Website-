import { ExternalLink, GitFork, RefreshCw, Star } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PROFILE } from '../data/portfolioData';
import { GitHubActivitySkeleton } from './ViewSkeleton';

const GITHUB_USERNAME = 'Zannu-Opeyemi';

interface GitHubUser {
  login: string;
  name: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  updated_at: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function GitHubActivity() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchActivity = useCallback(async () => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;
    const { signal } = controller;

    setLoading(true);
    setError(null);

    try {
      const headers: HeadersInit = {
        Accept: 'application/vnd.github+json',
      };

      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
          headers,
          signal,
        }),
        fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=6`,
          {
            headers,
            signal,
          }
        ),
      ]);

      if (!userRes.ok) {
        if (userRes.status === 403) {
          throw new Error(
            'GitHub API rate limit reached. Try refreshing in a moment or view repositories directly on GitHub.'
          );
        }
        throw new Error(`GitHub profile request failed (HTTP ${userRes.status}).`);
      }

      if (!reposRes.ok) {
        if (reposRes.status === 403) {
          throw new Error(
            'GitHub API rate limit reached. Try refreshing in a moment or view repositories directly on GitHub.'
          );
        }
        throw new Error(`GitHub repositories request failed (HTTP ${reposRes.status}).`);
      }

      const [userData, reposData]: [GitHubUser, GitHubRepo[]] = await Promise.all([
        userRes.json(),
        reposRes.json(),
      ]);

      setUser(userData);
      setRepos(Array.isArray(reposData) ? reposData : []);
      setLastSynced(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to reach GitHub right now.'
      );
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchActivity();
    return () => {
      abortControllerRef.current?.abort();
    };
  }, [fetchActivity]);

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);

  return (
    <section
      aria-labelledby="github-activity-heading"
      className="mt-14 rounded-2xl border border-[#D8E0EA] dark:border-[#1F3756] bg-white dark:bg-[#10243E] p-6 sm:p-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D8E0EA] dark:border-[#1F3756] pb-5">
        <div>
          <h2
            id="github-activity-heading"
            className="font-display text-2xl font-bold text-[#0B2D4F] dark:text-[#F0F5FA]"
          >
            GitHub Repository Activity
          </h2>
          <p className="mt-1 text-sm text-[#5A6B7E] dark:text-[#98AFC7]">
            Live repository metrics for{' '}
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#0B2D4F] dark:text-[#F0F5FA] underline decoration-[#D8E0EA] dark:decoration-[#294568] underline-offset-4 hover:text-[#E63C36] dark:hover:text-[#FF746E]"
            >
              @{GITHUB_USERNAME}
            </a>
            {lastSynced && (
              <span className="tabular-nums"> · Synced at {lastSynced}</span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => fetchActivity()}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#D8E0EA] dark:border-[#294568] bg-[#F6F8FB] dark:bg-[#0B192C] px-3.5 py-2 text-xs font-semibold text-[#0B2D4F] dark:text-[#F0F5FA] hover:bg-[#EEF3F9] dark:hover:bg-[#162C49] disabled:opacity-60 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Refreshing' : 'Refresh Stats'}</span>
          </button>

          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0B2D4F] dark:bg-[#194775] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#14416F] dark:hover:bg-[#21578D] transition-colors whitespace-nowrap shrink-0"
          >
            <span>Open GitHub</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && <GitHubActivitySkeleton />}

      {/* Error State */}
      {!loading && error && (
        <div className="mt-6 rounded-xl border border-[#B3261E]/30 dark:border-[#B3261E]/50 bg-[#FCECEB] dark:bg-[#3A1618] p-5 text-sm text-[#17212E] dark:text-[#D9E4F0]">
          <p className="font-semibold text-[#B3261E] dark:text-[#FF9A94]">{error}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => fetchActivity()}
              className="rounded-lg bg-[#0B2D4F] dark:bg-[#194775] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#14416F] dark:hover:bg-[#21578D] transition-colors cursor-pointer"
            >
              Try Again
            </button>
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#0B2D4F] dark:text-[#F0F5FA] underline underline-offset-4 hover:text-[#E63C36] dark:hover:text-[#FF746E]"
            >
              Visit github.com/{GITHUB_USERNAME}
            </a>
          </div>
        </div>
      )}

      {/* Loaded GitHub Stats & Repositories */}
      {!loading && !error && user && (
        <div className="pt-6 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-xl border border-[#D8E0EA] dark:border-[#1F3756] bg-[#F6F8FB] dark:bg-[#0B192C] p-4">
              <p className="text-xs font-medium text-[#5A6B7E] dark:text-[#98AFC7]">Public Repositories</p>
              <p className="mt-1 font-display text-2xl font-bold text-[#0B2D4F] dark:text-[#F0F5FA] tabular-nums">
                {user.public_repos}
              </p>
            </div>
            <div className="rounded-xl border border-[#D8E0EA] dark:border-[#1F3756] bg-[#F6F8FB] dark:bg-[#0B192C] p-4">
              <p className="text-xs font-medium text-[#5A6B7E] dark:text-[#98AFC7]">Total Stars</p>
              <p className="mt-1 font-display text-2xl font-bold text-[#0B2D4F] dark:text-[#F0F5FA] tabular-nums">
                {totalStars}
              </p>
            </div>
            <div className="rounded-xl border border-[#D8E0EA] dark:border-[#1F3756] bg-[#F6F8FB] dark:bg-[#0B192C] p-4">
              <p className="text-xs font-medium text-[#5A6B7E] dark:text-[#98AFC7]">Total Forks</p>
              <p className="mt-1 font-display text-2xl font-bold text-[#0B2D4F] dark:text-[#F0F5FA] tabular-nums">
                {totalForks}
              </p>
            </div>
            <div className="rounded-xl border border-[#D8E0EA] dark:border-[#1F3756] bg-[#F6F8FB] dark:bg-[#0B192C] p-4">
              <p className="text-xs font-medium text-[#5A6B7E] dark:text-[#98AFC7]">Followers</p>
              <p className="mt-1 font-display text-2xl font-bold text-[#0B2D4F] dark:text-[#F0F5FA] tabular-nums">
                {user.followers}
              </p>
            </div>
          </div>

          {repos.length === 0 ? (
            <p className="text-sm text-[#5A6B7E] dark:text-[#98AFC7]">
              No public repositories found for @{GITHUB_USERNAME}.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-[#D8E0EA] dark:border-[#1F3756]">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">
                  Recent public repositories for {GITHUB_USERNAME}
                </caption>
                <thead>
                  <tr className="bg-[#0B2D4F] dark:bg-[#152D4B] text-white text-xs font-semibold tracking-wide">
                    <th scope="col" className="px-5 py-3">
                      Repository
                    </th>
                    <th scope="col" className="px-5 py-3">
                      Primary Language
                    </th>
                    <th scope="col" className="px-5 py-3">
                      Stars / Forks
                    </th>
                    <th scope="col" className="px-5 py-3">
                      Last Push
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D8E0EA] dark:divide-[#1F3756] bg-white dark:bg-[#10243E] text-sm">
                  {repos.map((repo) => (
                    <tr
                      key={repo.id}
                      className="hover:bg-[#F6F8FB] dark:hover:bg-[#162C49] transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-semibold text-[#0B2D4F] dark:text-[#F0F5FA] hover:text-[#E63C36] dark:hover:text-[#FF746E] transition-colors"
                        >
                          <span>{repo.name}</span>
                          <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                        </a>
                        {repo.description && (
                          <p className="mt-1 text-xs text-[#5A6B7E] dark:text-[#98AFC7] line-clamp-2 max-w-xl">
                            {repo.description}
                          </p>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-xs font-medium text-[#17212E] dark:text-[#D9E4F0] whitespace-nowrap">
                        {repo.language ?? 'Markdown / Docs'}
                      </td>
                      <td className="px-5 py-3.5 text-xs font-medium text-[#5A6B7E] dark:text-[#98AFC7] tabular-nums whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 mr-3">
                          <Star className="h-3.5 w-3.5 text-[#B89A7A] dark:text-[#DFC5A6]" />
                          {repo.stargazers_count}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <GitFork className="h-3.5 w-3.5 text-[#5A6B7E] dark:text-[#98AFC7]" />
                          {repo.forks_count}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-[#5A6B7E] dark:text-[#98AFC7] tabular-nums whitespace-nowrap">
                        {formatDate(repo.pushed_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
