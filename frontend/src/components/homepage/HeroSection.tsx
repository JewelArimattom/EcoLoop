// src/components/sections/HeroSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Gift, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-16 md:py-24 lg:py-28 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzEwYjk4MSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md mb-6">
              <Sparkles className="w-4 h-4 text-green-600" />
              <span className="text-sm font-bold text-green-600">Kerala's Trusted Recycling Platform</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight mb-6">
              Turn Waste into
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 animate-gradient">
                Value & Impact
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Join <strong className="text-green-600">1000+ Kerala households</strong> making money while saving the planet. 
              <span className="block mt-2">Free doorstep pickup • Fair prices • Certified recycling</span>
            </p>

            {/* Impact Metrics - Redesigned */}
            <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto lg:mx-0">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-green-100">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">10T+</div>
                <div className="text-xs md:text-sm text-gray-600 font-semibold mt-1">Recycled</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-green-100">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">1000+</div>
                <div className="text-xs md:text-sm text-gray-600 font-semibold mt-1">Users</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-green-100">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">50+</div>
                <div className="text-xs md:text-sm text-gray-600 font-semibold mt-1">Collectors</div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              {[
                { text: 'Free Pickup', icon: CheckCircle2 },
                { text: 'Fair Prices', icon: CheckCircle2 },
                { text: 'Certified', icon: CheckCircle2 }
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                  <badge.icon className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-bold text-gray-700">{badge.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Button - Single, Prominent */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/schedule-pickup"
                className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white font-black text-lg md:text-xl px-8 md:px-10 py-5 md:py-6 rounded-2xl shadow-2xl hover:shadow-green-500/50 transition-all transform hover:scale-105 touch-manipulation overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <Recycle className="w-6 h-6 md:w-7 md:h-7 relative z-10" />
                <span className="relative z-10">Schedule Free Pickup</span>
                <ArrowRight className="w-6 h-6 md:w-7 md:h-7 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right: Visual Card - Optimized */}
          <div className="relative lg:block hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-green-100">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl mb-4 shadow-lg">
                  <Recycle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">We Collect Everything</h3>
                <p className="text-gray-600 mt-2">From electronics to everyday recyclables</p>
              </div>
              
              {/* Item Categories - Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { name: 'Electronics', emoji: '📱' },
                  { name: 'Plastics', emoji: '♻️' },
                  { name: 'Paper', emoji: '📰' },
                  { name: 'Metal', emoji: '🔧' },
                ].map((item, index) => (
                  <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 text-center border border-green-100 hover:shadow-lg transition-all hover:scale-105">
                    <div className="text-4xl mb-2">{item.emoji}</div>
                    <div className="text-sm font-bold text-gray-800">{item.name}</div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-4 text-center shadow-lg">
                <div className="flex items-center justify-center gap-2 text-white">
                  <Gift className="w-5 h-5" />
                  <span className="font-black text-lg">Earn Reward Points</span>
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 20px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;