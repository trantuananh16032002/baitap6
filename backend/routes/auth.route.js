const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/login", controller.login);
router.get("/profile",authMiddleware, controller.profile);
module.exports = router;