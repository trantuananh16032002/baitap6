module.exports.index = (req, res) => {
    console.log("OK");  // Log để kiểm tra route có hoạt động không
    res.send("Home Page!");  // Trả phản hồi về trình duyệt
};
