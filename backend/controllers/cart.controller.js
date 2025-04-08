const Cart = require("../models/cart.models");

module.exports.create = async (req, res) => {
    const {product, quantity} = req.body;
    const productId = product._id;
    const name = product.title;
    const price = product.price;
    const image = product.images[0];
    
    const cartId = req.cartId;  
    let cart = await Cart.findOne({ cartId });
    if(!cart){
        cart = new Cart({ cartId, items: [] });
    }
    const existingItem = cart.items.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({ productId, name, price, image, quantity });
    }
    await cart.save();
    const totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);

    res.status(200).json({ ...cart.toObject(), totalPrice, totalItems });
};
module.exports.index = async (req, res) => {
    const cart = await Cart.findOne({ cartId: req.cartId });
    if (!cart) {
        return res.status(200).json({ cartId: req.cartId, items: [], totalPrice: 0 });
    }
    // const totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
    // res.status(200).json({ ...cart.toObject(), totalPrice });
    const totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);

    res.status(200).json({ ...cart.toObject(), totalPrice, totalItems });
}
module.exports.update = async (req, res) =>{
    const { action ,id } = req.body;
    // console.log(action, id);
    const cartId = req.cartId; 
    console.log(cartId);
    const cart = await Cart.findOne({ cartId });
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === id);
    if(itemIndex !== -1 ){
        if(action === "increase"){
            cart.items[itemIndex].quantity += 1;
        }else if(action === "decrease"){
            if (cart.items[itemIndex].quantity > 1) {
                cart.items[itemIndex].quantity -= 1;
            }
        }
        // const totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

        await cart.save();
        // return res.json({ ...cart.toObject(), totalPrice });
    }
    const totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);

    return res.json({ ...cart.toObject(), totalPrice, totalItems });
}
module.exports.delete = async (req, res) =>{
    const productId = req.params.id; 
    const cartId = req.cartId; 
    const cart = await Cart.findOne({ cartId });
    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    }
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    // const totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

    await cart.save();

    // return res.status(200).json({ ...cart.toObject(), totalPrice });
    const totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);

    return res.status(200).json({ ...cart.toObject(), totalPrice, totalItems });
}
