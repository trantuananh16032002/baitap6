"use client";

import { getProducts } from "@/services/productServices";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"

function EditVariant(){
    const { slug } = useParams();
    const [data, setData] = useState({});
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
    // console.log(data);
    const [products, setProducts] = useState([]);
    // console.log(products);
    useEffect(()=>{
        const fetchProducts = async () =>{
            const result = await getProducts(1, 9999, undefined,undefined,undefined,undefined);
            setProducts(result.products);
        }
        const fetchVariantsbyID = async () =>{
            const response = await fetch(`http://localhost:5000/api/variants/${slug}`);
            const data = await response.json();
            setData(data);
            setFormData({
                product_id: data.product_id?._id || "",
                title: data.title || "",
                sku: data.sku || "",
                color: data.color || "",
                stock: data.stock || "",
                price: data.price || "",
                images: data.images, 
            });
        }
        fetchVariantsbyID()
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

        // Phân loại ảnh cũ (đường dẫn) và ảnh mới (File)
        const existingImages = formData.images.filter((image:any) => typeof image === "string");
        const newImages = formData.images.filter((image:any) => image instanceof File);

        // Gửi danh sách ảnh cũ lên server
        formDataToSend.append("existingImages", JSON.stringify(existingImages));

        if(formData.images){
            newImages.forEach(image => {
                formDataToSend.append("images", image);
            });
        }
        formDataToSend.forEach((value, key) => {
            console.log(`${key}:`, value);
        });
        try {
            const res = await fetch(`http://localhost:5000/api/variants/${slug}`, {
                method: "PATCH", 
                body: formDataToSend,
            });
    
            const result = await res.json();
    
            if (res.ok) {
                alert("Cập nhật thành công!");
                console.log(result);
            } else {
                alert("Cập nhật thất bại: " + result.error || "Lỗi không xác định.");
                console.error(result);
            }
        } catch (err) {
            console.error("Lỗi khi gửi:", err);
            alert("Đã xảy ra lỗi khi gửi dữ liệu.");
        }
        
    }
    return(
        <>
            <h2 style={{ fontSize: "2rem", fontWeight: "600", marginBottom: "40px" }}>Thêm variants</h2>
            <form className="form--add" onSubmit={handleSubmit}>
                <div className="form--add__item">
                    <label className="form--add__item--label">Sản phẩm</label>
                    <select className="form--add__item--input" value={formData.product_id} name="product_id" onChange={handleChange}>
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
                    <input type="text" className="form--add__item--input" value={formData.title} name="title" onChange={handleChange}/>
                </div>
                <div className="form--add__item">
                    <label className="form--add__item--label">Mã Sku</label>
                    <input type="text" className="form--add__item--input" value={formData.sku} name="sku" onChange={handleChange}/>
                </div>
                <div className="form--add__item">
                    <label className="form--add__item--label">Màu sắc</label>
                    {/* <input type="text" className="form--add__item--input" name="color" onChange={handleChange}/> */}
                    <select className="form--add__item--input" value={formData.color} name="color" onChange={handleChange}>
                        <option value="">Chọn màu sắc</option>
                        <option value="Red">Đỏ</option>
                        <option value="Black">Đen</option>
                        <option value="White">Trắng</option>
                    </select>
                </div>
                <div className="form--add__item">
                    <label className="form--add__item--label">Số lượng</label>
                    <input type="number" className="form--add__item--input" value={formData.stock} name="stock" onChange={handleChange}/>
                </div>
                <div className="form--add__item">
                    <label className="form--add__item--label">Giá</label>
                    <input type="number" className="form--add__item--input" value={formData.price} name="price" onChange={handleChange}/>
                </div>
                <div className="form--add__item">
                    <label className="form--add__item--label">Ảnh</label>
                    <input type="file" onChange={handleImageChange} multiple accept="image/*" className="form--add__item--input form--add__item--input--file" />
                </div>
                <div className="image-preview">
                    {formData.images.map((file:any, index) => (
                        <div key={index} className="image-preview__item">
                            <img src={file instanceof File ? URL.createObjectURL(file) : `http://localhost:5000${file}`} alt={`Ảnh ${index + 1}`} className="image-preview__img" />
                            <button type="button" className="image-preview__delete" onClick={() => handleRemoveImage(index)}>X</button>
                        </div>
                    ))}
                </div>
                <div className="form--add__action">
                    <button type="submit" className="form--add__action--button">Sửa</button>
                    {/* <button className="form--add__action--button">Quay lại</button> */}
                </div>
            </form>
        </>
    )
}
export default EditVariant