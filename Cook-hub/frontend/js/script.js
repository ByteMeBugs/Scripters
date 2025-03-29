const apiUrl = "http://localhost:5000/api/recipes"; // Correct backend port

// Fetch and display recipes
async function fetchRecipes() {
    try {
        const res = await fetch(apiUrl);
        if (!res.ok) {
            throw new Error("Failed to fetch recipes");
        }

        const data = await res.json();
        const recipeList = document.getElementById("recipe-list");
        recipeList.innerHTML = "";

        data.forEach((recipe) => {
            recipeList.innerHTML += `
                <div class="recipe-card">
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <h3>${recipe.title}</h3>
                    <p>${recipe.description}</p>
                    <button onclick="deleteRecipe('${recipe._id}')">Delete</button>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}

// Show Add Recipe Form
function showAddRecipeForm() {
    document.querySelectorAll("section").forEach((section) => {
        section.style.display = "none";
    });
    document.getElementById("add-recipe").style.display = "block";
}

// Add New Recipe
document.getElementById("recipe-form").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent page reload

    // Collect form data
    const formData = new FormData();
    formData.append("title", document.getElementById("title").value);
    formData.append("description", document.getElementById("description").value);
    formData.append("image", document.getElementById("image").files[1]);
    formData.append("serves", document.getElementById("serves").value);
    formData.append("cookTime", document.getElementById("cookTime").value);

    // Collect ingredients
    const ingredients = [];
    document.querySelectorAll(".ingredient").forEach((input) => {
        if (input.value.trim() !== "") {
            ingredients.push(input.value.trim());
        }
    });
    formData.append("ingredients", JSON.stringify(ingredients));

    // Collect steps with images
    const steps = [];
    document.querySelectorAll(".step-container").forEach((step, index) => {
        const stepDescription = step.querySelector(".step-description").value;
        const stepImage = step.querySelector(".step-image").files[0];

        steps.push({
            description: stepDescription,
            image: stepImage ? `step-${index + 1}.jpg` : null,
        });

        if (stepImage) {
            formData.append(`stepImage${index}`, stepImage);
        }
    });
    formData.append("steps", JSON.stringify(steps));

    try {
        const response = await fetch(`${apiUrl}/add`, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            alert("Recipe added successfully!");
            fetchRecipes(); // Reload recipes after adding
            showSection("recipes"); // Redirect to recipes page
        } else {
            throw new Error("Error adding recipe.");
        }
    } catch (error) {
        alert(error.message);
    }
});

// Delete a Recipe
async function deleteRecipe(id) {
    if (confirm("Are you sure you want to delete this recipe?")) {
        try {
            const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
            if (res.ok) {
                alert("Recipe deleted!");
                fetchRecipes(); // Refresh recipe list
            } else {
                throw new Error("Error deleting recipe.");
            }
        } catch (error) {
            alert(error.message);
        }
    }
}

// Add Ingredient Dynamically
function addIngredient() {
    const ingredientHTML = `
        <div class="ingredient-item">
            <input type="text" class="ingredient" placeholder="Ingredient (e.g., 250g flour)" required>
        </div>
    `;
    document
        .getElementById("ingredients-list")
        .insertAdjacentHTML("beforeend", ingredientHTML);
}

// Add Step with Image Dynamically
function addStep() {
    const stepHTML = `
        <div class="step-container">
            <textarea class="step-description" placeholder="Step description" rows="2" required></textarea>
            <input type="file" class="step-image" accept="image/*">
        </div>
    `;
    document
        .getElementById("steps-list")
        .insertAdjacentHTML("beforeend", stepHTML);
}

function uploadFile() {
    let fileInput = document.getElementById("fileInput");
    
    if (!fileInput) {
        console.error("File input element not found!");
        return;
    }

    let file = fileInput.files[0];
    
    if (!file) {
        console.error("No file selected.");
        return;
    }

    console.log("File selected:", file.name);
}

// Show Appropriate Section
function showSection(sectionId) {
    document.querySelectorAll("section").forEach((section) => {
        section.style.display = "none";
    });
    document.getElementById(sectionId).style.display = "block";
}

// Load Recipes on Page Load
document.addEventListener("DOMContentLoaded", fetchRecipes);
