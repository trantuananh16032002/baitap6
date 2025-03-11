const homeRoutes = require("./home.route");
const productRoutes = require("./product.route");
const accountRoutes = require("./account.route");
const authRoutes = require("./auth.route");
const categoryRoutes = require("./category.route");
module.exports = (app) =>{

    app.use("/api/auth", authRoutes);
    app.use("/api", homeRoutes);
    app.use("/api/products", productRoutes);
    app.use("/api/accounts", accountRoutes)
    app.use("/api/category", categoryRoutes)

}