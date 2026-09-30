import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function RegistroPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-md flex-1 px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground">Crear cuenta</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Pantalla de ejemplo — aún no está conectada a un flujo real de registro.
        </p>
      </main>
      <Footer />
    </>
  );
}
