// src/pages/SchedulePickupSimple.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Smartphone, Battery, Zap, Package,
  ArrowLeft, ArrowRight, CheckCircle, MapPin, Calendar, AlertCircle, Loader
} from 'lucide-react';
import { pickupAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const SchedulePickup: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  
  const [formData, setFormData] = useState({
    category: '',
    items: [] as string[],
    customItem: '',
    pickupType: 'immediate',
    scheduledDate: '',
    scheduledTime: '',
    contactName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [errors, setErrors] = useState<any>({});

  const categories = [
    { id: 'Smartphones & Tablets', name: 'Smartphones & Tablets', Icon: Smartphone, 
      items: ['Smartphone', 'Tablet', 'Smartwatch', 'E-reader', 'Charger', 'Earphones'] },
    { id: 'Laptops & Computers', name: 'Laptops & Computers', Icon: Package, 
      items: ['Laptop', 'Desktop', 'Monitor', 'Keyboard', 'Mouse', 'Printer'] },
    { id: 'Batteries & Chargers', name: 'Batteries & Chargers', Icon: Battery, 
      items: ['Mobile Battery', 'Laptop Battery', 'Power Bank', 'Charger', 'UPS'] },
    { id: 'Other Items', name: 'Other Items', Icon: Zap, 
      items: ['TV', 'Refrigerator', 'AC', 'Washing Machine', 'Microwave', 'Other (Type custom item)'] },
  ];

  const timeSlots = [
    '9:00 AM - 11:00 AM',
    '11:00 AM - 1:00 PM', 
    '1:00 PM - 3:00 PM',
    '3:00 PM - 5:00 PM',
    '5:00 PM - 7:00 PM'
  ];

  const toggleItem = (item: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.includes(item)
        ? prev.items.filter(i => i !== item)
        : [...prev.items, item]
    }));
  };

  const validateStep = (step: number) => {
    const newErrors: any = {};
    
    if (step === 1) {
      if (!formData.category) newErrors.category = 'Please select a category';
      if (formData.items.length === 0) newErrors.items = 'Please select at least one item';
      if (formData.items.includes('Other (Type custom item)') && !formData.customItem) {
        newErrors.customItem = 'Please specify the custom item';
      }
    }
    
    if (step === 2) {
      if (!formData.contactName) newErrors.contactName = 'Name is required';
      if (!formData.phone) {
        newErrors.phone = 'Phone is required';
      } else if (!/^[0-9]{10}$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid 10-digit phone number';
      }
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.pincode) {
        newErrors.pincode = 'Pincode is required';
      } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
        newErrors.pincode = 'Please enter a valid 6-digit pincode';
      }
    }
    
    if (step === 3) {
      if (formData.pickupType === 'scheduled') {
        if (!formData.scheduledDate) newErrors.scheduledDate = 'Please select a date';
        if (!formData.scheduledTime) newErrors.scheduledTime = 'Please select a time slot';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    setErrors({});
  };

  const fetchLocation = async () => {
    setIsLoadingLocation(true);
    
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          
          if (data && data.address) {
            setFormData(prev => ({
              ...prev,
              address: data.display_name || '',
              city: data.address.city || data.address.town || data.address.village || '',
              state: data.address.state || '',
              pincode: data.address.postcode || ''
            }));
          }
        } catch (error) {
          console.error('Error fetching location:', error);
          alert('Could not fetch location. Please enter manually.');
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Could not access location. Please enter manually.');
        setIsLoadingLocation(false);
      }
    );
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const pickupData = {
        category: formData.category,
        items: formData.items,
        customItem: formData.customItem,
        pickupType: formData.pickupType,
        scheduledDate: formData.pickupType === 'scheduled' ? formData.scheduledDate : undefined,
        scheduledTime: formData.pickupType === 'scheduled' ? formData.scheduledTime : undefined,
        contactInfo: {
          name: formData.contactName,
          phone: formData.phone,
          email: formData.email
        },
        address: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        }
      };

      const response = await pickupAPI.create(pickupData);
      setTrackingNumber(response.pickup.trackingNumber);
      setCurrentStep(4); // Success step
    } catch (error: any) {
      console.error('Pickup submission error:', error);
      setSubmitError(error.response?.data?.message || 'Failed to schedule pickup. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Schedule E-Waste Pickup
          </h1>
          <p className="text-gray-600">Book your free pickup in 3 simple steps</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                  currentStep >= step 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {currentStep > step ? <CheckCircle className="w-6 h-6" /> : step}
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-1 mx-2 ${currentStep > step ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between max-w-2xl mx-auto mt-2 text-sm font-medium">
            <span className={currentStep >= 1 ? 'text-emerald-600' : 'text-gray-700'}>Select Items</span>
            <span className={currentStep >= 2 ? 'text-emerald-600' : 'text-gray-700'}>Contact Info</span>
            <span className={currentStep >= 3 ? 'text-emerald-600' : 'text-gray-700'}>Schedule</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {submitError && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{submitError}</p>
            </div>
          )}

          {/* Step 1: Select Items */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Step 1: What would you like to recycle?</h2>
              
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Category</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, category: cat.id, items: [] }))}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.category === cat.id
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-300'
                      }`}
                    >
                      <cat.Icon className={`w-8 h-8 mx-auto mb-2 ${
                        formData.category === cat.id ? 'text-emerald-600' : 'text-gray-600'
                      }`} />
                      <span className="text-sm font-medium text-gray-900">{cat.name}</span>
                    </button>
                  ))}
                </div>
                {errors.category && <p className="text-sm text-red-600 mt-2">{errors.category}</p>}
              </div>

              {/* Items Selection */}
              {formData.category && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Select Items to Recycle</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categories.find(c => c.id === formData.category)?.items.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleItem(item)}
                        className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                          formData.items.includes(item)
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-gray-200 text-gray-700 hover:border-emerald-300'
                        }`}
                      >
                        {formData.items.includes(item) && <CheckCircle className="w-4 h-4 inline mr-2" />}
                        {item}
                      </button>
                    ))}
                  </div>
                  {errors.items && <p className="text-sm text-red-600 mt-2">{errors.items}</p>}
                </div>
              )}

              {/* Custom Item Input */}
              {formData.items.includes('Other (Type custom item)') && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Specify Custom Item</label>
                  <input
                    type="text"
                    value={formData.customItem}
                    onChange={(e) => setFormData(prev => ({ ...prev, customItem: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter item name"
                  />
                  {errors.customItem && <p className="text-sm text-red-600 mt-2">{errors.customItem}</p>}
                </div>
              )}
            </div>
          )}

          {/* Step 2: Contact & Address */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Step 2: Contact & Pickup Address</h2>
              
              {/* Auto-fetch Location */}
              <button
                type="button"
                onClick={fetchLocation}
                disabled={isLoadingLocation}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all disabled:opacity-50"
              >
                {isLoadingLocation ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Fetching location...
                  </>
                ) : (
                  <>
                    <MapPin className="w-5 h-5" />
                    Auto-detect My Location
                  </>
                )}
              </button>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                    className={`w-full px-4 py-3 border ${errors.contactName ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                    placeholder="John Doe"
                  />
                  {errors.contactName && <p className="text-sm text-red-600 mt-1">{errors.contactName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                    placeholder="9876543210"
                    maxLength={10}
                  />
                  {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email (Optional)</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Address *</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  className={`w-full px-4 py-3 border ${errors.address ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                  rows={3}
                  placeholder="Street address, building name, floor"
                />
                {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    className={`w-full px-4 py-3 border ${errors.city ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                    placeholder="Mumbai"
                  />
                  {errors.city && <p className="text-sm text-red-600 mt-1">{errors.city}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                    className={`w-full px-4 py-3 border ${errors.state ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                    placeholder="Maharashtra"
                  />
                  {errors.state && <p className="text-sm text-red-600 mt-1">{errors.state}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode *</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData(prev => ({ ...prev, pincode: e.target.value }))}
                    className={`w-full px-4 py-3 border ${errors.pincode ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                    placeholder="400001"
                    maxLength={6}
                  />
                  {errors.pincode && <p className="text-sm text-red-600 mt-1">{errors.pincode}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Schedule */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Step 3: When should we pick up?</h2>
              
              {/* Pickup Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Pickup Type</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, pickupType: 'immediate' }))}
                    className={`p-6 rounded-xl border-2 text-left transition-all ${
                      formData.pickupType === 'immediate'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <CheckCircle className={`w-8 h-8 mb-2 ${
                      formData.pickupType === 'immediate' ? 'text-emerald-600' : 'text-gray-600'
                    }`} />
                    <h3 className="font-bold text-gray-900 mb-1">Immediate Pickup</h3>
                    <p className="text-sm text-gray-600">We'll pickup within 24-48 hours</p>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, pickupType: 'scheduled' }))}
                    className={`p-6 rounded-xl border-2 text-left transition-all ${
                      formData.pickupType === 'scheduled'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <Calendar className={`w-8 h-8 mb-2 ${
                      formData.pickupType === 'scheduled' ? 'text-emerald-600' : 'text-gray-600'
                    }`} />
                    <h3 className="font-bold text-gray-900 mb-1">Schedule Pickup</h3>
                    <p className="text-sm text-gray-600">Choose your preferred date and time</p>
                  </button>
                </div>
              </div>

              {/* Scheduled Date & Time */}
              {formData.pickupType === 'scheduled' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Date *</label>
                    <input
                      type="date"
                      value={formData.scheduledDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-3 border ${errors.scheduledDate ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                    />
                    {errors.scheduledDate && <p className="text-sm text-red-600 mt-1">{errors.scheduledDate}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Time Slot *</label>
                    <select
                      value={formData.scheduledTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, scheduledTime: e.target.value }))}
                      className={`w-full px-4 py-3 border ${errors.scheduledTime ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                    >
                      <option value="">Select time slot</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                    {errors.scheduledTime && <p className="text-sm text-red-600 mt-1">{errors.scheduledTime}</p>}
                  </div>
                </div>
              )}

              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium text-gray-900">{formData.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items:</span>
                    <span className="font-medium text-gray-900">{formData.items.length} item(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium text-gray-900">{formData.city}, {formData.state}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pickup Type:</span>
                    <span className="font-medium text-emerald-600 capitalize">{formData.pickupType}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-gray-600">Service Charge:</span>
                    <span className="font-bold text-green-600">FREE</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Success Step */}
          {currentStep === 4 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Pickup Scheduled Successfully!</h2>
              <p className="text-gray-600 mb-6">Your tracking number is:</p>
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 inline-block mb-8">
                <p className="text-2xl font-bold text-emerald-600">{trackingNumber}</p>
              </div>
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-bold transition-all"
                >
                  View My Pickups
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all"
                >
                  Back to Home
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-8 pt-6 border-t">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold flex items-center gap-2 transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
              )}
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-bold flex items-center gap-2 transition-all"
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="ml-auto px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-bold flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Complete Booking
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchedulePickup;
