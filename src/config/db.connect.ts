import mongoose from "mongoose";

export async function connectDB(){
    try {
        await mongoose.connect(Bun.env.MONGO_URI!)
        console.log('mongodb connected !')
    } catch (error) {
        throw Error('Mongo Connection Issue')
    }
}