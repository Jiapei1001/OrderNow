import axios from 'axios'
import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
} from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        // below the input data
        // is from userController - authUser, which is the res.json that contains id, name, email. isAdmin, token
        const { data } = await axios.post(
            '/api/users/login',
            { email, password },
            config
        )
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        // catch part is the same between different actions
        dispatch({
            type: USER_LOGIN_FAIL,
            // check if the error exists, if so, return that message, or return a general message
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

// logout action
// linked to Header.js file, when user click 'logout'
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        })
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        // below the input data
        // is from userController - authUser, which is the res.json that contains id, name, email. isAdmin, token
        const { data } = await axios.post(
            '/api/users',
            { name, email, password },
            config
        )
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        })

        // after register, also login user
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        // catch part is the same between different actions
        dispatch({
            type: USER_REGISTER_FAIL,
            // check if the error exists, if so, return that message, or return a general message
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.get(`/api/users/${id}`, config)
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        // catch part is the same between different actions
        dispatch({
            type: USER_DETAILS_FAIL,
            // check if the error exists, if so, return that message, or return a general message
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.put(`/api/users/profile`, user, config)
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        })

        // bug fix: user name nav bar
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        // catch part is the same between different actions
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            // check if the error exists, if so, return that message, or return a general message
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
