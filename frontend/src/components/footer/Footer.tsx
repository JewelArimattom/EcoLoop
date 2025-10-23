// src/components/layout/Footer.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, Instagram, Linkedin, Twitter, Mail, Send, 
  Recycle, Info, Phone, MapPin, Award
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 pt-16 pb-8 mt-16 overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.05),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.05),transparent_50%)]"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left mb-12">

          {/* Section 1: Premium Logo and Brand */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center gap-3 group mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 p-2.5 rounded-xl">
                  <Recycle className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent tracking-tight">
                  EcoLoop
                </span>
                <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase -mt-1">
                  Premium Recycling
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-6 max-w-xs leading-relaxed">
              India's most trusted e-waste and scrap recycling platform. Turning waste into wealth, responsibly.
            </p>
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl">
              <Award className="w-4 h-4 text-emerald-400" strokeWidth={2.5} />
              <span className="text-xs font-semibold text-emerald-300">Certified & Trusted</span>
            </div>
            <p className="text-gray-500 text-xs mt-6">
              © {new Date().getFullYear()} EcoLoop. All rights reserved.
            </p>
          </div>

          {/* Section 2: Quick Links with Icons */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center justify-center md:justify-start gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/how-it-works', label: 'How It Works', Icon: Recycle },
                { to: '/about', label: 'About Us', Icon: Info },
                { to: '/contact', label: 'Contact', Icon: Phone }
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.to} 
                    className="group flex items-center justify-center md:justify-start gap-3 hover:text-emerald-400 transition-all duration-300 text-sm"
                  >
                    <div className="p-1.5 bg-gray-700/50 group-hover:bg-emerald-500/20 border border-gray-600 group-hover:border-emerald-500/30 rounded-lg transition-all duration-300">
                      <link.Icon className="w-4 h-4" strokeWidth={2.5} />
                    </div>
                    <span className="font-medium">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Legal & Support */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center justify-center md:justify-start gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
              Support & Legal
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/faq', label: 'FAQ' },
                { to: '/privacy-policy', label: 'Privacy Policy' },
                { to: '/terms-of-service', label: 'Terms of Service' },
                { to: '/sitemap', label: 'Sitemap' }
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.to} 
                    className="hover:text-emerald-400 transition-all text-sm font-medium inline-block hover:translate-x-1 duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Premium Newsletter & Social Media */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
              Stay Connected
            </h3>
            <p className="text-sm mb-5 text-center md:text-left text-gray-400 font-medium">
              Subscribe for exclusive updates & offers
            </p>
            <div className="flex w-full max-w-sm mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-l-xl border-2 border-gray-700 bg-gray-800/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder-gray-500 backdrop-blur-sm transition-all duration-300"
              />
              <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-5 rounded-r-xl text-sm font-bold transition-all duration-300 flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transform hover:scale-105">
                <Send className="w-5 h-5" strokeWidth={2.5} />
              </button>
            </div>
            
            {/* Premium Social Media Icons */}
            <div className="flex space-x-3 mb-6">
              {[
                { Icon: Facebook, href: 'https://facebook.com/ecoloop', color: 'from-blue-600 to-blue-700' },
                { Icon: Twitter, href: 'https://twitter.com/ecoloop', color: 'from-sky-500 to-blue-600' },
                { Icon: Instagram, href: 'https://instagram.com/ecoloop', color: 'from-pink-500 via-purple-500 to-orange-500' },
                { Icon: Linkedin, href: 'https://linkedin.com/company/ecoloop', color: 'from-blue-700 to-blue-800' }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`group relative p-3 bg-gray-700/50 hover:bg-gradient-to-r ${social.color} border border-gray-600 hover:border-transparent rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1`}
                >
                  <social.Icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" strokeWidth={2.5} />
                  <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </a>
              ))}
            </div>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4 text-emerald-400" strokeWidth={2.5} />
                <span className="font-medium">+91 1800-ECOLOOP</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4 text-emerald-400" strokeWidth={2.5} />
                <span className="font-medium">Mumbai, India</span>
              </div>
            </div>
          </div>

        </div>
        
        {/* Premium Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-gray-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" strokeWidth={2.5} />
                ISO Certified
              </span>
              <span className="flex items-center gap-2">
                <Recycle className="w-4 h-4 text-teal-400" strokeWidth={2.5} />
                100% Eco-Friendly
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" strokeWidth={2.5} />
                support@ecoloop.in
              </span>
            </div>
            <div className="text-xs text-gray-500 font-medium">
              Made with <span className="text-emerald-400">♥</span> in India
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;