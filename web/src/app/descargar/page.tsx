import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Callout } from '@/components/callout';
import { CodeBlock } from '@/components/code-block';
import { InstallTabs } from '@/components/install-tabs';

export const metadata: Metadata = {
  title: 'Descargar — typefish',
  description: 'Requisitos e instalación de typefish en Linux, macOS y Windows (WSL).',
};

const REQUIREMENTS = [
  { req: 'Python', version: '3.10+', notes: 'Necesario para la CLI y el núcleo' },
  { req: 'git', version: 'cualquiera reciente', notes: 'Para clonar el repositorio' },
  { req: 'Adaptador WiFi', version: 'con modo monitor', notes: 'Solo para captura en vivo' },
];


export default function DescargarPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
        <h1 className="text-3xl font-bold text-foreground">Descargar typefish</h1>

        <div className="mt-6 space-y-4">
          <Callout type="warning">
            <strong>En desarrollo:</strong> la CLI y la GUI aún no tienen versión estable. Instala desde el
            repositorio para probar la versión de desarrollo.
          </Callout>

          <p className="text-sm text-muted-foreground">
            typefish está pensado para <strong className="text-foreground">entornos propios o con autorización por
            escrito</strong>. Al instalarlo aceptas usarlo únicamente en redes que te pertenecen o para las que
            tienes permiso explícito.
          </p>
        </div>

        <h2 id="requisitos" className="mt-12 text-xl font-bold text-foreground">
          Requisitos
        </h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="px-4 py-2 font-semibold text-foreground">Requisito</th>
                <th className="px-4 py-2 font-semibold text-foreground">Versión mínima</th>
                <th className="px-4 py-2 font-semibold text-foreground">Notas</th>
              </tr>
            </thead>
            <tbody>
              {REQUIREMENTS.map((row) => (
                <tr key={row.req} className="border-b border-border last:border-0">
                  <td className="px-4 py-2 font-medium text-foreground">{row.req}</td>
                  <td className="px-4 py-2 text-muted-foreground">{row.version}</td>
                  <td className="px-4 py-2 text-muted-foreground">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-12 text-xl font-bold text-foreground">Instalación</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Elige tu sistema operativo y método. Reemplaza la URL del repositorio y el nombre del paquete por los
          tuyos reales.
        </p>

        <InstallTabs
          linux={
            <div className="space-y-6">
              <CodeBlock
                label="Clonar el repositorio"
                code={`git clone https://github.com/tu-usuario/typefish.git\ncd typefish\n./install.sh`}
              />
              <CodeBlock label="Con pip" code="pip install typefish" />
              <CodeBlock
                label="Con Docker"
                code={`docker pull tu-usuario/typefish:latest\ndocker run -it --rm tu-usuario/typefish`}
              />
            </div>
          }
          macos={
            <div className="space-y-6">
              <CodeBlock
                label="Clonar el repositorio"
                code={`git clone https://github.com/tu-usuario/typefish.git\ncd typefish\n./install.sh`}
              />
              <CodeBlock label="Con Homebrew" code="brew install tu-usuario/tap/typefish" />
              <CodeBlock
                label="Con Docker"
                code={`docker pull tu-usuario/typefish:latest\ndocker run -it --rm tu-usuario/typefish`}
              />
            </div>
          }
          windows={
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                typefish se ejecuta dentro de WSL (Ubuntu recomendado). Primero instala WSL:
              </p>
              <CodeBlock lang="powershell" code="wsl --install" />
              <p className="text-sm text-muted-foreground">Luego, dentro de WSL:</p>
              <CodeBlock code={`git clone https://github.com/tu-usuario/typefish.git\ncd typefish\nbash install.sh`} />
            </div>
          }
        />

        <h2 className="mt-12 text-xl font-bold text-foreground">Verificar la instalación</h2>
        <CodeBlock code="typefish --version" />
        <p className="mt-3 text-sm text-muted-foreground">
          Deberías ver la versión instalada. Si el comando no se encuentra, revisa que el directorio de
          instalación esté en tu <code>PATH</code>.
        </p>

        <h2 className="mt-12 text-xl font-bold text-foreground">Actualizar</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-medium text-foreground">Si instalaste desde el repositorio:</p>
            <CodeBlock code={`cd typefish\ngit pull\n./install.sh`} />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-foreground">Si instalaste con pip:</p>
            <CodeBlock code="pip install --upgrade typefish" />
          </div>
        </div>

        <h2 className="mt-12 text-xl font-bold text-foreground">Desinstalar</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-medium text-foreground">pip</p>
            <CodeBlock code="pip uninstall typefish" />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-foreground">Repositorio</p>
            <CodeBlock code={`cd typefish\n./uninstall.sh   # si tu script lo incluye`} />
          </div>
        </div>

        <h2 className="mt-12 text-xl font-bold text-foreground">Código fuente</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          El código está disponible en el repositorio. Consulta las{' '}
          <a
            href="https://github.com/tu-usuario/typefish/releases"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            releases
          </a>{' '}
          para ver el changelog y las versiones etiquetadas.
        </p>
        <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
          <li>
            Repositorio:{' '}
            <a
              href="https://github.com/tu-usuario/typefish"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              https://github.com/tu-usuario/typefish
            </a>
          </li>
          <li>Licencia: MIT</li>
        </ul>

        <h2 className="mt-12 text-xl font-bold text-foreground">¿Problemas al instalar?</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>
            Revisa que cumples los{' '}
            <a href="#requisitos" className="text-primary hover:underline">
              requisitos
            </a>
            .
          </li>
          <li>
            Consulta la sección de instalación en la{' '}
            <Link href="/docs" className="text-primary hover:underline">
              documentación
            </Link>
            .
          </li>
          <li>Abre un issue en GitHub describiendo tu sistema operativo y el error completo.</li>
        </ul>
      </main>
      <Footer />
    </>
  );
}
