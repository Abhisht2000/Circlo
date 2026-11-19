import mongoose from "mongoose";

const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        throw new Error("MONGO_URI is required. Add it to backend/.env before starting the server.");
    }

    if (mongoose.connection.readyState === 1) return mongoose.connection;

    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
    console.log("MongoDB connected successfully");
    return mongoose.connection;
};

export default connectDB;
