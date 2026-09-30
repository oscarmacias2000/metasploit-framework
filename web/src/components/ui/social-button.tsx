'use client';

import { Button } from './button';

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-4 w-4" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20.4H24v7.2h11.3c-1.6 4.6-6 7.9-11.3 7.9-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.4-5.4C34.5 5.9 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.4 18.9 12.4 24 12.4c3.1 0 5.9 1.2 8 3.1l5.4-5.4C34.5 5.9 29.5 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.4 0 10.3-1.8 14-5l-6.5-5.4c-2 1.4-4.6 2.4-7.5 2.4-5.3 0-9.7-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20.4H24v7.2h11.3c-.8 2.2-2.1 4.1-3.9 5.5l6.5 5.4C40.1 36.4 44 30.9 44 24c0-1.2-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

type SocialButtonProps = {
  provider: 'google' | 'github';
  onClick?: () => void;
  loading?: boolean;
};

// Boton de OAuth social con icono oficial y colores de marca (fondo oscuro en GitHub).
export function SocialButton({ provider, onClick, loading }: SocialButtonProps) {
  const isGitHub = provider === 'github';

  return (
    <Button
      type="button"
      variant="social"
      loading={loading}
      onClick={onClick}
      icon={isGitHub ? <GitHubIcon /> : <GoogleIcon />}
      className={`w-full ${isGitHub ? 'border-transparent bg-[#171515] text-white hover:bg-[#2b2828]' : ''}`}
    >
      Continuar con {isGitHub ? 'GitHub' : 'Google'}
    </Button>
  );
}
