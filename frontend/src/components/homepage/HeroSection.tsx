// src/components/sections/HeroSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Gift, ArrowRight, CheckCircle2, Sparkles, Users } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-white py-12 md:py-20 overflow-hidden">
      {/* Simple Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 to-white opacity-60"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full -translate-y-48 translate-x-48 blur-3xl opacity-30"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Left: Text Content */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-4 md:mb-6">
              Turning E-Waste into Value —<br />
              <span className="text-green-600">Recycle, Earn, and Empower Your Community</span>
            </h1>
            
            <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed">
              EcoLoop connects households and local scrap collectors in Kerala for easy, eco-friendly waste recycling. 
              <strong className="text-gray-900"> Free doorstep pickup. Fair prices. Real impact.</strong>
            </p>

            {/* Impact Metrics */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8 p-4 bg-green-50 rounded-xl border-2 border-green-200">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black text-green-600">10T+</div>
                <div className="text-xs md:text-sm text-gray-600 font-semibold">Waste Recycled</div>
              </div>
              <div className="text-center border-x border-green-200">
                <div className="text-2xl md:text-3xl font-black text-green-600">1000+</div>
                <div className="text-xs md:text-sm text-gray-600 font-semibold">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black text-green-600">50+</div>
                <div className="text-xs md:text-sm text-gray-600 font-semibold">Active Collectors</div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="flex items-center gap-2 text-sm md:text-base text-gray-700">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0" />
                <span>Free Pickup</span>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base text-gray-700">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0" />
                <span>Fair Prices</span>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base text-gray-700">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0" />
                <span>Certified Recycling</span>
              </div>
            </div>

            {/* CTA Buttons - Mobile Optimized */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link
                to="/schedule-pickup"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold text-base md:text-lg px-6 md:px-8 py-4 md:py-5 rounded-xl shadow-lg hover:shadow-xl transition-all touch-manipulation"
              >
                <Recycle className="w-5 h-5 md:w-6 md:h-6" />
                Schedule Free Pickup
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </Link>
              
              <Link
                to="/register?role=worker"
                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 font-bold text-base md:text-lg px-6 md:px-8 py-4 md:py-5 rounded-xl transition-all touch-manipulation"
              >
                <Users className="w-5 h-5 md:w-6 md:h-6" />
                Join as Collector
              </Link>
            </div>
          </div>

          {/* Right: Visual Card */}
          <div className="relative">
            <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl border-2 border-green-200">
              <div className="text-center mb-4 md:mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-green-600 rounded-2xl mb-3 md:mb-4">
                  <Recycle className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">We Collect Everything</h3>
                <p className="text-sm md:text-base text-gray-600 mt-2">From electronics to everyday recyclables</p>
              </div>
              
              {/* Item Categories */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {[
                  { name: 'Smartphones & Laptops', emoji: '📱' },
                  { name: 'Plastics & Bottles', emoji: '♻️' },
                  { name: 'Paper & Cardboard', emoji: '📰' },
                  { name: 'Metal Scrap', emoji: '🔧' },
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded-xl p-3 md:p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-2xl md:text-3xl mb-2">{item.emoji}</div>
                    <div className="text-xs md:text-sm font-semibold text-gray-800">{item.name}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 md:mt-6 bg-white rounded-xl p-3 md:p-4 text-center border-2 border-green-500">
                <div className="flex items-center justify-center gap-2 text-green-700">
                  <Gift className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="font-bold text-sm md:text-base">Earn Reward Points</span>
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
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