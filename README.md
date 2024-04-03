# TastyHub - server

## Description
This server handles requests related to users and their favorite recipes.

## Prerequisites
- Node.js installed
- MongoDB installed and running
- Environment variables configured (see .env.example)

## Installation
1. Clone this repository
2. Run `npm install` to install dependencies
3. Create a `.env` file and configure environment variables as in the `.env.example` file

## Configuration
Ensure MongoDB is running and environment variables are configured correctly.

## Starting the Server
Run `npm start` to start the server. The server will listen on the port specified in the environment variables.

## API Endpoints
### GET /api/users
- Description: Get all users registered in the system
- Parameters: None
- Authentication: Not required

### POST /api/users/register
- Description: Register a new user in the system
- Parameters: name (user's name), email (user's email), password (user's password)
- Authentication: Not required

### POST /api/users/login
- Description: Log in an existing user
- Parameters: email (user's email), password (user's password)
- Authentication: Not required

### POST /api/users/:email/recipes
- Description: Add a new recipe to a user's favorites
- Parameters: recipeId (ID of the recipe), recipeTitle (title of the recipe), recipeImage (image of the recipe)
- Authentication: Required (JWT Token)

### GET /api/users/:email/favorites
- Description: Get all favorite recipes of a user
- Parameters: email (user's email)
- Authentication: Required (JWT Token)

### DELETE /api/users/:email/favorites/:recipeId
- Description: Remove a recipe from a user's favorites
- Parameters: email (user's email), recipeId (ID of the recipe)
- Authentication: Required (JWT Token)

## Authors
- [Dario Cepele]
