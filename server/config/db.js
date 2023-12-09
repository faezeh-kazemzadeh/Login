import mongoose from "mongoose";

const connectDB=()=>{
     mongoose.connect(process.env.MONGO)
     .then(res=>console.log(`DB connect to ${res.connection.host}`))
     .catch(err=>console.log(err))
    
}
export default connectDB;