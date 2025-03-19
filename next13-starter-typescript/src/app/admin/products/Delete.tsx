"use client";
import { deleteProduct } from "@/services/productServices";
import { useRouter } from "next/navigation";

export default function DeleteButton(props:any) {
    const {productId,reload } = props;
    const router = useRouter();

    const handleDelete = async () => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) return;

        try {
            // const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
            //     method: "DELETE",
            // });
            const result = await deleteProduct(productId);
            if (result) {
                alert("Xóa sản phẩm thành công!");
                // router.refresh(); 
                reload();
            } else {
                alert("Xóa sản phẩm thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error);
            alert("Lỗi khi xóa sản phẩm!");
        }
    };

    return (
        <button className="table-main--button" onClick={handleDelete}>
            Xóa
        </button>
    );
}
