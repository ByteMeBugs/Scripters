const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const multer = require("multer");
const path = require("path");

// Set up Multer for file uploads
const upload = multer({ dest: "uploads/" });

// Get all recipes
router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add new recipe
router.post("/add", upload.single("image"), async (req, res) => {
    try {
        const {
            title,
            description,
            serves,
            cookTime,
            ingredients,
            steps,
        } = req.body;

        const recipe = new Recipe({
            title,
            description,
            image: req.file ? req.file.path : null,
            serves,
            cookTime,
            ingredients: JSON.parse(ingredients),
            steps: JSON.parse(steps),
        });

        await recipe.save();
        res.status(201).json({ message: "Recipe added successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a recipe
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Recipe.findByIdAndDelete(id);
        res.json({ message: "Recipe deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
