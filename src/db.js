import mongoose from "mongoose";
import configs from "./config/config.js";

const connectdb = async()=>{
    try {
        const db = await mongoose.connect(
            configs.MONGO_URI,
        )
        console.log('successfully connected (green dot)');
    } catch (error) {
        console.log(error);
    }
    
}

export default connectdb;

