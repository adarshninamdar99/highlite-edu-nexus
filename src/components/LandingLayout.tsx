
import React from 'react';
import { Outlet } from 'react-router-dom';
import LandingHeader from './LandingHeader';

const LandingLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <LandingHeader />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default LandingLayout;
