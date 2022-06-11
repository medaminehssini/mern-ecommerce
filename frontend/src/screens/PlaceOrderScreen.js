import React, { useEffect } from 'react'
import { Button , Row ,Col , Image , ListGroup , Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderAction'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { ORDER_CREAT_RESET } from '../constants/orderConstants'


const PlaceOrderScreen = ({history}) => {

    const cart = useSelector(state => state.cart)

    const addDecimal = (num ) => {
        return (Math.round(num*100)/100).toFixed(2)
    }

    //calculate prices
   cart.itemsPrice =  addDecimal(cart.cartItems.reduce((acc, item ) => acc + item.price * item.qty , 0))
   cart.shippingPrice = addDecimal(cart.itemsPrice > 1000 ? 0 : 50 )
   cart.taxPrice =       addDecimal( Number( cart.itemsPrice * 0.15 ))
   cart.totalPrice = addDecimal (Number(cart.taxPrice) +Number(cart.shippingPrice ) +Number(cart.itemsPrice))

   const dispatch = useDispatch()
   const orderCreate = useSelector(state => state.orderCreate)
    const  {loading  , success , error , order} = orderCreate

    useEffect(() => {
        if(success) {
            
            history.push(`/order/${order._id}`)
            dispatch( {
                type : ORDER_CREAT_RESET
            })
        }
        // eslint-disable-next-line 
    }, [history , success, order])

    const placeOrderHandler = () => {

        dispatch(createOrder({
            orderItems      :  cart.cartItems , 
            itemsPrice      :  cart.itemsPrice, 
            shippingPrice   :  cart.shippingPrice, 
            totalPrice      :  cart.totalPrice, 
            shippingAddress :  cart.shippingAddress, 
            paymentMethod   :  cart.paymentMethod, 
            
        }))

    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    {loading && <Loader />}
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address : </strong> 
                                {cart.shippingAddress.address} , {cart.shippingAddress.city}  {cart.shippingAddress.postalCode} , {cart.shippingAddress.country} 
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method :  </strong> 
                            {cart.paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message> Your Cart is empty </Message> : 
                            (
                                <ListGroup variant = "flush" className="mt-4">
                                    {cart.cartItems.map((item , index) => (
                                        <ListGroup key={index}  className="mt-3">
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
                                        </ListGroup>
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
                                        ${cart.itemsPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Shipping
                                    </Col>
                                    <Col>
                                        ${cart.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Tax 
                                    </Col>
                                    <Col>
                                        ${cart.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total
                                    </Col>
                                    <Col>
                                        ${cart.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {
                            error &&
                            <ListGroup.Item>
                                <Message variant="danger">{error}</Message>
                            </ListGroup.Item>
                            }

                            <ListGroup.Item>
                                <Button type="button" className="btn-block" disabled={cart.cartItems === 0} onClick={()=>placeOrderHandler()} >Place Order</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card> 
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen
