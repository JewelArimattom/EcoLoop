// src/pages/About.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Recycle, Target, Users, Award, Shield, Leaf, 
  TrendingUp, Heart, Globe, ArrowRight, CheckCircle,
  Mail, Phone, MapPin
} from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-semibold text-white mb-6">
              <Leaf className="w-4 h-4" />
              About EcoLoop
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Building a <span className="text-cyan-200">Sustainable Future</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to revolutionize e-waste recycling in India, making it easy, 
              profitable, and environmentally responsible for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="inline-flex p-4 bg-emerald-100 rounded-2xl mb-6">
                <Target className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To create a sustainable ecosystem where electronic waste is efficiently collected, 
                responsibly recycled, and transformed into valuable resources, while providing 
                fair compensation to our customers and protecting our environment for future generations.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="inline-flex p-4 bg-cyan-100 rounded-2xl mb-6">
                <Globe className="w-8 h-8 text-cyan-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To become India's most trusted e-waste management platform, setting new standards 
                for transparency, efficiency, and environmental responsibility in the recycling industry, 
                while empowering every household and business to contribute to a circular economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">Values</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at EcoLoop
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: 'Trust & Transparency',
                description: 'Complete transparency in pricing, processes, and environmental impact',
                color: 'emerald'
              },
              {
                icon: Leaf,
                title: 'Environmental Care',
                description: 'Zero tolerance for harmful practices, 100% certified recycling',
                color: 'green'
              },
              {
                icon: Users,
                title: 'Customer First',
                description: 'Fair prices, convenient service, and exceptional support',
                color: 'blue'
              },
              {
                icon: Award,
                title: 'Excellence',
                description: 'Highest standards in every aspect of our operations',
                color: 'purple'
              }
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className={`inline-flex p-3 bg-${value.color}-100 rounded-xl mb-4`}>
                  <value.icon className={`w-6 h-6 text-${value.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">Impact</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Making a real difference, one pickup at a time
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '50K+', label: 'Items Recycled', icon: Recycle },
              { value: '10K+', label: 'Happy Customers', icon: Heart },
              { value: '₹25L+', label: 'Paid to Customers', icon: TrendingUp },
              { value: '100%', label: 'Certified Recycling', icon: Award }
            ].map((stat, index) => (
              <div key={index} className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="inline-flex p-3 bg-emerald-100 rounded-xl mb-3">
                  <stat.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-3xl md:text-4xl font-black text-emerald-600 mb-2">{stat.value}</div>
                <div className="text-sm font-semibold text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">Operate</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our certified process ensures safe, efficient, and environmentally responsible recycling
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Collection',
                description: 'Free doorstep pickup by our trained executives at your convenience',
                icon: MapPin
              },
              {
                step: '02',
                title: 'Evaluation',
                description: 'Professional assessment and instant fair price offer based on market rates',
                icon: CheckCircle
              },
              {
                step: '03',
                title: 'Recycling',
                description: 'Certified processing at our partner facilities with zero environmental impact',
                icon: Recycle
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-2xl p-8 border border-emerald-200">
                  <div className="text-6xl font-black text-emerald-200 mb-4">{item.step}</div>
                  <div className="inline-flex p-3 bg-white rounded-xl mb-4 shadow-md">
                    <item.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Contact Info */}
              <div className="bg-gradient-to-br from-emerald-600 to-cyan-600 p-8 md:p-12 text-white">
                <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                <p className="text-white/90 mb-8">
                  Have questions? Want to partner with us? We'd love to hear from you!
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Phone</div>
                      <a href="tel:+1800-ECOLOOP" className="text-white/90 hover:text-white">
                        1800-ECOLOOP
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Email</div>
                      <a href="mailto:hello@ecoloop.com" className="text-white/90 hover:text-white">
                        hello@ecoloop.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Address</div>
                      <p className="text-white/90">
                        Green Tech Park, Sector 18<br />
                        Bangalore, Karnataka 560100
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Make a Difference?
                </h3>
                <p className="text-gray-600 mb-6">
                  Join thousands of satisfied customers who've already turned their e-waste into instant cash.
                </p>
                
                <Link 
                  to="/schedule-pickup"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all"
                >
                  Schedule Free Pickup
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <p className="text-sm text-gray-500 mt-4">
                  No hidden charges • Instant payment • 100% certified recycling
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
