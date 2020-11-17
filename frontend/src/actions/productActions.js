import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
} from '../constants/productConstants'
import axios from 'axios'

// similar as HomeScreen
// dispatch actions to reducers
// action creators

// for products
// setting the keyword to search as empty string as default
export const listProducts = (keyword = '', pageNuber = '') => async (
    dispath
) => {
    try {
        dispath({ type: PRODUCT_LIST_REQUEST })

        const { data } = await axios.get(
            `/api/products?keyword=${keyword}&pageNumber=${pageNuber}`
        )

        dispath({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispath({
            type: PRODUCT_LIST_FAIL,
            // check if the error exists, if so, return that message, or return a general message
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

// for single product details
export const listProductDetails = (id) => async (dispath) => {
    try {
        dispath({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/products/${id}`)

        dispath({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispath({
            type: PRODUCT_DETAILS_FAIL,
            // check if the error exists, if so, return that message, or return a general message
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

// deleteProduct
export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        // get request don't need content type
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        // no need to const
        // just wait the delete response
        await axios.delete(`/api/products/${id}`, config)

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })
    } catch (error) {
        // catch part is the same between different actions
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            // check if the error exists, if so, return that message, or return a general message
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

// createProduct
export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        // get request don't need content type
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(`/api/products`, {}, config)
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        // catch part is the same between different actions
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            // check if the error exists, if so, return that message, or return a general message
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

// updateProduct
export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        // get request don't need content type
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(
            `/api/products/${product._id}`,
            product,
            config
        )
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        // catch part is the same between different actions
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            // check if the error exists, if so, return that message, or return a general message
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

// create a product review
export const createProductReview = (productId, review) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        // get request don't need content type
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        // no return but a message, so no need to const data
        // res is a message
        // refer to productController
        await axios.post(`/api/products/${productId}/reviews`, review, config)
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
        })
    } catch (error) {
        // catch part is the same between different actions
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            // check if the error exists, if so, return that message, or return a general message
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

// for products
// setting the keyword to search as empty string as default
export const listTopProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_REQUEST })

        const { data } = await axios.get('/api/products/top')

        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            // check if the error exists, if so, return that message, or return a general message
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
