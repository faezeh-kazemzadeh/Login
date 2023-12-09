import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();


const app=express();

connectDB();


app.listen('3000', ()=>{
    console.log('app is running on port 3000')
})