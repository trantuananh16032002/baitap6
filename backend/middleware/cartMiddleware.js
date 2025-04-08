const { v4: uuidv4 } = require("uuid");

const checkCartId = (req, res, next) => {
  if (!req.cookies.cartId) {
    const cartId = uuidv4();
    req.cartId = cartId;
    res.cookie("cartId", cartId, {
      httpOnly: true, 
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "None",
      secure: true
    });
  } else {
    req.cartId = req.cookies.cartId;
  }
  next();
};

module.exports = checkCartId;
