const Product = require("../models/product.model");
const Category = require("../models/category.models");
const fs = require("fs");
const path = require("path");

const getAllChildCategories = async (parentId) => {
    let childCategories = await Category.find({ parent_id: parentId });

    let allChildIds = childCategories.map(cat => cat._id.toString()); // Lấy danh sách _id của danh mục con

    // Duyệt từng danh mục con, tiếp tục tìm danh mục con của nó (đệ quy)
    for (const child of childCategories) {
        const nestedChildIds = await getAllChildCategories(child._id);
        allChildIds = allChildIds.concat(nestedChildIds); // Gộp danh mục con của con vào danh sách
    }

    return allChildIds;
};
module.exports.index = async (req, res) => {
    // try {
    //     let categories = await Category.find();
    //     categories = categories.map(cat => ({
    //         ...cat._doc,
    //         parent_id: cat.parent_id === "null" ? null : cat.parent_id
    //     }));

    //     res.status(200).json(categories);
    // } catch (error) {
    //     console.error("Lỗi khi lấy danh mục:", error);
    //     res.status(500).json({ message: "Lỗi server!" });
    // }
    try {
        let { page = 1, limit = 10 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        const totalCount = await Category.countDocuments();
        const totalPages = Math.ceil(totalCount / limit);
        const skip = (page - 1) * limit;

        let categories = await Category.find().limit(limit).skip(skip);
        categories = categories.map(cat => ({
            ...cat._doc,
            parent_id: cat.parent_id === "null" ? null : cat.parent_id
        }));

        res.status(200).json({
            data: categories,
            totalPages
        });
    } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
        res.status(500).json({ message: "Lỗi server!" });
    }
};
module.exports.create = async (req, res) =>{
    try {
        const { title, desc, parent_id, status } = req.body;
        const thumbnail = req.file ? req.file.path : null;

        let errors = {};
        

        if (!title) {
            return res.status(400).json({ message: "Tên danh mục là bắt buộc!" });
        }
        // kiểm tra trùng lặp
        const existingCategory = await Category.findOne({ title });
        if (existingCategory) errors.title = "Tên danh mục đã tồn tại";

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
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
        // Kiểm tra trùng lặp
        let errors = {};
        const existingCategory = await Category.findOne({ title, _id: { $ne: id } });
        if (existingCategory) errors.title = "Tên danh mục đã tồn tại";

        // Nếu có lỗi, trả về lỗi để frontend lưu vào biến
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });    
        }
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
    // try {
    //     const category = await Category.findById(req.params.id);
    //     if (!category) {
    //         return res.status(404).json({ message: "Không tìm thấy danh mục" });
    //     }
    //     category.status = "inactive";
    //     await category.save();

    //     res.json({ message: "Danh mục đã được chuyển sang trạng thái không hoạt động" });
    // } catch (error) {
    //     res.status(500).json({ message: "Lỗi khi cập nhật trạng thái danh mục" });
    // }
    try {
        const categoryId = req.params.id;

        // Kiểm tra danh mục có tồn tại không
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Danh mục không tồn tại" });
        }

        // Lấy tất cả danh mục con
        const childCategoryIds = await getAllChildCategories(categoryId);
        const allCategoryIds = [categoryId, ...childCategoryIds];

        // Cập nhật trạng thái của danh mục và danh mục con
        await Category.updateMany(
            { _id: { $in: allCategoryIds } },
            { status: "inactive", deleted: true }
        );

        // Cập nhật trạng thái sản phẩm liên quan
        await Product.updateMany(
            { category_id: { $in: allCategoryIds } },
            { status: "inactive" }
        );

        return res.json({
            message: "Danh mục và các sản phẩm liên quan đã bị vô hiệu hóa",
            updatedCategories: allCategoryIds,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
}