const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");
const upload = require("../middleware/upload");

router.get("/",controller.index);
router.get("/:id",controller.getID);
router.post("/",upload.array("images", 5) ,controller.create);
router.patch("/:id",upload.array("images", 5),controller.patch);
router.delete("/:id",controller.delete);

module.exports = router;