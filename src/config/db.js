import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Connection error to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

//* Event handling for debugging
mongoose.connection.on("connected", () => console.log("Connected to MongoDB successfully."));
mongoose.connection.on("error", (err) => console.error(`MongoDB connection error: ${err.message}`));
mongoose.connection.on("disconnected", () => console.log("Disconnected from MongoDB."));

export default connectDB;