type SkeletonProps = {
  className?: string;
};

// Placeholder de carga con barrido de brillo (shimmer), usado en el SplashScreen.
export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-muted ${className}`}>
      <div className="animate-shimmer-sweep absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
    </div>
  );
}
