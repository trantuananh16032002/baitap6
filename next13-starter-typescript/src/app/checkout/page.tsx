"use client";
import { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Link from "next/link";

function Checkout(){
    const [cart, setCart] = useState<{ items: any[]; totalPrice: number }>({ items: [], totalPrice: 0 });
    const [customerName, setCustomerName] = useState("");
    const [orderCompleted, setOrderCompleted] = useState(false);
    const [customerAddress, setCustomerAddress] = useState("");

    const [paymentMethod, setPaymentMethod] = useState("cod");

    // Gọi API để lấy thông tin giỏ hàng
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/cart", { credentials: "include" });
                const data = await res.json();
                setCart(data);
            } catch (error) {
                console.error("Lỗi lấy giỏ hàng:", error);
            }
        };
        fetchCart();
    }, [orderCompleted]);

    // console.log(cart);
    const handleClickCheckout = async () =>{
        if (!customerName) {
            alert("Vui lòng nhập tên khách hàng");
            throw new Error("Tên khách hàng là bắt buộc");
        }
        const res = await fetch("http://localhost:5000/api/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                customerName: customerName,
                items: cart.items.map(item => ({
                    id:item.productId,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
                paymentMethod: paymentMethod,
                purchase_units: [
                    {
                        amount: {
                            currency_code: "USD",
                            value: cart.totalPrice.toString(),
                        },
                    },
                ],
            }),
        });

        const data = await res.json();
        setOrderCompleted(true);
        return data.orderID;
    }
    return(
        <>
            {/* <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Checkout</h1>
                
                {orderCompleted ? (
                    <div className="bg-green-100 p-4 rounded">
                        <h2 className="text-xl font-semibold">Thanh toán thành công!</h2>
                        <p>Cảm ơn bạn đã mua hàng.</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-4">
                            <label className="block mb-2">
                                Nhập tên khách hàng:
                                <input 
                                    type="text" 
                                    value={customerName} 
                                    onChange={(e) => setCustomerName(e.target.value)} 
                                    className="border p-2 w-full mt-1"
                                />
                            </label>
                        </div>

                        <div className="mb-4">
                            <h2 className="text-xl">Giỏ hàng của bạn</h2>
                            {cart.items.length > 0 ? (
                                <>
                                    <ul className="mt-2">
                                        {cart.items.map((item) => (
                                            <li key={item._id} className="border-b py-2">
                                                {item.name} - ${item.price} x {item.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                    <h3 className="text-lg font-bold mt-2">Tổng tiền: ${cart.totalPrice}</h3>
                                </>
                            ) : (
                                <p>Giỏ hàng của bạn đang trống</p>
                            )}
                        </div>

                        {cart.items.length > 0 && (
                            <div className="mt-4">
                                <PayPalScriptProvider options={{ 
                                    clientId: "AfWyn80IW-6CDVuBIwK0Ti4y3iwME_B8o_ktEE9PKxq5kPRA57pqDoLbItA-H43QTYbQCbJkl0DSdEgg" 
                                }}>
                                    <PayPalButtons
                                        createOrder={async () => {
                                            if (!customerName) {
                                                alert("Vui lòng nhập tên khách hàng");
                                                throw new Error("Tên khách hàng là bắt buộc");
                                            }
                                            
                                            try {
                                                const res = await fetch("http://localhost:5000/api/order", {
                                                    method: "POST",
                                                    headers: { "Content-Type": "application/json" },
                                                    credentials: "include",
                                                    body: JSON.stringify({
                                                        customerName: customerName,
                                                        items: cart.items.map(item => ({
                                                            name: item.name,
                                                            price: item.price,
                                                            quantity: item.quantity
                                                        })),
                                                        purchase_units: [
                                                            {
                                                                amount: {
                                                                    currency_code: "USD",
                                                                    value: cart.totalPrice.toString(),
                                                                },
                                                            },
                                                        ],
                                                    }),
                                                });

                                                const data = await res.json();
                                                return data.orderID;
                                            } catch (error) {
                                                console.error("Lỗi tạo đơn hàng:", error);
                                                throw new Error("Không thể tạo đơn hàng");
                                            }
                                        }}
                                        onApprove={async (data) => {
                                            try {
                                                // Cập nhật lại để sử dụng orderID thay vì paymentID
                                                // await fetch(`http://localhost:5000/api/execute-payment?paymentId=${data.orderID}&PayerID=${data.payerID}`, {
                                                //     credentials: "include"
                                                // });
                                                const res = await fetch(`http://localhost:5000/api/execute-payment?paymentId=${data.orderID}&PayerID=${data.payerID}`, {
                                                    credentials: "include"
                                                });
                                                const result = await res.json();
                                                console.log(result);
                                                setOrderCompleted(true);
                                            } catch (error) {
                                                console.error("Lỗi xác nhận thanh toán:", error);
                                                alert("Có lỗi xảy ra khi xác nhận thanh toán");
                                            }
                                        }}
                                        onError={(err) => {
                                            console.error("Lỗi PayPal:", err);
                                            alert("Có lỗi xảy ra với PayPal");
                                        }}
                                        style={{
                                            layout: "vertical"
                                        }}
                                    />
                                </PayPalScriptProvider>
                            </div>
                        )}
                    </>
                )}
            </div> */}

            <div style={{backgroundColor:"#E3E7EC ", height:"100vh", paddingTop:"70px"}}>
                {orderCompleted ? (
                    <>
                        <h2 style={{textAlign:"center", fontSize:"2.5rem"}}>Cảm ơn Tuấn Anh đã đặt hàng</h2>
                        <Link href={"/"} > Quay lại shop</Link>
                    </>
                ) : (
                    <div className="container">
                        <div className="checkout">
                            <div className="checkout-left">
                                <h1>Chọn phương thức thanh toán</h1>
                                <div className="checkout__choose">
                                    <div className="checkout__choose--item">
                                        <input name="payment" type="radio" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")}/>
                                        <span onClick={() => setPaymentMethod("cod")}>Thanh toán khi nhận hàng</span>
                                    </div>
                                    <div className="checkout__choose--item">
                                        <input name="payment" type="radio" value="paypal" checked={paymentMethod === "paypal"} onChange={() => setPaymentMethod("paypal")}/>
                                        <span onClick={() => setPaymentMethod("paypal")}>Thanh toán bằng paypal</span>
                                    </div>
                                </div>
                            </div>
                            <div className="checkout-right">
                                <div className="checkout__info">
                                    <span>Nhập tên khách hàng</span>
                                    <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)}/>
                                </div>
                                <div className="line"></div>
                                <ul>
                                    {cart.items.map((item) =>(
                                        <li key={item._id}>
                                            {item.name} - ${item.price} x {item.quantity}
                                        </li>
                                    ))}
                                    {/* <li>Sản phẩm 1 - $150 x 3</li>
                                    <li>Sản phẩm 1 - $150 x 3</li>
                                    <li>Sản phẩm 1 - $150 x 3</li> */}
                                </ul>
                                <div className="line"></div>
                                <div className="checkout__totalPrice">
                                    <span className="checkout__totalPrice--text">Tổng tiền</span>
                                    <span className="checkout__totalPrice--price">${cart.totalPrice}</span>
                                    
                                </div>
                                <div className="line"></div>
                                {paymentMethod === "cod" ? (
                                    <button className="checkout__button" onClick={handleClickCheckout}>Đặt hàng</button>
                                ) : (
                                    <div>
                                        <PayPalScriptProvider options={{ 
                                            clientId: "AfWyn80IW-6CDVuBIwK0Ti4y3iwME_B8o_ktEE9PKxq5kPRA57pqDoLbItA-H43QTYbQCbJkl0DSdEgg" 
                                        }}>
                                            <PayPalButtons
                                                createOrder={async () => {
                                                    if (!customerName) {
                                                        alert("Vui lòng nhập tên khách hàng");
                                                        throw new Error("Tên khách hàng là bắt buộc");
                                                    }
                                                    
                                                    try {
                                                        const res = await fetch("http://localhost:5000/api/order", {
                                                            method: "POST",
                                                            headers: { "Content-Type": "application/json" },
                                                            credentials: "include",
                                                            body: JSON.stringify({
                                                                customerName: customerName,
                                                                items: cart.items.map(item => ({
                                                                    id:item.productId,
                                                                    name: item.name,
                                                                    price: item.price,
                                                                    quantity: item.quantity
                                                                })),
                                                                
                                                                purchase_units: [
                                                                    {
                                                                        amount: {
                                                                            currency_code: "USD",
                                                                            value: cart.totalPrice.toString(),
                                                                        },
                                                                    },
                                                                ],
                                                            }),
                                                        });

                                                        const data = await res.json();
                                                        return data.orderID;
                                                    } catch (error) {
                                                        console.error("Lỗi tạo đơn hàng:", error);
                                                        throw new Error("Không thể tạo đơn hàng");
                                                    }
                                                }}
                                                onApprove={async (data) => {
                                                    try {
                                                        // Cập nhật lại để sử dụng orderID thay vì paymentID
                                                        // await fetch(`http://localhost:5000/api/execute-payment?paymentId=${data.orderID}&PayerID=${data.payerID}`, {
                                                        //     credentials: "include"
                                                        // });
                                                        const res = await fetch(`http://localhost:5000/api/execute-payment?paymentId=${data.orderID}&PayerID=${data.payerID}`, {
                                                            credentials: "include"
                                                        });
                                                        const result = await res.json();
                                                        console.log(result);
                                                        setOrderCompleted(true);
                                                    } catch (error) {
                                                        console.error("Lỗi xác nhận thanh toán:", error);
                                                        alert("Có lỗi xảy ra khi xác nhận thanh toán");
                                                    }
                                                }}
                                                onError={(err) => {
                                                    console.error("Lỗi PayPal:", err);
                                                    alert("Có lỗi xảy ra với PayPal");
                                                }}
                                                style={{
                                                    layout: "vertical"
                                                }}
                                            />
                                        </PayPalScriptProvider>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                
            </div>
            
        </>
    )
}
export default Checkout