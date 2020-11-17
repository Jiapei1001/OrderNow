import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc  fetch all products
// @route Get /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    // pagination
    const pageSize = 6
    const page = Number(req.query.pageNumber) || 1

    // search specific keyword
    const keyword = req.query.keyword
        ? {
              name: {
                  $regex: req.query.keyword,
                  // set regex as case insensitive
                  $options: 'i',
              },
          }
        : {}

    // count
    const count = await Product.countDocuments({ ...keyword })

    // limit searched product only show pageSize constant
    // skip the others
    const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))

    // for test HomeScreen errors
    res.json({ products, page, pages: Math.ceil(count / pageSize) })
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

// @desc  delete a product
// @route Delete /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({ message: 'Product removed' })
    } else {
        res.status(404)
        throw new Error('Product not found')
        // below is the default method, when there is no customized error catcher 'errorMiddleWare.js'
        // res.status(404).json({ message: 'Product not found' });
    }
})

// @desc  create a product
// @route POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/image/sample.jpg',
        brand: 'sample brand',
        category: 'sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'sample description',
    })
    // save the newly created product
    const createdProduct = await product.save()
    // send the newly created product back
    res.status(201).json(createdProduct)
})

// @desc  update a product
// @route PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
    } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        // update the newly created product
        const updatedProduct = await product.save()
        // send the newly created product back
        res.status(201).json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc  Create new review
// @route POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        // check if the user has already created a review
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        )
        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }

        // create new review
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }
        // update product's reviews
        product.reviews.push(review)

        // update number of reviews
        product.numReviews = product.reviews.length

        // update total rating, update average
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length

        await product.save()
        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc  Get top rated products
// @route GET /api/products/top
// @access  Private
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)

    res.json(products)
})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts,
}
