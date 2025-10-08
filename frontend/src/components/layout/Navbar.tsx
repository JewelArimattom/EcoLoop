// src/components/layout/NavigationBar.tsx

import React, { useState } from 'react';
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react'; 

// Define the props for the component for type safety
interface NavigationBarProps {
  isLoggedIn: boolean;
  userName?: string;
  onLogout: () => void;
}

const Navbar: React.FC<NavigationBarProps> = ({ isLoggedIn, userName, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Reusable link items for DRY code
  const navLinks = [
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/about', label: 'About Us' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-green-600">
              EcoLoop 🌿
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-600 hover:bg-green-100 hover:text-green-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Auth buttons and User Menu (Desktop) */}
          <div className="hidden md:block">
            {isLoggedIn ? (
              <div className="ml-4 relative">
                <div>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="max-w-xs bg-gray-100 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                      {userName ? userName.charAt(0).toUpperCase() : <User size={18} />}
                    </div>
                  </button>
                </div>
                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <a href="/dashboard" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      <LayoutDashboard size={16} className="mr-2" />
                      Dashboard
                    </a>
                    <button
                      onClick={onLogout}
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <a href="/login" className="text-gray-600 hover:text-green-800 px-3 py-2 rounded-md text-sm font-medium">
                  Log In
                </a>
                <a href="/signup" className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Sign Up
                </a>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-green-600 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-600 hover:bg-green-100 hover:text-green-800 block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
          {/* Auth links for mobile */}
          <div className="pt-4 pb-3 border-t border-gray-200">
             {isLoggedIn ? (
                <div className="px-2 space-y-1">
                    <a href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100">Dashboard</a>
                    <button onClick={onLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100">
                        Logout
                    </button>
                </div>
             ) : (
                <div className="px-2 space-y-2">
                     <a href="/signup" className="block w-full text-center bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                        Sign Up
                     </a>
                     <a href="/login" className="block text-center text-gray-600 hover:text-green-800 px-3 py-2 rounded-md text-sm font-medium">
                        Log In
                     </a>
                </div>
             )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;