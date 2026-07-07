const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { auth } = require('../middleware/auth');

// Create Razorpay order
router.post('/create-order', auth, async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Here you would integrate with Razorpay API
    // For now, we'll send a mock response
    res.json({
      razorpayOrderId: 'order_' + Date.now(),
      amount: order.total * 100,
      currency: 'INR'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify payment
router.post('/verify-payment', auth, async (req, res) => {
  try {
    const { orderId, razorpayPaymentId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.razorpayPaymentId = razorpayPaymentId;
    order.paymentStatus = 'completed';
    await order.save();

    res.json({ message: 'Payment verified', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
