
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CallToAction: React.FC = () => {
  return (
    <div className="py-16 highlite-gradient-bg">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Career Journey?</h2>
          <p className="text-lg text-white/90 mb-8">
            Join thousands of students, colleges, and employers already using HighliteX to connect talent with opportunity.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button className="text-md bg-white text-highlite-primary hover:bg-gray-100">
                Register Now
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="outline" className="text-md border-white text-white hover:bg-white/10">
                Schedule a Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
