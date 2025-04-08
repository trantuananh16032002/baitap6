const Variant = require("../models/variant,models");
const slugify = require('slugify');

module.exports.index = async (req, res) =>{
    try {
        const variants = await Variant.find().populate("product_id", "title"); 
        res.status(200).json({ success: true, variants });
      } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi khi lấy variants", error });
      }
}
module.exports.getbyID = async (req, res) =>{
  try {
    const variant = await Variant.findOne({ slug: req.params.slug }).populate("product_id", "title");
    if (!variant) {
        return res.status(404).json({ message: "Variant not found" });
    }
    res.json(variant);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}
module.exports.create = async (req, res) => {
    const {product_id, sku, title, color, stock, price} = req.body;
    const slug = slugify(title, { lower: true });
    console.log(slug);
    const images = req.files.map(file => `/${file.path}`)
    const newVariant = new Variant({
        product_id,
        sku,
        title,
        color,
        stock,
        slug,
        price,
        images
    })
    await newVariant.save(),
    res.status(201).json({ message: "Variant created", data: newVariant });
};
module.exports.patch = async (req, res) =>{
  // console.log(req.body);
  const { slug } = req.params;
  const { product_id, title, sku, color, stock, price, existingImages } = req.body;
  const variant = await Variant.findOne({ slug });
  if (!variant) {
      return res.status(404).json({ error: "Không tìm thấy variant." });
  }
  variant.product_id = product_id || variant.product_id;
  variant.title = title || variant.title;
  variant.sku = sku || variant.sku;
  variant.color = color || variant.color;
  variant.stock = stock || variant.stock;
  variant.price = price || variant.price;
  
  // Xử lý ảnh cũ và ảnh mới
  const newImages = req.files; // Đây là ảnh mới upload từ Multer
  const updatedImages = [...JSON.parse(existingImages || "[]"), ...newImages.map(file => `/${file.path}`)];

  variant.images = updatedImages;
  await variant.save();
  return res.status(200).json({
    message: "Cập nhật variant thành công.",
    variant,
  });
} 