import React, { useEffect, useState } from 'react'
import {  Row ,Col , Image , ListGroup , Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {  deliverOrder, getOrderDetails, payOrder } from '../actions/orderAction'
import Message from '../components/Message'
import Loader from '../components/Loader'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import { ORDER_PAY_RESET , ORDER_DELIVER_RESET } from '../constants/orderConstants'

const OrderScreen = ({match , history}) => {

    const orderID = match.params.id 
    const [sdkReady, setSdkReady] = useState(false)

   const dispatch = useDispatch()
   const orderDetails = useSelector(state => state.orderDetails)
   const  {loading   , error , order} = orderDetails

   const orderPay = useSelector(state => state.orderPay)
   const  {loading:loadingPay   , success:successPay } = orderPay

   const orderDeliver = useSelector(state => state.orderDeliver)
   const  {loading:loadingDeliver   , success:successDeliver } = orderDeliver

   const userLogin = useSelector(state => state.userLogin)
   const  {userInfo } = userLogin



    if(!loading && order)
        order.itemsPrice =  order.orderItems.reduce((acc, item ) => acc + item.price * item.qty , 0)
    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }
        const addPayPalScript = async () => {
            const {data : clientId} = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.async = true 
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.onload =  () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if(!order || order._id !== orderID || successPay || successDeliver){
            dispatch({type:ORDER_PAY_RESET})
            dispatch({type:ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderID))
        }else if ( ! order.isPaid ) {
            if (!window.paypal) {
                addPayPalScript()
            }else{
                setSdkReady(true)
            }
        }

    }, [dispatch , orderID , successPay , order  , successDeliver , userInfo , history])




    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
        dispatch(payOrder(orderID , paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(orderID))
    }

    return (
       <>

        { loading ? <Loader/> : error ? <Message variant="danger"> {error} </Message> :
            <Row>
                <h1>Order {order._id}</h1>
                <Col md={8}>
                    {loading && <Loader />}
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <strong>Name  : </strong> {order.user.name} <br></br>
                            <strong>Email  : </strong> <a href={`mailto:${order.user.email}`}> {order.user.email}</a>
                              
                            <p>
                                <strong>Address : </strong> 
                                {order.shippingAddress.address} , {order.shippingAddress.city}  {order.shippingAddress.postalCode} , {order.shippingAddress.country} 
                            </p>
                            {order.isDelivered ? <Message variant="success" >Delivered on {order.deliveredAt} </Message> : <Message variant="danger">Not Delivered</Message>}

                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>    
                                <strong>Method :  </strong> 
                                {order.paymentMethod}
                            </p>

                            {order.isPaid ? <Message variant="success" >Paid on {order.paidAt} </Message> : <Message variant="danger">Not Paid</Message>}

                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message> Order is empty </Message> : 
                            (
                                <ListGroup variant = "flush" className="mt-4">
                                    {order.orderItems.map((item , index) => (
                                        <ListGroup.Item key={index} >
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col >
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                        {item.qty} x ${item.price} = {item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                     ) )}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Items
                                    </Col>
                                    <Col>
                                        ${order.itemsPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Shipping
                                    </Col>
                                    <Col>
                                        ${order.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Tax 
                                    </Col>
                                    <Col>
                                        ${order.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total
                                    </Col>
                                    <Col>
                                        ${order.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item> 
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader/>}
                                    {!sdkReady ? <Loader/> :
                                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />

                                    }
                                </ListGroup.Item>
                            )}
                            {loadingDeliver && <Loader/>}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && <ListGroup.Item className="m-auto">
                                <Button type="button" className="btn-block w-100" onClick={deliverHandler}>
                                     Mark as delivered
                                </Button>
                            </ListGroup.Item> }
                        </ListGroup>
                    </Card> 
                </Col>
            </Row>
        }
       
       </>
    )
}

export default OrderScreen
