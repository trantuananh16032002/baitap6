import { PUBLIC_DOMAIN } from "@/utils/requests";

export const getProductById = async (id:any) => {
    try {
      const res = await fetch(`${PUBLIC_DOMAIN}/api/products/${id}`, { cache: "no-store" }); 
      if (!res.ok) {
        throw new Error(`Không thể lấy sản phẩm: ${res.status} ${res.statusText}`);
      }
      return await res.json();
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
      return null;
    }
};