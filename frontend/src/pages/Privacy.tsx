import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, UserCheck, Database, Cookie, Mail, ArrowLeft } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Home</span>
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Shield className="w-12 h-12" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black mb-2">Privacy Policy</h1>
              <p className="text-xl text-white/90">Your privacy is our priority</p>
            </div>
          </div>
          <p className="text-white/80 text-sm">Last Updated: October 27, 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to EcoLoop ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our e-waste recycling platform.
          </p>
          <p className="text-gray-700 leading-relaxed">
            By using EcoLoop, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
          </p>
        </div>

        {/* Information We Collect */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Database className="w-6 h-6 text-blue-600" strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Personal Information</h3>
              <p className="text-gray-700 mb-2">When you register or use our services, we may collect:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Contact Information:</strong> Name, email address, phone number</li>
                <li><strong>Address Information:</strong> Pickup location, city, state, postal code</li>
                <li><strong>Account Credentials:</strong> Username, password (encrypted)</li>
                <li><strong>Profile Information:</strong> Profile picture (optional), preferences</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Pickup & Transaction Data</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Pickup requests (date, time, location, items)</li>
                <li>Transaction history and payment information</li>
                <li>Waste collection details (weight, category, pricing)</li>
                <li>Communication between users and collectors</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Automatically Collected Information</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Device Information:</strong> IP address, browser type, device type</li>
                <li><strong>Usage Data:</strong> Pages viewed, time spent, click patterns</li>
                <li><strong>Location Data:</strong> GPS coordinates for pickup services (with permission)</li>
                <li><strong>Cookies:</strong> Analytics and preference cookies</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How We Use Your Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-100 rounded-xl">
              <UserCheck className="w-6 h-6 text-green-600" strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
          </div>

          <div className="space-y-4 text-gray-700">
            <p>We use your information to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Provide Services:</strong> Process pickup requests, match with collectors, facilitate transactions</li>
              <li><strong>Communication:</strong> Send booking confirmations, updates, notifications</li>
              <li><strong>Improve Platform:</strong> Analyze usage patterns, optimize user experience</li>
              <li><strong>Customer Support:</strong> Respond to inquiries, resolve issues</li>
              <li><strong>Security:</strong> Prevent fraud, ensure platform safety</li>
              <li><strong>Marketing:</strong> Send promotional offers (you can opt-out anytime)</li>
              <li><strong>Legal Compliance:</strong> Meet regulatory requirements, enforce terms</li>
              <li><strong>Analytics:</strong> Track environmental impact (CO₂ saved, waste recycled)</li>
            </ul>
          </div>
        </div>

        {/* Information Sharing */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Eye className="w-6 h-6 text-purple-600" strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Information Sharing & Disclosure</h2>
          </div>

          <div className="space-y-4 text-gray-700">
            <p className="font-semibold">We may share your information with:</p>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Verified Collectors</h3>
              <p>Pickup location, contact details, and waste information to facilitate collection services.</p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-2">Service Providers</h3>
              <p>Payment processors, SMS/email services, cloud storage providers (all under strict confidentiality agreements).</p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-2">Legal Requirements</h3>
              <p>When required by law, court orders, or to protect rights and safety.</p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-2">Business Transfers</h3>
              <p>In case of merger, acquisition, or asset sale (you will be notified).</p>
            </div>

            <p className="font-semibold text-emerald-700 mt-4">
              ✓ We do NOT sell your personal information to third parties for marketing purposes.
            </p>
          </div>
        </div>

        {/* Data Security */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-red-100 rounded-xl">
              <Lock className="w-6 h-6 text-red-600" strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
          </div>

          <div className="space-y-4 text-gray-700">
            <p>We implement industry-standard security measures to protect your data:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Encryption:</strong> SSL/TLS encryption for data in transit</li>
              <li><strong>Password Protection:</strong> Passwords hashed using bcrypt</li>
              <li><strong>Secure Storage:</strong> Data stored on secure MongoDB Atlas servers</li>
              <li><strong>Access Controls:</strong> Limited employee access on need-to-know basis</li>
              <li><strong>Regular Audits:</strong> Security reviews and vulnerability testing</li>
            </ul>
            <p className="text-sm text-gray-600 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500 mt-4">
              <strong>Note:</strong> While we strive to protect your data, no internet transmission is 100% secure. Please use strong passwords and keep your credentials confidential.
            </p>
          </div>
        </div>

        {/* Cookies */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-orange-100 rounded-xl">
              <Cookie className="w-6 h-6 text-orange-600" strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Cookies & Tracking</h2>
          </div>

          <div className="space-y-4 text-gray-700">
            <p>We use cookies and similar technologies to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Essential Cookies:</strong> Keep you logged in, remember preferences</li>
              <li><strong>Analytics Cookies:</strong> Understand how you use our platform (Google Analytics)</li>
              <li><strong>Functional Cookies:</strong> Remember your settings and choices</li>
            </ul>
            <p className="mt-4">You can control cookies through your browser settings. Note that disabling cookies may affect platform functionality.</p>
          </div>
        </div>

        {/* Your Rights */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Privacy Rights</h2>
          
          <div className="space-y-4 text-gray-700">
            <p className="font-semibold">You have the right to:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-xl">
                <h3 className="font-bold text-green-800 mb-2">✓ Access</h3>
                <p className="text-sm">Request a copy of your personal data</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl">
                <h3 className="font-bold text-blue-800 mb-2">✓ Correction</h3>
                <p className="text-sm">Update or correct inaccurate information</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl">
                <h3 className="font-bold text-purple-800 mb-2">✓ Deletion</h3>
                <p className="text-sm">Request deletion of your account and data</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-xl">
                <h3 className="font-bold text-orange-800 mb-2">✓ Opt-Out</h3>
                <p className="text-sm">Unsubscribe from marketing communications</p>
              </div>
            </div>
            <p className="mt-4">
              To exercise these rights, contact us at <a href="mailto:ecoloop.earth@gmail.com" className="text-emerald-600 hover:text-emerald-700 font-semibold">ecoloop.earth@gmail.com</a>
            </p>
          </div>
        </div>

        {/* Data Retention */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
          <div className="text-gray-700 space-y-3">
            <p>We retain your information for as long as:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Your account is active</li>
              <li>Needed to provide services</li>
              <li>Required by law (tax, accounting, legal purposes)</li>
            </ul>
            <p>After account deletion, we may retain anonymized data for analytics and improvement purposes.</p>
          </div>
        </div>

        {/* Children's Privacy */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
          <p className="text-gray-700">
            EcoLoop is not intended for users under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected data from a child, please contact us immediately.
          </p>
        </div>

        {/* Changes to Policy */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. We will notify you of significant changes by email or a prominent notice on our platform. Your continued use after changes constitutes acceptance of the updated policy.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Mail className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-bold">Contact Us</h2>
          </div>
          
          <p className="mb-6">
            If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <p className="text-sm text-white/80 mb-1">Email</p>
              <a href="mailto:ecoloop.earth@gmail.com" className="font-bold hover:text-yellow-300 transition">
                ecoloop.earth@gmail.com
              </a>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <p className="text-sm text-white/80 mb-1">Phone</p>
              <a href="tel:+919061336064" className="font-bold hover:text-yellow-300 transition">
                +91 90613 36064
              </a>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <p className="text-sm text-white/80 mb-1">Location</p>
              <p className="font-bold">Pala, Kottayam, Kerala</p>
            </div>
          </div>
        </div>

        {/* Back to Top */}
        <div className="text-center mt-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
