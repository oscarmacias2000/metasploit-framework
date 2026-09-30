import { LegalBanner } from '@/components/legal-banner';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { InterfacesSection } from '@/components/interfaces-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <>
      <LegalBanner />
      <Header />
      <main className="flex-1">
        <Hero />
        <InterfacesSection />
      </main>
      <Footer />
    </>
  );
}
