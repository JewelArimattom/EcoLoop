// src/pages/HowItWorks.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Schedule Your Pickup',
      description: 'Tell us what items you want to recycle through our simple online form',
      icon: '📝',
      details: [
        'Select item categories from our wide range',
        'Provide basic details about your items',
        'Choose your preferred pickup date and time',
        'Get instant confirmation'
      ],
      image: '📱',
      color: 'from-emerald-400 to-emerald-600',
      tips: [
        'Have all your items ready for evaluation',
        'Take photos if you have rare or special items',
        'Be available during the chosen time slot'
      ]
    },
    {
      number: '02',
      title: 'Executive Visit & Evaluation',
      description: 'Our certified expert visits your location for professional assessment',
      icon: '👨‍💼',
      details: [
        'Free doorstep evaluation service',
        'Professional assessment of all items',
        'Transparent price calculation',
        'Best market price guarantee'
      ],
      image: '🏠',
      color: 'from-blue-400 to-blue-600',
      tips: [
        'Keep items accessible for easy inspection',
        'Ask questions about the evaluation process',
        'Discuss any special item conditions'
      ]
    },
    {
      number: '03',
      title: 'Instant Payment',
      description: 'Get paid immediately after evaluation and approval',
      icon: '💳',
      details: [
        'Multiple payment options available',
        'Immediate fund transfer',
        'Secure payment processing',
        'Digital receipt provided'
      ],
      image: '💰',
      color: 'from-amber-400 to-amber-600',
      tips: [
        'Choose your preferred payment method',
        'Keep your payment details ready',
        'Save your transaction receipt'
      ]
    },
    {
      number: '04',
      title: 'Free Pickup & Recycling',
      description: 'We handle the entire pickup and eco-friendly recycling process',
      icon: '🚚',
      details: [
        'Professional packing and loading',
        'Safe transportation',
        'Certified recycling process',
        'Environmental compliance'
      ],
      image: '🌱',
      color: 'from-green-400 to-green-600',
      tips: [
        'Ensure clear access for pickup team',
        'Point out any fragile items',
        'Get recycling certificate if needed'
      ]
    }
  ];

  const features = [
    {
      icon: '🕒',
      title: '24/7 Service',
      description: 'Schedule pickups anytime that works for you'
    },
    {
      icon: '🏠',
      title: 'Doorstep Service',
      description: 'We come to your location - home or office'
    },
    {
      icon: '💰',
      title: 'Free Evaluation',
      description: 'No charges for assessment and price calculation'
    },
    {
      icon: '🛡️',
      title: 'Secure Process',
      description: 'Certified executives and secure transactions'
    }
  ];

  const faqs = [
    {
      question: 'How long does the evaluation process take?',
      answer: 'Typically 15-30 minutes depending on the number and type of items. Our executives work efficiently to minimize your time.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We offer UPI, bank transfer, cash, and digital wallets. You can choose your preferred method during the process.'
    },
    {
      question: 'Are there any hidden charges?',
      answer: 'No hidden charges. The evaluation is completely free, and we only charge if you accept our offer and proceed with pickup.'
    },
    {
      question: 'What happens to my data on electronic devices?',
      answer: 'We provide complete data destruction services for all storage devices, ensuring your privacy and security.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-sky-900 text-white py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-4 h-4 bg-emerald-400 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-20 right-20 w-6 h-6 bg-sky-400 rounded-full opacity-40 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-20 w-3 h-3 bg-amber-300 rounded-full opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-emerald-200 hover:text-white mb-6 transition-colors"
            >
              ← Back to Home
            </Link>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              How <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-sky-300">EcoLoop</span> Works
            </h1>
            
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
              Turning your e-waste and scrap into cash is simple, secure, and environmentally responsible. 
              Here's everything you need to know about our process.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 hover:border-emerald-300 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Process Steps */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500">4-Step</span> Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From scheduling to payment, we've made recycling simple and rewarding
            </p>
          </div>

          {/* Desktop Process Flow */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-20 left-0 right-0 h-1 bg-gray-300 -translate-y-1/2">
                <div 
                  className="h-1 bg-gradient-to-r from-emerald-400 to-sky-400 transition-all duration-500"
                  style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                ></div>
              </div>

              {/* Steps */}
              <div className="grid grid-cols-4 gap-8">
                {steps.map((step, index) => (
                  <div key={index} className="text-center">
                    <button
                      onClick={() => setActiveStep(index)}
                      className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white shadow-lg transition-all duration-300 ${
                        index <= activeStep 
                          ? `bg-gradient-to-r ${step.color} transform scale-110` 
                          : 'bg-gray-300'
                      }`}
                    >
                      {step.number}
                    </button>
                    
                    <h3 className={`text-lg font-bold mb-2 transition-colors ${
                      index <= activeStep ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </h3>
                    
                    <p className={`text-sm transition-colors ${
                      index <= activeStep ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step Details */}
            <div className="mt-16 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left Side - Content */}
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${steps[activeStep].color} rounded-2xl flex items-center justify-center text-2xl text-white`}>
                      {steps[activeStep].icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{steps[activeStep].title}</h3>
                      <p className="text-gray-600">{steps[activeStep].description}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h4 className="font-semibold text-gray-800">What happens:</h4>
                    {steps[activeStep].details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        <span className="text-gray-700">{detail}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                      💡 Pro Tips
                    </h4>
                    <div className="space-y-2">
                      {steps[activeStep].tips.map((tip, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-amber-700 text-sm">
                          <span>•</span>
                          {tip}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side - Visual */}
                <div className="bg-gradient-to-br from-emerald-50 to-sky-50 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">{steps[activeStep].image}</div>
                    <div className="text-6xl font-bold text-gray-700 opacity-20">
                      {steps[activeStep].number}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Process Flow */}
          <div className="lg:hidden space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setActiveStep(activeStep === index ? -1 : index)}
                  className="w-full p-6 text-left flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center text-white font-bold`}>
                      {step.number}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                  <div className={`transform transition-transform ${activeStep === index ? 'rotate-180' : ''}`}>
                    ▼
                  </div>
                </button>

                {activeStep === index && (
                  <div className="px-6 pb-6 border-t border-gray-200">
                    <div className="pt-4 space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">What happens:</h4>
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                            <span className="text-gray-700 text-sm">{detail}</span>
                          </div>
                        ))}
                      </div>

                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <h4 className="font-semibold text-amber-800 mb-2 text-sm flex items-center gap-2">
                          💡 Pro Tips
                        </h4>
                        <div className="space-y-1">
                          {step.tips.map((tip, idx) => (
                            <div key={idx} className="text-amber-700 text-xs">
                              • {tip}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-emerald-500 to-sky-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-emerald-100 mb-6 max-w-md mx-auto">
                Join thousands of satisfied customers who've turned their scrap into cash
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/schedule-pickup"
                  className="bg-white text-emerald-700 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  🚚 Schedule Free Pickup
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  💬 Need Help?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500">Questions</span>
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about the EcoLoop process
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-emerald-300 transition-colors">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-3">
                  <span className="text-emerald-500">❓</span>
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* Additional Help */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-gray-50 to-emerald-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
              <p className="text-gray-600 mb-4">
                Our support team is here to help you with any queries
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+1800-ECOLOOP" 
                  className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  📞 Call: 1800-ECOLOOP
                </a>
                <a 
                  href="mailto:support@ecoloop.com" 
                  className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  ✉️ Email: support@ecoloop.com
                </a>
                <a 
                  href="https://wa.me/919876543210" 
                  className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  💬 WhatsApp Chat
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-sky-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Recycling Journey Today</h2>
          <p className="text-xl opacity-90 mb-8">
            It's never been easier to turn your e-waste into cash while helping the environment
          </p>
          <Link
            to="/schedule-pickup"
            className="inline-flex items-center gap-3 bg-white text-emerald-700 hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <span>🚀</span>
            Schedule Your First Pickup
            <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;