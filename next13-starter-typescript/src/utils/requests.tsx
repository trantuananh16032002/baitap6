export const APT_DOMAIN = "http://45.32.116.67:5000/api/";
export const PUBLIC_DOMAIN = "http://45.32.116.67";
export const get = async (path: any) =>{
    const response = await fetch(`${APT_DOMAIN}${path}`,{ cache: "no-store" });
    const result = await response.json();
    return result;
}
export const post = async (path: any, data:any) => {
    const response = await fetch(`${APT_DOMAIN}${path}`, {
        method: "POST",
        body: data
    });
    const result = await response.json();
    return result;
}
export const getByID = async (path:any, id:any) =>{
    const response = await fetch(`${APT_DOMAIN}${path}/${id}`,{ cache: "no-store" });
    const result = await response.json();
    return result;
}
export const patch = async (path:any, options:any, id:any) =>{
    const response = await fetch(`${APT_DOMAIN}${path}/${id}`, {
        method: "PATCH",
        body: options,
        // headers,
        cache: "no-store"
    });
    const result = await response.json();
    return result;
}
export const deleted = async (path:any,id:any) =>{
    const response = await fetch(`${APT_DOMAIN}${path}/${id}`, {
        method: "DELETE",
    });
    const result = await response.json();
    return result;
}