const Account = require("../models/account.models");
const bcrypt = require("bcryptjs");
module.exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
        }
        const user = await Account.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Tài khoản không tồn tại!" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Mật khẩu không chính xác!" });
        }else{
        }
        res.cookie("token", user.token, {
            httpOnly: true, 
            secure: false, 
            sameSite: "strict" 
        });

        res.json({ message: "Đăng nhập thành công!", data: { username: user.username, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: "Lỗi đăng nhập", error: error.message });
    }
};
module.exports.profile = async (req, res) =>{
    // console.log(req.user.id);
    res.json({
        username: req.user.username,
        role: req.user.role,
        avatar: req.user.avatar
    })
}
