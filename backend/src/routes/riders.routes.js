const express = require('express');
const router = express.Router();
const Rider = require('../models/Rider');
const Order = require('../models/Order');
const { auth, riderOnly } = require('../middleware/auth');

// Get rider profile
router.get('/profile', auth, riderOnly, async (req, res) => {
  try {
    const rider = await Rider.findOne({ user: req.userId });
    if (!rider) {
      return res.status(404).json({ message: 'Rider profile not found' });
    }
    res.json(rider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create/Update rider profile
router.post('/profile', auth, async (req, res) => {
  try {
    const { phone, vehicleType, vehicleNumber, license, documents } = req.body;

    let rider = await Rider.findOne({ user: req.userId });
    if (!rider) {
      rider = new Rider({
        user: req.userId,
        phone,
        vehicleType,
        vehicleNumber,
        license,
        documents
      });
    } else {
      Object.assign(rider, { phone, vehicleType, vehicleNumber, license, documents });
    }

    await rider.save();
    res.json({ message: 'Rider profile saved', rider });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update rider location
router.patch('/location/update', auth, riderOnly, async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    const rider = await Rider.findOne({ user: req.userId });
    if (!rider) {
      return res.status(404).json({ message: 'Rider not found' });
    }

    rider.currentLocation = {
      latitude,
      longitude,
      lastUpdated: new Date()
    };
    await rider.save();

    req.io.emit('rider-location-updated', {
      riderId: req.userId,
      latitude,
      longitude
    });

    res.json({ message: 'Location updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get available orders
router.get('/orders/available', auth, riderOnly, async (req, res) => {
  try {
    const orders = await Order.find({ status: 'ready', rider: null })
      .populate('customer')
      .populate('vendor');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get rider's active orders
router.get('/orders/active', auth, riderOnly, async (req, res) => {
  try {
    const orders = await Order.find({ 
      rider: req.userId, 
      status: { $in: ['on_way', 'ready'] } 
    }).populate('customer').populate('items.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
