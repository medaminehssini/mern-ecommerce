import { createStore , combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import { createProductReducer, createReviewReducer, deleteProductReducer, productDetailsReducer, productListReducer, productTopRatedReducer, updateProductReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {  deleteUserReducer, updateUserReducer, userListReducer, userLoginReducer, userProfileDetailsReducer, userRegisterReducer, userUpdateProfileReducer } from "./reducers/userReducers";
import { orderCreatReducer, orderDeliverReducer, orderDetailsReducer, orderListMyReducer, orderListReducer, orderPayReducer } from "./reducers/orderReducers";
import {composeWithDevTools} from 'redux-devtools-extension'
import { userChangeWishList } from "./reducers/wishlistReducers";

const reducer = combineReducers({
    productList        : productListReducer,
    productDelete      : deleteProductReducer,
    productDetails     : productDetailsReducer,
    productCreate      : createProductReducer,
    productUpdate      : updateProductReducer,
    productTopRated    : productTopRatedReducer,
    cart               : cartReducer, 
    userLogin          : userLoginReducer,
    userRegister       : userRegisterReducer,
    userDetails        : userProfileDetailsReducer, 
    userUpdateProfile  : userUpdateProfileReducer,
    orderCreate        : orderCreatReducer , 
    orderDetails       : orderDetailsReducer, 
    orderPay           : orderPayReducer, 
    orderDeliver       : orderDeliverReducer,
    orderListMy        : orderListMyReducer,
    orderList          : orderListReducer, 
    userList           : userListReducer,
    userDelete         : deleteUserReducer,
    userUpdate         : updateUserReducer,
    reviewCreate       : createReviewReducer,
    wishListValue      : userChangeWishList,
})


const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAdressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : ''

const initialState = {
    cart : {
        cartItems       : cartItemsFromStorage, 
        shippingAddress : shippingAdressFromStorage, 
        paymentMethod   : paymentMethodFromStorage
    },
    userLogin : {
        userInfo  : userInfoFromStorage
    }, 
    wishListValue : 0

} 
const middleware = [thunk] ; 



const store = createStore(reducer , initialState , composeWithDevTools(applyMiddleware(...middleware)))

export default store ; 