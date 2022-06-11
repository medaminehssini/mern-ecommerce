import  mongoose from "mongoose";
import dotenv from "dotenv"
import colors from "colors"
import users from "./data/users.js"
import products from "./data/products.js"
import User from "./models/UserModel.js"
import Order from "./models/OrderModel.js"
import Product from "./models/ProductModel.js"
import connectDB from "./config/db.js"


dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany()

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product)=> {
                return {...product , user: adminUser}
        })

        await Product.insertMany(sampleProducts)
        console.log(`data imported`.green.inverse);        
    } catch (error) {
        console.log(`Error : ${error.message}`.red.inverse);
        process.exit();
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany()
       
        console.log(`data deleted ! `.red.inverse);        
    } catch (error) {
        console.log(`Error : ${error.message}`.red.inverse);
        process.exit();
    }
}

if (process.argv[2] == '-d') {
    destroyData()
}else 
{
    importData()
}