const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');
const { auth, vendorOnly } = require('../middleware/auth');

// Get vendor profile
router.get('/profile', auth, vendorOnly, async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ user: req.userId });
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor profile not found' });
    }
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create/Update vendor profile
router.post('/profile', auth, async (req, res) => {
  try {
    const { storeName, storeDescription, category, address, phone, email, bankDetails, operatingHours } = req.body;

    let vendor = await Vendor.findOne({ user: req.userId });
    if (!vendor) {
      vendor = new Vendor({
        user: req.userId,
        storeName,
        storeDescription,
        category,
        address,
        phone,
        email,
        bankDetails,
        operatingHours
      });
    } else {
      Object.assign(vendor, { storeName, storeDescription, category, address, phone, email, bankDetails, operatingHours });
    }

    await vendor.save();
    res.json({ message: 'Vendor profile saved', vendor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all vendors (for customers)
router.get('/', async (req, res) => {
  try {
    const vendors = await Vendor.find({ status: 'approved' });
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get vendor details
router.get('/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).populate('user');
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
