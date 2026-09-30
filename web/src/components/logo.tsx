import Image from 'next/image';

const ASPECT_RATIO = 431 / 167;

// Sin JS: se muestran ambas variantes y CSS (dark:) decide cual es visible
// segun la clase .dark en <html>. Evita el parpadeo de hidratacion.
export function Logo({ height = 28 }: { height?: number }) {
  const width = Math.round(height * ASPECT_RATIO);

  return (
    <span className="relative inline-block align-middle" style={{ height, width }}>
      <Image src="/typefish-dark.png" alt="typefish" height={height} width={width} priority className="dark:hidden" />
      <Image
        src="/typefish-light.png"
        alt="typefish"
        height={height}
        width={width}
        priority
        className="absolute inset-0 hidden dark:block"
      />
    </span>
  );
}
