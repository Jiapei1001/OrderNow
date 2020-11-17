import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productCreateReviewReducer,
    productTopRatedReducer,
} from './reducers/productReducers'

import { cartReducer } from './reducers/cartReducers'

import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
} from './reducers/userReducers'

import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderDeliverReducer,
    orderListMyReducer,
    orderListReducer,
} from './reducers/orderReducers'

const reducer = combineReducers({
    // for products
    productList: productListReducer,

    // for single product
    productDetails: productDetailsReducer,

    // delete product
    productDelete: productDeleteReducer,

    // create product
    productCreate: productCreateReducer,

    // update product
    productUpdate: productUpdateReducer,

    // create a product review
    productReviewCreate: productCreateReviewReducer,

    // get top products
    productTopRated: productTopRatedReducer,

    // cart
    cart: cartReducer,

    // user
    userLogin: userLoginReducer,

    // user register
    userRegister: userRegisterReducer,

    // user detaisls
    userDetails: userDetailsReducer,

    // user update profile
    userUpdateProfile: userUpdateProfileReducer,

    // users list, from admin's view
    userList: userListReducer,

    // delete an user
    userDelete: userDeleteReducer,

    // update an user
    userUpdate: userUpdateReducer,

    // order create
    orderCreate: orderCreateReducer,

    // order details
    orderDetails: orderDetailsReducer,

    // order pay
    orderPay: orderPayReducer,

    // order deliver
    orderDeliver: orderDeliverReducer,

    // order my list reducer
    orderListMy: orderListMyReducer,

    // all order list reducer
    orderList: orderListReducer,
})

// cart operate the local storage items
// after cart action
const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

// user operate the local storage items
// after user action
const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

// get if there is shipping address from local stroage
// after shipping address from cart action
// if not, it would be just an empty object
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {}

// after cart and user action
const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage },
}

const middleWare = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
)

export default store
