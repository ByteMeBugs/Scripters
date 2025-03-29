// Import Required Modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require("./config"); // MongoDB Connection

// Load Environment Variables
dotenv.config();

// Connect to MongoDB
connectDB(); // Uses config to connect to MongoDB or use manual connection below

// Create Express App
const app = express();

// Middleware Setup
app.use(express.json());
app.use(cors());
app.use(bodyParser.json()); // Parse JSON data
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data

// Serve Uploaded Images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Import and Use API Routes
const recipeRoutes = require("./routes/recipes"); // Correct route usage
app.use("/api/recipes", recipeRoutes);

// Serve Frontend Files
const frontendPath = path.join(__dirname, "../frontend"); // Correct path
app.use(express.static(frontendPath));

// Handle Undefined Routes and Return index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

// Define Port and Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
