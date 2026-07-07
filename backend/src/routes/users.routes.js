const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth } = require('../middleware/auth');

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, phone, avatar } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (avatar) user.avatar = avatar;

    await user.save();
    res.json({ message: 'Profile updated', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add address
router.post('/addresses', auth, async (req, res) => {
  try {
    const { label, street, city, state, zipCode, latitude, longitude, isDefault } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.addresses.push({
      label,
      street,
      city,
      state,
      zipCode,
      latitude,
      longitude,
      isDefault
    });

    await user.save();
    res.json({ message: 'Address added', addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get addresses
router.get('/addresses', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
