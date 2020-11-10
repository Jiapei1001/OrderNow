import express from 'express'
import {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleWare.js'

const router = express.Router()
router.post('/login', authUser)
// after post registerUser
// add getUsers
// their routes are the same
// add protect as well as admin to getUsers
router.route('/').post(registerUser).get(protect, admin, getUsers)
// below both route as get for get user profile
// also route as put update user profile
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

// delete an user
// get an user by id
// update user
router
    .route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)

export default router
