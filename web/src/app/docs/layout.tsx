import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { DocsSidebar } from '@/components/docs-sidebar';
import { DOCS_NAV } from '@/lib/docs-nav';

export default function DocsLayout({ children }: LayoutProps<'/docs'>) {
  return (
    <>
      <Header />
      <div className="mx-auto flex max-w-6xl flex-1 px-6">
        <DocsSidebar items={DOCS_NAV} />
        <main className="min-w-0 flex-1 py-10 pl-10">{children}</main>
      </div>
      <Footer />
    </>
  );
}
