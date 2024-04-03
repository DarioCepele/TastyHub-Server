// Importing required modules
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const RecipeController = require("../controllers/recipeController");
const verifyToken = require("../middlewares/verifyToken");

// Defining routes
router.get("/", UserController.getUsers); // Handling GET requests to the root route, calls the getUsers function from userController
router.post("/register", UserController.createUser); // Handling POST requests to the /register route, calls the createUser function from userController
router.post("/login", UserController.login); // Handling POST requests to the /login route, calls the login function from userController
router.post("/:email/recipes", verifyToken, RecipeController.addRecipe); // Handling POST requests to the /:email/recipes route with token verification, calls the addRecipe function from recipeController
router.get("/:email/favorites", verifyToken, RecipeController.favorites); // Handling GET requests to the /:email/favorites route with token verification, calls the favorites function from recipeController
router.delete("/:email/favorites/:recipeId", verifyToken, RecipeController.removeFavorite); // Handling DELETE requests to the /:email/favorites/:recipeId route with token verification, calls the removeFavorite function from recipeController

module.exports = router;
