import Order from '../models/OrderModel.js'
import asyncHandler from 'express-async-handler';



//@desc   Create new Order
//@routes POST api/orders
//@access private
const addOrderItems =  asyncHandler( async (req , res ) => {
    const {orderItems , shippingAddress , paymentMethod  , itemsPrice , shippingPrice , taxPrice , totalPrice } = req.body
    
    if ( orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error ('No order items')
    }else {
        const order = new Order ({
            orderItems ,
            user: req.user._id,
            shippingAddress , 
            paymentMethod  , 
            itemsPrice , 
            shippingPrice , 
            taxPrice , 
            totalPrice
        })

        const createdOrder = await order.save()
        res.status(201)
        res.json(createdOrder) 
    }
   
}) 

//@desc   GET Order by id
//@routes get api/orders/:id
//@access private

const getOrderById =  asyncHandler( async (req , res ) => {
    const order = await Order.findById(req.params.id).populate('user' , 'name email')
    
    if (order) {
        res.json(order)
    }else {
        res.status(404)
        throw new Error ('Order not found')
    }
   
}) 

//@desc   Update Order to paid
//@routes get api/orders/:id/pay
//@access private

const updateOrderToPaid =  asyncHandler( async (req , res ) => {
    const order = await Order.findById(req.params.id)
     
    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id             : req.body.id , 
            status         : req.body.status , 
            update_time    : req.body.update_time , 
            email_address  : req.body.payer.email_address , 
        }
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }else {
        res.status(404)
        throw new Error ('Order not found')
    }
   
}) 


//@desc   Update Order to delivered
//@routes get api/orders/:id/deliver
//@access private/admin

const updateOrderToDelivered =  asyncHandler( async (req , res ) => {
    const order = await Order.findById(req.params.id)
     
    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }else {
        res.status(404)
        throw new Error ('Order not found')
    }
   
}) 


//@desc  Get logged in user orders
//@routes get api/orders/myorders
//@access private

const getMyOrders =  asyncHandler( async (req , res ) => {
    const orders = await Order.find({user : req.user._id})
    res.json(orders)
}) 

//@desc  Get all orders
//@routes get api/orders
//@access private/admin

const getOrders =  asyncHandler( async (req , res ) => {
    const orders = await Order.find({}).populate('user' , 'id name')
    res.json(orders)
}) 



export {addOrderItems , getOrderById , updateOrderToPaid , getMyOrders , getOrders , updateOrderToDelivered}