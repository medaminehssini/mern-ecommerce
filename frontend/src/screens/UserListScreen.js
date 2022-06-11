import React, { useEffect, useState } from 'react'
import {Button, Table} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { deleteUser, getUsers } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader' 
import { sweetAlert, sweetBox } from '../utils/alert'
import { USER_DELETE_RESET } from '../constants/userConstant'

const UserListScreen = ({history}) => {
    const dispatch = useDispatch()
    const [idDeleting, setIdDeleting] = useState(null)
    const userList = useSelector(state => state.userList)
    const {users , loading , error } = userList

    const userDelete = useSelector(state => state.userDelete)
    const {success:successDelete , loading:loadingDelete , error:errorDelete } = userDelete


    const userLogin = useSelector(state => state.userLogin)
    const {userInfo } = userLogin

    useEffect(() => {
        if(successDelete)
        {         
            sweetAlert({type : 'success' , message:'User deleted !' })
            dispatch({type:USER_DELETE_RESET})
        }

    }, [successDelete , dispatch])

    useEffect(() => {
        if(errorDelete)
            sweetAlert({type : 'error' , message:errorDelete })

    }, [errorDelete])

    useEffect(() => {
        if(userInfo && userInfo.isAdmin)
        {     
            setIdDeleting(null)
            dispatch(getUsers())
        }
        else 
            history.push("/")
    }, [dispatch , userInfo , history, successDelete])


    const deleteUserHandler = (id) => {

        sweetBox({name :'Yes' , icon:'warning'  , title : 'Do you want to delete this User ? ' }  ).then( (result) => {
            if(result.isConfirmed) {
                setIdDeleting(id)
                dispatch(deleteUser(id))
            }
        })
    }


    return (
        <>
            <h1>Users List</h1>
             {loading ? <Loader/> : error ? <Message variant ='danger' > {error}</Message> : (
                 <Table striped responsive hover bordered className="table-sm">
                     <thead>
                        <tr>
                            <th> ID </th>
                            <th> Name </th>
                            <th> Email </th>
                            <th> Admin </th>
                            <th> Action </th>
                        </tr>
                     </thead>
                     <tbody>
                         {
                             users.map(user => (
                                 <tr key = {user._id}>
                                     <td>{user._id}</td>
                                     <td>{user.name}</td>
                                     <td> <a href={`mailto${user.email}`}> {user.email} </a> </td>
                                     <td>{user.isAdmin ? <i className="fas fa-check" style={{color:"green"}}></i> : <i className="fas fa-times" style={{color:"red"}}></i>}</td>
                                     <td>
                                        {loadingDelete && idDeleting === user._id ? <Loader/> : 
                                            (
                                            <>
                                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                    <Button variant="light" className="btn-sm">
                                                        <i className="fas fa-edit" ></i>
                                                    </Button>
                                                </LinkContainer>
                                                <Button variant="danger" className="btn-sm mx-2" onClick={()=> {deleteUserHandler(user._id)}}>
                                                    <i className="fas fa-trash"></i>
                                                </Button>
                                            </>
                                            )
                                        }   
                                    </td>
                                 </tr>
                             ))
                         }
                     </tbody>
                 </Table>
             ) }
        </>
    )
}

export default UserListScreen
