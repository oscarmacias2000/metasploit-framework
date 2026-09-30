export function InterfacesSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <h2 className="text-2xl font-bold text-foreground">Dos interfaces, un mismo núcleo</h2>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-border p-6">
          <h3 className="text-xl font-bold text-foreground">CLI</h3>
          <pre className="mt-4 overflow-x-auto rounded-md bg-code-bg px-4 py-3 font-mono text-sm text-foreground">
            typefish escanear --interfaz wlan0
          </pre>
          <p className="mt-4 text-sm text-muted-foreground">
            Para scripts, automatización y equipos sin entorno gráfico.
          </p>
        </div>

        <div className="rounded-lg border border-border p-6">
          <h3 className="text-xl font-bold text-foreground">GUI</h3>
          <div className="mt-4 rounded-md bg-code-bg px-4 py-3 text-sm text-muted-foreground/70">
            Capturas de pantalla próximamente
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Para explorar redes y resultados de forma visual.
          </p>
        </div>
      </div>
    </section>
  );
}
