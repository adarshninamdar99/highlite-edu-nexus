
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LandingHeader: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center">
            <motion.span 
              className="text-2xl font-medium text-highlite-primary"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Highlite<span className="text-highlite-accent">X</span>
            </motion.span>
          </Link>
          
          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden md:flex items-center space-x-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {[
              { text: "Features", path: "/features" },
              { text: "For Students", path: "/for-students" },
              { text: "For Colleges", path: "/for-colleges" },
              { text: "For Employers", path: "/for-employers" },
              { text: "Pricing", path: "/pricing" }
            ].map((item, index) => (
              <Link 
                key={index}
                to={item.path} 
                className="text-sm px-4 py-2 text-gray-600 hover:text-highlite-accent transition-colors rounded-md hover:bg-gray-50"
              >
                {item.text}
              </Link>
            ))}
          </motion.nav>
          
          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
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
          
          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={toggleMobileMenu}
            whileTap={{ scale: 0.95 }}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </motion.button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 pb-5 bg-white shadow-lg rounded-b-lg">
              <div className="flex flex-col space-y-2 pt-2">
                {[
                  { text: "Features", path: "/features" },
                  { text: "For Students", path: "/for-students" },
                  { text: "For Colleges", path: "/for-colleges" },
                  { text: "For Employers", path: "/for-employers" },
                  { text: "Pricing", path: "/pricing" }
                ].map((item, index) => (
                  <Link 
                    key={index}
                    to={item.path} 
                    className="px-4 py-3 text-gray-600 hover:text-highlite-accent hover:bg-gray-50 rounded-md text-sm font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.text}
                  </Link>
                ))}
                
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                  <Link to="/login">
                    <Button variant="ghost" className="w-full text-sm">
                      Log in
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="w-full text-sm bg-highlite-accent hover:bg-highlite-light text-white">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default LandingHeader;
