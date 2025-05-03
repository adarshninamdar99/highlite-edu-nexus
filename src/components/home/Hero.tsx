import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Rocket, Star, Lightbulb } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="highlite-gradient-bg absolute inset-0 opacity-10"></div>
      <div className="container relative mx-auto px-4 py-20 sm:py-32 md:flex md:items-center md:justify-between md:py-40">
        <div className="md:w-1/2 space-y-6">
          <div className="inline-flex items-center rounded-full border border-highlite-accent/30 bg-highlite-extralight/30 px-3 py-1 text-sm font-medium text-highlite-accent mb-2">
            <Rocket className="mr-1 h-3 w-3" /> New Feature: AI Mock Interviews
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-highlite-primary sm:text-5xl md:text-6xl">
            Prepare, <span className="text-highlite-accent">Connect</span>, Succeed
          </h1>
          <p className="text-lg text-gray-600 md:text-xl max-w-md">
            AI-powered interview preparation, resume building, and job matching for the next generation of professionals.
          </p>
          <blockquote className="border-l-4 border-highlite-accent pl-4 italic text-highlite-secondary my-6">
            "HighliteX transformed my job search process. I landed 3 interviews in my first week!" - Sarah K., Software Engineer
          </blockquote>
          <div className="flex flex-wrap gap-4">
            <Link to="/register">
              <Button className="text-md bg-highlite-accent hover:bg-highlite-light flex items-center gap-2">
                <Star className="h-4 w-4" /> Get Started
              </Button>
            </Link>
            <Link to="/mock-interviews">
              <Button variant="outline" className="text-md flex items-center gap-2">
                <Lightbulb className="h-4 w-4" /> Try Demo Interview
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-10 md:mt-0 md:w-1/2">
          <div className="relative">
            <div className="relative mx-auto w-full max-w-lg">
              <div className="animate-pulse-slow absolute -top-4 -left-4 h-72 w-72 rounded-full bg-highlite-extralight opacity-50 blur-3xl"></div>
              <div className="animate-pulse-slow absolute -bottom-4 -right-4 h-72 w-72 rounded-full bg-highlite-light opacity-30 blur-3xl"></div>
              <div className="relative shadow-xl rounded-lg overflow-hidden border border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="HighliteX Platform - Students preparing for interviews"
                  className="w-full h-full object-cover aspect-video"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-highlite-primary/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-highlite-primary/80 to-transparent">
                  <p className="text-white text-sm font-medium">Real-time feedback from AI-powered mock interviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 flex items-center">
            <div className="bg-highlite-extralight/30 p-2 rounded-full mr-3">
              <Star className="h-6 w-6 text-highlite-accent" />
            </div>
            <div>
              <p className="font-bold text-highlite-primary">10,000+</p>
              <p className="text-sm text-gray-600">Successful Placements</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 flex items-center">
            <div className="bg-highlite-extralight/30 p-2 rounded-full mr-3">
              <Lightbulb className="h-6 w-6 text-highlite-accent" />
            </div>
            <div>
              <p className="font-bold text-highlite-primary">500+</p>
              <p className="text-sm text-gray-600">Partner Companies</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 flex items-center">
            <div className="bg-highlite-extralight/30 p-2 rounded-full mr-3">
              <Rocket className="h-6 w-6 text-highlite-accent" />
            </div>
            <div>
              <p className="font-bold text-highlite-primary">98%</p>
              <p className="text-sm text-gray-600">Student Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
