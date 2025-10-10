// src/components/layout/Footer.tsx

import React from 'react';
import { Link } from 'react-router-dom'; // Using Link from react-router-dom
import { Facebook, Instagram, Linkedin, Twitter, Mail } from 'lucide-react'; // Icon library

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">

          {/* Section 1: Logo and Slogan */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="text-3xl font-bold text-green-400 mb-2">
              EcoLoop 🌿
            </Link>
            <p className="text-gray-400 text-sm">
              Connecting sustainable choices.
            </p>
            <p className="text-gray-500 text-xs mt-4">
              © {new Date().getFullYear()} EcoLoop. All rights reserved.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/marketplace" className="hover:text-green-400 transition-colors text-sm">Marketplace</Link></li>
              <li><Link to="/how-it-works" className="hover:text-green-400 transition-colors text-sm">How It Works</Link></li>
              <li><Link to="/about" className="hover:text-green-400 transition-colors text-sm">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-green-400 transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Section 3: Legal & Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="hover:text-green-400 transition-colors text-sm">FAQ</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-green-400 transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-green-400 transition-colors text-sm">Terms of Service</Link></li>
              <li><Link to="/sitemap" className="hover:text-green-400 transition-colors text-sm">Sitemap</Link></li>
            </ul>
          </div>

          {/* Section 4: Newsletter & Social Media */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-white mb-4">Stay Connected</h3>
            <p className="text-sm mb-3 text-center md:text-left">Subscribe to our newsletter for updates.</p>
            <div className="flex w-full max-w-sm">
              <input
                type="email"
                placeholder="Your email"
                className="p-2 rounded-l-md border border-gray-600 bg-gray-700 text-white text-sm w-full focus:outline-none focus:ring-1 focus:ring-green-400"
              />
              <button className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-r-md text-sm transition-colors flex items-center justify-center">
                <Mail size={18} />
              </button>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <a href="https://facebook.com/ecoloop" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com/ecoloop" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com/ecoloop" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com/company/ecoloop" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;