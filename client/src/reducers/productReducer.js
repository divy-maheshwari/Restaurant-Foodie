import * as actions from '../constants'

export const ProductListReducer = (state={products: []},action) => {
              switch (action.type) {
                case actions.PRODUCT_LIST_REQUEST:
                    return {...state,loading:true,products:[]};
                
                case actions.PRODUCT_LIST_SUCCESS:
                    return {...state,loading:false,products:action.payload};
                
                case actions.PRODUCT_LIST_FAILURE:
                    return {...state,loading:false,error:action.payload};

                case actions.SEARCH_PRODUCT:
                    let a = [];
                    const regex = new RegExp(`${action.payload}`,"gi");
                    console.log(regex);
                    state.products.forEach(product => {
                        if(product.name.match(regex)){
                            a.push(product);
                            console.log(a);
                        }
                    });
                    return {...state,products:a};
                    

                default:
                    return state;
              }
}

export const productSaveReducer = (state = {product: {}},action) => {
    switch (action.type) {
        case actions.PRODUCT_SAVE_SUCCESS:
            return {...state,loading: false,success: true,product: action.payload};
        case actions.PRODUCT_SAVE_FAILURE:
            return {...state,loading: false,error: action.payload};
        default:
            return state;
    }
}

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.PRODUCT_DELETE_SUCCESS:
            return {...state,success: true,deleteProduct: action.payload}; 
        case actions.PRODUCT_DELETE_FAILURE:
            return {...state,error: action.payload};    
        default:
            return state;
    }
}