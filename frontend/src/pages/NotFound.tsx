import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, AlertTriangle, Recycle, ArrowLeft, Compass } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full text-center">
        
        {/* Animated Icon */}
        <div className="mb-10 relative mx-auto w-48 h-48">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full bg-emerald-200 rounded-full opacity-20 animate-pulse"></div>
          </div>
          <div className="relative flex items-center justify-center h-full">
            <Compass className="w-32 h-32 text-emerald-600 animate-spin" style={{ animationDuration: '20s' }} />
          </div>
        </div>

        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl lg:text-[11rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 leading-none mb-4">
            404
          </h1>
          <div className="flex items-center justify-center gap-3 text-gray-800 mb-2">
            <AlertTriangle className="w-7 h-7 text-yellow-600" strokeWidth={2.5} />
            <h2 className="text-3xl md:text-4xl font-bold">Page Not Found</h2>
          </div>
        </div>

        {/* Message */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 mb-10 mx-auto max-w-2xl">
          <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
            Oops! It looks like this page got recycled before we could save it. 
          </p>
          <p className="text-base md:text-lg text-gray-600">
            The page you're looking for doesn't exist or may have been moved. Let's get you back on track!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto px-4">
          <Link
            to="/"
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Home className="w-6 h-6 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
            <span className="text-lg">Go Home</span>
          </Link>

          <Link
            to="/how-it-works"
            className="flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-900 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 group"
          >
            <Recycle className="w-6 h-6 text-emerald-600 group-hover:rotate-180 transition-transform duration-500" strokeWidth={2.5} />
            <span className="text-lg">How It Works</span>
          </Link>

          <Link
            to="/schedule-pickup"
            className="flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-900 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 group"
          >
            <Search className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
            <span className="text-lg">Schedule Pickup</span>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100 mb-10 max-w-2xl mx-auto">
          <p className="text-sm font-bold text-gray-900 mb-4">Quick Links:</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link to="/about" className="text-emerald-700 hover:text-emerald-800 font-semibold hover:underline transition">
              About Us
            </Link>
            <Link to="/contact" className="text-emerald-700 hover:text-emerald-800 font-semibold hover:underline transition">
              Contact
            </Link>
            <Link to="/privacy" className="text-emerald-700 hover:text-emerald-800 font-semibold hover:underline transition">
              Privacy Policy
            </Link>
            <Link to="/dashboard" className="text-emerald-700 hover:text-emerald-800 font-semibold hover:underline transition">
              Dashboard
            </Link>
          </div>
        </div>

        {/* Fun Fact */}
        <div className="p-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border-l-4 border-emerald-600 mb-8 max-w-2xl mx-auto">
          <p className="text-sm md:text-base text-gray-800">
            <span className="font-bold text-emerald-800">💡 Did you know?</span> While you're here, 
            millions of tons of e-waste are waiting to be recycled. Help us make a difference by 
            scheduling your first pickup today!
          </p>
        </div>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
