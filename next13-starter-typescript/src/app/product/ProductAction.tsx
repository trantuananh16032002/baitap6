"use client";
import { setCart } from "@/store/actions/cartActions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProductAction({ product }: { product: any }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState<any>(1);
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  // const productID = product._id;

  // console.log(productID);

  // const handleAddToCart = async () => {
  //   await fetch("http://localhost:5000/api/cart", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     credentials: "include",
  //     body: JSON.stringify({product , quantity }),
  //   //   body: JSON.stringify({ userId, product: product, quantity }),
  //   });
  //   // dispatch({
  //   //   type: "ADD_TO_CART",
  //   //   payload: { ...product, quantity },
  //   // });
  // };
  const handleAddToCart = async () => {
    try {
        const res = await fetch("http://localhost:5000/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ product, quantity }),
        });

        if (!res.ok) throw new Error("Lỗi khi thêm sản phẩm vào giỏ hàng");

        const updatedCart = await res.json();
        console.log("Giỏ hàng sau khi cập nhật:", updatedCart);

        // Cập nhật Redux store để Header tự động cập nhật
        dispatch(setCart(updatedCart)); 

    } catch (error) {
        console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
};

  return (
    <div className="detailProduct__info--action">
      <div className="detailProduct__info--action__number">
        <button onClick={decreaseQuantity}>
          <img src="/img/tru.svg" alt="-" />
        </button>
        <span>{quantity}</span>
        <button onClick={increaseQuantity}>
          <img src="/img/cong.svg" alt="+" />
        </button>
      </div>
      <button className="detailProduct__info--action__add" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}
