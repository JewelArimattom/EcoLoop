// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from './HeroSection';
import { 
  Smartphone, Zap, Battery, Package, FileText, Wrench,
  Calendar, Truck, CreditCard, Shield, TrendingUp, Clock,
  Award, CheckCircle, Users, Leaf, DollarSign, Sparkles,
  ArrowRight, Star, Phone
} from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <HeroSection />

      {/* Premium Categories Section */}
      <section className="py-12 md:py-16 bg-white relative overflow-hidden">
        {/* Premium Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.03),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.03),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-200/10 to-teal-200/10 rounded-full -translate-y-48 translate-x-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-200/10 to-blue-200/10 rounded-full translate-y-48 -translate-x-48 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-sm font-semibold text-emerald-700 mb-4">
              <Sparkles className="w-4 h-4" strokeWidth={2.5} />
              Our Services
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 tracking-tight">
              What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">Collect & Recycle</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              From electronics to recyclables, we handle all materials with proper certification and environmental standards.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {[
              { 
                Icon: Smartphone,
                title: 'Electronic Waste', 
                items: ['Smartphones', 'Laptops', 'Tablets', 'Computers', 'Printers', 'Routers'],
                gradient: 'from-blue-500 to-cyan-500',
                bg: 'bg-blue-50',
                border: 'border-blue-200',
                iconBg: 'bg-gradient-to-r from-blue-500 to-cyan-500'
              },
              { 
                Icon: Zap,
                title: 'Home Appliances', 
                items: ['TVs', 'ACs', 'Washing Machines', 'Refrigerators', 'Microwaves', 'Fans'],
                gradient: 'from-purple-500 to-pink-500',
                bg: 'bg-purple-50',
                border: 'border-purple-200',
                iconBg: 'bg-gradient-to-r from-purple-500 to-pink-500'
              },
              { 
                Icon: Battery,
                title: 'Batteries & Power', 
                items: ['Phone Batteries', 'Laptop Batteries', 'Power Banks', 'UPS Batteries', 'Car Batteries'],
                gradient: 'from-amber-500 to-orange-500',
                bg: 'bg-amber-50',
                border: 'border-amber-200',
                iconBg: 'bg-gradient-to-r from-amber-500 to-orange-500'
              },
              { 
                Icon: Package,
                title: 'Plastic & Packaging', 
                items: ['PET Bottles', 'Plastic Containers', 'Packaging Material', 'Toys', 'Furniture'],
                gradient: 'from-green-500 to-emerald-500',
                bg: 'bg-green-50',
                border: 'border-green-200',
                iconBg: 'bg-gradient-to-r from-green-500 to-emerald-500'
              },
              { 
                Icon: FileText,
                title: 'Paper & Cardboard', 
                items: ['Newspapers', 'Books', 'Cardboard', 'Office Paper', 'Magazines', 'Notebooks'],
                gradient: 'from-indigo-500 to-blue-500',
                bg: 'bg-indigo-50',
                border: 'border-indigo-200',
                iconBg: 'bg-gradient-to-r from-indigo-500 to-blue-500'
              },
              { 
                Icon: Wrench,
                title: 'Metal Scrap', 
                items: ['Aluminum', 'Copper', 'Brass', 'Steel', 'Iron', 'Electronic Components'],
                gradient: 'from-gray-600 to-gray-800',
                bg: 'bg-gray-50',
                border: 'border-gray-300',
                iconBg: 'bg-gradient-to-r from-gray-600 to-gray-800'
              }
            ].map((category, index) => {
              const IconComponent = category.Icon;
              return (
                <Link
                  key={index}
                  to="/schedule-pickup"
                  className={`group relative ${category.bg} ${category.border} border rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-14 h-14 ${category.iconBg} rounded-xl flex items-center justify-center shadow-md`}>
                      <IconComponent className="w-7 h-7 text-white" strokeWidth={2.5} />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {category.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {category.items.slice(0, 3).join(' • ')}
                        {category.items.length > 3 && ' & more'}
                      </p>
                      <div className="mt-3 inline-flex items-center gap-1 text-emerald-600 text-sm font-semibold">
                        Schedule Pickup
                        <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Premium How It Works Section */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
        {/* Premium Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-3 h-3 bg-emerald-400 rounded-full opacity-40 blur-sm"></div>
          <div className="absolute top-20 right-20 w-4 h-4 bg-teal-400 rounded-full opacity-50 blur-sm"></div>
          <div className="absolute bottom-20 left-20 w-2 h-2 bg-cyan-400 rounded-full opacity-60 blur-sm"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-full text-sm font-semibold text-emerald-700 mb-6 shadow-sm">
              <CheckCircle className="w-4 h-4" strokeWidth={2.5} />
              Simple Process
            </div>
            <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">
              How <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">EcoLoop</span> Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
              Selling your scrap has never been easier. Just three simple steps to turn your waste into wealth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                step: '1', 
                Icon: Calendar,
                title: 'Schedule Pickup', 
                desc: 'Tell us what you want to sell and schedule a free pickup at your convenience',
                color: 'from-emerald-500 to-teal-600',
                features: ['Online Form', '24/7 Booking', 'Instant Confirmation']
              },
              { 
                step: '2', 
                Icon: Truck,
                title: 'Free Evaluation', 
                desc: 'Our certified executive visits your location for professional item evaluation',
                color: 'from-teal-500 to-cyan-600',
                features: ['Doorstep Service', 'Expert Assessment', 'Best Price Offer']
              },
              { 
                step: '3', 
                Icon: CreditCard,
                title: 'Instant Payment', 
                desc: 'Get paid instantly via UPI, bank transfer, or cash after evaluation',
                color: 'from-cyan-500 to-blue-600',
                features: ['Multiple Payment Options', 'Immediate Transfer', 'Secure Process']
              }
            ].map((step, index) => {
              const IconComponent = step.Icon;
              return (
                <div key={index} className="relative group">
                  {/* Premium Connection Line */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-20 left-1/2 w-full h-0.5 bg-gradient-to-r from-emerald-200 to-teal-200 -z-10">
                      <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left"></div>
                    </div>
                  )}
                  
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border-2 border-white transform hover:scale-105 transition-all duration-500 hover:shadow-2xl relative overflow-hidden">
                    {/* Premium Hover Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    
                    <div className="relative">
                      <div className="relative inline-block mb-8">
                        <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                        <div className={`relative w-20 h-20 bg-gradient-to-r ${step.color} rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-10 h-10 text-white" strokeWidth={2.5} />
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={`inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r ${step.color} text-white rounded-xl text-lg font-black mb-5 shadow-lg`}>
                          {step.step}
                        </div>
                        <h3 className="text-2xl font-black text-gray-800 mb-4">{step.title}</h3>
                        <p className="text-gray-600 leading-relaxed mb-6 font-medium">{step.desc}</p>
                        
                        <div className="space-y-3">
                          {step.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                              <CheckCircle className="w-4 h-4 text-emerald-500" strokeWidth={2.5} />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Premium CTA */}
          <div className="text-center mt-16">
            <Link
              to="/schedule-pickup"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white font-black text-lg px-10 py-5 rounded-2xl shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <Sparkles className="w-6 h-6 relative z-10" strokeWidth={2.5} />
              <span className="relative z-10">Start Your Recycling Journey</span>
              <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Benefits Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.02),transparent_70%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-sm font-semibold text-emerald-700 mb-6">
              <Award className="w-4 h-4" strokeWidth={2.5} />
              Premium Benefits
            </div>
            <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">EcoLoop</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
              We're not just a recycling service - we're your partner in building a sustainable future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                Icon: DollarSign,
                title: 'Best Market Prices', 
                desc: 'Get competitive rates with our best price guarantee after evaluation',
                gradient: 'from-emerald-500 to-teal-600'
              },
              { 
                Icon: Truck,
                title: 'Free Doorstep Pickup', 
                desc: 'We come to you - absolutely free pickup from your location',
                gradient: 'from-teal-500 to-cyan-600'
              },
              { 
                Icon: Zap,
                title: 'Instant Payment', 
                desc: 'Receive payment immediately after item evaluation and approval',
                gradient: 'from-amber-500 to-orange-600'
              },
              { 
                Icon: Leaf,
                title: 'Eco-Certified Process', 
                desc: '100% environmentally responsible recycling with proper certification',
                gradient: 'from-green-500 to-emerald-600'
              },
              { 
                Icon: Shield,
                title: 'Data Security', 
                desc: 'Complete data destruction guarantee for all your storage devices',
                gradient: 'from-purple-500 to-indigo-600'
              },
              { 
                Icon: Clock,
                title: '24/7 Support', 
                desc: 'Round-the-clock customer support for all your queries and concerns',
                gradient: 'from-pink-500 to-rose-600'
              },
              { 
                Icon: TrendingUp,
                title: 'Transparent Process', 
                desc: 'Clear evaluation process with no hidden charges or conditions',
                gradient: 'from-blue-500 to-indigo-600'
              },
              { 
                Icon: Users,
                title: 'Wide Coverage', 
                desc: 'Service available across major cities with expanding network',
                gradient: 'from-orange-500 to-red-600'
              }
            ].map((benefit, index) => {
              const IconComponent = benefit.Icon;
              return (
                <div 
                  key={index} 
                  className="group bg-gradient-to-br from-white to-gray-50/50 border-2 border-gray-100 hover:border-emerald-200 rounded-3xl p-8 text-center transform hover:-translate-y-3 transition-all duration-500 hover:shadow-2xl cursor-pointer relative overflow-hidden"
                >
                  {/* Hover Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className="relative inline-block mb-6">
                      <div className={`absolute inset-0 bg-gradient-to-r ${benefit.gradient} rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                      <div className={`relative w-16 h-16 bg-gradient-to-r ${benefit.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                        <IconComponent className="w-8 h-8 text-white" strokeWidth={2.5} />
                      </div>
                    </div>
                    <h3 className="text-lg font-black text-gray-800 mb-3 group-hover:text-gray-900">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed font-medium">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Premium Final CTA Section */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white relative overflow-hidden">
        {/* Premium Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-48 -translate-y-48 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48 blur-3xl"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-semibold mb-8">
            <Star className="w-4 h-4" strokeWidth={2.5} />
            Join the Movement
          </div>
          
          <h2 className="text-5xl font-black mb-8 tracking-tight">
            Ready to Make a <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300">Difference</span>?
          </h2>
          <p className="text-xl opacity-95 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Join thousands of environmentally conscious Indians who trust EcoLoop for responsible e-waste recycling and get the best value for your items.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link
              to="/schedule-pickup"
              className="group relative bg-white text-emerald-700 hover:bg-gray-50 font-black text-lg px-10 py-5 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Truck className="w-6 h-6 relative z-10" strokeWidth={2.5} />
              <span className="relative z-10">Schedule Free Pickup</span>
              <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
            </Link>
            
            <Link
              to="/contact"
              className="group border-2 border-white/50 hover:border-white text-white hover:bg-white/10 font-black text-lg px-10 py-5 rounded-2xl backdrop-blur-sm transition-all duration-300 flex items-center gap-3 transform hover:scale-105"
            >
              <Phone className="w-6 h-6" strokeWidth={2.5} />
              <span>Talk to Expert</span>
            </Link>
          </div>

          {/* Premium Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { Icon: Shield, text: 'No Hidden Charges' },
              { Icon: Leaf, text: 'Certified Recycling' },
              { Icon: DollarSign, text: 'Best Price Guarantee' },
              { Icon: Truck, text: 'Free Pickup' }
            ].map((badge, index) => {
              const IconComponent = badge.Icon;
              return (
                <div key={index} className="group flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer">
                  <div className="p-1.5 bg-white rounded-lg group-hover:scale-110 transition-transform">
                    <IconComponent className="w-4 h-4 text-emerald-600" strokeWidth={2.5} />
                  </div>
                  <span className="font-bold text-sm">{badge.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;