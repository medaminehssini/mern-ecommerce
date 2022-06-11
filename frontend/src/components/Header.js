import React from 'react'
import { Col, Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap'
import { Link, Route } from "react-router-dom"
import { LinkContainer } from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { userLogout } from '../actions/userActions'
import SearchBox from "./SearchBox";
export const Header = () => {

    const userLogin = useSelector(state => state.userLogin)

    const cart = useSelector(state => state.cart)
    const {cartItems } = cart
    const dispatch = useDispatch()
    const {userInfo} = userLogin
    const logoutHandler = () => {
        dispatch(userLogout())
    }

    return (
        <header >
            <Row className="header-top">
                <Col md={3}>
                    <p> <i className="fas fa-phone-square-alt"></i> +216 28 245 231  </p>
                </Col>
                <Col md={3}>
                    <p>
                        <a href="mailto:medhssinihssini@gmail.com">  <i className="fas fa-envelope"></i> medhssinihssini@gmail.com  </a>
                    </p>
                </Col>
                <Col md={2}>
                
                </Col>
                <Col md={4}>
                    <ul className="header-top-menu">
                        <li className="mx-3" >English</li>
                        <li className="mx-3 me-5" >$ US dollar</li>
                        {!userInfo ? <>

                            <li className="be-solid">
                                <LinkContainer to="/register" exact>
                                    <Nav.Link   > <i className="fas fa-user"></i> Register </Nav.Link>
                                </LinkContainer>
                            </li>
                            <li>
                                <LinkContainer to="/login" exact>
                                    <Nav.Link   > Login </Nav.Link>
                                </LinkContainer>
                            </li>

                        </> : 
                        <li>
                            <NavDropdown title={userInfo.name} id="userName" >
                                <LinkContainer to="/user/edit/profile" style={{color:'#444c53'}}>
                                    <Nav.Link   > Profile </Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/user/orders" style={{color:'#444c53'}}>
                                    <Nav.Link   > orders </Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/user/wishlist" style={{color:'#444c53'}}>
                                    <Nav.Link   > wishList </Nav.Link>
                                </LinkContainer>
                                <Nav.Link onClick={ ()=>logoutHandler() } style={{color:'#444c53'}}  > Logout </Nav.Link>
                            </NavDropdown>                            
                        </li>
                        }
                    </ul>

                </Col>

            </Row>
            <div className="nav-search"> 
                <Row>
                    <Col md={3} className="logo">
                        <Link to="/">
                            <h2 className="color-primary">  E-commerce </h2>
                        </Link>
                    </Col>
                    <Col md={5} className="search-box">
                        <Route       render = {({history  }) => <SearchBox history={history }  /> } />    
                    </Col>
                    <Col md={4} className="nav-element">
                       <div style={{textAlign:"right"}} >
                           <div className="icons">
                                <i className="far fa-heart"></i>
                           </div>
                           <div >
                               <p className="text-icon"> Wishlist </p>
                               <p>20</p> 
                           </div>
                       </div>
                       <div   style={{textAlign:"left" , paddingLeft:"20px"}}  >
                        <Link to="/cart">
                            <>
                            <div className="icons" >
                                <i  className="fas fa-shopping-cart"></i>
                            </div>
                            <div className="shop-number">
                                <span>{cartItems.reduce((acc, item ) => acc+item.qty , 0)}</span>
                            </div>
                            <div>
                                <p className="text-icon" style={{textAlign:"left" }} > Cart </p>
                               <p> ${cartItems.reduce((acc, item ) => acc+item.qty*item.price , 0)}</p> 
                            </div>
                            </>
                        </Link>
                       </div>
                    </Col>
                </Row>
            </div>
            <Navbar  expand="lg" className="menu">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='me-auto'>
                            <LinkContainer to="/" exact>
                                <Nav.Link > Home </Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/search">
                                <Nav.Link > Product List </Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/contact">
                                <Nav.Link > Contact Us </Nav.Link>
                            </LinkContainer>

                            {userInfo && userInfo.isAdmin && 
                                <NavDropdown title="admin" id="adminMenu" >
                                    <LinkContainer to="/admin/user/list" style={{color:'#444c53'}}>
                                        <Nav.Link   > Users </Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/product/list" style={{color:'#444c53'}}>
                                        <Nav.Link   > Products </Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/order/list" style={{color:'#444c53'}}>
                                        <Nav.Link   > Orders </Nav.Link>
                                    </LinkContainer>
                                </NavDropdown>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </header> 
    )
}

export default Header
