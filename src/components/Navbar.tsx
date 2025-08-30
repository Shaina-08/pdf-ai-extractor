'use client';

import React, { useState, useEffect } from 'react';
import { NavbarProps } from '../types/schemas';

const Navbar: React.FC<NavbarProps> = ({ currentPage = 'home' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'History', path: '/history' },
    { name: 'About', path: '/about' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-[#0e2e22]/95 backdrop-blur-md shadow-lg border-b border-green-200' 
        : 'bg-[#0e2e22] border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center group">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-3 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110 border border-white/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-white">PDF Analyser</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.path}
                className={`flex items-center px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  currentPage === item.name.toLowerCase()
                    ? 'text-[#0e2e22] bg-white border-2 border-white shadow-md'
                    : 'text-white hover:text-white hover:bg-white/20'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-white focus:outline-none focus:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-white/20"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
        isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#0e2e22]/95 backdrop-blur-md border-t border-green-200">
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href={item.path}
              className={`flex items-center px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 transform hover:scale-105 ${
                currentPage === item.name.toLowerCase()
                  ? 'text-[#0e2e22] bg-white border-2 border-white shadow-md'
                  : 'text-white hover:text-white hover:bg-white/20'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
