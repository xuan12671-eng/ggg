
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Trang chu API
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "LHU E-Commerce API is running",
    status: "ONLINE",
    version: "1.0.0"
  });
});

// Health check
app.get("/api/health", (req, res) => {
  const dbConnected = mongoose.connection.readyState === 1;

  res.status(dbConnected ? 200 : 503).json({
    success: dbConnected,
    message: dbConnected
      ? "Backend and database are healthy"
      : "Database is not connected",
    data: {
      status: dbConnected ? "ONLINE" : "DEGRADED",
      database: dbConnected ? "CONNECTED" : "DISCONNECTED"
    }
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
    data: null
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("[API Error]", err.message);

  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: statusCode < 500
      ? err.message
      : "Internal server error",
    data: null
  });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log("========================================");
      console.log(`Backend running on port ${PORT}`);
      console.log("Health check: /api/health");
      console.log("========================================");
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
