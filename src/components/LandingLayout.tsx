
import React from 'react';
import { Outlet } from 'react-router-dom';
import LandingHeader from './LandingHeader';

const LandingLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <LandingHeader />
      <main className="flex-1 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-5 pointer-events-none"></div>
        <Outlet />
      </main>
    </div>
  );
};

export default LandingLayout;
