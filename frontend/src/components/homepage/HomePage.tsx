// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from './HeroSection';
const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <HeroSection />

      {/* Categories Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-sky-50/50"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-200/20 rounded-full -translate-y-36 translate-x-36"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-200/20 rounded-full translate-y-48 -translate-x-48"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500">Collect & Recycle</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From everyday household items to complex electronic waste, we handle all types of recyclable materials with 
              <span className="font-semibold text-emerald-600"> proper certification</span> and 
              <span className="font-semibold text-sky-600"> environmental standards</span>.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: '📱', 
                title: 'Electronic Waste', 
                items: ['Smartphones', 'Laptops', 'Tablets', 'Computers', 'Printers', 'Routers'],
                gradient: 'from-blue-500 to-cyan-500',
                bg: 'bg-blue-50',
                border: 'border-blue-200'
              },
              { 
                icon: '🔌', 
                title: 'Home Appliances', 
                items: ['TVs', 'ACs', 'Washing Machines', 'Refrigerators', 'Microwaves', 'Fans'],
                gradient: 'from-purple-500 to-pink-500',
                bg: 'bg-purple-50',
                border: 'border-purple-200'
              },
              { 
                icon: '🔋', 
                title: 'Batteries & Power', 
                items: ['Phone Batteries', 'Laptop Batteries', 'Power Banks', 'UPS Batteries', 'Car Batteries'],
                gradient: 'from-amber-500 to-orange-500',
                bg: 'bg-amber-50',
                border: 'border-amber-200'
              },
              { 
                icon: '🧴', 
                title: 'Plastic & Packaging', 
                items: ['PET Bottles', 'Plastic Containers', 'Packaging Material', 'Toys', 'Furniture'],
                gradient: 'from-green-500 to-emerald-500',
                bg: 'bg-green-50',
                border: 'border-green-200'
              },
              { 
                icon: '📄', 
                title: 'Paper & Cardboard', 
                items: ['Newspapers', 'Books', 'Cardboard', 'Office Paper', 'Magazines', 'Notebooks'],
                gradient: 'from-indigo-500 to-blue-500',
                bg: 'bg-indigo-50',
                border: 'border-indigo-200'
              },
              { 
                icon: '🔩', 
                title: 'Metal Scrap', 
                items: ['Aluminum', 'Copper', 'Brass', 'Steel', 'Iron', 'Electronic Components'],
                gradient: 'from-gray-500 to-gray-700',
                bg: 'bg-gray-50',
                border: 'border-gray-200'
              }
            ].map((category, index) => (
              <div 
                key={index} 
                className={`group relative ${category.bg} ${category.border} border-2 rounded-2xl p-8 transform hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl overflow-hidden`}
              >
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className="text-center relative z-10">
                  <div className={`w-20 h-20 bg-gradient-to-r ${category.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <span className="text-3xl">{category.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">
                    {category.title}
                  </h3>
                  <ul className="text-gray-600 space-y-2 mb-6">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 bg-current rounded-full opacity-60"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to="/schedule-pickup"
                    className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 group-hover:gap-3 transition-all duration-300"
                  >
                    Schedule Pickup
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-4 h-4 bg-emerald-300 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-20 right-20 w-6 h-6 bg-sky-300 rounded-full opacity-40 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-20 w-3 h-3 bg-amber-300 rounded-full opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500">EcoLoop</span> Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Selling your scrap has never been easier. Just three simple steps to turn your waste into wealth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                step: '1', 
                icon: '📝', 
                title: 'Schedule Pickup', 
                desc: 'Tell us what you want to sell and schedule a free pickup at your convenience',
                color: 'from-emerald-400 to-emerald-600',
                features: ['Online Form', '24/7 Booking', 'Instant Confirmation']
              },
              { 
                step: '2', 
                icon: '🚚', 
                title: 'Free Evaluation', 
                desc: 'Our certified executive visits your location for professional item evaluation',
                color: 'from-sky-400 to-sky-600',
                features: ['Doorstep Service', 'Expert Assessment', 'Best Price Offer']
              },
              { 
                step: '3', 
                icon: '💳', 
                title: 'Instant Payment', 
                desc: 'Get paid instantly via UPI, bank transfer, or cash after evaluation',
                color: 'from-amber-400 to-amber-600',
                features: ['Multiple Payment Options', 'Immediate Transfer', 'Secure Process']
              }
            ].map((step, index) => (
              <div key={index} className="relative group">
                {/* Connection Line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-1 bg-gradient-to-r from-emerald-200 to-sky-200 -z-10">
                    <div className="w-full h-full bg-gradient-to-r from-emerald-400 to-sky-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left"></div>
                  </div>
                )}
                
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-500 group-hover:shadow-2xl">
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {step.icon}
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{step.desc}</p>
                    
                    <div className="space-y-2">
                      {step.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick CTA */}
          <div className="text-center mt-12">
            <Link
              to="/schedule-pickup"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <span>🚀</span>
              Start Your Recycling Journey
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500">EcoLoop</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're not just a recycling service - we're your partner in building a sustainable future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: '💰', 
                title: 'Best Market Prices', 
                desc: 'Get competitive rates with our best price guarantee after evaluation',
                color: 'from-green-400 to-emerald-500'
              },
              { 
                icon: '🚚', 
                title: 'Free Doorstep Pickup', 
                desc: 'We come to you - absolutely free pickup from your location',
                color: 'from-blue-400 to-sky-500'
              },
              { 
                icon: '⚡', 
                title: 'Instant Payment', 
                desc: 'Receive payment immediately after item evaluation and approval',
                color: 'from-amber-400 to-amber-500'
              },
              { 
                icon: '🌱', 
                title: 'Eco-Certified Process', 
                desc: '100% environmentally responsible recycling with proper certification',
                color: 'from-emerald-400 to-green-500'
              },
              { 
                icon: '🛡️', 
                title: 'Data Security', 
                desc: 'Complete data destruction guarantee for all your storage devices',
                color: 'from-purple-400 to-purple-500'
              },
              { 
                icon: '📞', 
                title: '24/7 Support', 
                desc: 'Round-the-clock customer support for all your queries and concerns',
                color: 'from-pink-400 to-rose-500'
              },
              { 
                icon: '📊', 
                title: 'Transparent Process', 
                desc: 'Clear evaluation process with no hidden charges or conditions',
                color: 'from-indigo-400 to-blue-500'
              },
              { 
                icon: '🎯', 
                title: 'Wide Coverage', 
                desc: 'Service available across major cities with expanding network',
                color: 'from-orange-400 to-red-500'
              }
            ].map((benefit, index) => (
              <div 
                key={index} 
                className="group bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 text-center transform hover:-translate-y-2 transition-all duration-500 hover:shadow-xl"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <span className="text-2xl">{benefit.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-gray-900">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-sky-600 to-purple-600 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-36 -translate-y-36"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Make a <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-300">Difference</span>?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of environmentally conscious Indians who trust EcoLoop for responsible e-waste recycling and get the best value for your items.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <Link
              to="/schedule-pickup"
              className="group bg-white text-emerald-700 hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              <span className="text-xl">🚚</span>
              Schedule Free Pickup
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            
            <Link
              to="/contact"
              className="group border-2 border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-4 rounded-xl backdrop-blur-sm transition-all duration-300 flex items-center gap-3"
            >
              <span>💬</span>
              Talk to Expert
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              { text: '🔒 No Hidden Charges', icon: '✅' },
              { text: '♻️ Certified Recycling', icon: '🌍' },
              { text: '💰 Best Price Guarantee', icon: '🎯' },
              { text: '🚚 Free Pickup', icon: '📦' }
            ].map((badge, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                <span>{badge.icon}</span>
                <span className="font-medium">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;