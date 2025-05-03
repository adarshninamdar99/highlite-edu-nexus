
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Rocket, Star, Lightbulb } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 py-28 md:py-40">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="inline-block px-3 py-1 text-sm font-medium text-highlite-accent bg-highlite-extralight/30 rounded-full">
            Introducing HighliteX
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-highlite-primary">
            Prepare for your <span className="text-highlite-accent">future</span> career today
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI-powered interview preparation, resume building, and job matching for the next generation of professionals.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link to="/register">
              <Button className="apple-button bg-highlite-accent hover:bg-highlite-light text-white flex items-center gap-2 h-12 px-8">
                <Rocket className="h-4 w-4" /> Get Started
              </Button>
            </Link>
            <Link to="/mock-interviews">
              <Button variant="outline" className="apple-button text-highlite-primary border-gray-300 flex items-center gap-2 h-12 px-8">
                <Lightbulb className="h-4 w-4" /> Try Demo Interview
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none"></div>
          <img
            src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
            alt="HighliteX Platform - Students preparing for interviews"
            className="w-full h-auto object-cover rounded-2xl shadow-xl mx-auto"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-6 py-4 rounded-full text-sm">
            Real-time feedback from AI-powered mock interviews
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
            <div className="bg-highlite-extralight/30 p-4 rounded-full mb-4">
              <Star className="h-6 w-6 text-highlite-accent" />
            </div>
            <p className="font-bold text-highlite-primary text-2xl">10,000+</p>
            <p className="text-gray-600">Successful Placements</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
            <div className="bg-highlite-extralight/30 p-4 rounded-full mb-4">
              <Lightbulb className="h-6 w-6 text-highlite-accent" />
            </div>
            <p className="font-bold text-highlite-primary text-2xl">500+</p>
            <p className="text-gray-600">Partner Companies</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
            <div className="bg-highlite-extralight/30 p-4 rounded-full mb-4">
              <Rocket className="h-6 w-6 text-highlite-accent" />
            </div>
            <p className="font-bold text-highlite-primary text-2xl">98%</p>
            <p className="text-gray-600">Student Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
