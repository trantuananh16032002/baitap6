const { paypalClient } = require('../config/paypal');
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
const Order = require("../models/order.models");
const Cart = require("../models/cart.models");
module.exports.index = async (req, res) => {
    try {
        const { paymentId, PayerID } = req.query;
        const cartId = req.cartId; 
        const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(paymentId);
        const capture = await paypalClient.execute(request);
        
        // Cập nhật trạng thái đơn hàng trong database
        // await Order.findOneAndUpdate(
        //   { paypalOrderId: paymentId },
        //   { 
        //     status: 'COMPLETED',
        //     payerId: PayerID,
        //     updatedAt: Date.now()
        //   }
        // );
        const updatedOrder = await Order.findOneAndUpdate(
            { paypalOrderId: paymentId },
            { 
                status: 'COMPLETED',
                payerId: PayerID,
                updatedAt: Date.now()
            },
            { new: true } 
        );
        
        await Cart.findOneAndUpdate(
        { cartId: cartId },
        { items: [], totalPrice: 0 }
        )
        res.json({ success: true, order:updatedOrder });
      } catch (error) {
        console.error('Error capturing order:', error);
        res.status(500).json({ error: 'Failed to capture payment' });
      }
};