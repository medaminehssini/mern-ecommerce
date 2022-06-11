import React , {useEffect} from 'react'
import {  Image} from "react-bootstrap"
import {useDispatch, useSelector } from "react-redux"
import Loader from "./Loader"
import Message from './Message'
import {listTopProduct} from '../actions/productActions'
import { Link } from 'react-router-dom'




import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/pagination/pagination.min.css"

import SwiperCore, {
  Navigation , Pagination
} from 'swiper/core';
SwiperCore.use([Navigation ,Pagination ]);


const ProductCarousel = () => {


    const dispatch = useDispatch()
    const productTopRated = useSelector(state => state.productTopRated)
    const {loading , products , error } = productTopRated
    

    useEffect(() => {

        dispatch(listTopProduct())

    }, [dispatch ])

    return loading ? <Loader /> : error ? <Message variant="danger">  {error} </Message> : (
        <>
        <Swiper navigation={true} pagination={{ clickable: true, dynamicBullets:true}} className="mySwiper">
           {
         products.map(product => (
            <SwiperSlide key={product._id}>
                <Link to={`/products/${product._id}`} style={{position:"relative",    width: "100%", maxHeight: "500px"}} >
                        <Image src={product.image} alt={product.name}  style={{   width: "100%", height: "100%"}} />
                
                    <div style = {{position:"absolute" , top:'50%' , textAlign:"center" ,  width: "100%"}}>
                        <h2> {product.name}  </h2>
                        <h3> ${product.price} </h3>
                    </div>
                </Link>
            </SwiperSlide>

         ))}
        </Swiper>
        </>
    )
}

export default ProductCarousel
