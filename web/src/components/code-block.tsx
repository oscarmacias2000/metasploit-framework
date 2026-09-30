import { highlightCode } from '@/lib/highlight';
import { CopyButton } from './copy-button';

type CodeBlockProps = {
  code: string;
  lang?: string;
  label?: string;
};

export async function CodeBlock({ code, lang = 'bash', label }: CodeBlockProps) {
  const trimmed = code.trim();
  const html = await highlightCode(trimmed, lang);

  return (
    <div className="mt-3 first:mt-0">
      {label && <p className="mb-1.5 text-xs font-medium text-muted-foreground">{label}</p>}
      <div className="group relative overflow-hidden rounded-lg border border-border">
        <div className="overflow-x-auto p-4 text-sm [&_pre]:m-0 [&_pre]:bg-transparent" dangerouslySetInnerHTML={{ __html: html }} />
        <CopyButton text={trimmed} className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </div>
  );
}
