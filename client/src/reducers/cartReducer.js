import * as actions from '../constants'

export const cartReducer = (state = {cartItems:[],shipping:{}},action) => {
    switch (action.type) {
        case actions.CART_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItems.find(x => x.product === item.product);
            if(product) {
                return {
                    cartItems: state.cartItems.map(x => x.product === product.product ? item : x)
                };
            }
            return { cartItems: [...state.cartItems, item] };
        case actions.REMOVE_FROM_CART:
            return {cartItems:state.cartItems.filter(x => x.product !== action.payload)};
        case actions.SAVE_SHIPPING:
            return {...state,shipping:action.payload}
    
        default:
            return state;
    }
}