"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function Variants (){
    const [data, setData] = useState([]);
    useEffect(() =>{
        const fetchData = async () =>{
            const response = await fetch("http://localhost:5000/api/variants");
            const data = await response.json();
            setData(data.variants);
        }
        fetchData();
    },[])
    console.log(data);
    return(
        <>
            <div className="content__action">
                <Link href={"/admin/variants/create"}>
                    <button className="content__action--button">Thêm</button>
                </Link>
            </div>
            <table className="table-main">
                <thead>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Màu sắc</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((variant: any, index: number) => (
                        <tr key={index}>
                            <td>{variant.product_id?.title}</td>
                            <td>{variant.color}</td>
                            <td>{variant.stock}</td>
                            <td>{variant.price}đ</td>
                            <td>
                                <Link href={`/admin/variants/${variant.slug}`}>Sửa</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
export default Variants;