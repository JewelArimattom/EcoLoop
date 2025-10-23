// src/components/layout/NavigationBar.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, LogOut, LayoutDashboard, Sparkles, Recycle, Info } from 'lucide-react'; 

// Define the props for the component for type safety
interface NavigationBarProps {
  isLoggedIn: boolean;
  userName?: string;
  onLogout: () => void;
}

const Navbar: React.FC<NavigationBarProps> = ({ isLoggedIn, userName, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsUserMenuOpen(false);
      }
    };
    
    if (isMobileMenuOpen || isUserMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, isUserMenuOpen]);

  // Reusable link items for DRY code with icons
  const navLinks = [
    { href: '/how-it-works', label: 'How It Works', icon: Recycle },
    { href: '/about', label: 'About Us', icon: Info },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-emerald-500/5' 
        : 'bg-white shadow-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo - Premium Design */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur-md group-hover:blur-lg transition-all duration-300 opacity-50"></div>
                <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 p-2.5 rounded-xl">
                  <Recycle className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent tracking-tight">
                  EcoLoop
                </span>
                <span className="text-[10px] text-gray-500 font-medium tracking-wider uppercase -mt-1">
                  Premium Recycling
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links - Premium Design */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="group flex items-center gap-2 text-gray-700 hover:text-emerald-600 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-emerald-50/80 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-300"></div>
                    <IconComponent className="w-4 h-4 relative z-10" strokeWidth={2.5} />
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Auth buttons and User Menu (Desktop) - Premium Design */}
          <div className="hidden md:block">
            {isLoggedIn ? (
              <div className="ml-4 relative">
                <div>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="relative group flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 rounded-xl px-4 py-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all duration-300">
                      {userName ? userName.charAt(0).toUpperCase() : <User size={20} strokeWidth={2.5} />}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-xs text-gray-500 font-medium">Welcome back</span>
                      <span className="text-sm font-bold text-gray-800">{userName || 'User'}</span>
                    </div>
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                  </button>
                </div>
                {/* User Dropdown Menu - Premium */}
                {isUserMenuOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-3 w-60 rounded-2xl shadow-2xl py-2 bg-white/90 backdrop-blur-xl ring-1 ring-black/5 focus:outline-none animate-scale-in"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Account</p>
                      <p className="text-sm font-bold text-gray-800">{userName || 'User'}</p>
                    </div>
                    <Link to="/dashboard" className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-200" role="menuitem">
                      <div className="p-2 rounded-lg bg-emerald-100 group-hover:bg-emerald-200 transition-colors mr-3">
                        <LayoutDashboard size={16} className="text-emerald-600" strokeWidth={2.5} />
                      </div>
                      <span className="font-semibold">Dashboard</span>
                    </Link>
                    <button
                      onClick={onLogout}
                      className="group w-full text-left flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 transition-all duration-200"
                      role="menuitem"
                    >
                      <div className="p-2 rounded-lg bg-red-100 group-hover:bg-red-200 transition-colors mr-3">
                        <LogOut size={16} className="text-red-600" strokeWidth={2.5} />
                      </div>
                      <span className="font-semibold">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-gray-700 hover:text-emerald-600 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-emerald-50/80">
                  Log In
                </Link>
                <Link to="/signup" className="relative group bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105 overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <span className="relative flex items-center gap-2">
                    <Sparkles className="w-4 h-4" strokeWidth={2.5} />
                    Sign Up Free
                  </span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button - Premium Design */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 inline-flex items-center justify-center p-3 rounded-xl text-emerald-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500 transition-all duration-300"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? 
                <X className="block h-6 w-6" strokeWidth={2.5} /> : 
                <Menu className="block h-6 w-6" strokeWidth={2.5} />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel - Premium Design */}
      {isMobileMenuOpen && (
        <div className="md:hidden animate-slide-up" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-to-b from-white to-gray-50">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex items-center gap-3 text-gray-700 hover:text-emerald-600 hover:bg-gradient-to-r from-emerald-50 to-teal-50 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                >
                  <div className="p-1.5 rounded-lg bg-emerald-100/50 group-hover:bg-emerald-200 transition-colors">
                    <IconComponent className="w-4 h-4 text-emerald-600" strokeWidth={2.5} />
                  </div>
                  {link.label}
                </Link>
              );
            })}
          </div>
          {/* Auth links for mobile - Premium */}
          <div className="pt-3 pb-4 border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white">
             {isLoggedIn ? (
                <div className="px-2 space-y-2">
                    <div className="flex items-center gap-3 mb-3 px-3 py-2.5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/30">
                        {userName ? userName.charAt(0).toUpperCase() : <User size={20} strokeWidth={2.5} />}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Welcome back</p>
                        <p className="text-sm font-bold text-gray-800">{userName || 'User'}</p>
                      </div>
                    </div>
                    <Link 
                      to="/dashboard" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:text-emerald-600 hover:bg-gradient-to-r from-emerald-50 to-teal-50 transition-all duration-300"
                    >
                        <div className="p-1.5 rounded-lg bg-emerald-100 group-hover:bg-emerald-200 transition-colors">
                          <LayoutDashboard size={18} className="text-emerald-600" strokeWidth={2.5} />
                        </div>
                        Dashboard
                    </Link>
                    <button 
                      onClick={() => {
                        onLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="group w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:text-red-600 hover:bg-gradient-to-r from-red-50 to-rose-50 transition-all duration-300"
                    >
                        <div className="p-1.5 rounded-lg bg-red-100 group-hover:bg-red-200 transition-colors">
                          <LogOut size={18} className="text-red-600" strokeWidth={2.5} />
                        </div>
                        Logout
                    </button>
                </div>
             ) : (
                <div className="px-2 space-y-2.5">
                     <Link 
                       to="/signup"
                       onClick={() => setIsMobileMenuOpen(false)}
                       className="relative group flex items-center justify-center gap-2 w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 overflow-hidden"
                     >
                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        <Sparkles className="w-4 h-4 relative z-10" strokeWidth={2.5} />
                        <span className="relative z-10">Sign Up Free</span>
                     </Link>
                     <Link 
                       to="/login"
                       onClick={() => setIsMobileMenuOpen(false)}
                       className="block text-center text-gray-700 hover:text-emerald-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-50 transition-all duration-300"
                     >
                        Log In
                     </Link>
                </div>
             )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;