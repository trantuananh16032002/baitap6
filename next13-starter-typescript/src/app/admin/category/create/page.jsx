"use client";

import { useEffect, useState } from "react";

function CreateCategory(){
    const [categories, setCategories] = useState();
    const [formData, setFormData] = useState({
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
                const res = await fetch("http://localhost:5000/api/category");
                if (!res.ok) {
                    throw new Error(`Lỗi API: ${res.status}`);
                }
                const data = await res.json();
                console.log(data);
                setCategories(formatCategories(data));
            } catch (err) {
                console.error("Lỗi khi lấy danh mục:", err);
            }
        };
        fetchCategories();
    }, [reloadP]);
    
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: type === "file" ? files[0] : value, // Xử lý file upload
        }));
    };
    console.log(formData);
    // console.log(categories);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const formDataToSend = new FormData();
          formDataToSend.append("title", formData.title);
          formDataToSend.append("desc", formData.desc);
          formDataToSend.append("parent_id", formData.parent_id);
          formDataToSend.append("status", formData.status);
          if (formData.thumbnail) {
            formDataToSend.append("thumbnail", formData.thumbnail);
          }
    
          const response = await fetch("http://localhost:5000/api/category", {
            method: "POST",
            body: formDataToSend,
          });
    
          const result = await response.json();
    
          if (!response.ok) {
            throw new Error(result.message || "Lỗi khi thêm danh mục");
          }
    
          alert("Thêm danh mục thành công!");
          setFormData({
            title: "",
            desc: "",
            parent_id: "",
            thumbnail: null,
            status: "active",
          });
          handleReloadParentID();
        } catch (err) {
        }
    };
    
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
                        {categories?.map((category) => (
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
                <div className="form--add__item">
                    <label className="form--add__item--label">
                        Trạng thái
                    </label>
                    <div className="form--add__item--radio">
                        <div>
                            <input type="radio" id="active" name="status" value="active" defaultChecked onChange={handleChange} checked={formData.status === "active"}/>
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
                    <button className="form--add__action--button">Quay lại</button>
                </div>
            </form>
        </>
    )
}
export default CreateCategory;