import { deleted, get, getByID, patch, post } from "@/utils/requests";

export const getProducts = async () =>{
    const result = await get("products")
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