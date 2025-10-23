const mongoose = require('mongoose');

const PickupSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['Smartphones & Tablets', 'Laptops & Computers', 'Batteries & Chargers', 'Other Items']
  },
  items: [{
    type: String,
    required: true
  }],
  customItem: {
    type: String,
    default: ''
  },
  pickupType: {
    type: String,
    required: true,
    enum: ['immediate', 'scheduled'],
    default: 'immediate'
  },
  scheduledDate: {
    type: Date
  },
  scheduledTime: {
    type: String
  },
  contactInfo: {
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^[0-9]{10}$/, 'Please add a valid 10-digit phone number']
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    }
  },
  address: {
    street: {
      type: String,
      required: [true, 'Street address is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    pincode: {
      type: String,
      required: [true, 'Pincode is required'],
      match: [/^[0-9]{6}$/, 'Please add a valid 6-digit pincode']
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  assignedWorker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  estimatedWeight: {
    type: Number,
    default: 0
  },
  actualWeight: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    default: 0
  },
  priceAddedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  trackingNumber: {
    type: String,
    unique: true
  },
  completedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Generate tracking number before saving
PickupSchema.pre('save', async function(next) {
  if (!this.trackingNumber) {
    this.trackingNumber = `ECO${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }
  next();
});

module.exports = mongoose.model('Pickup', PickupSchema);
