'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useSession } from 'next-auth/react';
import { Search, ExternalLink, SunMedium, MoonStar } from 'lucide-react';
import { Logo } from './logo';

const NAV_LINKS = [
  { href: '/descargar', label: 'Descargar' },
  { href: '/docs', label: 'Docs' },
  { href: '/docs/metasploit', label: 'Metasploit' },
  { href: '/docs/scapy', label: 'Scapy' },
  { href: '/articulos', label: 'Artículos' },
];

// Navbar calcada de vista-inicio.png: logo, links, "En desarrollo", GitHub,
// toggle de tema y una caja de busqueda (placeholder hasta la fase de ⌘K).
export function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-8 px-6">
        <Link href="/" className="shrink-0">
          <Logo height={22} />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <span className="hidden text-sm text-muted-foreground lg:inline">En desarrollo</span>
          <a
            href="https://github.com/tu-usuario/typefish"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground lg:flex"
          >
            GitHub <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            aria-label="Cambiar tema"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <SunMedium className="hidden h-4 w-4 dark:block" />
            <MoonStar className="h-4 w-4 dark:hidden" />
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-sm text-muted-foreground"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Buscar</span>
            <span className="hidden items-center gap-1 sm:flex">
              <kbd className="rounded border border-border px-1 text-[10px]">ctrl</kbd>
              <kbd className="rounded border border-border px-1 text-[10px]">K</kbd>
            </span>
          </button>
          {session ? (
            <Link href="/cuenta" className="shrink-0">
              {session.user?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={session.user.image} alt={session.user.name ?? 'Cuenta'} className="h-7 w-7 rounded-full" />
              ) : (
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {(session.user?.name ?? session.user?.email ?? '?').charAt(0).toUpperCase()}
                </span>
              )}
            </Link>
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
