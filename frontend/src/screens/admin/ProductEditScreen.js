import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listProductDetails, updateProduct } from '../../actions/productActions'
import FormContainer from '../../components/FormContainer'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { PRODUCT_RESET, PRODUCT_UPDATE_RESET } from '../../constants/productConstants'

const ProductEditScreen = ({match , history }) => {
    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState("")
    const [uploading, setUploading] = useState(false)


    const productDetails = useSelector(state => state.productDetails)
    const {loading  , error  , product } =  productDetails

    const dispatch = useDispatch()

    const productUpdate = useSelector(state => state.productUpdate)
    const {loading:loadingUpdate , error: errorUpdate , success:successUpdates } = productUpdate 

    useEffect(() => {
        if(successUpdates) {
            dispatch({type:PRODUCT_UPDATE_RESET})
            dispatch({type:PRODUCT_RESET})

            history.push('/admin/product/list')
        }else {
            if( !product || !product.name || product._id !== productId )
            {
   
                dispatch(listProductDetails(productId))
            }else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
       
    }, [  productId , dispatch , product ,  successUpdates, history  ])
 
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({_id:productId , price ,name  , image , brand , category ,countInStock ,  description }))
      
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image' , file)
        setUploading(true)
        try {
            const config = {
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            }

            const {data} = await axios.post('/api/upload' , formData , config)
            setImage(data)
            setUploading(false)

        } catch (error) {
            console.log(error.message)
            setUploading(false)

        }
    }

    return (
        <>
            <Link to={`/admin/product/list`}>Go back</Link>
            <FormContainer>
                <h1>Edit Product</h1>
                { loadingUpdate &&  <Loader/>}
                { errorUpdate &&  <Message variant="danger">{errorUpdate}</Message>}
                { loading ? <Loader/>  : error ? <Message variant="danger">{error}</Message>  : (
                <Form onSubmit= {submitHandler} >

                    <Form.Group controlId="name">
                        <Form.Label> Name </Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" value={name} onChange= {(e)=> setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label> Price </Form.Label>
                        <Form.Control type="number" placeholder="Enter price" value={price} onChange= {(e)=> setPrice(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="image">
                        <Form.Label> Image </Form.Label>
                        <Form.Control type="text" placeholder="Enter image" value={image} onChange= {(e)=> setImage(e.target.value)}></Form.Control>
                        <Form.Control type="file" className="form-control my-2"  accept="image/*"  label="choose image"  onChange= {(e)=>{ uploadFileHandler(e)}}></Form.Control>
                        {uploading && <Loader/>}
                    </Form.Group>
                    <Form.Group controlId="brand">
                        <Form.Label> Brand </Form.Label>
                        <Form.Control type="text" placeholder="Enter brand" value={brand} onChange= {(e)=> setBrand(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="category">
                        <Form.Label> Category </Form.Label>
                        <Form.Control type="text" placeholder="Enter category" value={category} onChange= {(e)=> setCategory(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="countInStock">
                        <Form.Label> Count In Stock </Form.Label>
                        <Form.Control type="number" placeholder="Enter Count In Stock" value={countInStock} onChange= {(e)=> setCountInStock(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label> Description </Form.Label>
                        <Form.Control type="text" placeholder="Enter description" value={description} onChange= {(e)=> setDescription(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Button type="submit" style={{marginTop:"15px"}} variant="primary" > Update </Button>

                </Form>    ) }            
            </FormContainer>        
        </>
    )
}

export default ProductEditScreen
