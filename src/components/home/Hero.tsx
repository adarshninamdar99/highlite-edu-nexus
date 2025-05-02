
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="highlite-gradient-bg absolute inset-0 opacity-10"></div>
      <div className="container relative mx-auto px-4 py-20 sm:py-32 md:flex md:items-center md:justify-between md:py-40">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-highlite-primary sm:text-5xl md:text-6xl">
            Prepare, <span className="text-highlite-accent">Connect</span>, Succeed
          </h1>
          <p className="text-lg text-gray-600 md:text-xl max-w-md">
            AI-powered interview preparation, resume building, and job matching for the next generation of professionals.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/register">
              <Button className="text-md bg-highlite-accent hover:bg-highlite-light">
                Get Started
              </Button>
            </Link>
            <Link to="/mock-interviews">
              <Button variant="outline" className="text-md">
                Try Demo Interview
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
                  src="/placeholder.svg"
                  alt="HighliteX Platform"
                  className="w-full h-full object-cover aspect-video"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-highlite-primary/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
