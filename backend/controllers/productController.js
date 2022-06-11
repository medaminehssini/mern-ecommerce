import Product from '../models/ProductModel.js'
import asyncHandler from 'express-async-handler';
import Review from '../models/ReviewModel.js';



//@desc   Fetch all products
//@routes GET api/products
//@access Public
const getProducts =  asyncHandler( async (req , res ) => {

    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1 



    const params =  { 
        name : {
            $regex : req.query.keyword,
            $options : 'i',
        }, 
        ...(req.query.brand && { 
            brand : {
                $regex : req.query.brand,
                $options : 'i',
            }
        }), 
        ...(req.query.category && { 
            category : {
                $regex : req.query.category,
                $options : 'i',
            }
        }),
        ...(req.query.keyword && { 
            name : {
                $regex : req.query.keyword,
                $options : 'i',
            }
        }), 
        ...((req.query.maxPrice || req.query.minPrice ) && { 
            price : {
                    $gte: req.query.minPrice ? Number(req.query.minPrice)  : 0 ,  
                    ...( req.query.maxPrice && { $lte :  Number(req.query.maxPrice) })
                }
        }), 

    }

    req.query.brand && params
    const count = await Product.countDocuments({...params})

    const products = await Product.find({...params}).limit(pageSize).skip((page-1)*pageSize)
    res.json({products , page , pages: Math.ceil(count/pageSize)}) 
}) 



//@desc   Fetch single product
//@routes GET api/products/:id
//@access Public
const getProductById =  asyncHandler( async (req , res ) => {
    const product = await Product.findById(req.params.id)

    if(product)
    { 
        const reviews =  await Review.find({
            product : req.params.id
        })
        res.json({product , reviews });
    }
    else
    {
        res.status(404)
        throw new Error ('Product not found')
    }
}) 

//@desc   Delete product
//@routes DELETE api/product/:id
//@access private/admin
const deleteProduct =  asyncHandler( async (req , res ) => {

    const product= await Product.findById(req.params.id)
    
    
    if(product) 
    {
        await product.remove()
        res.json({message:"Product removed ! "})
    }else{
        res.status(404)
        throw new Error ('Product not found ')
    }
 
 }) 

//@desc   create product
//@routes POST api/products
//@access private/admin

const createProduct =  asyncHandler( async (req , res ) => {

    const product= new Product ({
        name         : 'Sample name', 
        description  : 'Sample description ',
        price        : 0,
        user         : req.user._id, 
        image        : "/images/sample.jpeg", 
        brand        : 'sample brand', 
        category     : 'sample category', 
        countInStock : 0, 
        numReviews   : 0
    })
    
    const createdProduct = await product.save()
    res.status(201) 
    res.json(createdProduct)

 }) 

//@desc   update product
//@routes PUT api/products/:id
//@access private/admin

const updateProduct =  asyncHandler( async (req , res ) => {


    const product= await Product.findById(req.params.id)
    const {name , price , description , image , brand , category , countInStock } = req.body
    
    if(product) 
    {
        product.name           = name || product.name
        product.price          = price  || product.price
        product.description    = description  || product.description
        product.image          = image  || product.image
        product.brand          = brand  || product.brand
        product.category       = category  || product.category
        product.countInStock   = countInStock  || product.countInStock
    

        const  updatedProduct = await product.save()
        res.status(201) 
        res.json(updatedProduct)
    }else{
        res.status(404)
        throw new Error ('Product not found ')
    }


 
 }) 


 //@desc   create new review 
//@routes PUT api/products/:id/reviews
//@access private

const createProductReview =  asyncHandler( async (req , res ) => {

    const product= await Product.findById(req.params.id)
    const {rating , comment } = req.body

    
    if(product) 
    {
        const alreadyReviewed = await Review.find({
            user : req.user._id , 
            product : req.params.id
        })
        if(alreadyReviewed.length > 0) {
           alreadyReviewed[0].comment = comment 
           alreadyReviewed[0].rating  = Number(rating)
           await alreadyReviewed[0].save()
            res.status(201)

            res.json({message : 'review added'})


        }else {

            const  review = new Review ( {
                name : req.user.name ,
                rating : Number(rating),
                comment, 
                user :  req.user._id, 
                product : req.params.id
            }) 
            
            await review.save()
            product.numReviews = product.numReviews + 1 
            product.rating  = ( product.rating + Number(rating) ) /2 
    
            res.status(201) 
            res.json({message : 'review added'})
            
        }



    }else{
        res.status(404)
        throw new Error ('Product not found ')
    }


 
 }) 


//@desc   Get top rated product
//@routes GET api/products
//@access Public
const getTopProduct =  asyncHandler( async (req , res ) => {
    const products = await Product.find({}).sort({rating : -1}).limit(3)

    if(products)
    { 
        res.json(products);
    }
    else
    {
        res.status(404)
        throw new Error ('Product not found')
    }
}) 


export {getProducts  , getTopProduct , getProductById , createProduct , updateProduct  , deleteProduct , createProductReview }