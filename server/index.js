import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
dotenv.config();


const app=express();

connectDB();

app.use(express.json())


app.listen('3000', ()=>{
    console.log('app is running on port 3000')
})

app.use('/api/user', userRouter)
app.use('/api/auth',authRouter)

