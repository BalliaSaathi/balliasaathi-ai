const mongoose = require('mongoose');

const RiderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  phone: { type: String, required: true },
  vehicleType: { type: String, enum: ['bike', 'car', 'cycle', 'scooter'], default: 'bike' },
  vehicleNumber: String,
  license: String,
  licenseExpiry: Date,
  documents: {
    aadhar: String,
    pan: String,
    bankDetails: {
      accountHolder: String,
      accountNumber: String,
      bankName: String,
      ifscCode: String
    }
  },
  currentLocation: {
    latitude: Number,
    longitude: Number,
    lastUpdated: Date
  },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'active', 'inactive'], default: 'pending' },
  isOnline: { type: Boolean, default: false },
  isAvailable: { type: Boolean, default: false },
  currentOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  completedOrders: { type: Number, default: 0 },
  totalEarnings: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  documents: {
    aadhar: String,
    license: String
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rider', RiderSchema);
