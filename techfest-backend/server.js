
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  credentials: true
}));

// Parse JSON requests
app.use(express.json({ limit: "10kb" }));

// MongoDB input sanitization
app.use((req, res, next) => {
  if (req.body && typeof req.body === "object") {
    req.body = mongoSanitize.sanitize(req.body);
  }
  next();
});

app.use(cookieParser());

// Request logging
app.use((req, res, next) => {
  console.log(
    new Date().toISOString(),
    req.method,
    req.originalUrl
  );
  next();
});

// Health check API
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "TechFest API is running"
  });
});

// API routes
app.use("/api/events", require("./routes/events"));
app.use("/api/auth", require("./routes/auth"));

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error(err.stack || err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    message:
      err.status && err.status < 500
        ? err.message
        : "Internal server error"
  });
});

const PORT = process.env.PORT || 5000;

// Start server only when executed directly
if (require.main === module) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected");

      app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error(
        "MongoDB connection failed:",
        err.message
      );
      process.exit(1);
    });
}

// Export app for Jest testing
module.exports = app;
