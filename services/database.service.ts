import mongoose from "mongoose";
import dotenv from "dotenv";

export const connectMongoDB = async() => {
    dotenv.config();
    
    try {
        await mongoose.connect(process.env.DATABASE_URL ?? 'null');
        console.log("Successfully connected to DB!");
    } catch(error) {
        console.log("Error connecting to DB:", error);
    }
}