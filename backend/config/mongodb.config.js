import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

export function connectToMongoDB() {
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log('connected to mongodb.')
}