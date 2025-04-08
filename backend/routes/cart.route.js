const express = require("express");
const router = express.Router();

const cartMiddleWare = require("../middleware/cartMiddleware");
const controller = require("../controllers/cart.controller");
router.post("/", cartMiddleWare,controller.create);
router.get("/",cartMiddleWare, controller.index);
router.patch("/:id",cartMiddleWare, controller.update);
router.delete("/:id",cartMiddleWare, controller.delete);
module.exports = router;