'use client';

import { useEffect, useState } from 'react';
import { Logo } from './logo';
import { Skeleton } from './ui/skeleton';

const DURATION_MS = 5000;
const EXIT_MS = 300;

type SplashScreenProps = {
  onFinish: () => void;
};

// Splash de ~5s (configurable via DURATION_MS): logo fade+scale, pulse suave,
// skeleton shimmer y barra de progreso lineal, luego fade-out+slide-up.
export function SplashScreen({ onFinish }: SplashScreenProps) {
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startProgress = requestAnimationFrame(() => setProgress(100));
    const exitTimer = setTimeout(() => setExiting(true), DURATION_MS);
    const finishTimer = setTimeout(onFinish, DURATION_MS + EXIT_MS);

    return () => {
      cancelAnimationFrame(startProgress);
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-background transition-all duration-300 ${
        exiting ? '-translate-y-6 opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="animate-fade-scale-in relative">
        <div className="absolute -inset-4 animate-pulse rounded-3xl bg-primary/10" />
        <Logo height={64} />
      </div>

      <p className="animate-fade-in text-sm font-medium text-muted-foreground">typefish</p>

      <Skeleton className="animate-fade-in h-2 w-40" />

      <div className="h-1 w-56 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-[width] ease-linear"
          style={{ width: `${progress}%`, transitionDuration: `${DURATION_MS}ms` }}
        />
      </div>
    </div>
  );
}
