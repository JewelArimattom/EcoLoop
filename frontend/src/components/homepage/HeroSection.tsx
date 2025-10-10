// src/components/sections/HeroSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-sky-900 text-white py-20 md:py-32 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-emerald-400 rounded-full opacity-30 animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-sky-400 rounded-full opacity-40 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-amber-300 rounded-full opacity-50 animate-float" style={{animationDelay: '2s'}}></div>
        
        {/* Gradient orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-sky-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-r from-amber-400/10 to-emerald-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-emerald-100 mb-6 animate-pulse">
            🌟 India's Most Trusted E-Waste & Scrap Solution
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Turn Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-sky-300 to-amber-300 animate-gradient">
              E-Waste
            </span>{' '}
            Into Instant Cash
          </h1>
          
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl leading-relaxed">
            Schedule <span className="font-semibold text-white">free doorstep pickup</span> for your electronic waste & scrap materials. 
            Get <span className="font-semibold text-white">best market prices</span> with instant payment & contribute to a cleaner planet.
          </p>

          {/* Animated Metrics */}
          <div className="flex flex-wrap gap-8 mb-8">
            {[
              { number: '50,000+', label: 'Happy Customers', emoji: '😊' },
              { number: '200+ Tons', label: 'E-Waste Recycled', emoji: '🌱' },
              { number: '50+ Cities', label: 'Across India', emoji: '🏙️' },
              { number: '24/7', label: 'Customer Support', emoji: '🛡️' }
            ].map((metric, index) => (
              <div key={index} className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                  <span>{metric.emoji}</span>
                  <span>{metric.number}</span>
                </div>
                <div className="text-emerald-200 text-sm mt-1">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons with Hover Effects */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link
              to="/schedule-pickup"
              className="group relative bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-semibold text-lg px-8 py-4 rounded-xl flex items-center justify-center gap-3 shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="text-xl">📱</span>
              <span className="relative">Schedule Free Pickup</span>
              <span className="relative group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            
            <Link
              to="/how-it-works"
              className="group border-2 border-white/50 hover:border-white hover:bg-white/10 text-white font-semibold text-lg px-8 py-4 rounded-xl flex items-center justify-center gap-2 backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
            >
              <span>ℹ️</span>
              <span>How It Works</span>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm">
            {[
              { text: '🚚 Free Doorstep Pickup', icon: '✅' },
              { text: '💳 Instant Payment', icon: '⚡' },
              { text: '🌍 Certified Recycling', icon: '♻️' }
            ].map((badge, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/20">
                <span>{badge.icon}</span>
                <span className="text-emerald-100">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-lg">
            {/* Main Floating Card */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-sky-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-3xl">📦</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">We Collect Everything</h3>
                <p className="text-emerald-100">From small gadgets to large appliances</p>
              </div>
              
              {/* Item Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { icon: '📱', name: 'Smartphones', color: 'from-blue-500 to-cyan-500' },
                  { icon: '💻', name: 'Laptops', color: 'from-purple-500 to-pink-500' },
                  { icon: '🔋', name: 'Batteries', color: 'from-amber-500 to-orange-500' },
                  { icon: '📺', name: 'TVs & Monitors', color: 'from-green-500 to-emerald-500' },
                  { icon: '🔌', name: 'Appliances', color: 'from-red-500 to-rose-500' },
                  { icon: '📄', name: 'Paper & Plastic', color: 'from-indigo-500 to-blue-500' }
                ].map((item, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-center group hover:bg-white/10 transition-all duration-300">
                    <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-xl">{item.icon}</span>
                    </div>
                    <div className="text-white text-sm font-medium">{item.name}</div>
                  </div>
                ))}
              </div>

              {/* Process Highlight */}
              <div className="bg-gradient-to-r from-emerald-500/30 to-sky-500/30 border border-emerald-400/30 rounded-xl p-4">
                <div className="flex items-center justify-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🎯</span>
                    <span className="text-emerald-100 font-semibold">Best Price Guarantee</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-400 to-amber-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-2xl animate-bounce">
              ⚡ Instant Cash
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-sky-400 to-sky-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-2xl animate-pulse">
              🌱 Eco-Friendly
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-emerald-400 rounded-full opacity-60 animate-ping"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-sky-400 rounded-full opacity-60 animate-ping" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;