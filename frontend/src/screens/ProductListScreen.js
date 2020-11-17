import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap'
import Message from '../component/Message'
import Loader from '../component/Loader'
import Paginate from '../component/Paginate'
import {
    listProducts,
    deleteProduct,
    createProduct,
} from '../actions/productActions'

import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListScreen = ({ history, match }) => {
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    // productList from the store.js
    // assigned from productListReducer
    const productList = useSelector((state) => state.productList)
    const { loading, error, products, pages, page } = productList

    // productDelete coming from store.js, where productDeleteReducer is assigned to productDelete
    // state is stored from store.js
    const productDelete = useSelector((state) => state.productDelete)
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete

    const productCreate = useSelector((state) => state.productCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate

    // to avoid the admin still shows
    // when the admin is logged out
    // to avoid ordinary user access to the user admin screen
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    // dispatch userActions
    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            // the first one is keyword, as empty string
            dispatch(listProducts('', pageNumber))
        }
    }, [
        dispatch,
        history,
        userInfo,
        successDelete,
        successCreate,
        createdProduct,
        pageNumber,
    ])

    const deleteHandler = (id) => {
        // pop up a window to confirm
        if (window.confirm('Are you sure?')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        //create product
        dispatch(createProduct())
    }

    return (
        <>
            <Row className='algn-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        className='table-sm'
                    >
                        {/* table head */}
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEOGRY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        {/* table body */}
                        <tbody>
                            {/* from the upper 'users' variable from 'userList'  */}
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer
                                            to={`/admin/product/${product._id}/edit`}
                                        >
                                            <Button
                                                variant='light'
                                                className='btn-sm'
                                            >
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant='danger'
                                            clas='btn-sm'
                                            onClick={() =>
                                                deleteHandler(product._id)
                                            }
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate pages={pages} page={page} isAdmin={true} />
                </>
            )}
        </>
    )
}

export default ProductListScreen
