const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  storeName: { type: String, required: true },
  storeDescription: String,
  storeImage: String,
  category: [String],
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  bankDetails: {
    accountHolder: String,
    accountNumber: String,
    bankName: String,
    ifscCode: String
  },
  documents: {
    businessLicense: String,
    gst: String,
    pan: String
  },
  operatingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'suspended'], default: 'pending' },
  rating: { type: Number, default: 0 },
  totalOrders: { type: Number, default: 0 },
  totalRevenue: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vendor', VendorSchema);
