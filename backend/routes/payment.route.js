const express = require("express");
const router = express.Router();
const cartMiddleWare = require("../middleware/cartMiddleware");
const controller = require("../controllers/payment.controller");

router.get("/",cartMiddleWare,controller.index);

module.exports = router;