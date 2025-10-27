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
              <Leaf className="w-4 h-4" strokeWidth={2.5} />
              About EcoLoop
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Transforming Waste into <span className="text-cyan-200">Wealth</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Kerala's most trusted e-waste and scrap recycling platform. We're making sustainable 
              recycling easy, profitable, and environmentally responsible for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="inline-flex p-4 bg-emerald-100 rounded-2xl mb-6">
                <Target className="w-8 h-8 text-emerald-600" strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To create India's most convenient and trustworthy e-waste recycling ecosystem where 
                electronic waste is efficiently collected from your doorstep, responsibly processed, 
                and transformed into valuable resources—while ensuring fair compensation and protecting 
                our planet for future generations.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="inline-flex p-4 bg-cyan-100 rounded-2xl mb-6">
                <Globe className="w-8 h-8 text-cyan-600" strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To become Kerala's leading e-waste management platform, setting new benchmarks for 
                transparency, efficiency, and environmental responsibility. We envision a future where 
                every household and business in Kerala actively participates in the circular economy, 
                turning waste into wealth while protecting our beautiful state.
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
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              The principles that guide everything we do at EcoLoop
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: 'Trust & Transparency',
                description: 'Complete transparency in pricing, processes, and environmental impact tracking',
                color: 'emerald'
              },
              {
                icon: Leaf,
                title: 'Environmental Care',
                description: 'Zero tolerance for harmful practices, 100% certified eco-friendly recycling',
                color: 'green'
              },
              {
                icon: Users,
                title: 'Customer First',
                description: 'Fair market prices, doorstep convenience, and exceptional customer support',
                color: 'blue'
              },
              {
                icon: Award,
                title: 'Excellence',
                description: 'Maintaining highest quality standards in every aspect of our operations',
                color: 'purple'
              }
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all group">
                <div className={`inline-flex p-3 bg-${value.color}-100 rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                  <value.icon className={`w-6 h-6 text-${value.color}-600`} strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
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
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Making a real difference in Kerala, one pickup at a time
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '10K+', label: 'Items Recycled', icon: Recycle },
              { value: '2K+', label: 'Happy Customers', icon: Heart },
              { value: '₹5L+', label: 'Paid to Customers', icon: TrendingUp },
              { value: '100%', label: 'Certified Process', icon: Award }
            ].map((stat, index) => (
              <div key={index} className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all group">
                <div className="inline-flex p-3 bg-emerald-100 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6 text-emerald-600" strokeWidth={2.5} />
                </div>
                <div className="text-3xl md:text-4xl font-black text-emerald-600 mb-2">{stat.value}</div>
                <div className="text-sm font-semibold text-gray-700">{stat.label}</div>
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
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Our streamlined process ensures safe, efficient, and environmentally responsible recycling
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Schedule Pickup',
                description: 'Book a free doorstep pickup at your convenience through our easy-to-use platform',
                icon: MapPin
              },
              {
                step: '02',
                title: 'Fair Evaluation',
                description: 'Our trained professionals assess your items and offer instant fair market prices',
                icon: CheckCircle
              },
              {
                step: '03',
                title: 'Certified Recycling',
                description: 'Items are processed at certified facilities with zero environmental impact',
                icon: Recycle
              }
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-2xl p-8 border border-emerald-200 hover:border-emerald-400 transition-all">
                  <div className="text-6xl font-black text-emerald-200 mb-4">{item.step}</div>
                  <div className="inline-flex p-3 bg-white rounded-xl mb-4 shadow-md group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-emerald-600" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
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
                <p className="text-white/90 mb-8 text-lg">
                  Have questions? Want to partner with us? We'd love to hear from you!
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                      <Phone className="w-6 h-6" strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="font-semibold mb-1 text-lg">Phone</div>
                      <a href="tel:+919061336064" className="text-white/90 hover:text-white text-lg transition">
                        +91 90613 36064
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                      <Mail className="w-6 h-6" strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="font-semibold mb-1 text-lg">Email</div>
                      <a href="mailto:ecoloop.earth@gmail.com" className="text-white/90 hover:text-white text-lg transition">
                        ecoloop.earth@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                      <MapPin className="w-6 h-6" strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="font-semibold mb-1 text-lg">Location</div>
                      <p className="text-white/90 text-lg">
                        Pala, Kottayam<br />
                        Kerala, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="p-8 md:p-12 flex flex-col justify-center bg-gray-50">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Ready to Make a Difference?
                </h3>
                <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                  Join thousands of satisfied customers across Kerala who've already turned their 
                  e-waste into instant cash while protecting our environment.
                </p>
                
                <Link 
                  to="/schedule-pickup"
                  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all group"
                >
                  Schedule Free Pickup
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                </Link>

                <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600" strokeWidth={2.5} />
                    <span className="font-semibold">No hidden charges</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600" strokeWidth={2.5} />
                    <span className="font-semibold">Instant payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600" strokeWidth={2.5} />
                    <span className="font-semibold">100% certified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
