const Category = require("../models/category.models");
const fs = require("fs");
const path = require("path");

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
module.exports.getById = async (req, res) =>{
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: "Không tìm thấy danh mục!" });
        }

        res.status(200).json(category);
    } catch (error) {
        console.error("Lỗi khi lấy danh mục theo ID:", error);
        res.status(500).json({ message: "Lỗi server!" });
    }
}
module.exports.patch = async (req, res) =>{
    try {
        const { id } = req.params;
        const { title, desc, parent_id, status } = req.body;
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: "Danh mục không tồn tại" });
        }

        console.log("File nhận được:", req.file);

        let updatedData = { title, desc, parent_id, status };

        if (req.file) {
            const oldImagePath = category.thumbnail; 

            // Kiểm tra xem có ảnh cũ không trước khi xóa
            if (oldImagePath && oldImagePath.startsWith("/uploads/")) {
                const fullPath = path.join(__dirname, "..", oldImagePath);
                if (fs.existsSync(fullPath)) {
                    fs.unlink(fullPath, (err) => {
                        if (err) {
                            console.error("Lỗi khi xóa ảnh cũ:", err);
                        } else {
                            console.log("Ảnh cũ đã được xóa:", oldImagePath);
                        }
                    });
                }
            }

            updatedData.thumbnail = req.file.path;
        }

        console.log("Ảnh mới:", updatedData.thumbnail);

        const updatedCategory = await Category.findByIdAndUpdate(id, updatedData, { new: true });

        res.status(200).json({
            message: "Cập nhật danh mục thành công!",
            category: updatedCategory,
        });
    } catch (error) {
        console.error("Lỗi khi cập nhật danh mục:", error);
        res.status(500).json({ message: "Có lỗi xảy ra khi cập nhật danh mục" });
    }
}
module.exports.delete = async (req, res) =>{
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Không tìm thấy danh mục" });
        }
        category.status = "inactive";
        await category.save();

        res.json({ message: "Danh mục đã được chuyển sang trạng thái không hoạt động" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi cập nhật trạng thái danh mục" });
    }
}