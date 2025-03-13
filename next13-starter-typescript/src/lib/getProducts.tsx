export const getProducts = async () => {
  try {
    const res = await fetch("http://45.32.116.67:5000/api/products", { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    const products = await res.json();
    return products.slice(0, 4); 
  } catch (error) {
    console.error(error);
    return [];
  }
};
