import React , {useEffect , useState} from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { user } from '../actions/userActions'

import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'

const LoginScreen = ({location , history}) => {
    const [email, setEmail]        = useState('')
    const [password, setPassword]  = useState('')
    const redirect  = location.search ? location.search.split('=')[1] : '/' ; 
    const dispatch  = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {loading  , userInfo , error } = userLogin

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }   
    }, [history , userInfo , redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        //Dispatch Login
        dispatch(user(email , password))
    }

    return (
        <FormContainer>
            
            <div>
                <h1>Sign in</h1>
                { error &&  <Message variant="danger">{error}</Message>  }
                { loading && <Loader/> }
                <Form onSubmit= {submitHandler} >
                    <Form.Group controlId="email">
                        <Form.Label> Email Address </Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" value={email} onChange= {(e)=> setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="password" className="mt-4">
                        <Form.Label> Password </Form.Label>
                        <Form.Control type="password" placeholder="Enter password" value={password} onChange= {(e)=> setPassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Button type="submit" style={{marginTop:"15px"}} variant="primary" > Sign In</Button>

                </Form>

                <Row className="py-3" >
                    <Col>
                        New Customer ? <Link to={redirect !== '/' ? `/register?redirect=${redirect}` : '/register'}> Register </Link>
                    </Col>
                </Row> 
            </div>

        </FormContainer>
        
    )
}

export default LoginScreen
