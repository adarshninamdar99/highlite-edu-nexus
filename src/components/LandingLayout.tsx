
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const LandingLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header onMenuToggle={() => {}} /> {/* Empty function since we don't need sidebar toggle */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default LandingLayout;
