import React, { useState ,  useEffect } from 'react'
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Rating from '../components/Rating';
import { createReview, listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import { sweetAlert } from '../utils/alert';
import  Meta  from '../components/Meta';

export const ProductScreen = ({history , match}) => {

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState("")

    const dispatch = useDispatch()

    const productResult = useSelector(state => state.productDetails)
    const {   loading , error ,product } = productResult

    const userLogin = useSelector(state => state.userLogin)
    const {   userInfo  } = userLogin

    const reviewCreate = useSelector(state => state.reviewCreate)
    const {   loading:loadingCreate , error:errorCreate ,success:successCreate } = reviewCreate

    useEffect(() => {

        if(successCreate) {
            sweetAlert({type:"success" , message:'Review Submitted ! '})
            setComment('')
            setRating(0)
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        }
      
        dispatch(listProductDetails(match.params.id))


    },  [match , dispatch , successCreate ] )
    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createReview(match.params.id , {name:userInfo.name  , comment , rating}))
    }

    return (
        <>
            
            {
                loading ? <Loader /> : error ? <Message variant='danger'> {error} </Message> : 
                (
                <>
                    <Meta  title={product.name}  description={product.description} keyword={` ${product.name} , ${product.description} , ${product.brand} , ${product.category}  `} />
                    <Row>
                        <Col sm={12} md={5} >
                            <Image src={product.image} alt={product.name} width='100%' /> 
                        </Col>
                        <Col sm={12} md={7} >
                            
            
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h1>{product.name}</h1>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <p>
                                        {product.description}
                                    </p>
                                    <Col  className="text-end">
                                        <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
                                    </Col>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col md={6} className="text-star">
                                            <span>Price : </span>
                                        </Col>
                                        <Col  md={6} className="text-end">
                                            <h3>${product.price}</h3>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col  md={6} className="text-start"> 
                                            <span>Status : </span>
                                        </Col>
                                        <Col  md={6} className="text-end">
                                        <span> {product.countInStock > 0 ? 'En stock' : 'Out of stock' } </span>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {product.countInStock > 0 && (

                                    <ListGroup.Item>
                                        <Row>
                                            <Col md={10} className="text-start" >
                                                <span>Quantity : </span>
                                            </Col>
                                            <Col  md={2} className="text-end" >
                                                <Form.Control  as='select' value={qty} onChange={(e)=> setQty(e.target.value)}>
                                                { [...Array(product.countInStock ).keys()].map(x => (
                                                    <option key={x+1} value={x+1}>{x+1}</option>
                                                ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}

                                <ListGroup.Item>
                                    <Col  md={12} className="text-end">
                                        <Button onClick={addToCartHandler}
                                        disabled={ product.countInStock === 0 }>Add to Cart</Button>
                                    </Col>
                                </ListGroup.Item>
                            </ListGroup>


                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h2  className="my-5" >Reviews</h2> 
                            {product.reviews?.length === 0 && <Message variant="info"> No reviews </Message>}   
                            <ListGroup variant="flush" >
                            {
                                product.reviews?.map(review => (
                                    <ListGroup.Item key={review._id}  className="my-2" >
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} ></Rating>
                                        <p>{review.createdAt.substring(0,10)}</p>
                                        <p> { review.comment } </p>
                                    </ListGroup.Item>
                                ))
                            }
                            <ListGroup.Item className="my-4" >
                                <h2> Write Customer review </h2>
                                {loadingCreate && <Loader/>}
                                {errorCreate && <Message variant="danger" > {errorCreate} </Message>}
                                {userInfo ? ( 
                                    <Form onSubmit={(e) => submitHandler(e) }>
                                        <Form.Group>
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control as="select" value={rating} onChange={(e)=>setRating(e.target.value)} > 
                                                <option> Choose rating ... </option>
                                                <option value="1"> 1-poor </option>
                                                <option value="2"> 2-fair </option>
                                                <option value="3"> 3-good </option>
                                                <option value="4"> 4-very good </option>
                                                <option value="5"> 5-excellent </option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="comment">
                                            <Form.Label>Comment</Form.Label>
                                                <Form.Control as="textarea" value={comment} onChange={(e)=>setComment(e.target.value)}>
                                                </Form.Control>
                                        </Form.Group>
                                        <Button type="submit" variant="primary" className="my-2"> Submit </Button>
                                    </Form>
                                 ) : <Message variant="info"> Please <Link to="/login"> Login </Link> to write a review   </Message> }
                            </ListGroup.Item>
                            </ListGroup>                  
                        </Col>
                    </Row>
                </>
                )}
        </>
    )
}

export default ProductScreen 
