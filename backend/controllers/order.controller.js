const { paypalClient } = require('../config/paypal');
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
const Order = require("../models/order.models");
const Cart = require("../models/cart.models");
const Queue = require('bull'); //Queue
const Product = require("../models/product.model");

const paymentQueue = new Queue('paymentQueue', {
  redis: { 
    host: 'localhost',
    port: 6379
  }
});

module.exports.index = async (req, res) => {
    console.log("OK");  
    res.send("Order!");  
};
// module.exports.post = async (req, res) => {
//     const cartId = req.cartId; 
//     console.log(cartId);
//     try {
//         const { customerName, purchase_units,items,paymentMethod } = req.body;
//         console.log("-----------------------------------------");
//         console.log(items, customerName, purchase_units,paymentMethod);
//         // Tạo đơn hàng trong PayPal
//         const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
//         request.prefer("return=representation");
//         request.requestBody({
//           intent: 'CAPTURE',
//           purchase_units: purchase_units,
//           application_context: {
//             brand_name: 'Your Store Name',
//             landing_page: 'BILLING',
//             user_action: 'PAY_NOW',
//             return_url: 'http://localhost:3000/success',
//             cancel_url: 'http://localhost:3000/cancel'
//           }
//         });
    
//         const paypalOrder = await paypalClient.execute(request);
    
//         // Lưu thông tin đơn hàng vào database
//         const newOrder = new Order({
//           paypalOrderId: paypalOrder.result.id,
//           customerName,
//           items,
//           totalAmount: purchase_units[0].amount.value,
//           status: 'CREATED'
//         });
        
//         console.log("++++++++++++++++++++++++++++++++++");
//         console.log(newOrder);
//         await newOrder.save();
//         if(paymentMethod === "cod"){
//           await Cart.findOneAndUpdate(
//             { cartId: cartId },
//             { items: [], totalPrice: 0 }
//             )
//         }
//         res.json({
//           orderID: paypalOrder.result.id
//         });
//     } catch (error) {
//         console.error('Error creating order:', error);
//         res.status(500).json({ error: 'Failed to create order' });
//     }
// };
module.exports.post = async (req, res) => {
    const cartId = req.cartId; 
    const { customerName, purchase_units,items,paymentMethod } = req.body;

    // kiểm tra hàng tồn kho
    const allProductIds = items.map(item => item.id);
    console.log("--------------------------------------------------");
    const products = await Product.find({ _id: { $in: allProductIds } });

    const outOfStockItems = items.filter(item => {
      const product = products.find(p => p._id.toString() === item.id);
      return !product || product.stock < item.quantity;
    });

    // console.log(outOfStockItems);
    if (outOfStockItems.length > 0) {
      return res.status(400).json({
          error: 'Một số sản phẩm trong giỏ hàng đã hết hàng',
          outOfStockItems
      });
    }

    //add to queue
    const job = await paymentQueue.add({
      customerName,
      purchase_units,
      items,
      cartId,
      allProductIds,
      paymentMethod
    });
    res.json({ message: 'Đơn hàng đã được thêm vào hàng đợi', jobId: job.id });
};
paymentQueue.process(async (job, done) => {
  console.log("OKKKKKKKKKKKK")
  try {
      const { customerName, purchase_units, items, cartId, allProductIds,paymentMethod } = job.data;

      // Tạo đơn hàng PayPal
      const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
      request.prefer("return=representation");
      request.requestBody({
          intent: 'CAPTURE',
          purchase_units: purchase_units,
          application_context: {
              brand_name: 'Your Store Name',
              landing_page: 'BILLING',
              user_action: 'PAY_NOW',
              return_url: 'http://localhost:3000/success',
              cancel_url: 'http://localhost:3000/cancel'
          }
      });

      const paypalOrder = await paypalClient.execute(request);

      // Lưu thông tin đơn hàng vào database
      const newOrder = new Order({
          paypalOrderId: paypalOrder.result.id,
          customerName,
          items,
          totalAmount: purchase_units[0].amount.value,
          status: 'PENDING'
      });
      console.log(newOrder);
      await newOrder.save();

      if(paymentMethod === "cod"){
        await Cart.findOneAndUpdate(
          { cartId: cartId },
          { items: [], totalPrice: 0 }
          )
      }

      done(); 
  } catch (error) {
      console.error('Error processing payment:', error);
      done(new Error('Failed to process payment'));
  }
});
