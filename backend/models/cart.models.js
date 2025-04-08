const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  cartId: { type: String, required: true, unique: true },
  items: [
    {
      productId: { type: String, required: true }, 
      name: { type: String, required: true }, 
      price: { type: Number, required: true }, 
      image: { type: String }, 
      quantity: { type: Number, required: true, default: 1 }, 
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;

