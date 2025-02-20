import { connect } from "http2";
import mongoose from "mongoose";
export const connectMongoDB = async ()=>{
 try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("connected to monodb");
    
 } catch (error) {
  console.log("error connecting to mongodb",error);
    
    
 }

}