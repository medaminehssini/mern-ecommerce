import React, { useEffect } from 'react'
import {  Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader   from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

export const HomeScreen = ({match}) => {

    const keyword = match.params.keyword 
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList) ; 
    const {loading , error , products , page , pages} = productList
    useEffect(() => {
        dispatch(listProducts(keyword , pageNumber));
    },  [dispatch ,keyword , pageNumber ] )


    return (
        <>
            <Meta   />
            {!keyword && <ProductCarousel />}
            <h1 className="mb-5 mt-5 text-center"> Product List </h1> 

            {
                loading ? <Loader/> : error ? <Message variant="danger"   > {error} </Message> : 
                <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={4} lg={3} className="mb-3">
                            <Product product={product} />
                        </Col>
                    ))}
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}  />
                </Row>
            }
        </>
    )
}

export default HomeScreen;