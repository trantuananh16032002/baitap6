"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCategories } from "@/services/categorySercivves";
import { getProductByID, patchProduct } from "@/services/productServices";
import { PUBLIC_DOMAIN } from "@/utils/requests";
function EditProduct(){
    const router = useRouter();
    const { id } = useParams();
    const [formData, setFormData] = useState<any>({
        title: "",
        desc: "",
        price: "",
        stock: "",
        category_id: "",
        status: "active",
        images: [],
    });
    
    const [categories, setCategories] = useState<any>();
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(formatCategories(data.data));
            } catch (err) {
                console.error("Lỗi khi lấy danh mục:", err);
            }
        };
        const fetchProductsID = async () =>{
            const data = await getProductByID(id);
            console.log(data);
            setFormData(data);
        }
        fetchProductsID();
        fetchCategories();
    }, []);
    const formatCategories = (categories :any, parentId:any = null) => { 
        let nestedCategories:any = [];
        categories
            .filter((cat:any) => cat.parent_id === parentId) 
            .forEach((cat:any) => {
                nestedCategories.push({ ...cat, label: cat.title });
                const subCategories = formatCategories(categories, cat._id); 
                subCategories.forEach((sub:any) => {
                    nestedCategories.push({ ...sub, label: `-- ${sub.label} --` });
                });
            });
    
        return nestedCategories;
    };

    console.log(formData);
    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData((prev:any) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e:any) => {
        // const files = Array.from(e.target.files);
        // setFormData((prevData:any) => ({
        //     ...prevData,
        //     images: [...prevData.images, ...files] 
        // }));
        const files = Array.from(e.target.files);
        const validFiles = files.filter((file: any) => file.size <= 500 * 1024);

        if (validFiles.length !== files.length) {
            setErrors((prev) => ({ ...prev, images: "Ảnh không được vượt quá 500KB!" }));
        } else {
            setErrors((prev) => ({ ...prev, images: "" }));
            setFormData((prevData: any) => ({
                ...prevData,
                images: [...prevData.images, ...validFiles],
            }));
        }
    };
    

    const handleRemoveImage = (index:any) => {
        setFormData((prev:any) => ({ ...prev, images: prev.images.filter((_:any, i:any) => i !== index) }));
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if (!validateForm()) return;
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("desc", formData.desc);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("stock", formData.stock);
        formDataToSend.append("category_id", formData.category_id);
        formDataToSend.append("status", formData.status);
    
        // Phân loại ảnh cũ (đường dẫn) và ảnh mới (File)
        const existingImages = formData.images.filter((image:any) => typeof image === "string");
        const newImages = formData.images.filter((image:any) => image instanceof File);
    
        // Gửi danh sách ảnh cũ lên server
        formDataToSend.append("existingImages", JSON.stringify(existingImages));
    
        // Gửi ảnh mới lên server
        newImages.forEach((image:any) => {
            formDataToSend.append("images", image);
        });
        try {
            const result = await patchProduct(formDataToSend,id);
            console.log(result);
            if(result.errors){
                setErrors(result.errors);
                return;
            }
            alert("Cập nhật sản phẩm thành công!");
            router.refresh();
            router.replace("/admin/products");
        } catch (error) {
            console.error("Lỗi cập nhật dữ liệu:", error);
        }
    };
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    console.log(errors);    
    const validateForm = () => {
        let newErrors: { [key: string]: string } = {};

        if (!formData.title.trim()) newErrors.title = "*Tên sản phẩm không được để trống!";
        if (!formData.desc.trim()) newErrors.desc = "*Mô tả không được để trống!";
        if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
            newErrors.price = "*Giá sản phẩm phải là số và lớn hơn 0!";
        }
        if (!formData.stock || isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
            newErrors.stock = "*Số lượng tồn kho phải là số không âm!";
        }
        if (!formData.category_id) newErrors.category_id = "*Vui lòng chọn danh mục!";
        if (formData.images.length === 0) newErrors.images = "*Vui lòng thêm ít nhất một ảnh!";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    return(
        <>
            <h2 style={{ fontSize: "2rem", fontWeight: "600", marginBottom: "40px" }}>Sửa sản phẩm</h2>
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
                        {categories?.map((cat:any) => (
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
                    {formData.images.map((image:any, index:any) => (
                        <div key={index} className="image-preview__item">
                            <img 
                                src={image instanceof File ? URL.createObjectURL(image) : `${PUBLIC_DOMAIN}${image}`} 
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