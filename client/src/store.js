import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import Cookie from "js-cookie"; 
import {ProductListReducer,productSaveReducer,productDeleteReducer}  from "./reducers/productReducer"
import {userRegisterReducer,userSignInReducer} from "./reducers/userReducer"
import {cartReducer} from "./reducers/cartReducer"

const userInfo = Cookie.getJSON('userInfo') || null;
const verifyUserInfo = Cookie.getJSON('verifyUserInfo')
const cartItems = Cookie.getJSON('cartItems') || [];


const initialState = { userSignIn: {userInfo},cart:{cartItems},userRegister: {verifyUserInfo}};

const reducer = combineReducers({
  productList: ProductListReducer,
  userRegister: userRegisterReducer,
  userSignIn: userSignInReducer,
  cart:cartReducer,
  productSave:productSaveReducer,
  productDelete:productDeleteReducer
});
const middleware = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(
    applyMiddleware(...middleware)
    ));

export default store;