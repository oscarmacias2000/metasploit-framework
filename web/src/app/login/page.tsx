import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { LoginClient } from '@/components/login-client';

export default async function LoginPage() {
  const session = await auth();

  // "Si hay sesion valida -> saltar directo a HomeScreen" del spec.
  if (session) {
    redirect('/cuenta');
  }

  return <LoginClient />;
}
