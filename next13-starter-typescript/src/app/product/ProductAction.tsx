"use client";
import { useState } from "react";

export default function ProductAction({ product }: { product: any }) {
  const [quantity, setQuantity] = useState<any>(1);
  const [cart, setCart] = useState<any[]>([]);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  const addToCart = () => {
    setCart([...cart, { ...product, quantity }]);
  };
//   console.log(cart);
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
      <button className="detailProduct__info--action__add" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}
