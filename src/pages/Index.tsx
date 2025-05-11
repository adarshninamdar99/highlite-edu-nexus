
import React from 'react';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import ForWhom from '@/components/home/ForWhom';
import CallToAction from '@/components/home/CallToAction';
import Footer from '@/components/home/Footer';
import SuccessRoadmap from '@/components/home/SuccessRoadmap';
import ToolBenefits from '@/components/home/ToolBenefits';
import Interactive3DFeatures from '@/components/home/Interactive3DFeatures';
import Testimonials from '@/components/home/Testimonials';
import { motion } from 'framer-motion';

const Index: React.FC = () => {
  return (
    <div className="bg-white w-full overflow-x-hidden">
      <Hero />
      <ToolBenefits />
      <Features />
      <Interactive3DFeatures />
      <SuccessRoadmap />
      <Testimonials />
      <ForWhom />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
