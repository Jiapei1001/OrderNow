import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import Message from '../component/Message'
import Loader from '../component/Loader'
import { listOrders } from '../actions/orderActions'

const OrderListScreen = ({ history }) => {
    const dispatch = useDispatch()

    // from the store.js
    const orderList = useSelector((state) => state.orderList)
    const { loading, error, orders } = orderList

    // to avoid the admin still shows
    // when the admin is logged out
    // to avoid ordinary user access to the user admin screen
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    // dispatch userActions
    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        }
        // when someone is not admin, and input api/admin/userlist
        else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])

    return (
        <>
            <h1>Orders</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    {/* table head */}
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    {/* table body */}
                    <tbody>
                        {/* from the upper 'users' variable from 'userList'  */}
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice}</td>

                                <td>
                                    {order.isPaid ? (
                                        order.paidAt.substring(0, 10)
                                    ) : (
                                        <i
                                            className='fas fa-times'
                                            style={{ color: 'red' }}
                                        ></i>
                                    )}
                                </td>

                                <td>
                                    {order.isDelivered ? (
                                        order.deliveredAt.substring(0, 10)
                                    ) : (
                                        <i
                                            className='fas fa-times'
                                            style={{ color: 'red' }}
                                        ></i>
                                    )}
                                </td>

                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button
                                            variant='light'
                                            className='btn-sm'
                                        >
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default OrderListScreen
