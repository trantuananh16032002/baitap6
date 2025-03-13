"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function Category(){
    const [category, setCategories] = useState();
    const [reload, setReload] = useState(false);

    const handlereload = () =>{
        setReload(!reload);
    }
    useEffect(() =>{
        const fetchCategories = async () =>{
            const response = await fetch("http://localhost:5000/api/category");
            const data = await response.json();
            setCategories(data);
        }
        fetchCategories();
    }, [reload]);
    console.log(category);
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc muốn xóa danh mục này?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:5000/api/category/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`Lỗi khi xóa danh mục: ${response.status}`);
            }

            alert("Xóa danh mục thành công!");
            handlereload();
        } catch (error) {
            console.error("Lỗi khi xóa danh mục:", error);
            alert("Có lỗi xảy ra khi xóa danh mục.");
        }
    };
    return(
        <>
            <div className="content__action">
                <Link href={"/admin/category/create"} >
                    <button className="content__action--button">Thêm</button>
                </Link>
            </div>
            <table className="table-main">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Hình ảnh</th>
                        <th>Tiêu đề</th>
                        <th>Mô tả</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {category && category.length > 0 ? (
                        category.map((cat, index) => (
                            <tr key={cat._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img
                                        src={`http://localhost:5000/${cat.thumbnail}`}
                                        alt={cat.title}
                                        style={{ width: "40px", height: "40px", objectFit: "cover" }}
                                    />
                                </td>
                                <td>{cat.title}</td>
                                <td>{cat.desc}</td>
                                <td>{cat.status === "active" ? "Hoạt động" : "Không hoạt động"}</td>
                                <td>
                                    <Link href={`/admin/category/${cat._id}`}>
                                        <button className="table-main--button">Sửa</button>
                                    </Link>
                                    <button className="table-main--button" onClick={() => handleDelete(cat._id)}>
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>Không có danh mục nào</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}
export default Category;