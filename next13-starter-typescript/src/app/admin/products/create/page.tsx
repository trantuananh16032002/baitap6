"use client";

import { getCategories } from "@/services/categorySercivves";
import { postProducts } from "@/services/productServices";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


function CreateCategory() {
    const [reloadP, setReloadP] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        desc: "",
        price: "",
        stock: "",
        category_id: "",
        status: "active",
        images: [],
    });
    
    const router = useRouter();
    const [categories, setCategories] = useState<any[]>([]);
    const handleReloadP = () =>{
        setReloadP(!reloadP);
    }
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // const res = await fetch("http://localhost:5000/api/category");
                // if (!res.ok) {
                //     throw new Error(`Lỗi API: ${res.status}`);
                // }
                // const data = await res.json();
                const data = await getCategories();
                setCategories(formatCategories(data.data));
            } catch (err) {
                console.error("Lỗi khi lấy danh mục:", err);
            }
        };
        fetchCategories();
    }, []);
    const formatCategories = (categories:any, parentId = null) => { 
        let nestedCategories : any = [] ;
        categories
            .filter((cat : any) => cat.parent_id === parentId) 
            .forEach((cat : any) => {
                nestedCategories.push({ ...cat, label: cat.title });
                const subCategories = formatCategories(categories, cat._id); 
                subCategories.forEach((sub: any) => {
                    nestedCategories.push({ ...sub, label: `-- ${sub.label} --` });
                });
            });
    
        return nestedCategories;
    };
    // console.log(categories);
    console.log(formData);
    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleImageChange = (e:any) => {
        // const files = Array.from(e.target.files);
        // const newImages = files.filter((file: any) => !formData.images.some((img: any) => img.name === file.name));
        // setFormData((prev: any) => ({ ...prev, images: [...prev.images, ...newImages] }));
        const files = Array.from(e.target.files);
        const maxSize = 512000; // 500KB
        let newErrors = { ...errors };

        // Reset lỗi trước khi kiểm tra ảnh mới
        newErrors.images = "";

        const validImages = files.filter((file: any) => {
            if (file.size > maxSize) {
                newErrors.images = "*Ảnh không được vượt quá 500KB!";
                return false;
            }
            return true; // Chỉ lấy ảnh hợp lệ
        });

        setErrors(newErrors);

        // Nếu không có lỗi, thêm ảnh vào danh sách
        if (validImages.length > 0) {
            setFormData((prev: any) => ({
                ...prev,
                images: [...prev.images, ...validImages],
            }));
        }
    };

    const handleRemoveImage = (index:any) => {
        setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if (!validateForm()) {
            console.warn("Dữ liệu không hợp lệ!");
            return;
        }
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("desc", formData.desc);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("stock", formData.stock);
        formDataToSend.append("category_id", formData.category_id);
        formDataToSend.append("status", formData.status);

        formData.images.forEach(image => {
            formDataToSend.append("images", image);
        });
        // console.log(formDataToSend);
        try {
            // const res = await fetch("http://localhost:5000/api/products", {
            //     method: "POST",
            //     body: formDataToSend,
            // });

            // if (!res.ok) throw new Error("Lỗi khi gửi sản phẩm");
            const result = await postProducts(formDataToSend);
            // console.log(result);
            if (result.errors) {
                setErrors(result.errors); 
                return; 
            }
            setFormData({
                title: "",
                desc: "",
                price: "",
                stock: "",
                category_id: "",
                status: "active",
                images: [],
            });
            router.replace("/admin/products");
            router.refresh();
        } catch (error) {
            console.error("Lỗi gửi dữ liệu:", error);
        }
    };
    // validate
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const validateForm = () => {
        let newErrors: { [key: string]: string } = {};
        
        if (!formData.title.trim()) newErrors.title = "*Tên sản phẩm không được để trống!";
        if (!formData.desc.trim()) newErrors.desc = "*Mô tả không được để trống!";
        if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
            newErrors.price = "*Giá sản phẩm phải là số và lớn hơn 0!";
        }
        if (!formData.stock) newErrors.stock = "*Số lượng tồn kho không được để trống!";
        if (!formData.category_id) newErrors.category_id = "*Vui lòng chọn danh mục!";
        if (formData.images.length === 0) newErrors.images = "*Vui lòng thêm ít nhất một ảnh!";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    return (
        <>  
            <h2 style={{ fontSize: "2rem", fontWeight: "600", marginBottom: "40px" }}>Thêm sản phẩm</h2>
            <form className="form--add" onSubmit={handleSubmit}>
                <div className="form--add__item">
                    <label className="form--add__item--label">Tên sản phẩm</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} className="form--add__item--input" placeholder="Nhập tên sản phẩm" />
                    {errors.title && <p className="error-message">{errors.title}</p>}
                </div>
                <div className="form--add__item">
                    <label className="form--add__item--label">Mô tả</label>
                    <textarea name="desc" value={formData.desc} onChange={handleChange} className="form--add__item--input"></textarea>
                    {errors.desc && <p className="error-message">{errors.desc}</p>}
                </div>
                <div className="form--add__item">
                    <label className="form--add__item--label">Giá</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} className="form--add__item--input" />
                    {errors.price && <p className="error-message">{errors.price}</p>}
                </div>
                <div className="form--add__item">
                    <label className="form--add__item--label">Số lượng tồn kho</label>
                    <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="form--add__item--input" />
                    {errors.stock && <p className="error-message">{errors.stock}</p>}
                </div>
                
                <div className="form--add__item">
                    <label className="form--add__item--label">Danh mục</label>
                    <select name="category_id" value={formData.category_id} onChange={handleChange} className="form--add__item--input">
                        <option value="">Chọn danh mục</option>
                        {categories?.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.label}</option>
                        ))}
                    </select>
                    {errors.category_id && <p className="error-message">{errors.category_id}</p>}
                </div>
                <div className="form--add__item">
                    <label className="form--add__item--label">Ảnh</label>
                    <input type="file" multiple onChange={handleImageChange} accept="image/*" className="form--add__item--input form--add__item--input--file" />
                    {errors.images && <p className="error-message">{errors.images}</p>}
                </div>
                <div className="image-preview">
                    {formData.images.map((file, index) => (
                        <div key={index} className="image-preview__item">
                            <img src={URL.createObjectURL(file)} alt={`Ảnh ${index + 1}`} className="image-preview__img" />
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
                    <button type="submit" className="form--add__action--button">Thêm</button>
                    <button onClick={() => router.back()} type="button" className="form--add__action--button">Quay lại</button>
                </div>
            </form>
        </>
    );
}

export default CreateCategory;
