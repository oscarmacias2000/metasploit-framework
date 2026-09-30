import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeShiki from '@shikijs/rehype';
import readingTime from 'reading-time';
import { getDocSource, getAllDocSlugs } from '@/lib/docs';

type Frontmatter = {
  title: string;
  description?: string;
};

export function generateStaticParams() {
  return getAllDocSlugs().map((slug) => ({ slug }));
}

export default async function DocPage({ params }: PageProps<'/docs/[...slug]'>) {
  const { slug } = await params;
  const source = getDocSource(slug);

  if (!source) {
    notFound();
  }

  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypeShiki,
            {
              themes: { light: 'github-light', dark: 'github-dark-dimmed' },
              defaultColor: false,
            },
          ],
        ],
      },
    },
  });

  const minutes = Math.max(1, Math.round(readingTime(source).minutes));

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-[72ch] prose-headings:font-bold prose-a:text-primary">
      <p className="mb-0 text-sm text-muted-foreground">
        {minutes} min de lectura
      </p>
      <h1>{frontmatter.title}</h1>
      {frontmatter.description && (
        <p className="text-lg text-muted-foreground">{frontmatter.description}</p>
      )}
      {content}
    </article>
  );
}
