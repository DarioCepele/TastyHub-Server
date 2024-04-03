const User = require("../models/user");

// Retrieve the favorite recipes of a user
exports.favorites = async (req, res) => {
  try {
    const { email } = req.params; // Get the email from request parameters
    const user = await User.findOne({ email }); // Find the user in the database
    console.log(user.recipes); // Log the user's recipes
    res.status(200).json(user); // Respond with the user's details
  } catch (error) {
    console.error("Error while fetching favorite recipes:", error);
    res.status(500).json({ message: "Error while fetching favorite recipes" });
  }
};

// Add a new recipe to user's favorites
exports.addRecipe = async (req, res) => {
  try {
    // Use req.user to access details of the authenticated user
    const { email } = req.params; // Get the email from request parameters
    const { recipeId, recipeTitle, recipeImage } = req.body; // Extract recipe details from request body

    // Find the user in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the new recipe to the user's recipes array
    user.recipes.push({ recipeId, recipeTitle, recipeImage });

    // Save the user's changes to the database
    await user.save();

    // Respond with details of the added recipe
    res.status(201).json({ message: "Recipe added successfully", recipe: user.recipes[user.recipes.length - 1] });
  } catch (error) {
    console.error("Error while adding recipe:", error);
    res.status(500).json({ message: "Error while adding recipe" });
  }
};

// Remove a recipe from user's favorites
exports.removeFavorite = async (req, res) => {
  try {
    const { email, recipeId } = req.params; // Get email and recipeId from request parameters

    // Find the user in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the index of the recipe to remove in the user's recipes array
    const indexToRemove = user.recipes.findIndex((recipe) => recipe.recipeId === recipeId);

    if (indexToRemove === -1) {
      return res.status(404).json({ message: "Recipe not found in user's favorites" });
    }

    // Remove the recipe from the user's recipes array
    user.recipes.splice(indexToRemove, 1);

    // Save the user's changes to the database
    await user.save();

    res.status(200).json({ message: "Recipe removed from favorites successfully" });
  } catch (error) {
    console.error("Error while removing recipe from favorites:", error);
    res.status(500).json({ message: "Error while removing recipe from favorites" });
  }
};
