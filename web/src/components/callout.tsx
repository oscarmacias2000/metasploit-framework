import type { ReactNode } from 'react';

type CalloutProps = {
  type?: 'info' | 'warning';
  children: ReactNode;
};

// Callout simple (info/warning) para avisos dentro del contenido, per UI.md.
export function Callout({ type = 'info', children }: CalloutProps) {
  const border = type === 'warning' ? 'border-warning' : 'border-primary';
  const bg = type === 'warning' ? 'bg-warning/10' : 'bg-primary/10';

  return <div className={`rounded-lg border-l-4 ${border} ${bg} px-4 py-3 text-sm text-foreground`}>{children}</div>;
}
