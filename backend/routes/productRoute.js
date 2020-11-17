import express from 'express'
import {
    getProductById,
    getProducts,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleWare.js'

// the below two lines have been moved to controllers
// to use the handler to wrap attached, similar as try catch
// import asyncHandler from 'express-async-handler'
// import Product from '../models/productModel.js'
const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)
// router.get('/', getProducts)

router.get('/top', getTopProducts)
router.route('/:id/reviews').post(protect, createProductReview)

// get product by id
// delete product by id
router
    .route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct)

export default router
