const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
  },
  color: {
    type: String,
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  price: {
    type: Number,
    required: true
  },
  slug: {
    type: String,
    unique: true
  },
  images: [
    {
      type: String
    }
  ],
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Variant", variantSchema);
