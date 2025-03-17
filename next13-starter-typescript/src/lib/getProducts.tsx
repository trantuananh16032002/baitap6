import { PUBLIC_DOMAIN } from "@/utils/requests";

export const getProducts = async () => {
  try {
    const res = await fetch(`${PUBLIC_DOMAIN}/api/products`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    const products = await res.json();
    return products; 
  } catch (error) {
    console.error(error);
    return [];
  }
};
