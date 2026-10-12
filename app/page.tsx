import Footer from '@/components/layout/Footer';
import { LazySection } from '@/components/layout/LazySection';
import { Navbar } from '@/components/layout/Navbar';
import { About } from '@/components/sections/About';
import ContactSection from '@/components/sections/ContactSection';
import ExperienceWorkWrapper from '@/components/sections/ExperienceWorkWrapper';
import FAQSection from '@/components/sections/FAQSection';
import { Hero } from '@/components/sections/Hero';
import PortfolioSection from '@/components/sections/PortfolioSection';
import { Services } from '@/components/sections/Services';
import { Skills } from '@/components/sections/Skills';

// --- Structured data ---
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Yusuf Arif Rahman',
  alternateName: 'yusuf Arif',
  jobTitle: 'Frontend Developer',
  url: 'https://yusuf-arif.vercel.app',
  sameAs: [
    'https://www.linkedin.com/in/yusuf-ar/',
    'https://github.com/Yusuf-98',
  ],
  knowsAbout: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Universitas Gadjah Mada',
  },
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Central Java',
    addressCountry: 'ID',
  },
};

export default function Home() {
  return (
    <main>
      {/* Structured data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Navbar />
      <Hero />
      <LazySection mobileHeight={752} desktopHeight={670}>
        <About />
      </LazySection>
      <LazySection mobileHeight={3309} desktopHeight={1492}>
        <PortfolioSection />
      </LazySection>
      <LazySection mobileHeight={1063} desktopHeight={681}>
        <Services />
      </LazySection>
      <LazySection mobileHeight={1220} desktopHeight={796}>
        <Skills />
      </LazySection>
      <LazySection mobileHeight={2783} desktopHeight={2321}>
        <ExperienceWorkWrapper />
      </LazySection>
      <LazySection mobileHeight={977} desktopHeight={1010}>
        <FAQSection />
      </LazySection>
      <LazySection mobileHeight={1266} desktopHeight={879}>
        <ContactSection />
      </LazySection>
      <LazySection mobileHeight={65} desktopHeight={81}>
        <Footer />
      </LazySection>
    </main>
  );
}
