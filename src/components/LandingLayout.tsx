
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import LandingHeader from './LandingHeader';
import { motion, AnimatePresence } from 'framer-motion';

const LandingLayout: React.FC = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <LandingHeader />
      <AnimatePresence mode="wait">
        <motion.main 
          key={location.pathname}
          className="flex-1 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-5 pointer-events-none"></div>
          <Outlet />
        </motion.main>
      </AnimatePresence>
    </div>
  );
};

export default LandingLayout;
