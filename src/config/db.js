const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("Missing MONGODB_URI in .env file");
  }

  try {
    const conn = await mongoose.connect(mongoUri);

    console.log(
      `[Database] Connected to MongoDB Atlas: ${conn.connection.host}`
    );

    return conn;
  } catch (error) {
    console.error("[Database] MongoDB connection failed:", error.message);
    throw error;
  }
};

module.exports = connectDB;
