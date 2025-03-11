const Category = require("../models/category.models");

module.exports.index = async (req, res) =>{
    try {
        const categories = await Category.find(); 
        res.status(200).json(categories);
    } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
        res.status(500).json({ message: "Lỗi server!" });
    }
}
module.exports.create = async (req, res) =>{
    try {
        const { title, desc, parent_id, status } = req.body;
        const thumbnail = req.file ? req.file.path : null;

        if (!title) {
            return res.status(400).json({ message: "Tên danh mục là bắt buộc!" });
        }

        const newCategory = await Category.create({
            title,
            desc,
            parent_id: parent_id || null,
            thumbnail,
            status
        });

        res.status(201).json({ message: "Thêm danh mục thành công!", category: newCategory });
    } catch (error) {
        console.error("Lỗi khi thêm danh mục:", error);
        res.status(500).json({ message: "Lỗi server!" });
    }
}