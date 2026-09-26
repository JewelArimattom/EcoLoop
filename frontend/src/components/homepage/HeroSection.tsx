// src/components/sections/HeroSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Sparkles } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-green-50 to-emerald-50 py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-center lg:text-left reveal">
            <div className="inline-flex items-center gap-2 bg-white/70 px-3 py-1.5 rounded-full text-sm font-semibold text-green-700 mb-4">
              <Sparkles className="w-4 h-4 text-green-700" />
              Kerala's Trusted Recycling Platform
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Turn your e-waste into value
            </h1>
            <p className="text-lg text-gray-700 mb-6 max-w-xl">
              Schedule free doorstep pickup, get fair prices, and ensure certified recycling — all from your phone.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:items-start">
              <Link to="/schedule-pickup" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-md font-semibold shadow btn-animate btn-press">
                <Recycle className="w-5 h-5" />
                Schedule Pickup
              </Link>
              <Link to="/how-it-works" className="text-emerald-700 hover:underline font-medium">
                Learn how it works
              </Link>
            </div>

            <div className="mt-6 flex gap-4 text-sm text-gray-700">
              <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm">
                <div className="text-xl font-bold text-emerald-600">10T+</div>
                <div>Recycled</div>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm">
                <div className="text-xl font-bold text-emerald-600">1K+</div>
                <div>Users</div>
              </div>
            </div>
          </div>

          {/* Right: Simple Visual Card */}
          <div className="order-first lg:order-last lg:flex justify-end">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 max-w-sm mx-auto reveal">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-xl mb-3">
                  <Recycle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">We collect everything</h3>
                <p className="text-sm text-gray-600 mt-1">Electronics, plastics, paper, batteries, and more.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 rounded-lg p-3 text-center">📱<div className="text-xs text-gray-700 mt-1">Electronics</div></div>
                <div className="bg-green-50 rounded-lg p-3 text-center">♻️<div className="text-xs text-gray-700 mt-1">Plastics</div></div>
                <div className="bg-green-50 rounded-lg p-3 text-center">📰<div className="text-xs text-gray-700 mt-1">Paper</div></div>
                <div className="bg-green-50 rounded-lg p-3 text-center">🔧<div className="text-xs text-gray-700 mt-1">Metal</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;