import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants'
import axios from 'axios'

// similar as HomeScreen
// dispatch actions to reducers
// action creators

// for products
export const listProducts = () => async (dispath) => {
    try {
        dispath({ type: PRODUCT_LIST_REQUEST })

        const { data } = await axios.get('/api/products')

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
