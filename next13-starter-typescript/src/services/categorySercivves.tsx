import { deleted, get, getByID, patch, post } from "@/utils/requests";

export const getCategories = async (page = 1, limit = 10) =>{
    const result =await get("category",{ page, limit });
    return result;
}
export const postCategory = async (data:any) =>{
    const result =await post("category", data)
    return result;
}
export const getCategoryByID = async (id:any) =>{
    const result = await getByID("category", id);
    return result;
}
export const patchCategory = async (options:any, id:any) =>{
    const result = await patch("category", options, id);
    return result;
}
export const deleteCategory = async (id:any) =>{
    const result = await deleted("category", id);
    return result;
}