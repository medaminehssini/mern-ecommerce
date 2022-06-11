
import asyncHandler from 'express-async-handler';
import Wishlist from '../models/WishlistModel.js';
import generateToken from '../utils/generateToken.js';




//@desc   add wishlist
//@routes POST api/wishlist/:id
//@access Private
const addWishlist =  asyncHandler( async (req , res ) => {

    const readyWishlist = await Wishlist.findOne(
        {   
            user : req.user._id , 
            product : req.params.id
        }
    )

   
    if (!readyWishlist)
    {
        const wishlist = new Wishlist({
            user : req.user._id , 
            product : req.params.id
        })
        await wishlist.save()
        res.status(201)
        res.send({'message' : 'wishlist added'})
    }else {
        await readyWishlist.remove()
        res.json({message:"product removed from Wishlist ! "})
    }


 }) 

//@desc   get wishlist
//@routes POST api/wishlist
//@access Private

const getWishlist =  asyncHandler( async (req , res ) => {

    const wishlist = await Wishlist.find({user : req.user._id}).populate('product')
    
    res.status(200)
    res.send(wishlist)


 }) 


 export { addWishlist  , getWishlist}






