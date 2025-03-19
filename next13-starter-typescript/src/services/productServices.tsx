import { deleted, get, getByID, patch, post } from "@/utils/requests";

export const getProducts = async (page:any,limit:any,priceRange:any,category_id:any,sortOrder:any,searchQuery:any) =>{
    const params: any = { page, limit };
    if (priceRange) {
        const [minPrice, maxPrice] = priceRange;
        params.minPrice = minPrice;
        params.maxPrice = maxPrice;
    }
    if (category_id) {
        params.category_id = category_id;
    }
    if (sortOrder) {
        params.sortOrder = sortOrder;
    }
    if (searchQuery) {
        params.search = searchQuery; 
    }
    const result = await get("products", params); 
    return result;
}
export const postProducts = async (data:any) =>{
    const result =await post("products", data)
    return result
}
export const getProductByID = async (id:any) =>{
    const result = await getByID("products", id);
    return result;
}
export const patchProduct = async (options:any, id:any) =>{
    const result = await patch("products", options, id);
    return result;
}
export const deleteProduct = async (id:any) =>{
    const result = await deleted("products", id);
    return result;
}