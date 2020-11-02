import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../component/Product'
import Message from '../component/Message'
import Loader from '../component/Loader'
// import axios from 'axios', no need of axios here, as import axios from reducer
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {
    const dispath = useDispatch()

    // from store.js to select the product
    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispath(listProducts())
    }, [dispath])

    // below is what it is before using reducer, productActions

    // const [products, setProducts] = useState([])
    // useEffect(() => {
    //     dispath(listProducts())
    //     const fetchProducts = async () => {
    //       const { data } = await axios.get('/api/products')
    //       setProducts(data)
    //     }
    //     fetchProducts()
    // }, [])

    return (
        <>
            <h1>Latest Products</h1>
            {/* this step is only a try catch,  if there is an error, print loading, else, show the products  */}
            {/* the Loader and Message is imported from ./component/ */}
            {/* can be tested through ../backend/routes/productRoute the router.get() */}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}

export default HomeScreen
