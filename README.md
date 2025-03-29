git repository link :- https://github.com/ByteMeBugs/Scripters.git

🍲 Recipe Sharing Website
This project is a full-stack recipe-sharing platform where users can register, log in, and manage their recipes. It includes features for adding, updating, deleting, and browsing recipes with images and categorized instructions.

🎯 Project Overview
The project is built using:

Frontend: HTML, CSS, JavaScript (Vanilla)

Backend: Node.js, Express.js

Database: MongoDB

Image Uploads: Multer (stored locally in /uploads)

⚡️ Features
✅ User Authentication
User registration and login with password hashing.

JWT token-based authentication.

✅ Recipe Management
Add, edit, delete, and view recipes.

Upload and display images for recipes and steps.

✅ File Uploads with Multer
Upload main recipe image and step images.

Image size and format validation.

✅ Frontend Features
Responsive design with clean UI.

Form validation and error handling.

Dynamic recipe display with real-time updates.

🛠️ Tech Stack
Technology	Purpose
Node.js	Backend runtime
Express.js	Backend framework
MongoDB	Database
Multer	File upload handling
JWT	Authentication
HTML/CSS/JS	Frontend UI
Bootstrap	Responsive styling
📂 Project Structure
bash
Copy
Edit
/cook
├── /backend
│   ├── /config
│   │   └── db.js
│   ├── /models
│   │   └── recipeModel.js
│   ├── /routes
│   │   └── recipeRoutes.js
│   ├── /uploads
│   ├── /utils
│   │   └── auth.js
│   ├── server.js
│   └── .env
├── /frontend
│   ├── /css
│   │   └── styles.css
│   ├── /js
│   │   └── scripts.js
│   ├── /images
│   ├── index.html
│   └── add-recipe.html
└── README.md
⚙️ Setup and Installation
1. 📚 Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/recipe-sharing.git
cd cook
2. 📦 Backend Setup
bash
Copy
Edit
cd backend
npm install
3. 📂 Create .env File
Add a .env file in the backend folder with the following:

ini
Copy
Edit
MONGO_URI=mongodb://localhost:27017/recipeApp
JWT_SECRET=your_jwt_secret
PORT=5001
4. 🚀 Run Backend
bash
Copy
Edit
npm start
Or use nodemon for hot reload:

bash
Copy
Edit
npx nodemon server.js
5. 🌐 Frontend Setup
Open frontend/index.html in your browser.

📸 File Upload Configuration
Images are stored in the /uploads directory.

Ensure that the uploads folder is created in the project root.

🧪 Testing and Verification
Start MongoDB:

bash
Copy
Edit
mongod
Run the server:
bash
Copy
Edit
npm start
Open index.html in the browser and test:

User registration and login.

Adding, editing, and deleting recipes.

Image upload with correct file validation.

🔥 API Endpoints
Method	Route	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	User login
GET	/api/recipes	Get all recipes
POST	/api/recipes/add	Add new recipe
PUT	/api/recipes/:id	Update recipe by ID
DELETE	/api/recipes/:id	Delete recipe by ID
🛡️ Security & Error Handling
JWT token protection for restricted routes.

Error handling with try-catch and res.status for API responses.

File size limit enforced during uploads.

📝 Common Pitfalls & Troubleshooting
Uploads Folder Missing: Create a uploads/ directory manually.

MongoDB Not Running: Run mongod before starting the backend.

Wrong File Names: Ensure frontend and backend field names match.

🚨 Potential Improvements
Add pagination and search functionality.

Implement user roles (admin, user).

Enhance UI with frameworks like React or Vue.

📄 License
This project is licensed under the MIT License.

🎉 Happy Cooking! 🍽️