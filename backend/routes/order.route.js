const express = require("express");
const router = express.Router();
const controller = require("../controllers/order.controller");
const cartMiddleWare = require("../middleware/cartMiddleware");

router.get("/",cartMiddleWare,controller.index);
router.post("/",cartMiddleWare,controller.post);
module.exports = router;