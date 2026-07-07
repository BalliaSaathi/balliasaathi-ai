const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true, required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    price: Number,
    total: Number
  }],
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    latitude: Number,
    longitude: Number,
    phone: String,
    name: String
  },
  subtotal: { type: Number, required: true },
  deliveryFee: { type: Number, default: 50 },
  discount: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['card', 'upi', 'cod', 'wallet'], default: 'cod' },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'on_way', 'delivered', 'cancelled'], 
    default: 'pending' 
  },
  riderLocation: {
    latitude: Number,
    longitude: Number,
    timestamp: Date
  },
  estimatedDelivery: Date,
  actualDelivery: Date,
  notes: String,
  cancelReason: String,
  rating: { type: Number, min: 1, max: 5 },
  review: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
