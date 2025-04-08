const homeRoutes = require("./home.route");
const productRoutes = require("./product.route");
const accountRoutes = require("./account.route");
const authRoutes = require("./auth.route");
const categoryRoutes = require("./category.route");
const cartRoutes = require("./cart.route");
const orderRoutes = require("./order.route");
const paymentRoutes = require("./payment.route");
const variantRoutes = require("./variant.route");
module.exports = (app) =>{

    app.use("/api/auth", authRoutes);
    app.use("/api", homeRoutes);
    app.use("/api/products", productRoutes);
    app.use("/api/accounts", accountRoutes);
    app.use("/api/category", categoryRoutes);
    app.use("/api/cart", cartRoutes);
    app.use("/api/order", orderRoutes);
    app.use("/api/execute-payment", paymentRoutes);
    app.use("/api/variants", variantRoutes);

}