import * as actions from '../constants'
import axios from 'axios'

export const ProductList = () => (dispatch) => {
    dispatch({type:actions.PRODUCT_LIST_REQUEST});
    axios.get('http://localhost:5000/api/products')
               .then(data => {
                   dispatch({type:actions.PRODUCT_LIST_SUCCESS,payload:data.data});
               })
               .catch(err => {
                   dispatch({type:actions.PRODUCT_LIST_FAILURE,payload:err.message});
               });
}


export const ProductSave = (id,name,image,price,description,countInStock) => (dispatch,setState) => {
    const {userSignIn:{userInfo}} = setState();
    if(id) {
        axios.put(`http://localhost:5000/api/products/${id}`,{id,name,image,price,description,countInStock},
        {
            headers: {
                Authorization: 'Bearer '+ userInfo.token
            }
        })
        .then(data => {
            dispatch({type:actions.PRODUCT_SAVE_SUCCESS,payload:data.data});
        })
        .catch(err => {
            dispatch({type:actions.PRODUCT_SAVE_FAILURE,payload:err.message});
        });
    }
    else {
        axios.post(`http://localhost:5000/api/products`,{name,image,price,description,countInStock},
        {
            headers: {
                Authorization: 'Bearer '+ userInfo.token
            }
        })
        .then(data => {
            dispatch({type:actions.PRODUCT_SAVE_SUCCESS,payload:data.data});
        })
        .catch(err => {
            dispatch({type:actions.PRODUCT_SAVE_FAILURE,payload:err.message});
        });
    }
}

export const ProductDelete = (id) => (dispatch,setState) => {
    const {userSignIn:{userInfo}} = setState();
    axios.delete(`http://localhost:5000/api/products/${id}`,
    {
        headers: {
            Authorization: 'Bearer '+ userInfo.token
        }
    })
                            .then(data => {
                                dispatch({type:actions.PRODUCT_DELETE_SUCCESS,payload:data.data});
                            })
                            .catch(err => {
                                dispatch({type:actions.PRODUCT_DELETE_FAILURE,payload:err.message});
                            });
}

export const ProductSearch = (text) => (dispatch) => {
    dispatch({type:actions.SEARCH_PRODUCT,payload:text});
}
