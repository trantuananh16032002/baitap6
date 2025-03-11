const Product = require("../models/product.model");

module.exports.index = async (req, res) =>{
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách sản phẩm", error: error.message });
    }
}
module.exports.create = async (req, res) =>{
    try {
        const { title, desc, price, stock, category_id, status } = req.body;
        const images = req.files.map(file => `/uploads/${file.filename}`);
        console.log(category_id);
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
    console.log("patch");
    try {
        const { id } = req.params;
        const { title, desc, price, stock, category_id, status,existingImages } = req.body;
        console.log("Dữ liệu body:", req.body);
        console.log("File upload:", req.files);

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
