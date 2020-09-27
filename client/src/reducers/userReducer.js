import * as actions from '../constants'

export const userRegisterReducer = (state= {},action) => {
           switch (action.type) {
                case actions.REGISTER_REQUEST:
                   return {loading:true}
                case actions.REGISTER_SUCCESS:
                    return {...state,loading:false,verifyUserInfo:action.payload}
                case actions.REGISTER_FAILURE:
                    return {...state,loading:false,error:action.payload}
                case actions.GENERATE_CODE_SUCCESS:
                    return {...state,verifyCode:action.payload}
                case actions.GENERATE_CODE_FAILURE:
                    return {...state,error:action.payload}
                default:
                    return state;
           }
}

export const userSignInReducer = (state= {},action) => {
    switch (action.type) {
         case actions.SIGNIN_REQUEST:
            return {loading:true}
         case actions.SIGNIN_SUCCESS:
             return {...state,loading:false,userInfo:action.payload}
         case actions.SIGNIN_FAILURE:
             return {...state,loading:false,error:action.payload}
         case actions.USER_LOGOUT:
             return {}
         default:
             return state;
    }
}
