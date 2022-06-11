import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { details , updateUser } from '../../actions/userActions'
import FormContainer from '../../components/FormContainer'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { USER_UPDATE_RESET } from '../../constants/userConstant'

const UserEditScreen = ({match , history , location}) => {
    const userId = match.params.id
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const userDetails = useSelector(state => state.userDetails)
    const {loading , user , error  } = userDetails 
    const dispatch = useDispatch()

    const userUpdate = useSelector(state => state.userUpdate)
    const {loading:loadingUpdate , error: errorUpdate , success:successUpdates } = userUpdate 

    useEffect(() => {
        if(successUpdates) {
            dispatch({type:USER_UPDATE_RESET})
            history.push('/admin/user/list')
        }else {
            if( !user || !user.name || user._id !== userId)
            {
                dispatch(details(userId))
            }else {
                setEmail(user.email)
                setName(user.name)
                setIsAdmin(user.isAdmin)
            }
        }
       
    }, [user , userId , dispatch , history , successUpdates ])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id:userId , email ,name  , isAdmin}))
      
    }

    return (
        <>
            <Link to={`admin/user/list`}>Go back</Link>
            <FormContainer>
                <h1>Edit User</h1>
                { loadingUpdate &&  <Loader/>}
                { errorUpdate &&  <Message variant="danger">{errorUpdate}</Message>}
                { loading ? <Loader/>  : error ? <Message variant="danger">{error}</Message>  : (
                <Form onSubmit= {submitHandler} >
                    <Form.Group controlId="name">
                        <Form.Label> Name </Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" value={name} onChange= {(e)=> setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label> Email Address </Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" value={email} onChange= {(e)=> setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="isAdmin">
                        <Form.Check type="checkBox"  checked={isAdmin} label="Is Admin" onChange= {(e)=> setIsAdmin(e.target.checked)}></Form.Check>
                    </Form.Group>
                    <Button type="submit" style={{marginTop:"15px"}} variant="primary" > Edit </Button>

                </Form>    ) }            
            </FormContainer>        
        </>
    )
}

export default UserEditScreen
