// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from './HeroSection';
import { 
  Home, Truck, Leaf, CheckCircle, 
  Smartphone, Battery, Tv,
  Package, FileText, Recycle, Users,
  DollarSign, MapPin, Shield, Clock, Gift, Sparkles,
  ArrowRight, Phone
} from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />

      {/* How It Works - 3 Steps */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps to turn your waste into rewards
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection lines */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-green-200 -z-10" style={{width: '66%', left: '17%'}}></div>
            
            {[
              {
                icon: Home,
                step: '1',
                title: 'You Sort',
                description: 'Separate recyclables like bottles, paper, old phones, or other scrap materials at your home.',
                emoji: '🏡'
              },
              {
                icon: Truck,
                step: '2',
                title: 'We Pick Up',
                description: 'Local scrap collectors pick up from your doorstep using the EcoLoop platform. Free and convenient.',
                emoji: '🚚'
              },
              {
                icon: Leaf,
                step: '3',
                title: 'You Earn & Earth Wins',
                description: 'You get reward points or payment, and waste goes to verified recyclers. Everyone wins!',
                emoji: '🌱'
              }
            ].map((step, index) => {
              return (
                <div key={index} className="relative text-center">
                  {/* Step Number Badge */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full text-2xl font-black mb-6 shadow-lg relative z-10">
                    {step.step}
                  </div>
                  
                  <div className="text-5xl mb-4">{step.emoji}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-700 text-lg font-medium bg-green-50 border-2 border-green-200 rounded-xl p-6 max-w-3xl mx-auto">
              <Leaf className="w-6 h-6 text-green-600 inline mr-2" />
              Every item you recycle helps reduce landfill waste and supports local recyclers.
            </p>
          </div>
        </div>
      </section>

      {/* What We Collect - Simplified */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              What We Collect
            </h2>
            <p className="text-lg text-gray-600">
              We accept all types of recyclable materials
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Smartphone, name: 'Electronics', items: 'Phones, Laptops, Tablets', color: 'blue' },
              { icon: Tv, name: 'Appliances', items: 'TVs, ACs, Washing Machines', color: 'purple' },
              { icon: Package, name: 'Plastics', items: 'Bottles, Containers, Packaging', color: 'green' },
              { icon: FileText, name: 'Paper', items: 'Newspapers, Books, Cardboard', color: 'amber' },
              { icon: Battery, name: 'Batteries', items: 'Phone, Laptop, Car Batteries', color: 'orange' },
              { icon: Recycle, name: 'Metal Scrap', items: 'Aluminum, Copper, Steel, Iron', color: 'gray' },
            ].map((category, index) => {
              const IconComponent = category.icon;
              const colorClasses = {
                blue: 'bg-blue-100 text-blue-600 border-blue-200',
                purple: 'bg-purple-100 text-purple-600 border-purple-200',
                green: 'bg-green-100 text-green-600 border-green-200',
                amber: 'bg-amber-100 text-amber-600 border-amber-200',
                orange: 'bg-orange-100 text-orange-600 border-orange-200',
                gray: 'bg-gray-100 text-gray-600 border-gray-200',
              }[category.color];

              return (
                <div key={index} className={`${colorClasses} border-2 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow`}>
                  <IconComponent className="w-12 h-12 mx-auto mb-3" strokeWidth={2} />
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.items}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/schedule-pickup"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg transition-all"
            >
              Schedule Free Pickup
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* For Scrap Collectors */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                Empowering Local Recyclers
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                EcoLoop helps small waste collectors find more customers, get fair prices, and track their daily pickups digitally.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: MapPin, text: 'Find nearby waste pickups easily' },
                  { icon: DollarSign, text: 'Better prices for recyclable materials' },
                  { icon: CheckCircle, text: 'Track collections & payments' },
                  { icon: Smartphone, text: 'Simple, mobile-based system' },
                ].map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-gray-800 font-semibold">{benefit.text}</span>
                    </div>
                  );
                })}
              </div>

              <Link
                to="/register?role=worker"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg transition-all"
              >
                <Users className="w-5 h-5" />
                Register as Collector
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-green-100">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-2xl mb-4">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Join Our Network</h3>
                <p className="text-gray-600 mt-2">Growing community of collectors</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Active Collectors', value: '50+', emoji: '👷' },
                  { label: 'Daily Pickups', value: '200+', emoji: '📦' },
                  { label: 'Satisfied Users', value: '1000+', emoji: '😊' },
                  { label: 'Waste Recycled', value: '10T+', emoji: '♻️' },
                ].map((stat, index) => (
                  <div key={index} className="bg-green-50 rounded-xl p-4 text-center border-2 border-green-100">
                    <div className="text-3xl mb-2">{stat.emoji}</div>
                    <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600 font-semibold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose EcoLoop */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Why Choose EcoLoop?
            </h2>
            <p className="text-lg text-gray-600">
              Simple, transparent, and rewarding recycling
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Truck, 
                title: 'Free Doorstep Pickup', 
                description: 'We come to your location - absolutely free, no charges',
                color: 'green'
              },
              { 
                icon: DollarSign, 
                title: 'Fair Prices', 
                description: 'Get the best market rates for your recyclables',
                color: 'blue'
              },
              { 
                icon: Shield, 
                title: 'Certified Recycling', 
                description: '100% eco-friendly and responsible waste disposal',
                color: 'purple'
              },
              { 
                icon: Gift, 
                title: 'Reward Points', 
                description: 'Earn points for every recycling and redeem rewards',
                color: 'amber'
              },
              { 
                icon: Clock, 
                title: 'Flexible Scheduling', 
                description: 'Book pickup at your convenient date and time',
                color: 'orange'
              },
              { 
                icon: Phone, 
                title: 'Easy Support', 
                description: 'Contact us anytime for help and assistance',
                color: 'pink'
              },
            ].map((benefit, index) => {
              const IconComponent = benefit.icon;
              const colorClasses = {
                green: 'bg-green-100 text-green-600',
                blue: 'bg-blue-100 text-blue-600',
                purple: 'bg-purple-100 text-purple-600',
                amber: 'bg-amber-100 text-amber-600',
                orange: 'bg-orange-100 text-orange-600',
                pink: 'bg-pink-100 text-pink-600',
              }[benefit.color];

              return (
                <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow border-2 border-gray-100">
                  <div className={`inline-flex items-center justify-center w-14 h-14 ${colorClasses} rounded-xl mb-4`}>
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            Ready to Make Kerala Cleaner?
          </h2>
          <p className="text-xl mb-8 opacity-95 leading-relaxed">
            Join hundreds of households and businesses who trust EcoLoop for responsible recycling. 
            Get the best value for your waste while helping the environment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/schedule-pickup"
              className="inline-flex items-center justify-center gap-2 bg-white text-green-600 hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-xl shadow-lg transition-all"
            >
              <Recycle className="w-5 h-5" />
              Schedule Free Pickup
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-4 rounded-xl transition-all"
            >
              <Phone className="w-5 h-5" />
              Contact Us
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm">
            {[
              { icon: CheckCircle, text: 'No Hidden Charges' },
              { icon: Shield, text: 'Certified & Safe' },
              { icon: Sparkles, text: 'Earn Rewards' },
            ].map((badge, index) => {
              const IconComponent = badge.icon;
              return (
                <div key={index} className="flex items-center gap-2">
                  <IconComponent className="w-5 h-5" />
                  <span className="font-semibold">{badge.text}</span>
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
