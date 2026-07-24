import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Hero from '../../components/landing/Hero';
import { TrustedBy } from '../../components/landing/TrustedBy';
import { FeaturesGrid } from '../../components/landing/FeaturesGrid';
import { HowItWorks } from '../../components/landing/HowItWorks';
import { Showcase } from '../../components/landing/Showcase';
import { Testimonials } from '../../components/landing/Testimonials';
import { FAQ } from '../../components/landing/FAQ';
import { CTASection } from '../../components/landing/CTASection';
import Footer from '../../components/layout/Footer';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1E1B4B] overflow-x-hidden selection:bg-pink-200 selection:text-purple-950">
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <FeaturesGrid />
        <HowItWorks />
        <Showcase />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;