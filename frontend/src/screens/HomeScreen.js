import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../component/Product'
import Message from '../component/Message'
import Loader from '../component/Loader'
// import axios from 'axios', no need of axios here, as import axios from reducer
import Paginate from '../component/Paginate'
import ProductCarousel from '../component/ProductCarousel'
import Meta from '../component/Meta'
import { listProducts } from '../actions/productActions'

const HomeScreen = ({ match }) => {
    // search keyword
    const keyword = match.params.keyword

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    // from store.js to select the product
    const productList = useSelector((state) => state.productList)
    const { loading, error, products, pages, page } = productList

    // pass in the keyword
    // the function is detailed in productActions
    // add search keyword as dependency
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    console.log(products)

    return (
        <>
            <Meta />
            {!keyword ? (
                <ProductCarousel />
            ) : (
                <Link to='/' className='btn btn-light'>
                    Go Back
                </Link>
            )}
            <h1>Latest Products</h1>
            {/* this step is only a try catch,  if there is an error, print loading, else, show the products  */}
            {/* the Loader and Message is imported from ./component/ */}
            {/* can be tested through ../backend/routes/productRoute the router.get() */}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        pages={pages}
                        page={page}
                        keyword={keyword ? keyword : ''}
                    />
                </>
            )}
        </>
    )
}

export default HomeScreen
