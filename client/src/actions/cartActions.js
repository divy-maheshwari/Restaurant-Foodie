import * as actions from '../constants'
import axios from 'axios'
import Cookie from 'js-cookie'


export const addToCart = (productId,qty) => (dispatch,getState) => {
            axios.get(`http://localhost:5000/api/products/${productId}`)
                                .then(data => {
                                    dispatch({type:actions.CART_ADD_ITEM,payload:{
                                        product:data.data._id,
                                        name:data.data.name,
                                        image:data.data.image,
                                        price:data.data.price,
                                        countInStock:data.data.countInStock,
                                        qty
                                    }});
                                    const { cart: { cartItems } } = getState();
                                    Cookie.set("cartItems", JSON.stringify(cartItems));
                                });
}


export const removeFromCart = (productId) => (dispatch,getState) => {
    dispatch({type:actions.REMOVE_FROM_CART,payload:productId});
    const { cart: { cartItems } } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));

}

export const shippingSave = (address,city,postal,country) => (dispatch) => {
    dispatch({type:actions.SAVE_SHIPPING,payload:{address,city,postal,country}})
}