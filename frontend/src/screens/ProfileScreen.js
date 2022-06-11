import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { details, updateUserProfile } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import UserMenu from '../components/UserMenu'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstant'
const ProfileScreen = ({history}) => {


    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const userDetails = useSelector(state => state.userDetails)
    const {loading , user , error  } = userDetails 
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo   } = userLogin 

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile



    useEffect(() => {

        if(!userInfo){
            history.push('/')
        }else {
           if (!user || !user?.name || success ) {

                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(details('profile'))
                
           } else {

                setEmail(user.email)
                setName(user.name)
           }
        }

    }, [dispatch , history , userInfo , user , success ])


    const submitHandler = (e) => {
        e.preventDefault()
        
        if(password !== confirmPassword ) {
            setMessage('Password do not match')
        }else{
            setMessage('')
        
            dispatch(updateUserProfile({_id : user._id  , name  , email  , password }))
           
        }
    }


    return (
        <Row className="justify-content-center">
            <UserMenu editProfile ></UserMenu>
            <Col md="7" >
            
                <h2>User Profile</h2>
                { error && <Message variant="danger">{error}</Message> }
                { message && <Message variant="danger">{message}</Message> }
                { success && <Message variant="success">Profile Updated </Message> }

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
            </Col>            
        </Row>
    )
}

export default ProfileScreen
