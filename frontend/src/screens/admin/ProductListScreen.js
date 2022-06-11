import React, { useEffect, useState } from 'react'
import {Button, Col, Row, Table} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader' 
import { sweetAlert, sweetBox } from '../../utils/alert'
import { createProduct, deleteProduct, listProducts } from '../../actions/productActions'
import {  PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../../constants/productConstants'
import Paginate from '../../components/Paginate'

const ProductListScreen = ({history , match }) => {

    const dispatch = useDispatch()
    const pageNumber = match.params.pageNumber || 1
    const [idDeleting, setIdDeleting] = useState(null)
    const productList = useSelector(state => state.productList)
    const {products , loading , error , pages , page } = productList

    const productDelete = useSelector(state => state.productDelete)
    const {loading: loadingDelete , success: successDelete , error: errorDelete} = productDelete


    const userLogin = useSelector(state => state.userLogin)
    const {userInfo } = userLogin

    const productCreate = useSelector(state => state.productCreate)
    const {loading: loadingCreate , success: successCreate , error: errorCreate , product:createdProduct } = productCreate


    useEffect(() => {
        if(successDelete)
        {         
            sweetAlert({type : 'success' , message:'Product deleted !' })
            dispatch({type:PRODUCT_DELETE_RESET})
        }

    }, [successDelete , dispatch])

    useEffect(() => {
        if(errorDelete)
            sweetAlert({type : 'error' , message:errorDelete })

    }, [errorDelete])

    useEffect(() => {
        dispatch ({type:PRODUCT_CREATE_RESET})
        if(!userInfo.isAdmin)
        {   
            history.push("/")  

        } 
        
        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else{
            setIdDeleting(null)
            dispatch(listProducts('' , pageNumber))
        }

    }, [dispatch , userInfo , history ,successDelete , successCreate , pageNumber , createdProduct ])


    const deleteProductHandler = (id) => {

        sweetBox({name :'Yes' , icon:'warning'  , title : 'Do you want to delete this Product ? ' }  ).then( (result) => {
            if(result.isConfirmed) {
                setIdDeleting(id)
                dispatch(deleteProduct(id))
            }
        })
    }

    const createProductHandler =  () => {
        dispatch(createProduct({}))
    }


    return (
        <>
            <Row className="align-items-center">
                <Col md={9}>
                    <h1>Products List</h1>
                </Col>
                <Col className="text-end " md={3}>   
                    <Button className="my-3" onClick={createProductHandler}> <i className="fas fa-plus"> </i> Create Product</Button>
                </Col >
            </Row>
            
            {loadingCreate && <Loader/>} 
            {errorCreate && <Message variant ='danger' > {errorCreate}</Message> }

            {loading ? <Loader/> : error ? <Message variant ='danger' > {error}</Message> : (
            <>
                 <Table striped responsive hover bordered className="table-sm">
                     <thead>
                        <tr>
                            <th> ID </th>
                            <th> Name </th>
                            <th> Price </th>
                            <th> Category </th>
                            <th> Brand </th>
                            <th> Action </th>
                        </tr>
                     </thead>
                     <tbody>
                         {
                             products.map(product => (
                                 <tr key = {product._id}>
                                     <td>{product._id}</td>
                                     <td>{product.name}</td>
                                     <td> ${product.price} </td>
                                     <td>{product.category}</td>
                                     <td>{product.brand}</td>
                                     <td>
                                        {loadingDelete && idDeleting === product._id ? <Loader/> : 
                                            (
                                            <>
                                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                    <Button variant="light" className="btn-sm">
                                                        <i className="fas fa-edit" ></i>
                                                    </Button>
                                                </LinkContainer>
                                                <Button variant="danger" className="btn-sm mx-2" onClick={()=> {deleteProductHandler(product._id)}}>
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
                 <Paginate pages={pages}  page={page} isAdmin="true">

                 </Paginate>

            </>
             ) }
        </>
    )
}

export default ProductListScreen
