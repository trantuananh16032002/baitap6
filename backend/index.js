require("dotenv").config();
// start
const express = require("express");
const cookieParser = require("cookie-parser");
const router = require("./routes/index.route");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const cors = require('cors');

const port = process.env.PORT || 5000;
const database = require("./config/database");
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(cors({
  origin: "http://45.32.116.67/", 
  credentials: true, 
}));
database.connect();
router(app);
// Chạy server
app.listen(port,"0.0.0.0", () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
