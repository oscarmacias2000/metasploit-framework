import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function PrivacidadPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
        <h1 className="text-2xl font-bold text-foreground">Política de privacidad</h1>
        <p className="mt-4 text-sm text-muted-foreground">Contenido placeholder.</p>
      </main>
      <Footer />
    </>
  );
}
