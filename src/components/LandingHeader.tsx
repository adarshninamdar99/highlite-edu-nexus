
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LandingHeader: React.FC = () => {
  return (
    <header className="sticky top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-medium text-highlite-primary">
            Highlite<span className="text-highlite-accent">X</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/features" className="text-sm text-gray-600 hover:text-highlite-accent transition-colors">
            Features
          </Link>
          <Link to="/for-students" className="text-sm text-gray-600 hover:text-highlite-accent transition-colors">
            For Students
          </Link>
          <Link to="/for-colleges" className="text-sm text-gray-600 hover:text-highlite-accent transition-colors">
            For Colleges
          </Link>
          <Link to="/for-employers" className="text-sm text-gray-600 hover:text-highlite-accent transition-colors">
            For Employers
          </Link>
          <Link to="/pricing" className="text-sm text-gray-600 hover:text-highlite-accent transition-colors">
            Pricing
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <Button variant="ghost" className="text-sm">
              Log in
            </Button>
          </Link>
          <Link to="/register">
            <Button className="text-sm bg-highlite-accent hover:bg-highlite-light text-white">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
