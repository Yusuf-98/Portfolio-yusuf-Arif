import Footer from '@/components/layout/Footer';
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
      <About />
      <PortfolioSection />
      <Services />
      <Skills />
      <ExperienceWorkWrapper />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
