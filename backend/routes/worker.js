const express = require('express');
const router = express.Router();
const Pickup = require('../models/Pickup');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

// @desc    Get assigned pickups for worker
// @route   GET /api/worker/pickups
// @access  Private/Worker
router.get('/pickups', protect, authorize('worker'), async (req, res) => {
  try {
    const { status } = req.query;
    
    let query = { assignedWorker: req.user.id };
    
    if (status) {
      query.status = status;
    }
    
    const pickups = await Pickup.find(query)
      .populate('user', 'name email phone')
      .sort('-createdAt');
    
    res.json({
      success: true,
      count: pickups.length,
      data: pickups
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Get worker dashboard statistics
// @route   GET /api/worker/stats
// @access  Private/Worker
router.get('/stats', protect, authorize('worker'), async (req, res) => {
  try {
    const assignedPickups = await Pickup.countDocuments({ 
      assignedWorker: req.user.id 
    });
    
    const pendingPickups = await Pickup.countDocuments({ 
      assignedWorker: req.user.id,
      status: { $in: ['confirmed', 'in-progress'] }
    });
    
    const completedPickups = await Pickup.countDocuments({ 
      assignedWorker: req.user.id,
      status: 'completed'
    });
    
    // Calculate total weight collected
    const weightResult = await Pickup.aggregate([
      { 
        $match: { 
          assignedWorker: req.user._id,
          status: 'completed'
        } 
      },
      { 
        $group: { 
          _id: null, 
          totalWeight: { $sum: '$actualWeight' } 
        } 
      }
    ]);
    
    const totalWeight = weightResult.length > 0 ? weightResult[0].totalWeight : 0;
    
    // Get recent assigned pickups
    const recentPickups = await Pickup.find({ assignedWorker: req.user.id })
      .populate('user', 'name email phone')
      .sort('-createdAt')
      .limit(5);
    
    res.json({
      success: true,
      data: {
        assignedPickups,
        pendingPickups,
        completedPickups,
        totalWeight,
        recentPickups
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Update pickup status
// @route   PUT /api/worker/pickups/:id/status
// @access  Private/Worker
router.put('/pickups/:id/status', protect, authorize('worker'), async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Please provide status'
      });
    }
    
    const pickup = await Pickup.findById(req.params.id);
    
    if (!pickup) {
      return res.status(404).json({
        success: false,
        message: 'Pickup not found'
      });
    }
    
    // Check if pickup is assigned to this worker
    if (pickup.assignedWorker.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this pickup'
      });
    }
    
    const oldStatus = pickup.status;
    pickup.status = status;
    
    if (status === 'completed') {
      pickup.completedAt = Date.now();
      
      // Update worker stats
      if (oldStatus !== 'completed') {
        await User.findByIdAndUpdate(req.user.id, {
          $inc: { 
            completedPickups: 1,
            assignedPickups: -1,
            totalWeightCollected: pickup.actualWeight || 0
          }
        });
      }
    }
    
    await pickup.save();
    
    const updatedPickup = await Pickup.findById(req.params.id)
      .populate('user', 'name email phone');
    
    res.json({
      success: true,
      data: updatedPickup
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Update pickup weight
// @route   PUT /api/worker/pickups/:id/weight
// @access  Private/Worker
router.put('/pickups/:id/weight', protect, authorize('worker'), async (req, res) => {
  try {
    const { actualWeight } = req.body;
    
    if (actualWeight === undefined || actualWeight === null) {
      return res.status(400).json({
        success: false,
        message: 'Please provide actual weight'
      });
    }
    
    const pickup = await Pickup.findById(req.params.id);
    
    if (!pickup) {
      return res.status(404).json({
        success: false,
        message: 'Pickup not found'
      });
    }
    
    // Check if pickup is assigned to this worker
    if (pickup.assignedWorker.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this pickup'
      });
    }
    
    const oldWeight = pickup.actualWeight || 0;
    pickup.actualWeight = actualWeight;
    await pickup.save();
    
    // Update worker's total weight collected
    const weightDifference = actualWeight - oldWeight;
    if (weightDifference !== 0 && pickup.status === 'completed') {
      await User.findByIdAndUpdate(req.user.id, {
        $inc: { totalWeightCollected: weightDifference }
      });
    }
    
    const updatedPickup = await Pickup.findById(req.params.id)
      .populate('user', 'name email phone');
    
    res.json({
      success: true,
      data: updatedPickup
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Update pickup price
// @route   PUT /api/worker/pickups/:id/price
// @access  Private/Worker
router.put('/pickups/:id/price', protect, authorize('worker'), async (req, res) => {
  try {
    const { price } = req.body;
    
    if (price === undefined || price < 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid price'
      });
    }
    
    const pickup = await Pickup.findById(req.params.id);
    
    if (!pickup) {
      return res.status(404).json({
        success: false,
        message: 'Pickup not found'
      });
    }
    
    // Check if pickup is assigned to this worker
    if (pickup.assignedWorker.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this pickup'
      });
    }
    
    pickup.price = price;
    pickup.priceAddedBy = req.user.id;
    await pickup.save();
    
    const updatedPickup = await Pickup.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('priceAddedBy', 'name');
    
    res.json({
      success: true,
      data: updatedPickup
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Get single pickup details
// @route   GET /api/worker/pickups/:id
// @access  Private/Worker
router.get('/pickups/:id', protect, authorize('worker'), async (req, res) => {
  try {
    const pickup = await Pickup.findById(req.params.id)
      .populate('user', 'name email phone');
    
    if (!pickup) {
      return res.status(404).json({
        success: false,
        message: 'Pickup not found'
      });
    }
    
    // Check if pickup is assigned to this worker
    if (pickup.assignedWorker.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this pickup'
      });
    }
    
    res.json({
      success: true,
      data: pickup
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Get available pickups (not assigned to any worker)
// @route   GET /api/worker/available
// @access  Private/Worker
router.get('/available', protect, authorize('worker'), async (req, res) => {
  try {
    const availablePickups = await Pickup.find({
      status: 'pending',
      assignedWorker: null
    })
      .populate('user', 'name email phone')
      .sort('-createdAt')
      .limit(50);
    
    res.json({
      success: true,
      count: availablePickups.length,
      data: availablePickups
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Pick an available order (self-assign)
// @route   PUT /api/worker/pickups/:id/pick
// @access  Private/Worker
router.put('/pickups/:id/pick', protect, authorize('worker'), async (req, res) => {
  try {
    const pickup = await Pickup.findById(req.params.id);
    
    if (!pickup) {
      return res.status(404).json({
        success: false,
        message: 'Pickup not found'
      });
    }
    
    // Check if already assigned
    if (pickup.assignedWorker) {
      return res.status(400).json({
        success: false,
        message: 'This pickup is already assigned to another worker'
      });
    }
    
    // Check if status is pending
    if (pickup.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'This pickup is no longer available'
      });
    }
    
    // Assign to this worker
    pickup.assignedWorker = req.user.id;
    pickup.status = 'confirmed';
    await pickup.save();
    
    // Update worker's assigned pickups count
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { assignedPickups: 1 }
    });
    
    const updatedPickup = await Pickup.findById(req.params.id)
      .populate('user', 'name email phone');
    
    res.json({
      success: true,
      message: 'Pickup successfully assigned to you',
      data: updatedPickup
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
