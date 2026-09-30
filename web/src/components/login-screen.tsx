'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { z } from 'zod';
import { Mail, Lock, Eye, EyeOff, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Logo } from './logo';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Divider } from './ui/divider';
import { SocialButton } from './ui/social-button';

const emailSchema = z.string().email('Ingresa un email válido');
const passwordSchema = z.string().min(8, 'Debe tener al menos 8 caracteres');

type Status = 'idle' | 'loading' | 'success' | 'error';

// LoginScreen: OAuth (Google/GitHub) + email/password con validacion en vivo,
// estados de carga/exito/error con feedback visual (shake, check animado).
export function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [status, setStatus] = useState<Status>('idle');
  const [socialLoading, setSocialLoading] = useState<'google' | 'github' | null>(null);

  const validate = () => {
    const emailResult = emailSchema.safeParse(email);
    const passwordResult = passwordSchema.safeParse(password);
    setEmailError(emailResult.success ? undefined : emailResult.error.issues[0].message);
    setPasswordError(passwordResult.success ? undefined : passwordResult.error.issues[0].message);
    return emailResult.success && passwordResult.success;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    const result = await signIn('credentials', { email, password, redirect: false });

    if (result?.error) {
      setStatus('error');
      toast.error('Email o contraseña incorrectos');
      setTimeout(() => setStatus('idle'), 400);
      return;
    }

    setStatus('success');
    toast.success('Sesión iniciada');
    router.push('/cuenta');
    router.refresh();
  };

  const handleSocial = async (provider: 'google' | 'github') => {
    setSocialLoading(provider);
    await signIn(provider, { callbackUrl: '/cuenta' });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div
        className={`w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-lg ${
          status === 'error' ? 'animate-shake' : ''
        }`}
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <Logo height={32} />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Bienvenido de nuevo</h1>
            <p className="mt-1 text-sm text-muted-foreground">Inicia sesión para continuar en typefish</p>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <SocialButton provider="google" loading={socialLoading === 'google'} onClick={() => handleSocial('google')} />
          <SocialButton provider="github" loading={socialLoading === 'github'} onClick={() => handleSocial('github')} />
        </div>

        <div className="my-6">
          <Divider label="o continúa con" />
        </div>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <Input
            type="email"
            name="email"
            label="Email"
            placeholder="tucorreo@ejemplo.com"
            icon={<Mail className="h-4 w-4 text-muted-foreground" />}
            value={email}
            error={emailError}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailError(emailSchema.safeParse(email).success ? undefined : 'Ingresa un email válido')}
          />

          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            label="Contraseña"
            placeholder="••••••••"
            icon={<Lock className="h-4 w-4 text-muted-foreground" />}
            value={password}
            error={passwordError}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() =>
              setPasswordError(passwordSchema.safeParse(password).success ? undefined : 'Debe tener al menos 8 caracteres')
            }
            rightAdornment={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
          />

          <div className="flex justify-end">
            <Link href="/recuperar" className="text-xs text-primary hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            loading={status === 'loading'}
            icon={status === 'success' ? <Check className="h-4 w-4" /> : undefined}
          >
            Iniciar sesión
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          ¿No tienes cuenta?{' '}
          <Link href="/registro" className="font-medium text-primary hover:underline">
            Crear cuenta
          </Link>
        </p>

        <div className="mt-8 flex justify-center gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
          <Link href="/terminos" className="hover:text-foreground">
            Términos
          </Link>
          <span>·</span>
          <Link href="/privacidad" className="hover:text-foreground">
            Privacidad
          </Link>
          <span>·</span>
          <span>v0.1.0</span>
        </div>
      </div>
    </div>
  );
}
