"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Login() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const router = useRouter();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    console.log(formData);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            if (response.ok) {
                alert("Đăng nhập thành công!");
                console.log(result);
                router.push("/admin"); 
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
        }
    };

    return (
        <div className="login">
            <div className="login--wrap">
                <form className="login--form" onSubmit={handleSubmit}>
                    <span>Đăng nhập</span>
                    <div className="login__input">
                        <img src="/img/search.svg" alt="" />
                        <input type="text" name="username" placeholder="Nhập username" onChange={handleChange} />
                    </div>
                    <div className="login__input">
                        <img src="/img/search.svg" alt="" />
                        <input type="password" name="password" placeholder="Nhập password" onChange={handleChange} />
                    </div>
                    <button type="submit">Đăng nhập</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
