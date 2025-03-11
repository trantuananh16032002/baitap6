const mongoose = require("mongoose");
const crypto = require("crypto");

const accountSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "content_manager"], required: true },
    avatar: { type: String },
    token: { type: String, default: () => crypto.randomBytes(32).toString("hex") }
}, { timestamps: true });

const Account = mongoose.model("Account", accountSchema);
module.exports = Account;
