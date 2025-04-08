const Account = require("../models/account.models");
const bcrypt = require("bcryptjs");
module.exports.index = async (req, res) => {
    try {
        const accounts = await Account.find().select("-password"); 
        res.status(200).json({ message: "Danh sách tài khoản", data: accounts });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách tài khoản", error: error.message });
    }
};
module.exports.create = async (req, res) => {
    const avatar = req.files;
    console.log(avatar);
    // try {
    //     const { username, password, role } = req.body;
    //     const avatar = req.file ? `/uploads/${req.file.filename}` : null;

    //     if (!username || !password || !role) {
    //         return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
    //     }
    //     const existingAccount = await Account.findOne({ username });
    //     if (existingAccount) {
    //         return res.status(400).json({ message: "Username đã tồn tại!" });
    //     }
    //     const hashedPassword = await bcrypt.hash(password, 10);
    //     const newAccount = new Account({ 
    //         username, 
    //         password: hashedPassword, 
    //         role, 
    //         avatar 
    //     });

    //     await newAccount.save();
    //     res.status(201).json({ message: "Tạo tài khoản thành công!", data: newAccount });
    // } catch (error) {
    //     res.status(500).json({ message: "Lỗi khi tạo tài khoản", error: error.message });
    // }
};
