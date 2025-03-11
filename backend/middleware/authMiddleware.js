const Account = require("../models/account.models");

module.exports = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Bạn chưa đăng nhập!" });
    }
    try {
        const user = await Account.findOne({ token });
        if (!user) {
            return res.status(403).json({ message: "Token không hợp lệ!" });
        }
        req.user = user; 
        next();
    } catch (error) {
        return res.status(500).json({ message: "Lỗi xác thực", error: error.message });
    }
};
