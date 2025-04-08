const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const OrderSchema = new mongoose.Schema({
  paypalOrderId: {
    type: String,
    // required: true,
    sparse: true,
    unique: true
  },
  customerName: {
    type: String,
    required: true
  },
  items: [OrderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['CREATED', 'COMPLETED', 'CANCELLED', 'REFUNDED'],
    default: 'CREATED'
  },
  payerId: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderSchema);
