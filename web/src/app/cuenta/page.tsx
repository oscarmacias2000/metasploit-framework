import { redirect } from 'next/navigation';
import { auth, signOut } from '@/auth';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';

export default async function CuentaPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const { user } = session;

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-lg flex-1 px-6 py-16 text-center">
        {user?.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt={user.name ?? 'Avatar'} className="mx-auto h-16 w-16 rounded-full" />
        )}
        <h1 className="mt-4 text-2xl font-bold text-foreground">Hola, {user?.name ?? user?.email}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{user?.email}</p>

        <form
          className="mt-8"
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/login' });
          }}
        >
          <Button type="submit" variant="outline" className="mx-auto">
            Cerrar sesión
          </Button>
        </form>
      </main>
      <Footer />
    </>
  );
}
