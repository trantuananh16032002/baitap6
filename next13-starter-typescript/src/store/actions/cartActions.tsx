export const setCart = (data:any) =>{
    return{
        type: "SET_CART",
        payload:data,
    }
}
export const addToCart = (product:any) =>{
    return{
        type: "ADD_TO_CART",
        payload: product,
    }
}
export const deleteToCart = (id:any) =>{
    return{
        type:"REMOVE_FROM_CART",
        payload: id,
    }
}