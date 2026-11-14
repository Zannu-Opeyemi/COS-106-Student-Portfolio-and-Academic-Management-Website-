import { CheckCircle2, Circle, Plus, Trash2 } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';

interface PlannerTask {
  id: number;
  title: string;
  course: string;
  due: string;
  done: boolean;
}

const STORAGE_KEY = 'zoe_planner_tasks';

type TaskFilter = 'all' | 'remaining' | 'completed';

export function PlannerView() {
  const [tasks, setTasks] = useState<PlannerTask[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(
            (item): item is PlannerTask =>
              Boolean(item) &&
              typeof item.id === 'number' &&
              typeof item.title === 'string' &&
              typeof item.course === 'string' &&
              typeof item.due === 'string' &&
              typeof item.done === 'boolean'
          );
        }
      }
    } catch {
      // Fallback to empty task list if storage is unavailable
    }
    return [];
  });

  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [due, setDue] = useState('');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<TaskFilter>('all');
  const titleInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // Ignore storage write errors in private contexts
    }
  }, [tasks]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError('Enter a task name before adding.');
      titleInputRef.current?.focus();
      return;
    }

    setError('');
    setTasks((prev) => [
      {
        id: Date.now(),
        title: trimmed,
        course: course.trim(),
        due,
        done: false,
      },
      ...prev,
    ]);
    setTitle('');
    setCourse('');
    setDue('');
    titleInputRef.current?.focus();
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.done));
  };

  const totalCount = tasks.length;
  const doneCount = tasks.filter((t) => t.done).length;
  const leftCount = totalCount - doneCount;

  const visibleTasks = tasks.filter((t) => {
    if (filter === 'completed') return t.done;
    if (filter === 'remaining') return !t.done;
    return true;
  });

  return (
    <div>
      {/* Editorial Page Header */}
      <section className="bg-gradient-to-br from-[#0B2D4F] via-[#0B2D4F] to-[#081F37] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
          <p className="text-xs font-semibold tracking-wide text-[#DFC5A6]">
            Coursework Utility · Local Storage
          </p>
          <h1 className="font-display mt-2 text-3xl sm:text-4xl font-bold text-white text-balance">
            Academic Planner
          </h1>
          <p className="mt-2.5 max-w-2xl text-base text-[#DBE6F2]">
            Add coursework tasks, mark them as completed, and delete them when finished.
            Tasks are saved automatically in your browser.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 space-y-8">
        {/* Task Creation Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl border border-[#D8E0EA] dark:border-[#1F3756] bg-white dark:bg-[#10243E] p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            <div className="md:col-span-5">
              <label
                htmlFor="task-title"
                className="block text-sm font-semibold text-[#0B2D4F] dark:text-[#F0F5FA] mb-1.5"
              >
                Task
              </label>
              <input
                ref={titleInputRef}
                id="task-title"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (error && e.target.value.trim()) setError('');
                }}
                placeholder="e.g. Finish COS 106 term project"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'task-error' : undefined}
                className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-[#17212E] dark:text-[#D9E4F0] bg-white dark:bg-[#0B192C] placeholder:text-[#7A8B9E] dark:placeholder:text-[#7891AB] transition-colors focus:outline-none focus:ring-2 ${
                  error
                    ? 'border-[#B3261E] dark:border-[#FF746E] focus:ring-[#B3261E]/20 dark:focus:ring-[#FF746E]/25'
                    : 'border-[#AAB8C8] dark:border-[#294568] focus:border-[#0B2D4F] dark:focus:border-[#5D8AB8] focus:ring-[#0B2D4F]/15 dark:focus:ring-[#5D8AB8]/25'
                }`}
              />
              {error && (
                <p id="task-error" role="alert" className="mt-1.5 text-xs font-medium text-[#B3261E] dark:text-[#FF9A94]">
                  {error}
                </p>
              )}
            </div>

            <div className="md:col-span-3">
              <label
                htmlFor="task-course"
                className="block text-sm font-semibold text-[#0B2D4F] dark:text-[#F0F5FA] mb-1.5"
              >
                Course (optional)
              </label>
              <input
                id="task-course"
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                placeholder="e.g. COS 106"
                className="w-full rounded-lg border border-[#AAB8C8] dark:border-[#294568] px-3.5 py-2.5 text-sm text-[#17212E] dark:text-[#D9E4F0] bg-white dark:bg-[#0B192C] placeholder:text-[#7A8B9E] dark:placeholder:text-[#7891AB] transition-colors focus:border-[#0B2D4F] dark:focus:border-[#5D8AB8] focus:outline-none focus:ring-2 focus:ring-[#0B2D4F]/15 dark:focus:ring-[#5D8AB8]/25"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="task-due"
                className="block text-sm font-semibold text-[#0B2D4F] dark:text-[#F0F5FA] mb-1.5"
              >
                Due date (optional)
              </label>
              <input
                id="task-due"
                type="date"
                value={due}
                onChange={(e) => setDue(e.target.value)}
                className="w-full rounded-lg border border-[#AAB8C8] dark:border-[#294568] px-3.5 py-2.5 text-sm text-[#17212E] dark:text-[#D9E4F0] bg-white dark:bg-[#0B192C] transition-colors focus:border-[#0B2D4F] dark:focus:border-[#5D8AB8] focus:outline-none focus:ring-2 focus:ring-[#0B2D4F]/15 dark:focus:ring-[#5D8AB8]/25"
              />
            </div>

            <div className="md:col-span-2 md:pt-[26px]">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#E63C36] px-4 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0 hover:bg-[#C92D28] transition-colors cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add Task</span>
              </button>
            </div>
          </div>
        </form>

        {/* Counters & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div
            aria-live="polite"
            className="flex flex-wrap items-center gap-6 text-sm font-semibold text-[#0B2D4F] dark:text-[#F0F5FA] tabular-nums"
          >
            <span>Total: {totalCount}</span>
            <span className="text-[#2F8F5B] dark:text-[#7FE3AB]">Completed: {doneCount}</span>
            <span className="text-[#5A6B7E] dark:text-[#98AFC7]">Remaining: {leftCount}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div
              role="group"
              aria-label="Filter tasks"
              className="inline-flex items-center gap-1 rounded-lg bg-white dark:bg-[#10243E] border border-[#D8E0EA] dark:border-[#1F3756] p-1"
            >
              {(['all', 'remaining', 'completed'] as TaskFilter[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  aria-pressed={filter === item}
                  className={`capitalize rounded-md px-3 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                    filter === item
                      ? 'bg-[#0B2D4F] dark:bg-[#194775] text-white'
                      : 'text-[#5A6B7E] dark:text-[#98AFC7] hover:text-[#0B2D4F] dark:hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {doneCount > 0 && (
              <button
                type="button"
                onClick={clearCompleted}
                className="rounded-lg border border-[#D8E0EA] dark:border-[#294568] bg-white dark:bg-[#10243E] px-3 py-1.5 text-xs font-semibold text-[#5A6B7E] dark:text-[#98AFC7] hover:text-[#B3261E] dark:hover:text-[#FF9A94] hover:border-[#B3261E]/40 dark:hover:border-[#FF9A94]/50 transition-colors cursor-pointer"
              >
                Clear Completed
              </button>
            )}
          </div>
        </div>

        {/* Task List */}
        {visibleTasks.length === 0 ? (
          <div className="rounded-2xl border border-[#D8E0EA] dark:border-[#1F3756] bg-white dark:bg-[#10243E] px-6 py-10 text-center">
            <p className="text-sm text-[#5A6B7E] dark:text-[#98AFC7]">
              {tasks.length === 0
                ? 'No tasks yet. Add your first coursework task above.'
                : `No ${filter} tasks match the current filter.`}
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {visibleTasks.map((task) => {
              const metaParts = [
                task.done ? 'Completed' : 'Pending',
                task.course,
                task.due ? `Due ${task.due}` : '',
              ].filter(Boolean);

              return (
                <li
                  key={task.id}
                  className={`flex items-center justify-between gap-4 rounded-xl border border-[#D8E0EA] dark:border-[#1F3756] px-5 py-4 transition-opacity ${
                    task.done
                      ? 'opacity-80 bg-[#F6F8FB] dark:bg-[#0B192C]'
                      : 'bg-white dark:bg-[#10243E]'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                    <button
                      type="button"
                      onClick={() => toggleTask(task.id)}
                      aria-label={
                        task.done
                          ? `Mark "${task.title}" as remaining`
                          : `Mark "${task.title}" as completed`
                      }
                      className="mt-0.5 sm:mt-0 text-[#0B2D4F] dark:text-[#F0F5FA] hover:text-[#E63C36] dark:hover:text-[#FF746E] transition-colors shrink-0 cursor-pointer"
                    >
                      {task.done ? (
                        <CheckCircle2 className="h-5 w-5 text-[#2F8F5B] dark:text-[#7FE3AB]" />
                      ) : (
                        <Circle className="h-5 w-5 text-[#5A6B7E] dark:text-[#98AFC7]" />
                      )}
                    </button>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm sm:text-base font-semibold break-words ${
                          task.done
                            ? 'line-through text-[#5A6B7E] dark:text-[#98AFC7]'
                            : 'text-[#0B2D4F] dark:text-[#F0F5FA]'
                        }`}
                      >
                        {task.title}
                      </p>
                      <p className="mt-0.5 text-xs text-[#5A6B7E] dark:text-[#98AFC7] tabular-nums">
                        {metaParts.join(' · ')}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteTask(task.id)}
                    aria-label={`Delete "${task.title}"`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#D8E0EA] dark:border-[#294568] px-3 py-1.5 text-xs font-semibold text-[#B3261E] dark:text-[#FF9A94] hover:bg-[#B3261E] hover:text-white hover:border-[#B3261E] transition-colors shrink-0 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Delete</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
