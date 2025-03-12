"use client";
import { useRouter } from "next/navigation";

export default function DeleteButton({ productId }: { productId: string }) {
    const router = useRouter();

    const handleDelete = async () => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) return;

        try {
            const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Xóa sản phẩm thành công!");
                router.refresh(); // Làm mới trang sau khi xóa
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
