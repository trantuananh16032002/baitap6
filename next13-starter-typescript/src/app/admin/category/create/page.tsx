"use client";

import { getCategories, postCategory } from "@/services/categorySercivves";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
function CreateCategory(){
    const [categories, setCategories] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        title: "",
        desc: "",
        parent_id: "",
        thumbnail: null,
        status: "active",
    });
    const router = useRouter();
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories(undefined,undefined);
                console.log(data.data);
                setCategories(formatCategories(data.data));
            } catch (err) {
                console.error("Lỗi khi lấy danh mục:", err);
            }
        };
        fetchCategories();
    }, []);
    
    const handleChange = (e:any) => {
        // const { name, value, type, files } = e.target;
        // setFormData((prev) => ({
        //   ...prev,
        //   [name]: type === "file" ? files[0] : value, // Xử lý file upload
        // }));
        const { name, value, type, files } = e.target;

    if (type === "file" && files.length > 0) {
        const file = files[0];

        // Kiểm tra dung lượng file (<= 500KB)
        if (file.size > 500 * 1024) { 
            setErrors((prev) => ({
                ...prev,
                thumbnail: "*Ảnh phải nhỏ hơn 500KB!",
            }));
            return; // Không cập nhật state nếu ảnh không hợp lệ
        }

        // Nếu ảnh hợp lệ, xóa lỗi thumbnail (nếu có)
        setErrors((prev) => ({
            ...prev,
            thumbnail: "",
        }));

        setFormData((prev) => ({
            ...prev,
            [name]: file,
        }));
    } else {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    };
    console.log(formData);
    // console.log(categories);
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("title", formData.title);
            formDataToSend.append("desc", formData.desc);
            formDataToSend.append("parent_id", formData.parent_id);
            formDataToSend.append("status", formData.status);
            if (formData.thumbnail) {
                formDataToSend.append("thumbnail", formData.thumbnail);
            }
            const result = await postCategory(formDataToSend);
            if (result.errors) {
                console.log(result.errors); 
                setErrors(result.errors); 
                return; 
            }
            alert("Thêm danh mục thành công!");
            router.replace("/admin/category");
            router.refresh();
            setFormData({
                title: "",
                desc: "",
                parent_id: "",
                thumbnail: null,
                status: "active",
            });
        } catch (err) {
        }
    };
    
    const formatCategories = (categories:any, parentId:any = null) => { 
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
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const validateForm = () => {
        let newErrors: { [key: string]: string } = {};

        if (!formData.title.trim()) newErrors.title = "*Tên danh mục không được để trống!";
        if (!formData.desc.trim()) newErrors.desc = "*Mô tả không được để trống!";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    return(
        <>
            <h2 style={{fontSize:"2rem", fontWeight:"600", marginBottom:"40px"}}>Thêm danh mục sản phẩm</h2>
            <form className="form--add" onSubmit={handleSubmit}>
                <div className="form--add__item">
                    <label className="form--add__item--label">
                        Tên danh mục
                    </label>
                    <input value={formData.title} type="text" name="title" className="form--add__item--input" placeholder="Tên danh mục" onChange={handleChange}/>
                    {errors.title && <p className="error-message">{errors.title}</p>}
                </div>
                <div className="form--add__item">
                    <label className="form--add__item--label">
                        Mô tả
                    </label>
                    <textarea value={formData.desc} className="form--add__item--input" name="desc" onChange={handleChange}>
                    </textarea>
                    {errors.desc && <p className="error-message">{errors.desc}</p>}
                </div>
                <div className="form--add__item">
                    <label className="form--add__item--label">
                        Danh mục
                    </label>
                    <select name="parent_id" className="form--add__item--input" onChange={handleChange} value={formData.parent_id}>
                        <option value="">Chọn danh mục cha</option>
                        {categories?.map((category:any) => (
                            <option key={category._id} value={category._id}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form--add__item">
                    <label className="form--add__item--label">
                        Ảnh
                    </label>
                    <input name="thumbnail" type="file" className="form--add__item--input form--add__item--input--file" onChange={handleChange} />
                    {errors.thumbnail && <p className="error-message">{errors.thumbnail}</p>}
                </div>
                <div className="form--add__item">
                    <label className="form--add__item--label">
                        Trạng thái
                    </label>
                    <div className="form--add__item--radio">
                        <div>
                            <input type="radio" id="active" name="status" value="active" onChange={handleChange} checked={formData.status === "active"}/>
                            <label htmlFor="active">Hoạt động</label>
                        </div>
                        <div>
                            <input type="radio" id="inactive" name="status" value="inactive" onChange={handleChange} checked={formData.status === "inactive"}/>
                            <label htmlFor="inactive">Không hoạt động</label>
                        </div>
                    </div>
                    
                </div>
                <div className="form--add__action">
                    <button type="submit" className="form--add__action--button">Thêm</button>
                    {/* <button className="form--add__action--button">Quay lại</button> */}
                </div>
            </form>
        </>
    )
}
export default CreateCategory;