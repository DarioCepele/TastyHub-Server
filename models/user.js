// Importing mongoose library
const mongoose = require("mongoose");

// Defining the schema for the user model
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // Array of recipes belonging to the user
    recipes: [
      {
        recipeId: {
          type: String,
        },
        recipeTitle: {
          type: String,
        },
        recipeImage: {
          type: String,
        },
      },
    ],
  },
  // Including timestamps for when the user document was created and updated
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
