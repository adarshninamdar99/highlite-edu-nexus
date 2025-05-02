
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header onMenuToggle={toggleSidebar} />
      <div className="flex flex-1">
        <div 
          className={`md:block fixed inset-0 z-20 bg-black/50 md:hidden transition-opacity ${
            sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          onClick={() => setSidebarOpen(false)}
        />
        <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block z-30`}>
          <Sidebar isOpen={true} />
        </div>
        <main className="flex-1 p-4 md:p-6 md:ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
