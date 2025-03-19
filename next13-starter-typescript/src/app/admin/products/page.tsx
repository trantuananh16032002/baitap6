"use client";
import Link from "next/link";
import DeleteButton from "./Delete";
import { getProducts } from "@/services/productServices";
import { PUBLIC_DOMAIN } from "@/utils/requests";
import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination/PaginationAdmin";

function Products(){
    const [products, setProducts] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5; 
    const [reload, setReload] = useState(false);
    const handleReload = () =>{
        setReload(!reload);
    }
    useEffect(() => {
        async function fetchProducts() {
            const result = await getProducts(page, limit, undefined,undefined,undefined, undefined);
            if (result) {
                setProducts(result.products); 
                setTotalPages(result.totalPages);
            }
        }
        fetchProducts();
    }, [page,reload]); 
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
                    {products && products.length > 0 ? (
                        products?.map((product : any, index : any) => (
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
                                    <DeleteButton productId={product._id} reload = {handleReload}/>
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
            {/* Phân trang */}
            {/* <div className="pagination">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    ← Trang trước
                </button>

                <span>Trang {page} / {totalPages}</span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Trang sau →
                </button>
            </div> */}
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </>
    )
}
export default Products;