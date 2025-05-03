
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Rocket, Star } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <div className="py-24 highlite-gradient-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Career Journey?</h2>
            <p className="text-lg text-white/90 mb-8 max-w-lg">
              Join thousands of students, colleges, and employers already using HighliteX to connect talent with opportunity.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Link to="/register">
                <Button className="text-md bg-white text-highlite-primary hover:bg-gray-100 flex items-center gap-2">
                  <Rocket className="h-4 w-4" /> Register Now
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="outline" className="text-md border-white text-white hover:bg-white/10 flex items-center gap-2">
                  <Star className="h-4 w-4" /> Schedule a Demo
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex items-center justify-center md:justify-start gap-8">
              <div className="text-center">
                <div className="text-white text-2xl font-bold">1.2M+</div>
                <div className="text-white/70 text-sm">Users</div>
              </div>
              <div className="h-12 w-px bg-white/20"></div>
              <div className="text-center">
                <div className="text-white text-2xl font-bold">200+</div>
                <div className="text-white/70 text-sm">Colleges</div>
              </div>
              <div className="h-12 w-px bg-white/20"></div>
              <div className="text-center">
                <div className="text-white text-2xl font-bold">500+</div>
                <div className="text-white/70 text-sm">Companies</div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full bg-white/10 rounded-lg"></div>
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-white/10 rounded-lg"></div>
              <div className="relative bg-white/20 backdrop-blur-sm rounded-lg p-8 border border-white/30">
                <div className="flex items-center mb-6">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-highlite-light flex items-center justify-center text-white text-xs font-bold">JD</div>
                    <div className="w-8 h-8 rounded-full bg-highlite-accent flex items-center justify-center text-white text-xs font-bold">KP</div>
                    <div className="w-8 h-8 rounded-full bg-highlite-primary flex items-center justify-center text-white text-xs font-bold">AR</div>
                  </div>
                  <div className="ml-4 text-white/90">People are joining right now</div>
                </div>
                <blockquote className="text-white font-medium italic mb-6">
                  "HighliteX helped me improve my interview skills and land multiple job offers. The AI feedback was spot on!"
                </blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Rahul S.</div>
                    <div className="text-white/70 text-sm">Data Scientist</div>
                  </div>
                  <div className="flex">
                    <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" />
                    <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" />
                    <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" />
                    <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" />
                    <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
