import React, { useEffect, useState } from 'react'
import {  Col, Form, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader   from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate';

export const ProductSearchScreen = ({match}) => {

    const [keyword, setKeyword] = useState(match.params.keyword ? match.params.keyword : '' )
    const pageNumber = match.params.pageNumber || 1
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [maxPrice, setMaxPrice] = useState("")
    const [minPrice, setMinPrice] = useState('')


    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList) ; 
    const {loading , error , products , page , pages} = productList
    useEffect(() => {
        dispatch(listProducts(keyword , pageNumber , brand , category , minPrice , maxPrice ));
    },  [dispatch ,keyword , pageNumber  , brand , category , maxPrice , minPrice] )

    const keywordHandler =  (e) => {
        setKeyword(e.target.value)
    }

    return (
        <>
            <Row>
                <Col md={3}>
                    <Form>
                        <Form.Group className="my-3">
                            <Form.Label>
                                Name
                            </Form.Label>
                            <Form.Control type="text" value={keyword} onChange={  keywordHandler }>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="my-3">
                            <Form.Label>
                                Brand
                            </Form.Label>
                            <Form.Control as="select" onChange={ (e) =>  setBrand(e.target.value)}>
                                <option value=""> Choose brand </option>
                                <option value="apple"> Apple </option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="my-3">
                            <Form.Label>
                                Category
                            </Form.Label>
                            <Form.Control as="select" onChange={ (e) =>  setCategory(e.target.value)}>
                                <option value="" > Choose category </option>
                                <option value="apple"> Apple </option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="my-3">
                            <Form.Label>
                                Price
                            </Form.Label>
                            <Row>
                                <Col md={5}>
                                    <Form.Control type="number" min="0" value={minPrice} onChange={ (e) =>  setMinPrice((e.target.value))}>
                                    </Form.Control>
                                </Col> 
                                <Col md={2} style={{    display: 'flex',  justifyContent : 'center' , flexDirection: "column"}}>
                                    <p style = {{ margin:'0' , textAlign:'center' }}>
                                        -
                                    </p>
                                </Col>
                                <Col md={5}>
                                    <Form.Control type="number"  min="0"  value={maxPrice} onChange={ (e) =>  setMaxPrice((e.target.value))}>
                                    </Form.Control>
                                </Col>
                            </Row>

                        </Form.Group>

                    </Form>
                  

                </Col>
                <Col md={9}>
                   { 
                        loading ? <Loader/> : error ? <Message variant="danger"   > {error} </Message> : 
                        <Row>
                            {products.map(product => (
                                <Col key={product._id} sm={12} md={4} lg={4} className="mb-3">
                                    <Product product={product} />
                                </Col>
                            ))}
                            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}  />
                        </Row>
                    }
                </Col>
            </Row>
        </>
    )
}

export default ProductSearchScreen;