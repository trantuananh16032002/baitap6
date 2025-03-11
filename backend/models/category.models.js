const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, unique: true },
    desc: { type: String, default: "" },
    parent_id: { type: String, default: null }, 
    thumbnail: { type: String, default: "" }, 
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
