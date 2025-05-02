
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header onMenuToggle={toggleSidebar} />
      <div className="flex flex-1">
        <div className={`md:block ${sidebarOpen ? 'block' : 'hidden'}`}>
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
