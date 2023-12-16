import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import productRouter from './routes/product.route.js'
import cookieParser from 'cookie-parser';
dotenv.config();


const app=express();

connectDB();

app.use(express.json())
app.use(cookieParser())

app.listen('3000', ()=>{
    console.log('app is running on port 3000')
})

app.use('/api/user', userRouter)
app.use('/api/auth',authRouter)
app.use('/api/product',productRouter)


app.use((err,req,res,next)=>{
    const statusCode= err.statusCode || 500;
    const message = err.message|| `Internal Server Error`;
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })

})

