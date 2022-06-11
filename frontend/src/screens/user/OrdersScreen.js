import React, { useEffect } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { listMyOrders } from '../../actions/orderAction'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import UserMenu from '../../components/UserMenu'

const OrdersScreen = ({history}) => {


    const orderListMy = useSelector(state => state.orderListMy)
    const {loading:loadingOrders , orders , error : errorOrders} = orderListMy

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo   } = userLogin 


    const dispatch = useDispatch()

    useEffect(() => {

        if(!userInfo){
            history.push('/')
        }else {
            console.log("test");
            dispatch(listMyOrders())
        }

    }, [  dispatch , userInfo , history ])

    
    return (
        <Row className="justify-content-center">
            <UserMenu orders ></UserMenu>
            <Col>
            <h2>Orders</h2>
                    {loadingOrders ? <Loader /> :  errorOrders ? <Message variant="danger">{errorOrders}</Message> : 
                        <Table bordered hover striped responsive className="table-sm">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>Delivered</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>
                                            {order._id}
                                        </td>                                       
                                        <td>
                                            {order.createdAt.substring(0,10)}
                                        </td>
                                        <td>
                                            {order.totalPrice}
                                        </td>
                                        <td>
                                            {order.isPaid ? order.paidAt.substring(0,10) : <i className="fas fa-times" style={{color:"red"}}></i> }
                                        </td>
                                        <td>
                                            {order.isDelivered ? order.deliveredAt.substring(0,10) : <i className="fas fa-times" style={{color:"red"}}></i> }
                                        </td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button className="btn-sm" variant="light" >Details</Button>
                                            </LinkContainer>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    }
            </Col>
        </Row>
    )
}

export default OrdersScreen
