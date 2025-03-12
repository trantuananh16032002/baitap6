const express = require("express");
const router = express.Router();
const controller = require("../controllers/category.controller");
const upload = require("../middleware/upload");

router.get("/", controller.index);
router.get("/:id", controller.getById);
router.post("/",upload.single("thumbnail"), controller.create);
router.patch("/:id",upload.single("thumbnail"), controller.patch);
router.delete("/:id", controller.delete);

module.exports = router;