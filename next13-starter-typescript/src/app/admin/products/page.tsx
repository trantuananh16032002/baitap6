// "use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeleteButton from "./Delete";
import { getProducts } from "@/services/productServices";
import { PUBLIC_DOMAIN } from "@/utils/requests";
async function fetchProducts() {
    // const res = await fetch("http://localhost:5000/api/products", { cache: "no-store" }); 
    // if (!res.ok) throw new Error("Không thể lấy dữ liệu sản phẩm");
    // return res.json();
    const result = await getProducts();
    return result;
}
async function Products(){
    const productsSSR = await fetchProducts();
    // const router = useRouter();
    console.log(productsSSR);
    // const handleDelete = async (productId) => {
    //     if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) return;

    //     try {
    //         const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
    //             method: "DELETE",
    //         });

    //         if (response.ok) {
    //             alert("Xóa sản phẩm thành công!");
    //             setProducts(products.filter((product) => product._id !== productId));
    //         } else {
    //             alert("Xóa sản phẩm thất bại!");
    //         }
    //     } catch (error) {
    //         console.error("Lỗi khi xóa sản phẩm:", error);
    //         alert("Lỗi khi xóa sản phẩm!");
    //     }
    // };
    // console.log(products);
    return(
        <>
            <div className="content__action">
                <Link href={"/admin/products/create"} >
                    <button className="content__action--button">Thêm</button>
                </Link>
            </div>
            <table className="table-main">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Hình ảnh</th>
                        <th>Tiêu đề</th>
                        <th>Giá</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {productsSSR && productsSSR.length > 0 ? (
                        productsSSR?.map((product : any, index : any) => (
                            <tr key={product._id}>
                                <td>{index + 1}</td>
                                <td>
                                    {product.images.length > 0 ? (
                                        <img src={`${PUBLIC_DOMAIN}${product.images[0]}`} alt={product.title} width={50} height={50} />
                                    ) : (
                                        <img src="/uploads/default.jpg" alt="No Image" width={50} height={50} />
                                    )}
                                </td>
                                <td>{product.title}</td>
                                <td>{product.price}đ</td>
                                <td>{product.status ? "Còn hàng" : "Hết hàng"}</td>
                                <td>
                                    <Link href={`/admin/products/${product._id}`}>
                                        <button className="table-main--button">Sửa</button>
                                    </Link>
                                    {/* <button className="table-main--button" onClick={() => handleDelete(product._id)}>Xóa</button> */}
                                    <DeleteButton productId={product._id}/>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} style={{ textAlign: "center" }}>Không có sản phẩm nào</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}
export default Products;