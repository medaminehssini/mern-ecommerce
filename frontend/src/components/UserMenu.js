import React from 'react'
import { Nav } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
const UserMenu = ({editProfile ,orders ,wishList,step4}) => {
    return (
        <Nav className="justify-content-center mb-4">
            <Nav.Item>
                {editProfile ? (

                    <Nav.Link disabled> Edit Profile </Nav.Link>

                ) :  
                    <LinkContainer to="/user/edit/profile">
                        <Nav.Link>Edit Profile</Nav.Link>
                    </LinkContainer> 
                }
            </Nav.Item>
            <Nav.Item>
                {orders ? (

                    <Nav.Link disabled> Orders </Nav.Link>

                ) :  
                    <LinkContainer to="/user/orders">
                        <Nav.Link> Orders </Nav.Link>
                    </LinkContainer> 
                }
            </Nav.Item>
            <Nav.Item>
                {wishList ? (

                    <Nav.Link disabled> wishlist </Nav.Link>

                ) :  
                    <LinkContainer to="/user/wishlist">
                        <Nav.Link> Wishlist </Nav.Link>
                    </LinkContainer> 
                }
            </Nav.Item>
            <Nav.Item>
                {step4 ? (

                    <Nav.Link disabled> Step 4  </Nav.Link>

                ) :  
                    <LinkContainer to="/edit/profile">
                        <Nav.Link> Step 4 </Nav.Link>
                    </LinkContainer> 
                }
            </Nav.Item>
        </Nav>
    )
}

export default UserMenu
