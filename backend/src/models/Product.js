const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  subCategory: String,
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image: { type: String, required: true },
  images: [String],
  unit: { type: String, enum: ['kg', 'liter', 'piece', 'gram', 'dozen'], default: 'kg' },
  quantity: { type: Number, default: 1 },
  stock: { type: Number, required: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviews: [{
    userId: mongoose.Schema.Types.ObjectId,
    rating: Number,
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);
