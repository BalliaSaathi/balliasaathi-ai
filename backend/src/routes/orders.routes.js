const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { auth, riderOnly } = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');

// Create order
router.post('/', auth, async (req, res) => {
  try {
    const { items, deliveryAddress, paymentMethod } = req.body;

    let subtotal = 0;
    items.forEach(item => {
      subtotal += item.total;
    });

    const deliveryFee = 50;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + deliveryFee + tax;

    const order = new Order({
      orderId: 'BS' + uuidv4().slice(0, 8).toUpperCase(),
      customer: req.userId,
      items,
      deliveryAddress,
      paymentMethod,
      subtotal,
      deliveryFee,
      tax,
      total
    });

    await order.save();
    req.io.emit('new-order', order);

    res.status(201).json({ message: 'Order created', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get orders for customer
router.get('/customer/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.userId })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get orders for vendor
router.get('/vendor/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ vendor: req.userId })
      .populate('customer')
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Accept order as vendor
router.patch('/:id/accept', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.vendor = req.userId;
    order.status = 'confirmed';
    await order.save();

    req.io.emit('order-accepted', order);
    res.json({ message: 'Order accepted', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Accept order as rider
router.patch('/:id/accept-rider', auth, riderOnly, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.rider = req.userId;
    order.status = 'on_way';
    await order.save();

    req.io.emit('rider-assigned', order);
    res.json({ message: 'Order accepted for delivery', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    if (status === 'delivered') {
      order.actualDelivery = new Date();
    }
    await order.save();

    req.io.emit('order-status-updated', order);
    res.json({ message: 'Status updated', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single order
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer')
      .populate('vendor')
      .populate('rider')
      .populate('items.product');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
