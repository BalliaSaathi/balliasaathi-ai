const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { auth, vendorOnly } = require('../middleware/auth');

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 20 } = req.query;
    let query = { isActive: true };

    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };

    const products = await Product.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('vendor', 'name storeName');

    const total = await Product.countDocuments(query);

    res.json({
      products,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('vendor');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create product (vendor only)
router.post('/', auth, vendorOnly, async (req, res) => {
  try {
    const { name, description, category, price, stock, image, unit } = req.body;

    const product = new Product({
      name,
      description,
      category,
      price,
      stock,
      image,
      unit,
      vendor: req.userId
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update product (vendor only)
router.put('/:id', auth, vendorOnly, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.vendor.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(product, req.body);
    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete product (vendor only)
router.delete('/:id', auth, vendorOnly, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.vendor.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    product.isActive = false;
    await product.save();

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
