'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export function LegalBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative flex items-center justify-center bg-warning px-10 py-2 text-center text-sm text-warning-foreground">
      <p>
        Todo el contenido es para entornos propios o con autorización por escrito. Lee el{' '}
        <a href="/legal" className="underline underline-offset-2">
          aviso legal
        </a>
        .
      </p>
      <button
        onClick={() => setVisible(false)}
        aria-label="Cerrar aviso"
        className="absolute right-4 shrink-0 opacity-90 hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
