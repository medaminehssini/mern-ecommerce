import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userRegister } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'

const RegisterScreen = ({history , location}) => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const redirect  = location.search ? location.search.split('=')[1] : '/' ; 
    const userRegist = useSelector(state => state.userRegister)
    const {loading , userInfo , error  } = userRegist 
    const dispatch = useDispatch()
    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }   
    }, [history , userInfo , redirect])


    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword ) {
            setMessage('Password do not match')
        }else{
            setMessage('')
            dispatch(userRegister(name , email , password ))

        }
    }

    return (
        <FormContainer>
            <h1>Register</h1>
            { error && <Message variant="danger">{error}</Message> }
            { message && <Message variant="danger">{message}</Message> }

            { loading && <Loader/> }
            <Form onSubmit= {submitHandler} >
                <Form.Group controlId="name">
                    <Form.Label> Name </Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" value={name} onChange= {(e)=> setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label> Email Address </Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" value={email} onChange= {(e)=> setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="password" className="mt-4">
                    <Form.Label> Password </Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange= {(e)=> setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword" className="mt-4">
                    <Form.Label> Confirm Password </Form.Label>
                    <Form.Control type="password" placeholder="Enter confirmation password" value={confirmPassword} onChange= {(e)=> setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type="submit" style={{marginTop:"15px"}} variant="primary" > Register</Button>

            </Form>   
            <Row className="py-3" >
                <Col>
                    Have an account ? <Link to={redirect !== '/' ? `/login?redirect=${redirect}` : '/login'}> Login </Link>
                </Col>
            </Row>               
        </FormContainer>
    )
}

export default RegisterScreen
