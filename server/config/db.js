import mongoose from "mongoose";

const {MONGO_URI} = process.env ;

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect( MONGO_URI, {
      serverSelectionTimeoutMS: 10000, //เกิน 10 วินาที ไม่มีการเชื่อมต่อ
    });
    
    console.log(`MongoDB Connected Data: ${conn.connection.name}`);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};
