import React, { useEffect, useState } from 'react'
import {Col, Row} from 'react-bootstrap'
import UserMenu from '../../components/UserMenu'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import Product from '../../components/Product'
import { useSelector } from 'react-redux'
import axios from 'axios'



const Wishlist = () => {

    const  {userInfo} = useSelector(state => state.userLogin)
    const wishListValue = useSelector(state => state.wishListValue)



    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [wishlist, setWishlist] = useState([])

    useEffect(  () => {

        setLoading(true)


        async function fetchData  ()  {
            try {
            

                const config = {
                    headers : {
                        'Content-Type'   : "application/json", 
                        'Authorization' : `Bearer ${userInfo.token}`
                    }
                }
               const {data } =   await axios.get(`/api/wishlist`  , config)
               setLoading(false)
               setWishlist(data)
    
            } catch (error) {
                setLoading(false)
                setError(error.response && error.response.data.message ? error.response.data.message : error.message)
            }
        }

        fetchData  ()
    
    }, [userInfo , wishListValue])

    return (
        <Row>
            <UserMenu wishList ></UserMenu>
            <Row>
                {
                    loading ? <Loader /> : error ? <Message variant="danger" > {error} </Message> : wishlist && wishlist.length > 0 ?
                        wishlist.map( (wishlist1) => (
                            wishlist1.product &&
                            <Col md={3}>
                                <Product product={wishlist1.product} />
                            </Col>

                        ) )
                    :  <Message variant="info" > Data not found </Message>
                }
            </Row>
        </Row>
    )
}

export default Wishlist
