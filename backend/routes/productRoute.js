import express from 'express'
import {
    getProductById,
    getProducts,
} from '../controllers/productController.js'

// the below two lines have been moved to controllers
// to use the handler to wrap attached, similar as try catch
// import asyncHandler from 'express-async-handler'
// import Product from '../models/productModel.js'
const router = express.Router()

router.route('/').get(getProducts)
// router.get('/', getProducts)

router.route('/:id').get(getProductById)
// router.get('/:id', getProductById)

export default router

// Below have been moved to productController.js

/*
// @desc  fetch all products
// @route Get /api/products
// @access  Public
router.get(
    '/',
    asyncHandler(async (req, res) => {
        const products = await Product.find({})
        // for test HomeScreen errors
        res.json(products)
    })
)

// @desc  fetch single products
// @route Get /api/products/:id
// @access  Public
router.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id)
        if (product) {
            res.json(product)
        } else {
            res.status(404)
            throw new Error('Product not found')
            // below is the default method, when there is no customized error catcher 'errorMiddleWare.js'
            // res.status(404).json({ message: 'Product not found' });
        }
    })
)

export default router
*/
