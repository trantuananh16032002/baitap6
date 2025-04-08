const express = require("express");
const router = express.Router();
const controller = require("../controllers/variant.controller");
const upload = require("../middleware/upload");

router.get("/",controller.index);
router.get("/:slug",controller.getbyID);
router.patch("/:slug",upload.array("images", 5),controller.patch);
router.post("/",upload.array("images", 5) ,controller.create);

module.exports = router;