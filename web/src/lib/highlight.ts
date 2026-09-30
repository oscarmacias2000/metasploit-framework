import { codeToHtml } from 'shiki';

// Mismo par de temas y CSS (.shiki / .dark .shiki en globals.css) que usa
// el pipeline de MDX de /docs, para que el resaltado se vea igual en toda la app.
export async function highlightCode(code: string, lang: string) {
  return codeToHtml(code, {
    lang,
    themes: { light: 'github-light', dark: 'github-dark-dimmed' },
    defaultColor: false,
  });
}
