const initialState: { cart: any[] } = {
    cart: [], 
};
const cartReducer = (state = initialState, action:any) =>{
    switch (action.type){
        case "ADD_TO_CART":
            // const updatedCart = [...state.cart, action.payload];
            // console.log("Cart after ADD_TO_CART:", updatedCart);
            // return {
            //     ...state,
            //     cart: updatedCart,
            // };
            const existingItem = state.cart.find(item => item._id === action.payload._id);
            let updatedCart;
            if (existingItem) {
                updatedCart = state.cart.map(item =>
                    item._id === action.payload._id
                        ? { ...item, quantity: item.quantity + action.payload.quantity }
                        : item
                );
            } else {
                updatedCart = [...state.cart, action.payload];
            }
            console.log("Cart after ADD_TO_CART:", updatedCart);
            return {
                ...state,
                cart: updatedCart,
            };
        case "REMOVE_FROM_CART":
            console.log(state);
            return{
                ...state,
                cart: state.cart.filter((item:any) => item._id !== action.payload),
            }
        case "SET_CART":
            return {
                ...state,
                cart: action.payload,
            };
        default:
            return state;
    }
}
export default cartReducer;

