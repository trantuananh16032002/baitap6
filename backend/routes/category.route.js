const express = require("express");
const router = express.Router();
const controller = require("../controllers/category.controller");
const upload = require("../middleware/upload");

router.get("/", controller.index);
router.post("/",upload.single("thumbnail"), controller.create);

module.exports = router;