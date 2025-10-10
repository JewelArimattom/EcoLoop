// src/pages/SchedulePickup.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SchedulePickup: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Item Details
    category: '',
    items: [] as Array<{ type: string; quantity: number; condition: string }>,
    
    // Step 2: Location & Contact
    address: '',
    landmark: '',
    pincode: '',
    city: '',
    state: '',
    contactName: '',
    phone: '',
    alternatePhone: '',
    
    // Step 3: Schedule
    preferredDate: '',
    timeSlot: '',
    specialInstructions: ''
  });

  const categories = [
    { id: 'ewaste', name: 'E-Waste', icon: '📱', items: ['Smartphone', 'Laptop', 'Tablet', 'Desktop Computer', 'Printer', 'TV', 'Monitor', 'Keyboard', 'Mouse', 'Router', 'Speaker', 'Camera'] },
    { id: 'batteries', name: 'Batteries', icon: '🔋', items: ['Mobile Battery', 'Laptop Battery', 'Power Bank', 'UPS Battery', 'Car Battery', 'Button Cells', 'Inverter Battery'] },
    { id: 'appliances', name: 'Appliances', icon: '🔌', items: ['Refrigerator', 'Washing Machine', 'AC', 'Microwave', 'Mixer', 'Iron', 'Toaster', 'Water Purifier', 'Geyser', 'Fan'] },
    { id: 'metal', name: 'Metal Scrap', icon: '🔩', items: ['Aluminum', 'Copper', 'Brass', 'Steel', 'Iron', 'Mixed Metal', 'Electronic Components'] },
    { id: 'plastic', name: 'Plastic', icon: '🧴', items: ['PET Bottles', 'Plastic Containers', 'Mixed Plastic', 'E-Waste Plastic', 'Furniture Plastic'] },
    { id: 'paper', name: 'Paper', icon: '📄', items: ['Newspaper', 'Books', 'Cardboard', 'Office Paper', 'Magazines', 'Notebooks'] },
    { id: 'other', name: 'Other Items', icon: '📦', items: ['Glass', 'Furniture', 'Clothes', 'Shoes', 'Toys', 'Kitchen Items'] }
  ];

  const timeSlots = [
    '9:00 AM - 11:00 AM',
    '11:00 AM - 1:00 PM', 
    '1:00 PM - 3:00 PM',
    '3:00 PM - 5:00 PM',
    '5:00 PM - 7:00 PM'
  ];

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { type: '', quantity: 1, condition: 'working' }]
    }));
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Pickup scheduled:', formData);
    setCurrentStep(4); // Success step
  };

  // Get tomorrow's date for min date
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-4">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule Free Pickup</h1>
          <p className="text-lg text-gray-600">Our executive will visit, evaluate items, and offer best price on the spot</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map(step => (
              <div key={step} className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                  currentStep >= step ? 'bg-emerald-500' : 'bg-gray-300'
                }`}>
                  {step}
                </div>
                <span className={`text-sm mt-2 ${
                  currentStep >= step ? 'text-emerald-600 font-medium' : 'text-gray-500'
                }`}>
                  {step === 1 && 'Items'}
                  {step === 2 && 'Location'}
                  {step === 3 && 'Schedule'}
                </span>
              </div>
            ))}
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-emerald-500 -translate-y-1/2 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Container */}
        <div className="card p-6 md:p-8">
          {currentStep === 4 ? (
            /* Success Step */
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">✅</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Pickup Scheduled Successfully!</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Your free pickup has been scheduled. Our certified executive will visit you at the scheduled time for item evaluation and instant payment.
              </p>
              
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6 max-w-md mx-auto">
                <h3 className="font-semibold text-emerald-800 mb-3">Pickup Details</h3>
                <div className="text-left space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pickup Date:</span>
                    <span className="font-semibold">{formData.preferredDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time Slot:</span>
                    <span className="font-semibold">{formData.timeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items:</span>
                    <span className="font-semibold">{formData.items.length} items</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Executive Visit:</span>
                    <span className="font-semibold text-emerald-600">Confirmed</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 max-w-md mx-auto">
                <h4 className="font-semibold text-blue-800 mb-2">📋 What to Expect:</h4>
                <ul className="text-sm text-blue-700 text-left space-y-1">
                  <li>• Our executive will visit at scheduled time</li>
                  <li>• Professional evaluation of your items</li>
                  <li>• Best price offer based on current market rates</li>
                  <li>• Instant payment via UPI, cash, or bank transfer</li>
                  <li>• Free doorstep pickup after payment</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/"
                  className="btn btn-primary px-6 py-3"
                >
                  Back to Home
                </Link>
                <Link
                  to="/track-pickup"
                  className="btn btn-outline px-6 py-3"
                >
                  Track Pickup Status
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Step 1: Item Selection */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">What items do you want to sell?</h2>
                    <p className="text-gray-600 mb-6">Select the category and add your items. Our executive will evaluate and offer best price during pickup.</p>
                    
                    {/* Category Selection */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      {categories.map(category => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, category: category.id }))}
                          className={`p-4 rounded-lg border-2 text-left transition-all ${
                            formData.category === category.id 
                              ? 'border-emerald-500 bg-emerald-50' 
                              : 'border-gray-200 hover:border-emerald-300'
                          }`}
                        >
                          <div className="text-2xl mb-2">{category.icon}</div>
                          <div className="font-medium text-gray-900">{category.name}</div>
                        </button>
                      ))}
                    </div>

                    {/* Item Details */}
                    {formData.category && (
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-semibold text-gray-900">Add Your Items</h3>
                          <button
                            type="button"
                            onClick={addItem}
                            className="btn btn-primary text-sm py-2 px-4"
                          >
                            + Add Item
                          </button>
                        </div>

                        {formData.items.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">
                            <div className="text-4xl mb-4">📦</div>
                            <p>Add the items you want to sell</p>
                            <p className="text-sm mt-2">Our executive will evaluate them during pickup</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {formData.items.map((item, index) => (
                              <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                                <div className="flex justify-between items-start mb-3">
                                  <h4 className="font-medium text-gray-900">Item {index + 1}</h4>
                                  <button
                                    type="button"
                                    onClick={() => removeItem(index)}
                                    className="text-red-500 hover:text-red-700 text-sm"
                                  >
                                    Remove
                                  </button>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div>
                                    <label className="label">Item Type *</label>
                                    <select
                                      value={item.type}
                                      onChange={(e) => updateItem(index, 'type', e.target.value)}
                                      className="input"
                                      required
                                    >
                                      <option value="">Select Item</option>
                                      {categories.find(cat => cat.id === formData.category)?.items.map(itemType => (
                                        <option key={itemType} value={itemType}>{itemType}</option>
                                      ))}
                                    </select>
                                  </div>
                                  
                                  <div>
                                    <label className="label">Quantity *</label>
                                    <input
                                      type="number"
                                      min="1"
                                      value={item.quantity}
                                      onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                                      className="input"
                                      required
                                    />
                                  </div>
                                  
                                  <div>
                                    <label className="label">Condition *</label>
                                    <select
                                      value={item.condition}
                                      onChange={(e) => updateItem(index, 'condition', e.target.value)}
                                      className="input"
                                      required
                                    >
                                      <option value="working">Working</option>
                                      <option value="not-working">Not Working</option>
                                      <option value="damaged">Damaged/Broken</option>
                                      <option value="scrap">Scrap/For Parts</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {formData.items.length > 0 && (
                          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-start gap-4">
                              <div className="text-2xl">💡</div>
                              <div>
                                <div className="font-semibold text-blue-800 mb-1">Price Evaluation Process</div>
                                <div className="text-sm text-blue-700">
                                  Our certified executive will visit your location, physically inspect all items, 
                                  and offer you the best possible price based on current market rates and item condition.
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      disabled={formData.items.length === 0}
                      className="btn btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue to Location →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Location & Contact */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Where should we come for pickup?</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="label">Full Name *</label>
                      <input
                        type="text"
                        value={formData.contactName}
                        onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                        className="input"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="label">Phone Number *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="input"
                        placeholder="Enter 10-digit mobile number"
                        pattern="[0-9]{10}"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="label">Complete Address *</label>
                      <textarea
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        className="input h-20 resize-none"
                        placeholder="House/Flat number, Building, Street, Area"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="label">Landmark</label>
                      <input
                        type="text"
                        value={formData.landmark}
                        onChange={(e) => setFormData(prev => ({ ...prev, landmark: e.target.value }))}
                        className="input"
                        placeholder="Nearby landmark for easy location"
                      />
                    </div>
                    
                    <div>
                      <label className="label">Pincode *</label>
                      <input
                        type="text"
                        value={formData.pincode}
                        onChange={(e) => setFormData(prev => ({ ...prev, pincode: e.target.value }))}
                        className="input"
                        placeholder="Enter 6-digit pincode"
                        pattern="[0-9]{6}"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="label">City *</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                        className="input"
                        placeholder="Enter your city"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="label">State *</label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                        className="input"
                        placeholder="Enter your state"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="text-emerald-600 text-xl">🛡️</div>
                      <div>
                        <div className="font-semibold text-emerald-800">Your Privacy is Protected</div>
                        <div className="text-sm text-emerald-700">
                          Your contact details are only shared with our certified pickup executive for scheduling purposes.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="btn btn-ghost px-6 py-3"
                    >
                      ← Back to Items
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="btn btn-primary px-8 py-3"
                    >
                      Choose Pickup Time →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Schedule Pickup */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose your preferred pickup time</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="label">Preferred Date *</label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, preferredDate: e.target.value }))}
                        className="input"
                        min={getTomorrowDate()}
                        required
                      />
                      <div className="text-sm text-gray-500 mt-1">Pickup available from tomorrow onwards</div>
                    </div>
                    
                    <div>
                      <label className="label">Preferred Time Slot *</label>
                      <select
                        value={formData.timeSlot}
                        onChange={(e) => setFormData(prev => ({ ...prev, timeSlot: e.target.value }))}
                        className="input"
                        required
                      >
                        <option value="">Select Time Slot</option>
                        {timeSlots.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                      <div className="text-sm text-gray-500 mt-1">2-hour window for executive visit</div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="label">Special Instructions (Optional)</label>
                      <textarea
                        value={formData.specialInstructions}
                        onChange={(e) => setFormData(prev => ({ ...prev, specialInstructions: e.target.value }))}
                        className="input h-20 resize-none"
                        placeholder="Any specific instructions for our pickup executive (gate code, floor, contact person, etc.)"
                      />
                    </div>
                  </div>

                  {/* Process Summary */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Pickup Process Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Items for Evaluation</span>
                        <span className="font-medium">{formData.items.length} items</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pickup Service</span>
                        <span className="font-medium text-green-600">FREE</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price Evaluation</span>
                        <span className="font-medium text-blue-600">On-site by Executive</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment</span>
                        <span className="font-medium text-emerald-600">Instant after Evaluation</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="btn btn-ghost px-6 py-3"
                    >
                      ← Back to Location
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary px-8 py-3"
                    >
                      🚚 Confirm Free Pickup
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Support Info */}
        <div className="text-center mt-8 text-sm text-gray-500">
          Need help? Call us at <a href="tel:+1800-ECOLOOP" className="text-emerald-600 hover:text-emerald-700">1800-ECOLOOP</a> or 
          <a href="mailto:support@ecoloop.com" className="text-emerald-600 hover:text-emerald-700 ml-1">email support</a>
        </div>
      </div>
    </div>
  );
};

export default SchedulePickup;