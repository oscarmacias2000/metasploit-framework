import Link from 'next/link';
import { Logo } from './logo';

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Logo height={110} />

      <p className="mt-8 max-w-xl text-lg leading-relaxed text-foreground/90">
        Herramienta para analizar redes WiFi desde la terminal o desde una interfaz gráfica.
      </p>

      <p className="mt-3 text-sm font-medium text-warning">
        En desarrollo: la CLI y la GUI aún no tienen versión estable.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/docs"
          className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          Leer la documentación
        </Link>
        <Link
          href="/estado"
          className="rounded-md bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary-hover"
        >
          Ver el estado del proyecto
        </Link>
      </div>
    </section>
  );
}
