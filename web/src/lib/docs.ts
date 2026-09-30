import fs from 'node:fs';
import path from 'node:path';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'docs');

function resolveDocPath(slug: string[]): string | null {
  const joined = slug.join('/');
  const direct = path.join(CONTENT_DIR, `${joined}.mdx`);
  if (fs.existsSync(direct)) return direct;

  const indexPath = path.join(CONTENT_DIR, joined, 'index.mdx');
  if (fs.existsSync(indexPath)) return indexPath;

  return null;
}

export function getDocSource(slug: string[]): string | null {
  const filePath = resolveDocPath(slug);
  if (!filePath) return null;
  return fs.readFileSync(filePath, 'utf8');
}

// Recorre content/docs y devuelve todos los slugs validos, para generateStaticParams.
export function getAllDocSlugs(): string[][] {
  const slugs: string[][] = [];

  function walk(dir: string, prefix: string[]) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), [...prefix, entry.name]);
      } else if (entry.name.endsWith('.mdx')) {
        const base = entry.name.replace(/\.mdx$/, '');
        slugs.push(base === 'index' ? prefix : [...prefix, base]);
      }
    }
  }

  if (fs.existsSync(CONTENT_DIR)) {
    walk(CONTENT_DIR, []);
  }

  return slugs;
}
