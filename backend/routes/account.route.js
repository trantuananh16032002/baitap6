const express = require("express");
const router = express.Router();
const controller = require("../controllers/account.controller");
const upload = require("../middleware/upload");

router.get("/", controller.index);
router.post("/",upload.array("image"), controller.create);

module.exports = router;