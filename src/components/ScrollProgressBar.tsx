import { useEffect, useState } from 'react';

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      const next = Math.min(1, Math.max(0, window.scrollY / docHeight));
      setProgress(next);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(updateProgress)
        : null;
    resizeObserver?.observe(document.documentElement);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      resizeObserver?.disconnect();
    };
  }, []);

  const percent = Math.round(progress * 100);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none print:hidden"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
    >
      <div
        className="h-full w-full bg-[#E63C36] origin-left transition-transform duration-75 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
