const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Pickup = require('../models/Pickup');
const User = require('../models/User');

// @route   GET /api/dashboard/stats
// @desc    Get user dashboard statistics
// @access  Private
router.get('/stats', protect, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get total pickups
    const totalPickups = await Pickup.countDocuments({ user: userId });

    // Get pickups by status
    const pendingPickups = await Pickup.countDocuments({ user: userId, status: 'pending' });
    const completedPickups = await Pickup.countDocuments({ user: userId, status: 'completed' });
    const inProgressPickups = await Pickup.countDocuments({ user: userId, status: 'in-progress' });

    // Get recent pickups
    const recentPickups = await Pickup.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('category items status trackingNumber createdAt');

    // Calculate total estimated weight
    const pickups = await Pickup.find({ user: userId, status: 'completed' });
    const totalWeight = pickups.reduce((sum, pickup) => sum + (pickup.estimatedWeight || 0), 0);

    res.status(200).json({
      success: true,
      stats: {
        totalPickups,
        pendingPickups,
        completedPickups,
        inProgressPickups,
        totalWeight: totalWeight.toFixed(2),
        recentPickups
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching dashboard stats',
      error: error.message
    });
  }
});

// @route   GET /api/dashboard/pickups/recent
// @desc    Get recent pickups for dashboard
// @access  Private
router.get('/pickups/recent', protect, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const pickups = await Pickup.find({ user: req.user.id })
      .populate('priceAddedBy', 'name')
      .sort({ createdAt: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      count: pickups.length,
      pickups
    });
  } catch (error) {
    console.error('Recent pickups error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching recent pickups',
      error: error.message
    });
  }
});

module.exports = router;
