# Rol
Actúa como Senior Frontend Engineer experto en Next.js, TypeScript, Tailwind CSS, MDX y accesibilidad (WCAG 2.2 AA). Vas a construir un SITIO DE DOCUMENTACIÓN, no una app funcional.

# Objetivo
Desarrollar el frontend de un sitio de documentación técnica para una herramienta que tiene dos interfaces: una CLI y una GUI. El sitio documenta instalación, uso, comandos y guías. La arquitectura de UI debe inspirarse en la de nodejs.org (layouts, navegación, jerarquía visual, sistema de docs), replicando PATRONES y no la marca (sin logo, nombre ni assets de Node.js). Identidad visual propia.

# Stack
- Next.js (App Router) + React + TypeScript estricto
- Tailwind CSS con design tokens en variables CSS
- Radix UI (tabs, dropdown, dialog, select)
- MDX para todo el contenido de documentación
- Shiki para resaltado de código y bloques de comandos
- next-themes (modo claro/oscuro, oscuro por defecto)
- next-intl (español por defecto, inglés opcional)
- Lucide para iconografía

# Design system (tokens)
- Tema oscuro protagonista + modo claro completo.
- Fondo gris muy oscuro, neutrales 100–900, color primario [blue], estados success/warning/info.
- Tipografía sans para UI (Inter) y monoespaciada para código (JetBrains Mono).
- Espaciado base 4px, radios 6–12px, bordes sutiles 1px.
- Hero con glow radial sutil del color primario.
- Todos los tokens como variables CSS en tailwind.config.

# Layouts
1. HomeLayout: navbar + hero + secciones de features + footer.
2. DocsLayout (3 columnas):
   - Izq: sidebar con grupos colapsables (Introducción, Instalación, CLI, GUI, Guías, Referencia), ítem activo resaltado.
   - Centro: contenido MDX, ancho de lectura ~72ch.
   - Der: metabar con tabla de contenidos (scroll-spy), tiempo de lectura, fecha de actualización y "Editar esta página".
   - Abajo: navegación anterior/siguiente.
3. GuidesLayout: índice de tutoriales en grid de tarjetas.
4. Página 404 y de error con el mismo lenguaje visual.

# Componentes
- Navbar sticky: logo, links (Inicio, Docs, Guías, Referencia, GitHub), búsqueda ⌘K, toggle de tema, selector de idioma. Menú hamburguesa en móvil.
- Hero: titular, subtítulo, CTA "Empezar" + "Ver en GitHub", y un CodeBox con tabs (ej. pestañas "CLI" y "GUI") mostrando comandos de instalación/arranque, con botón de copiar.
- Command palette (⌘K): búsqueda de páginas de docs, resultados agrupados, navegación con teclado, estado vacío.
- CodeBox con tabs y copiar al portapapeles (para comandos de terminal y ejemplos de config).
- Callouts MDX: info, tip, warning, danger.
- Tarjetas de guías, Tabs, Breadcrumbs, Pagination, Badge, Tooltip, Skeleton.
- Footer: columnas de links, selector de idioma, iconos sociales, copyright.

# Estructura de carpetas
app/[locale]/(home)/page.tsx
app/[locale]/docs/[...slug]/page.tsx
app/[locale]/guides/...
components/  layouts/  content/ (MDX por idioma)  i18n/  lib/

# Requisitos no funcionales
- Responsive mobile-first; en tablet el sidebar pasa a drawer y la metabar se colapsa.
- Accesibilidad: teclado completo, focus visible, ARIA, contraste AA, prefers-reduced-motion.
- Rendimiento: Server Components, estático donde aplique, next/image, next/font, Lighthouse ≥ 95.
- SEO: metadata por página, Open Graph, sitemap, hreflang.
- ESLint + Prettier, tipado estricto, sin any.

# Contenido MDX de ejemplo
Genera páginas placeholder para: Introducción, Instalación, Primeros pasos, Referencia de la CLI (tabla de comandos), Uso de la GUI, y una guía de ejemplo. Usa contenido genérico/placeholder — yo reemplazaré el texto real.

# Forma de trabajo
1. Primero muéstrame la arquitectura propuesta (carpetas, layouts, componentes, tokens) y espera mi OK.
2. Implementa en orden: tokens → componentes comunes → Navbar/Footer → HomeLayout → DocsLayout → búsqueda → guías → i18n/tema → pulido responsive y a11y.
3. Al terminar cada fase resume qué hiciste y qué sigue.