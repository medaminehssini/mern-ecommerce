import React, {  } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import './css/product.css'
import {useDispatch, useSelector} from 'react-redux'
import { addToCart } from '../actions/cartActions'
import axios from 'axios'
import { toastAlert } from '../utils/alert'
import { changeWishList } from '../actions/wishlistActions'

export const Product = ({product}) => {

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin) 
    const {userInfo } = userLogin

    const addToCartHandler = async (e) => {
        e.preventDefault()
        dispatch(addToCart(product._id , 1))
    }
    const wishlistHandler = async (e) => {
        e.preventDefault()
        const config = {
            headers : {
                'Content-Type'   : "application/json", 
                'Authorization' : `Bearer ${userInfo.token}`
            }
        }

      const { data } =   await axios.post(`/api/wishlist/${product._id}` , {} , config)
      dispatch(changeWishList())
      if(data) {
        toastAlert({text:data.message , icon:"success"})

      }
    } 
    
    return (
        <Card className="rounded">
            <Card.Header >
                <div className="header_card_container">

                    <Link to={`/products/${product._id}`}>

                        <Card.Img src={product.image} />

                    </Link>

                    <div className="option_container">
                        <div className="option_list">
                                <ul>
                                    <li>
                                        <a href="/" onClick={(e) => addToCartHandler(e) }>
                                            <i className="fas fa-shopping-cart"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/"  onClick={ (e) => wishlistHandler(e) } >
                                            <i className="fas fa-heart"></i>                                        
                                        </a>
                                    </li>
                                </ul>
                        </div>
                    </div>

                </div>
            </Card.Header>
            <Card.Body>
                <Link to={`/products/${product._id}`}>
                    <Card.Title>
                        {product.name}
                    </Card.Title>
                </Link>
                <Card.Text as='div'>
                    <p>
                        {product.description.length > 40 ? `${product.description.substring(0,40)}...` : product.description }  
                        <span>
                            <Link to={`/products/${product._id}`} style={{color:'#0e8ce4'}}> read more  </Link>
                        </span>
                    </p>
                    <div className="text-end prix" style={{float:'right'}}>
                        ${product.price}
                    </div>
                    <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
  
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
