require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Connect to MongoDB database using the URL from environment variables
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error)); // Log database connection errors
db.once("open", () => console.log("Connected to Database")); // Log successful database connection

// Middleware setup
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Parse cookies

app.use(morgan("dev")); // Log HTTP requests to the console in development mode
app.use(cors({ origin: true, credentials: true })); // Enable CORS with options for all origins and credentials

// Define routes
const usersRouter = require("./routes/users"); // Import user routes
app.use("/users", usersRouter); // Mount user routes at /users endpoint

// Set port for the server to listen on, defaulting to 8080 if not provided
const port = process.env.PORT || 8080;

// Start the server and listen on specified port
const server = app.listen(port, () => console.log("Server Started on " + port));
