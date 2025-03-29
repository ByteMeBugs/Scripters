const mongoose = require("mongoose");

// Define the schema for ingredients
const ingredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: String, required: true },
});

// Define the schema for steps
const stepSchema = new mongoose.Schema({
    description: { type: String, required: true },
    image: { type: String }, // Optional step image
});

// Define the main recipe schema
const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Recipe title is required"],
    },
    description: {
        type: String,
        required: [true, "Recipe description is required"],
    },
    image: {
        type: String, // URL or file path to the recipe image
    },
    serves: {
        type: Number,
        required: [true, "Number of servings is required"],
    },
    cookTime: {
        type: String, // e.g., "30 minutes"
        required: [true, "Cook time is required"],
    },
    ingredients: {
        type: [ingredientSchema],
        required: [true, "At least one ingredient is required"],
    },
    steps: {
        type: [stepSchema],
        required: [true, "At least one step is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create and export the Recipe model
const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
