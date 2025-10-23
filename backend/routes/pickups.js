const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { protect } = require('../middleware/auth');
const Pickup = require('../models/Pickup');

// @route   POST /api/pickups
// @desc    Create a new pickup request
// @access  Private
router.post('/', protect, [
  body('category').notEmpty().withMessage('Category is required'),
  body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
  body('pickupType').isIn(['immediate', 'scheduled']).withMessage('Invalid pickup type'),
  body('contactInfo.name').notEmpty().withMessage('Contact name is required'),
  body('contactInfo.phone').matches(/^[0-9]{10}$/).withMessage('Valid 10-digit phone number required'),
  body('address.street').notEmpty().withMessage('Street address is required'),
  body('address.city').notEmpty().withMessage('City is required'),
  body('address.state').notEmpty().withMessage('State is required'),
  body('address.pincode').matches(/^[0-9]{6}$/).withMessage('Valid 6-digit pincode required')
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  try {
    const pickupData = {
      user: req.user.id,
      ...req.body
    };

    const pickup = await Pickup.create(pickupData);

    res.status(201).json({
      success: true,
      message: 'Pickup request created successfully',
      pickup
    });
  } catch (error) {
    console.error('Create pickup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating pickup',
      error: error.message
    });
  }
});

// @route   GET /api/pickups
// @desc    Get all pickups for logged in user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const pickups = await Pickup.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: pickups.length,
      pickups
    });
  } catch (error) {
    console.error('Get pickups error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching pickups',
      error: error.message
    });
  }
});

// @route   GET /api/pickups/:id
// @desc    Get single pickup by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const pickup = await Pickup.findById(req.params.id);

    if (!pickup) {
      return res.status(404).json({
        success: false,
        message: 'Pickup not found'
      });
    }

    // Make sure user owns the pickup
    if (pickup.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this pickup'
      });
    }

    res.status(200).json({
      success: true,
      pickup
    });
  } catch (error) {
    console.error('Get pickup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching pickup',
      error: error.message
    });
  }
});

// @route   PUT /api/pickups/:id
// @desc    Update pickup
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    let pickup = await Pickup.findById(req.params.id);

    if (!pickup) {
      return res.status(404).json({
        success: false,
        message: 'Pickup not found'
      });
    }

    // Make sure user owns the pickup
    if (pickup.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this pickup'
      });
    }

    pickup = await Pickup.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Pickup updated successfully',
      pickup
    });
  } catch (error) {
    console.error('Update pickup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating pickup',
      error: error.message
    });
  }
});

// @route   DELETE /api/pickups/:id
// @desc    Delete pickup
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const pickup = await Pickup.findById(req.params.id);

    if (!pickup) {
      return res.status(404).json({
        success: false,
        message: 'Pickup not found'
      });
    }

    // Make sure user owns the pickup
    if (pickup.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this pickup'
      });
    }

    await pickup.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Pickup deleted successfully'
    });
  } catch (error) {
    console.error('Delete pickup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting pickup',
      error: error.message
    });
  }
});

// @route   GET /api/pickups/tracking/:trackingNumber
// @desc    Track pickup by tracking number
// @access  Public
router.get('/tracking/:trackingNumber', async (req, res) => {
  try {
    const pickup = await Pickup.findOne({ trackingNumber: req.params.trackingNumber })
      .select('-user')
      .populate('user', 'name');

    if (!pickup) {
      return res.status(404).json({
        success: false,
        message: 'Pickup not found with this tracking number'
      });
    }

    res.status(200).json({
      success: true,
      pickup
    });
  } catch (error) {
    console.error('Track pickup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error tracking pickup',
      error: error.message
    });
  }
});

module.exports = router;
