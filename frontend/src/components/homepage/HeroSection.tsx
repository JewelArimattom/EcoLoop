// src/components/sections/HeroSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, Laptop, Battery, Tv, Zap, FileText, 
  TrendingUp, Shield, Sparkles, ArrowRight, CheckCircle2,
  Clock, Award, Leaf
} from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 text-white py-24 md:py-32 overflow-hidden">
      {/* Premium Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Mesh Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.1),transparent_50%)]"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400 rounded-full opacity-40 blur-sm"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-teal-400 rounded-full opacity-50 blur-sm"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-cyan-300 rounded-full opacity-60 blur-sm"></div>
        
        {/* Premium Gradient orbs */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-gradient-to-r from-cyan-400/15 to-blue-400/15 rounded-full blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Text Content - Premium Design */}
        <div className="md:w-1/2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-semibold text-emerald-100 mb-8 group hover:bg-white/15 transition-all duration-300 cursor-pointer">
            <div className="p-1 bg-emerald-400 rounded-full">
              <Award className="w-3 h-3 text-white" strokeWidth={3} />
            </div>
            <span>India's #1 Trusted E-Waste Solution</span>
            <Sparkles className="w-4 h-4 text-yellow-300 group-hover:rotate-12 transition-transform" />
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-8 tracking-tight">
            Turn Your{' '}
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 animate-gradient relative">
              E-Waste
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform"></div>
            </span>{' '}
            Into Instant{' '}
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 animate-gradient">
              Cash
            </span>
          </h1>
          
          <p className="text-xl text-emerald-50 mb-10 max-w-2xl leading-relaxed font-medium">
            Schedule <span className="font-bold text-white underline decoration-emerald-400 decoration-2 underline-offset-2">free doorstep pickup</span> for your electronic waste & scrap materials. 
            Get <span className="font-bold text-white underline decoration-teal-400 decoration-2 underline-offset-2">best market prices</span> with instant payment & contribute to a cleaner planet.
          </p>

          {/* Premium Feature Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Shield, number: '50K+', label: 'Happy Customers', gradient: 'from-emerald-500 to-teal-500' },
              { icon: Leaf, number: '200+', label: 'Tons Recycled', gradient: 'from-teal-500 to-cyan-500' },
              { icon: TrendingUp, number: '50+', label: 'Cities', gradient: 'from-cyan-500 to-blue-500' },
              { icon: Clock, number: '24/7', label: 'Support', gradient: 'from-blue-500 to-purple-500' }
            ].map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <div key={index} className="group text-center transform hover:scale-110 transition-all duration-300">
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${metric.gradient} rounded-xl mb-2 shadow-lg group-hover:shadow-2xl transition-shadow`}>
                    <IconComponent className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="text-2xl font-black text-white">{metric.number}</div>
                  <div className="text-emerald-200 text-xs font-semibold uppercase tracking-wider">{metric.label}</div>
                </div>
              );
            })}
          </div>

          {/* Premium CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 mb-10">
            <Link
              to="/schedule-pickup"
              className="group relative bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white font-bold text-lg px-10 py-5 rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-emerald-500/50 hover:shadow-emerald-500/70 transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <Sparkles className="w-6 h-6 relative z-10" strokeWidth={2.5} />
              <span className="relative z-10">Schedule Free Pickup</span>
              <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
            </Link>
            
            <Link
              to="/how-it-works"
              className="group border-2 border-white/30 hover:border-white hover:bg-white/10 text-white font-bold text-lg px-10 py-5 rounded-2xl flex items-center justify-center gap-3 backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
            >
              <CheckCircle2 className="w-6 h-6" strokeWidth={2.5} />
              <span>How It Works</span>
            </Link>
          </div>

          {/* Premium Trust Badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            {[
              { icon: Zap, text: 'Free Pickup' },
              { icon: Shield, text: 'Instant Payment' },
              { icon: Award, text: 'Certified Recycling' }
            ].map((badge, index) => {
              const IconComponent = badge.icon;
              return (
                <div key={index} className="group flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer">
                  <div className="p-1.5 bg-emerald-400 rounded-lg group-hover:scale-110 transition-transform">
                    <IconComponent className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-emerald-50 font-semibold text-sm">{badge.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Premium Hero Illustration Card */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-lg">
            {/* Premium Glassmorphic Card */}
            <div className="bg-white/10 backdrop-blur-2xl border-2 border-white/20 rounded-3xl p-10 shadow-2xl transform hover:scale-105 transition-transform duration-500 relative overflow-hidden">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 pointer-events-none"></div>
              
              <div className="text-center mb-8 relative z-10">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-3xl blur-xl opacity-75"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 rounded-3xl flex items-center justify-center shadow-2xl">
                    <Leaf className="w-12 h-12 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-white mb-3">We Collect Everything</h3>
                <p className="text-emerald-100 font-medium text-lg">From small gadgets to large appliances</p>
              </div>
              
              {/* Premium Item Grid with Icons */}
              <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                {[
                  { Icon: Smartphone, name: 'Smartphones', gradient: 'from-blue-500 to-cyan-500' },
                  { Icon: Laptop, name: 'Laptops', gradient: 'from-purple-500 to-pink-500' },
                  { Icon: Battery, name: 'Batteries', gradient: 'from-amber-500 to-orange-500' },
                  { Icon: Tv, name: 'TVs', gradient: 'from-green-500 to-emerald-500' },
                  { Icon: Zap, name: 'Appliances', gradient: 'from-red-500 to-rose-500' },
                  { Icon: FileText, name: 'Paper', gradient: 'from-indigo-500 to-blue-500' }
                ].map((item, index) => {
                  const IconComponent = item.Icon;
                  return (
                    <div key={index} className="group bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 rounded-2xl p-5 text-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
                      <div className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <IconComponent className="w-8 h-8 text-white" strokeWidth={2.5} />
                      </div>
                      <div className="text-white text-sm font-bold">{item.name}</div>
                    </div>
                  );
                })}
              </div>

              {/* Premium Process Highlight */}
              <div className="bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-cyan-500/30 backdrop-blur-sm border-2 border-emerald-400/40 rounded-2xl p-5 relative z-10 group hover:border-emerald-400/60 transition-all duration-300">
                <div className="flex items-center justify-center gap-3">
                  <div className="p-2 bg-emerald-400 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-white font-black text-lg">Best Price Guarantee</span>
                </div>
              </div>
            </div>

           
            
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-emerald-400 rounded-full opacity-60"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-cyan-400 rounded-full opacity-60"></div>
          </div>
        </div>
      </div>

     
    </section>
  );
};

export default HeroSection;