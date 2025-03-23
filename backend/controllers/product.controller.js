const Product = require("../models/product.model");
const Category = require("../models/category.models");

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
module.exports.index = async (req, res) =>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    // price
    const minPrice = parseInt(req.query.minPrice) || 0;
    const maxPrice = parseInt(req.query.maxPrice) || 1000000;
    // category_id
    const category_id = req.query.category_id;
    //sort
    const sortOrder = req.query.sortOrder;
    const sortOption = sortOrder === "asc" ? { price: 1 } : { price: -1 };
    // search
    const search = req.query.search || "";
    console.log(search);
    
    let categoryIds = [];
    if (category_id) {
        const childCategoryIds = await getAllChildCategories(category_id);
        categoryIds = [category_id, ...childCategoryIds];
    }
    
    const filter = {
        price: { $gte: minPrice, $lte: maxPrice }
    };
    if (search) {
        filter.title = { $regex: String(search), $options: "i" };
    }
    if(category_id) {
        filter.category_id = { $in: categoryIds }; 
    }

    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await Product.find(filter).skip(skip).limit(limit).sort(sortOption);

    res.json({
        products,
        totalPages
    });
}
module.exports.create = async (req, res) =>{
    try {
        const { title, desc, price, stock, category_id, status } = req.body;
        const maxSize = 512000;
        // console.log(category_id);
        let errors = {};
        // console.log(title);
        // Kiểm tra rỗng
        if (!title) errors.title = "Tên sản phẩm không được để trống";
        if (!desc) errors.desc = "Mô tả không được để trống";
        if (!price || isNaN(price)) errors.price = "Giá phải là số";
        if (!stock || isNaN(stock) || stock < 0) errors.stock = "Số lượng phải là số không âm";
        if (!category_id) errors.category_id = "Danh mục không được để trống";

        // Kiểm tra trùng lặp
        const existingProduct = await Product.findOne({ title });
        if (existingProduct) errors.title = "Tên sản phẩm đã tồn tại";
        // Kiểm tra file
        if (!req.files || req.files.length === 0) {
            errors.images = "Phải tải lên ít nhất một ảnh";
        } else {
            // Kiểm tra kích thước từng file
            req.files.forEach((file) => {
                if (file.size > maxSize) {
                    errors.images = "Ảnh không được vượt quá 500KB!";
                }
            });
        }
        // Nếu có lỗi, trả về lỗi để frontend lưu vào biến
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }
        const images = req.files.map(file => `/uploads/${file.filename}`);
        const newProduct = new Product({
            title,
            desc,
            price,
            stock,
            category_id,
            status,
            images,
        });

        await newProduct.save();
        res.status(201).json({ message: "Sản phẩm đã được thêm thành công!", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi thêm sản phẩm", error: error.message });
    }
}
module.exports.getID = async (req, res) =>{
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate("category_id");

        if (!product) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        }

        res.json(product);
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
}
module.exports.patch = async (req, res) => {
    try {
        let errors = {};
        const { id } = req.params;
        const { title, desc, price, stock, category_id, status,existingImages } = req.body;
        // console.log("Dữ liệu body:", req.body);
        // console.log("File upload:", req.files);

        // Kiểm tra trùng lặp
        const existingProduct = await Product.findOne({ title, _id: { $ne: id } });
        if (existingProduct) errors.title = "Tên sản phẩm đã tồn tại";

        // Nếu có lỗi, trả về lỗi để frontend lưu vào biến
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });    
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        }

        const existingImagesArray = existingImages ? JSON.parse(existingImages) : [];

        
        let images = [...existingImagesArray];

      
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map(file => `/uploads/${file.filename}`);
            images = [...images, ...newImages]; 
        }

        console.log("Danh sách ảnh sau cập nhật:", images);
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { $set: { title, desc, price, stock, category_id, status, images } },
            { new: true }
        );

        return res.status(200).json({ message: "Cập nhật sản phẩm thành công!", product: updatedProduct });
    } catch (error) {
        console.error("Lỗi khi cập nhật sản phẩm:", error);
        res.status(500).json({ message: "Lỗi máy chủ" });
    }
};
module.exports.delete = async (req, res) =>{
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        
        if (!product) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại!" });
        }

        res.json({ message: "Xóa sản phẩm thành công!" });
    } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        res.status(500).json({ message: "Lỗi máy chủ" });
    }
}
