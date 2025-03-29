const express = require("express");
const multer = require("multer");
const Recipe = require("../models/recipeModel"); // Import Recipe Model

const router = express.Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// Route to add a new recipe
router.post("/add", upload.any(), async (req, res) => {
    try {
        const { title, description, serves, cookTime } = req.body;

        // Validate required fields
        if (!title || !description || !serves || !cookTime) {
            return res.status(400).send("All fields are required.");
        }

        // Parse ingredients and steps from JSON
        const ingredients = JSON.parse(req.body.ingredients || "[]");
        const steps = JSON.parse(req.body.steps || "[]");

        // Check if at least 1 ingredient and 1 step is provided
        if (ingredients.length === 0 || steps.length === 0) {
            return res.status(400).send("At least one ingredient and step are required.");
        }

        // Handle step images dynamically
        steps.forEach((step, index) => {
            const stepImage = req.files.find((file) => file.fieldname === `stepImage${index}`);
            if (stepImage) {
                step.image = stepImage.filename;
            } else {
                step.image = null; // Set to null if no image
            }
        });

        // Find the main recipe image if available
        const mainImage = req.files.find((file) => file.fieldname === "image")?.filename || null;

        // Create and save the recipe
        const newRecipe = new Recipe({
            title,
            description,
            serves,
            cookTime,
            ingredients,
            steps,
            image: mainImage,
        });

        await newRecipe.save();
        res.status(201).json({ message: "Recipe added successfully!", recipe: newRecipe });
    } catch (error) {
        console.error("Error adding recipe:", error);
        res.status(500).send("Error adding recipe. Please try again.");
    }
});

module.exports = router;
