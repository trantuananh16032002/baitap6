"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCategories, getCategoryByID, patchCategory } from "@/services/categorySercivves";

function EditCategory(){
    const router = useRouter();
    const { id } = useParams();
    console.log(id);
    const [imagePreview, setImagePreview] = useState<any>(null);
    const [categories, setCategories] = useState<any>([]);
    const [formData, setFormData] = useState<any>({
        title: "",
        desc: "",
        parent_id: "",
        thumbnail: null,
        status: "active",
    });
    const [reloadP, setReloadP] = useState(false);
    const handleReloadParentID = () => {
        setReloadP(!reloadP);
    };
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // const res = await fetch("http://localhost:5000/api/category");
                // if (!res.ok) {
                //     throw new Error(`Lỗi API: ${res.status}`);
                // }
                // const data = await res.json();
                const result =await getCategories();
                setCategories(formatCategories(result.data));
            } catch (err) {
                console.error("Lỗi khi lấy danh mục:", err);
            }
        };
        const fetchCategoryByID = async () =>{
            // const response = await fetch(`http://localhost:5000/api/category/${id}`);
            // const data = await response.json();
            const data = await getCategoryByID(id);
            setFormData(data);
            if (data.thumbnail) {
                setImagePreview(`http://localhost:5000/${data.thumbnail}`);
            }
        }
        fetchCategoryByID();
        fetchCategories();
    }, []);

    console.log(formData);
    const handleChange = (e:any) => {
        const { name, value, type, files } = e.target;
        if (type === "file" && files.length > 0) {
            const file = files[0];
            setFormData((prev:any) => ({
                ...prev,
                thumbnail: file,
            }));
            setImagePreview(URL.createObjectURL(file));
        } else {
            setFormData((prev:any) => ({
                ...prev,
                [name]: value,
            }));
        }
    };
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            let bodyData;
            let headers = {};
    
            // if (formData.thumbnail instanceof File) {
            //     bodyData = new FormData();
            //     bodyData.append("title", formData.title);
            //     bodyData.append("desc", formData.desc);
            //     bodyData.append("parent_id", formData.parent_id);
            //     bodyData.append("status", formData.status);
            //     bodyData.append("thumbnail", formData.thumbnail);
            // }
            bodyData = new FormData();
            bodyData.append("title", formData.title);
            bodyData.append("desc", formData.desc);
            bodyData.append("parent_id", formData.parent_id);
            bodyData.append("status", formData.status);
            bodyData.append("thumbnail", formData.thumbnail);
            // else {
            //     // Nếu không có ảnh mới, gửi JSON
            //     bodyData = JSON.stringify({
            //         title: formData.title,
            //         desc: formData.desc,
            //         parent_id: formData.parent_id,
            //         status: formData.status,
            //     });
            //     headers["Content-Type"] = "application/json";
            // }
    
            // const response = await fetch(`http://localhost:5000/api/category/${id}`, {
            //     method: "PATCH",
            //     body: bodyData,
            //     headers,
            // });
            // if (!response.ok) {
            //     throw new Error(`Lỗi cập nhật: ${response.status}`);
            // }
            const result = await patchCategory(bodyData, id);
            if(result){
                alert("Cập nhật danh mục thành công!");
                router.push("/admin/category");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật danh mục:", error);
            alert("Có lỗi xảy ra khi cập nhật danh mục.");
        }
    };
    
    const formatCategories = (categories:any, parentId:any = null) => { 
        let nestedCategories:any[] = [];
        categories
            .filter((cat:any) => cat.parent_id === parentId) 
            .forEach((cat:any) => {
                nestedCategories.push({ ...cat, label: cat.title });
                const subCategories = formatCategories(categories, cat._id); 
                subCategories.forEach((sub) => {
                    nestedCategories.push({ ...sub, label: `-- ${sub.label} --` });
                });
            });
    
        return nestedCategories;
    };
    
    const handleBack = (e:any) => {
        e.preventDefault();
        router.back();
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
                </div>
                <div className="form--add__item">
                    <label className="form--add__item--label">
                        Mô tả
                    </label>
                    <textarea value={formData.desc} className="form--add__item--input" name="desc" onChange={handleChange}>
                    </textarea>
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
                </div>
                {imagePreview && <img src={imagePreview} alt="Ảnh xem trước" style={{ marginTop: "10px", maxWidth: "100px", height: "auto", borderRadius: "5px", border: "1px solid #ddd" }} />}
                <div className="form--add__item">
                    <label className="form--add__item--label">
                        Trạng thái
                    </label>
                    <div className="form--add__item--radio">
                        <div>
                            <input type="radio" id="active" name="status" value="active"  onChange={handleChange} checked={formData.status === "active"}/>
                            <label htmlFor="active">Hoạt động</label>
                        </div>
                        <div>
                            <input type="radio" id="inactive" name="status" value="inactive" onChange={handleChange} checked={formData.status === "inactive"}/>
                            <label htmlFor="inactive">Không hoạt động</label>
                        </div>
                    </div>
                    
                </div>
                <div className="form--add__action">
                    <button type="submit" className="form--add__action--button">Cập nhật</button>
                    <button className="form--add__action--button" onClick={handleBack}>Quay lại</button>
                </div>
            </form>
        </>
    )
}
export default EditCategory;