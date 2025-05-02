
import React from 'react';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import ForWhom from '@/components/home/ForWhom';
import CallToAction from '@/components/home/CallToAction';
import Footer from '@/components/home/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <ForWhom />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
