import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Logo } from './logo';

const COLUMNS = [
  {
    heading: 'Documentación',
    links: [
      { label: 'Introducción', href: '/docs' },
      { label: 'Instalación', href: '/docs/instalacion' },
      { label: 'Referencia de la CLI', href: '/docs/cli' },
    ],
  },
  {
    heading: 'Comunidad',
    links: [
      { label: 'GitHub', href: 'https://github.com/tu-usuario/typefish' },
      { label: 'Reportar un problema', href: 'https://github.com/tu-usuario/typefish/issues' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl gap-10 px-6 py-12 md:flex md:justify-between">
        <div className="max-w-xs">
          <Logo height={20} />
          <p className="mt-3 text-sm text-muted-foreground">
            Herramienta para analizar redes WiFi. Solo para entornos propios o con autorización por escrito.
          </p>
        </div>

        <div className="mt-8 flex gap-12 md:mt-0">
          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground">{column.heading}</h3>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 border-t border-border px-6 py-6 text-sm text-muted-foreground md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} typefish. Distribuido bajo licencia MIT.</p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/tu-usuario/typefish"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 hover:text-foreground"
          >
            GitHub <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
