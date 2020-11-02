import express from 'express'
import {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleWare.js'

const router = express.Router()
router.post('/login', authUser)
router.route('/').post(registerUser)
// below both route as get for get user profile
// also route as put update user profile
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

export default router
