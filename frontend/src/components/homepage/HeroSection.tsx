// src/components/sections/HeroSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Gift, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-white py-16 md:py-24 overflow-hidden">
      {/* Simple Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 to-white opacity-60"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full -translate-y-48 translate-x-48 blur-3xl opacity-30"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text Content */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
              Recycle Smart.<br />
              Earn Rewards.<br />
              <span className="text-green-600">Build a Cleaner Kerala.</span>
            </h1>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              EcoLoop connects households and local scrap collectors for easy, eco-friendly waste collection — from old phones to plastics. 
              <strong className="text-gray-900"> Simple, rewarding, and traceable.</strong>
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>Free Doorstep Pickup</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>Fair Prices</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>Certified Recycling</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/schedule-pickup"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <Recycle className="w-5 h-5" />
                Schedule a Pickup
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                to="/register?role=worker"
                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 font-bold text-lg px-8 py-4 rounded-xl transition-all"
              >
                Join as Collector
              </Link>
            </div>
          </div>

          {/* Right: Image/Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-3xl p-8 shadow-xl border-2 border-green-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-2xl mb-4">
                  <Recycle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">We Collect Everything</h3>
                <p className="text-gray-600 mt-2">From electronics to everyday recyclables</p>
              </div>
              
              {/* Item Categories */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'Smartphones & Laptops', emoji: '📱' },
                  { name: 'Plastics & Bottles', emoji: '♻️' },
                  { name: 'Paper & Cardboard', emoji: '📰' },
                  { name: 'Metal Scrap', emoji: '🔧' },
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-3xl mb-2">{item.emoji}</div>
                    <div className="text-sm font-semibold text-gray-800">{item.name}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 bg-white rounded-xl p-4 text-center border-2 border-green-500">
                <div className="flex items-center justify-center gap-2 text-green-700">
                  <Gift className="w-5 h-5" />
                  <span className="font-bold">Earn Reward Points</span>
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;