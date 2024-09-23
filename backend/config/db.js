import mongoose from "mongoose";

const mongoURL = process.env.MONGODB_URI_ATLAS;

const connectDB = () => {
    mongoose.connect(`${mongoURL}/ecommerce`);

    const db = mongoose.connection;

    db.on('connected', () => console.log('connected successfully'));

    db.on('error', () => console.log('something went wrong!'))
}

export default connectDB;