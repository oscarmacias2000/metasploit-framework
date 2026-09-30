'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import type { DocNavItem } from '@/lib/docs-nav';

function NavNode({ node, depth }: { node: DocNavItem; depth: number }) {
  const pathname = usePathname();
  const href = node.slug ? `/docs/${node.slug.join('/')}` : undefined;
  const active = href === pathname;
  const hasChildren = !!node.children?.length;
  const containsActive = hasChildren && pathname?.startsWith(href ?? `/docs/${node.children![0].slug?.join('/')}`);
  const [open, setOpen] = useState(depth === 0 || !!containsActive);

  const row = (
    <div
      className={`flex items-center justify-between py-2 pr-3 text-sm ${
        active ? 'font-semibold text-primary' : 'text-foreground/80 hover:text-foreground'
      }`}
      style={{ paddingLeft: 12 + depth * 14 }}
    >
      <span className="truncate">{node.title}</span>
      {hasChildren && (
        <ChevronRight
          className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform"
          style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
        />
      )}
    </div>
  );

  return (
    <div>
      {hasChildren ? (
        <button type="button" onClick={() => setOpen((v) => !v)} className="block w-full text-left">
          {row}
        </button>
      ) : (
        <Link href={href!}>{row}</Link>
      )}

      {hasChildren && open && (
        <div style={{ marginLeft: 12 + depth * 14 }} className="border-l border-dashed border-border">
          {node.children!.map((child) => (
            <NavNode key={child.title} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function DocsSidebar({ items }: { items: DocNavItem[] }) {
  return (
    <nav className="w-64 shrink-0 border-r border-border py-6 pr-2">
      {items.map((item) => (
        <NavNode key={item.title} node={item} depth={0} />
      ))}
    </nav>
  );
}
