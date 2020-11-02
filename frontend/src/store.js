import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    productListReducer,
    productDetailsReducer,
} from './reducers/productReducers'

import { cartReducer } from './reducers/cartReducers'

import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
} from './reducers/userReducers'

import { orderCreateReducers } from './reducers/orderReducers'

const reducer = combineReducers({
    // for products
    productList: productListReducer,

    // for single product
    productDetails: productDetailsReducer,

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

    // order create
    orderCreate: orderCreateReducers,
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
