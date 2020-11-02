import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc  fetch all products
// @route Get /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    // for test HomeScreen errors
    res.json(products)
})

// @desc  fetch single products
// @route Get /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
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

export { getProducts, getProductById }