"use client";
import Footer from "@/components/Footer/page"
import Header from "@/components/Header/page"
import { setCart } from "@/store/actions/cartActions";
import Image from "next/image"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { useRouter } from "next/navigation";
function Cart(){
    // const cart = useSelector((state:any) => state.cart);
    // console.log(cart);
    const dispatch = useDispatch();
    const cart = useSelector((state:any) => state.cartinfo.cart);
    console.log(cart);
    // useEffect(() => {
    //     const fetchCart = async () => {
    //         try {
    //             const res = await fetch("http://localhost:5000/api/cart", {credentials: "include"});
    //             const data = await res.json();
    //             // console.log(data);
    //             // dispatch({ type: "SET_CART", payload: data }); 
    //             dispatch(setCart(data)); 
    //         } catch (error) {
    //             console.error("Lỗi lấy giỏ hàng:", error);
    //         }
    //     };
    //     fetchCart();
    // }, [dispatch]); 

    const router = useRouter();
    const handleCheckout = () => {
        router.push("/checkout"); 
    };

    const updateQuantity = async (id:any, action:any) => {
        try {
            const res = await fetch(`http://localhost:5000/api/cart/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ action,id }),
            });
            const data = await res.json();
            console.log(data);
            dispatch({ type: "SET_CART", payload: data });
        } catch (error) {
            console.error(`Lỗi khi ${action === "increase" ? "tăng" : "giảm"} số lượng:`, error);
        }
    };

    const removeItemFromCart = async (productId: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/cart/${productId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });
    
            if (!response.ok) throw new Error("Failed to remove item");
            const data = await response.json();
            dispatch({ type: "SET_CART", payload: data });
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };
    // console.log(cart.items);
    return(
        <>
            <Header></Header>
            <div className="container">
                <div className="line line-top"></div>
                <div className="path">
                    <span>Home</span>
                    <img src="/img/right.svg" alt=""/>
                    <span>Home</span>
                    <img src="/img/right.svg" alt=""/>
                    <span>Home</span>
                    <img src="/img/right.svg" alt=""/>
                    <span>Home</span>
                </div>
                
                <div className="cart">
                    <h1 className="cart__title">YOUR CART</h1>
                    <div className="cart__content">
                        <div className="cart__list">
                            {cart.items?.length === 0 ? (
                                <p>Giỏ hàng trống</p>
                            ) : (
                                cart.items?.map((item:any,index:any) =>(
                                    <React.Fragment key={item.productId}>
                                        <div className="cart__item">
                                            <div className="cart__item--img">
                                                <Image src={`http://localhost:5000${item.image}`} width={124} height={124} alt="img"/>
                                            </div>
                                            <div className="cart__item--info">
                                                <div className="cart__item--title">
                                                    <span>{item.name}</span>
                                                    <Image onClick={() => removeItemFromCart(item.productId)} src="/img/delcartitem.svg" width={24} height={24} alt="img"/>
                                                </div>
                                                <div className="cart__item--price">
                                                    <span>${item.price * item.quantity}</span>
                                                    <div className="cart__item--update">
                                                        <button onClick={() => updateQuantity(item.productId, "decrease")}>
                                                            <Image src="/img/tru.svg" width={20} height={20} alt="img"/>
                                                        </button>
                                                        <span>{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.productId, "increase")}>
                                                            <Image src="/img/cong.svg" width={20} height={20} alt="img"/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {index < cart.items.length - 1 && <div className="line"></div>}
                                    </React.Fragment>
                                    
                                ))
                            )}
                        </div>
                        <div className="cart__checkout">
                            <h2 className="cart__checkout--title">Order Summary</h2>
                            <div className="cart__checkout--info">
                                <div className="cart__checkout--item">
                                    <span className="cart__checkout--item__title">Subtotal</span>
                                    <span className="cart__checkout--item__price">${cart.totalPrice}</span>
                                </div>
                                <div className="cart__checkout--item">
                                    <span className="cart__checkout--item__title">Discount (0%)</span>
                                    <span className="cart__checkout--item__price">$0</span>
                                </div>
                                <div className="cart__checkout--item">
                                    <span className="cart__checkout--item__title">Delivery Fee</span>
                                    <span className="cart__checkout--item__price">$0</span>
                                </div>
                                <div className="line"></div>
                                <div className="cart__checkout--total">
                                    <div className="cart__checkout--total__title">Total</div>
                                    <div className="cart__checkout--total__price">${cart.totalPrice}</div>
                                </div>
                            </div>
                            <div className="cart__checkout--voucher">
                                <div className="cart__checkout--voucher__input">
                                    <Image src="/img/voucher.svg" width={24} height={24} alt="img" />
                                    <input type="text" placeholder="Add promo code"/>
                                </div>
                                <button>Apply</button>
                            </div>
                            <button className="cart__checkout--button" onClick={handleCheckout}>Go to Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}
export default Cart