"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
function EditProduct(){
    const router = useRouter();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: "",
        desc: "",
        price: "",
        stock: "",
        category_id: "",
        status: "active",
        images: [],
    });
    const [categories, setCategories] = useState();
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/category");
                if (!res.ok) {
                    throw new Error(`Lỗi API: ${res.status}`);
                }
                const data = await res.json();
                setCategories(formatCategories(data));
            } catch (err) {
                console.error("Lỗi khi lấy danh mục:", err);
            }
        };
        const fetchProductsID = async () =>{
            const response = await fetch(`http://localhost:5000/api/products/${id}`);
            const data = await response.json();
            console.log(data);
            setFormData(data);
        }
        fetchProductsID();
        fetchCategories();
    }, []);
    const formatCategories = (categories, parentId = null) => { 
        let nestedCategories = [];
        categories
            .filter((cat) => cat.parent_id === parentId) 
            .forEach((cat) => {
                nestedCategories.push({ ...cat, label: cat.title });
                const subCategories = formatCategories(categories, cat._id); 
                subCategories.forEach((sub) => {
                    nestedCategories.push({ ...sub, label: `-- ${sub.label} --` });
                });
            });
    
        return nestedCategories;
    };

    console.log(formData);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prevData) => ({
            ...prevData,
            images: [...prevData.images, ...files] 
        }));
    };
    

    const handleRemoveImage = (index) => {
        setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("desc", formData.desc);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("stock", formData.stock);
        formDataToSend.append("category_id", formData.category_id);
        formDataToSend.append("status", formData.status);
    
        // Phân loại ảnh cũ (đường dẫn) và ảnh mới (File)
        const existingImages = formData.images.filter(image => typeof image === "string");
        const newImages = formData.images.filter(image => image instanceof File);
    
        // Gửi danh sách ảnh cũ lên server
        formDataToSend.append("existingImages", JSON.stringify(existingImages));
    
        // Gửi ảnh mới lên server
        newImages.forEach(image => {
            formDataToSend.append("images", image);
        });
        try {
            const res = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: "PATCH", 
                body: formDataToSend,
            });
    
            if (!res.ok) throw new Error("Lỗi khi cập nhật sản phẩm");
    
            alert("Cập nhật sản phẩm thành công!");
            router.refresh();
            router.push("/admin/products"); 
        } catch (error) {
            console.error("Lỗi cập nhật dữ liệu:", error);
        }
    };
    
    
    return(
        <>
            <h2 style={{ fontSize: "2rem", fontWeight: "600", marginBottom: "40px" }}>Sửa sản phẩm</h2>
            <form className="form--add" onSubmit={handleSubmit}>
                <div className="form--add__item">
                    <label className="form--add__item--label">Tên sản phẩm</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} className="form--add__item--input" placeholder="Nhập tên sản phẩm" />
                </div>
                <div className="form--add__item">
                    <label className="form--add__item--label">Mô tả</label>
                    <textarea name="desc" value={formData.desc} onChange={handleChange} className="form--add__item--input"></textarea>
                </div>
                <div className="form--add__item">
                    <label className="form--add__item--label">Giá</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} className="form--add__item--input" />
                </div>
                <div className="form--add__item">
                    <label className="form--add__item--label">Số lượng tồn kho</label>
                    <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="form--add__item--input" />
                </div>
                
                <div className="form--add__item">
                    <label className="form--add__item--label">Danh mục</label>
                    <select name="category_id" value={formData.category_id} onChange={handleChange} className="form--add__item--input">
                        <option value="">Chọn danh mục</option>
                        {categories?.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.label}</option>
                        ))}
                    </select>
                </div>
                <div className="form--add__item">
                    <label className="form--add__item--label">Ảnh</label>
                    <input type="file" multiple onChange={handleImageChange} accept="image/*" className="form--add__item--input form--add__item--input--file" />
                </div>
                <div className="image-preview">
                    {formData.images.map((image, index) => (
                        <div key={index} className="image-preview__item">
                            <img 
                                src={image instanceof File ? URL.createObjectURL(image) : `http://localhost:5000${image}`} 
                                alt={`Ảnh ${index + 1}`} 
                                className="image-preview__img" 
                            />
                            <button type="button" className="image-preview__delete" onClick={() => handleRemoveImage(index)}>X</button>
                        </div>
                    ))}
                </div>
                <div className="form--add__item">
                    <label className="form--add__item--label">Trạng thái</label>
                    <div className="form--add__item--radio">
                        <div>
                            <input type="radio" id="active" name="status" value="active" checked={formData.status === "active"} onChange={handleChange} />
                            <label htmlFor="active">Hoạt động</label>
                        </div>
                        <div>
                            <input type="radio" id="inactive" name="status" value="inactive" checked={formData.status === "inactive"} onChange={handleChange} />
                            <label htmlFor="inactive">Không hoạt động</label>
                        </div>
                    </div>
                </div>
                <div className="form--add__action">
                    <button type="submit" className="form--add__action--button">Sửa</button>
                    <button onClick={() => router.back()} type="button" className="form--add__action--button">Quay lại</button>
                </div>
            </form>
        </>
    )
}
export default EditProduct;