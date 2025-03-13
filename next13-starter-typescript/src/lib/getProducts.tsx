export const getProducts = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/products", { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    const products = await res.json();
    return products.slice(0, 4); // Chỉ lấy 3 sản phẩm đầu tiên
  } catch (error) {
    console.error(error);
    return [];
  }
};
