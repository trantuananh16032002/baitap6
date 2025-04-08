"use client";

import { getProducts } from "@/services/productServices";
import { useEffect, useState } from "react"

function CreateVariants(){
    const [formData, setFormData] = useState({
        product_id:"",
        title:"",
        sku:"",
        color:"",
        stock:"",
        price:"",
        images: [],
    });
    console.log(formData);
    const [products, setProducts] = useState([]);
    // console.log(products);
    useEffect(()=>{
        const fetchProducts = async () =>{
            const result = await getProducts(1, 9999, undefined,undefined,undefined,undefined);
            // console.log(result);
            setProducts(result.products);
        }
        fetchProducts();
    }, [])

    const handleChange = (e:any) =>{
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }
    const handleImageChange = (e: any) => {
        const files = Array.from(e.target.files); 
        setFormData((prev:any) => ({
            ...prev,
            images: [...prev.images, ...files], 
        }));
    };
    const handleRemoveImage = (index:any) => {
        setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    };
    const handleSubmit = async (e:any) =>{
        e.preventDefault();
        
        const formDataToSend = new FormData();
        formDataToSend.append("product_id", formData.product_id);
        formDataToSend.append("sku", formData.sku);
        formDataToSend.append("title", formData.title);
        formDataToSend.append("color", formData.color);
        formDataToSend.append("stock", formData.stock);
        formDataToSend.append("price", formData.price);
        if(formData.images){
            formData.images.forEach(image => {
                formDataToSend.append("images", image);
            });
        }
        // formDataToSend.forEach((value, key) => {
        //     console.log(`${key}:`, value);
        // });
        try {
            const res = await fetch("http://localhost:5000/api/variants", {
                method: "POST",
                body: formDataToSend,
            });
    
            const result = await res.json();
            if (res.ok) {
                alert("Tạo variant thành công!");

                console.log(result);
            } else {
                console.error(result);
                alert("Tạo variant thất bại.");
            }
        } catch (err) {
            console.error("Lỗi khi gửi:", err);
            alert("Có lỗi xảy ra khi gửi dữ liệu.");
        }
    }
    return(
        <>
            <h2 style={{ fontSize: "2rem", fontWeight: "600", marginBottom: "40px" }}>Thêm variants</h2>
            <form className="form--add" onSubmit={handleSubmit}>
                <div className="form--add__item">
                    <label className="form--add__item--label">Sản phẩm</label>
                    <select className="form--add__item--input" name="product_id" onChange={handleChange}>
                        <option value="">Chọn sản phẩm</option>
                        {products?.map((item:any) =>(
                            <option key={item._id} value={item._id}>
                                {item.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form--add__item">
                    <label className="form--add__item--label">Tiêu đề</label>
                    <input type="text" className="form--add__item--input" name="title" onChange={handleChange}/>
                </div>
                <div className="form--add__item">
                    <label className="form--add__item--label">Mã Sku</label>
                    <input type="text" className="form--add__item--input" name="sku" onChange={handleChange}/>
                </div>
                <div className="form--add__item">
                    <label className="form--add__item--label">Màu sắc</label>
                    {/* <input type="text" className="form--add__item--input" name="color" onChange={handleChange}/> */}
                    <select className="form--add__item--input" name="color" onChange={handleChange}>
                        <option value="">Chọn màu sắc</option>
                        <option value="Red">Đỏ</option>
                        <option value="Black">Đen</option>
                        <option value="White">Trắng</option>
                    </select>
                </div>
                <div className="form--add__item">
                    <label className="form--add__item--label">Số lượng</label>
                    <input type="number" className="form--add__item--input" name="stock" onChange={handleChange}/>
                </div>
                <div className="form--add__item">
                    <label className="form--add__item--label">Giá</label>
                    <input type="number" className="form--add__item--input" name="price" onChange={handleChange}/>
                </div>
                <div className="form--add__item">
                    <label className="form--add__item--label">Ảnh</label>
                    <input type="file" onChange={handleImageChange} multiple accept="image/*" className="form--add__item--input form--add__item--input--file" />
                </div>
                <div className="image-preview">
                    {formData.images.map((file, index) => (
                        <div key={index} className="image-preview__item">
                            <img src={URL.createObjectURL(file)} alt={`Ảnh ${index + 1}`} className="image-preview__img" />
                            <button type="button" className="image-preview__delete" onClick={() => handleRemoveImage(index)}>X</button>
                        </div>
                    ))}
                </div>
                <div className="form--add__action">
                    <button type="submit" className="form--add__action--button">Thêm</button>
                    {/* <button className="form--add__action--button">Quay lại</button> */}
                </div>
            </form>
        </>
    )
}
export default CreateVariants