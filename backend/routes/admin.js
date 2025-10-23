const express = require('express');
const router = express.Router();
const Pickup = require('../models/Pickup');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

// @desc    Get all pickups (Admin view)
// @route   GET /api/admin/pickups
// @access  Private/Admin
router.get('/pickups', protect, authorize('admin'), async (req, res) => {
  try {
    const { status, worker, date } = req.query;
    
    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (worker) {
      query.assignedWorker = worker;
    }
    
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      query.createdAt = { $gte: startDate, $lte: endDate };
    }
    
    const pickups = await Pickup.find(query)
      .populate('user', 'name email phone')
      .populate('assignedWorker', 'name email phone')
      .populate('priceAddedBy', 'name')
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

// @desc    Get admin dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
router.get('/stats', protect, authorize('admin'), async (req, res) => {
  try {
    const totalPickups = await Pickup.countDocuments();
    const pendingPickups = await Pickup.countDocuments({ status: 'pending' });
    const confirmedPickups = await Pickup.countDocuments({ status: 'confirmed' });
    const inProgressPickups = await Pickup.countDocuments({ status: 'in-progress' });
    const completedPickups = await Pickup.countDocuments({ status: 'completed' });
    const cancelledPickups = await Pickup.countDocuments({ status: 'cancelled' });
    
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalWorkers = await User.countDocuments({ role: 'worker' });
    
    // Calculate total weight from completed pickups
    const weightResult = await Pickup.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, totalWeight: { $sum: '$actualWeight' } } }
    ]);
    const totalWeight = weightResult.length > 0 ? weightResult[0].totalWeight : 0;
    
    // Get recent pickups
    const recentPickups = await Pickup.find()
      .populate('user', 'name email')
      .populate('assignedWorker', 'name')
      .sort('-createdAt')
      .limit(10);
    
    res.json({
      success: true,
      data: {
        pickups: {
          total: totalPickups,
          pending: pendingPickups,
          confirmed: confirmedPickups,
          inProgress: inProgressPickups,
          completed: completedPickups,
          cancelled: cancelledPickups
        },
        users: {
          total: totalUsers,
          workers: totalWorkers
        },
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

// @desc    Assign pickup to worker
// @route   PUT /api/admin/pickups/:id/assign
// @access  Private/Admin
router.put('/pickups/:id/assign', protect, authorize('admin'), async (req, res) => {
  try {
    const { workerId } = req.body;
    
    if (!workerId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide worker ID'
      });
    }
    
    // Check if worker exists and has worker role
    const worker = await User.findById(workerId);
    if (!worker || worker.role !== 'worker') {
      return res.status(404).json({
        success: false,
        message: 'Worker not found'
      });
    }
    
    const pickup = await Pickup.findById(req.params.id);
    
    if (!pickup) {
      return res.status(404).json({
        success: false,
        message: 'Pickup not found'
      });
    }
    
    // If previously assigned to another worker, decrement their count
    if (pickup.assignedWorker && pickup.assignedWorker.toString() !== workerId) {
      await User.findByIdAndUpdate(pickup.assignedWorker, {
        $inc: { assignedPickups: -1 }
      });
    }
    
    pickup.assignedWorker = workerId;
    pickup.status = 'confirmed';
    await pickup.save();
    
    // Increment worker's assigned pickups count
    await User.findByIdAndUpdate(workerId, {
      $inc: { assignedPickups: 1 }
    });
    
    const updatedPickup = await Pickup.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('assignedWorker', 'name email phone');
    
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

// @desc    Update pickup status (Admin override)
// @route   PUT /api/admin/pickups/:id/status
// @access  Private/Admin
router.put('/pickups/:id/status', protect, authorize('admin'), async (req, res) => {
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
    
    pickup.status = status;
    
    if (status === 'completed') {
      pickup.completedAt = Date.now();
    }
    
    await pickup.save();
    
    const updatedPickup = await Pickup.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('assignedWorker', 'name email phone');
    
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

// @desc    Get all workers
// @route   GET /api/admin/workers
// @access  Private/Admin
router.get('/workers', protect, authorize('admin'), async (req, res) => {
  try {
    const workers = await User.find({ role: 'worker' })
      .select('-password')
      .sort('name');
    
    res.json({
      success: true,
      count: workers.length,
      data: workers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
router.get('/users', protect, authorize('admin'), async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort('-createdAt');
    
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
router.put('/users/:id/role', protect, authorize('admin'), async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!role || !['user', 'worker', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid role (user, worker, or admin)'
      });
    }
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    user.role = role;
    await user.save();
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Get pending worker approvals
// @route   GET /api/admin/workers/pending
// @access  Private/Admin
router.get('/workers/pending', protect, authorize('admin'), async (req, res) => {
  try {
    const pendingWorkers = await User.find({ 
      role: 'worker',
      isApproved: false
    })
      .select('-password')
      .sort('-createdAt');
    
    res.json({
      success: true,
      count: pendingWorkers.length,
      data: pendingWorkers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Approve worker account
// @route   PUT /api/admin/workers/:id/approve
// @access  Private/Admin
router.put('/workers/:id/approve', protect, authorize('admin'), async (req, res) => {
  try {
    const worker = await User.findById(req.params.id);
    
    if (!worker) {
      return res.status(404).json({
        success: false,
        message: 'Worker not found'
      });
    }
    
    if (worker.role !== 'worker') {
      return res.status(400).json({
        success: false,
        message: 'User is not a worker'
      });
    }
    
    worker.isApproved = true;
    await worker.save();
    
    res.json({
      success: true,
      message: 'Worker approved successfully',
      data: worker
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Reject worker account
// @route   DELETE /api/admin/workers/:id/reject
// @access  Private/Admin
router.delete('/workers/:id/reject', protect, authorize('admin'), async (req, res) => {
  try {
    const worker = await User.findById(req.params.id);
    
    if (!worker) {
      return res.status(404).json({
        success: false,
        message: 'Worker not found'
      });
    }
    
    await User.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Worker account rejected and deleted'
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
