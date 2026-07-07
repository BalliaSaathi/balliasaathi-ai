const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Vendor = require('../models/Vendor');
const Rider = require('../models/Rider');
const Order = require('../models/Order');
const { auth, adminOnly } = require('../middleware/auth');

// Get dashboard stats
router.get('/dashboard', auth, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([{ $group: { _id: null, total: { $sum: '$total' } } }]);
    const totalVendors = await Vendor.countDocuments({ status: 'approved' });

    res.json({
      totalUsers,
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      totalVendors
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all vendors (with approval)
router.get('/vendors', auth, adminOnly, async (req, res) => {
  try {
    const vendors = await Vendor.find().populate('user');
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Approve vendor
router.patch('/vendors/:id/approve', auth, adminOnly, async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    vendor.status = 'approved';
    await vendor.save();
    res.json({ message: 'Vendor approved', vendor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reject vendor
router.patch('/vendors/:id/reject', auth, adminOnly, async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    vendor.status = 'rejected';
    await vendor.save();
    res.json({ message: 'Vendor rejected' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all riders (with approval)
router.get('/riders', auth, adminOnly, async (req, res) => {
  try {
    const riders = await Rider.find().populate('user');
    res.json(riders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Approve rider
router.patch('/riders/:id/approve', auth, adminOnly, async (req, res) => {
  try {
    const rider = await Rider.findById(req.params.id);
    if (!rider) {
      return res.status(404).json({ message: 'Rider not found' });
    }

    rider.status = 'approved';
    await rider.save();
    res.json({ message: 'Rider approved', rider });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all orders
router.get('/orders', auth, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customer')
      .populate('vendor')
      .populate('rider')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
