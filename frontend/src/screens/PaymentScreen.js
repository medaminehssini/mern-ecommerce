import React, { useEffect, useState } from 'react'
import { Button, Form  , Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'


const PaymentScreen = ({history}) => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress } = cart
    
    const [paymentMethod, setPaymentMethod] = useState('PayPal')


    const dispatch = useDispatch()

    useEffect(() => {
        if(!shippingAddress.address) {
            history.push('/shipping')
        }
    }, [shippingAddress , history ])

    const submitHandler = (e) => {
            e.preventDefault()
            dispatch(savePaymentMethod(paymentMethod))
            history.push('/placeorder')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h2>Payment method </h2>
            <Form onSubmit={(e)=>submitHandler(e)}>
                <Form.Group controlId="address">
                    <Form.Label as="legend"> Select Method </Form.Label>
                    <Col>
                        <Form.Check type="radio" label="PayPal or Credit Card" id="PayPal" name="paymentMethod" value="PayPal" checked onChange={(e)=>setPaymentMethod(e.target.value)} ></Form.Check>
                        {/* <Form.Check type="radio" label="Stripe"                id="Stripe" name="paymentMethod" value="Stripe" checked onChange={(e)=>setPaymentMethod(e.target.value)} ></Form.Check> */}
                    </Col>
                </Form.Group>

            
                <Button type="submit" variant="primary" className="mt-3"> Continue </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen


