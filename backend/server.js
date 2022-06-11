import express from 'express';
import path from 'path';
import morgan from 'morgan'; 
import dotenv from 'dotenv'; 

import {notFound , errorHandler} from './middleware/errorMiddleware.js'; 

import connectDB from './config/db.js';


import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import wishlistRoutes  from './routes/wishlistRoutes.js';
dotenv.config();


connectDB(); 

const app = express()

if(process.env.NODE_ENV === 'developement')
        app.use(morgan('dev'))


const PORT = process.env.PORT || 5000
app.use(express.json())





app.use("/api/config/paypal" , (req , res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})


app.use("/api/products" , productRoutes)
app.use("/api/users" , userRoutes)
app.use("/api/orders" , orderRoutes)
app.use("/api/wishlist" , wishlistRoutes)

app.use("/api/upload" ,  uploadRoutes)

const __dirname = path.resolve() 

app.use('/uploads' , express.static(path.join(__dirname , '/uploads')))

if(process.env.NODE_ENV === "production") {
    app.use( express.static(path.join(__dirname , '/frontend/build' )))
    app.get('*' , (req, res)=> 
    {        
        res.sendFile(path.resolve(__dirname ,'frontend','build','index.html'))
    }
    )
}else {

    app.get('/',(req , res)=>{
        res.send("api is running ...") 
    })

}




app.use(notFound)
app.use(errorHandler)





app.listen(PORT ,console.log(` this server is running on mode ${process.env.NODE_ENV}  on port ${PORT} \n127.0.0.1:${PORT} `.yellow.underline.bold))