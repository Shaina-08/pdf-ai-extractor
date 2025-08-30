'use client';

import React, { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
  currentPage?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage = 'home' }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage={currentPage} />
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
