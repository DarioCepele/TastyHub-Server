const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// Function to create JWT token
const createToken = (_id, userEmail) => {
  // Sign token with user id, email, and JWT secret, expires in 1 hour
  return jwt.sign({ _id, email: userEmail }, process.env.JWT, { expiresIn: "1h" });
};

// Controller function to get all users
exports.getUsers = async (req, res) => {
  try {
    // Find all users in the database
    const users = await User.find();
    // Send response with status 200 and list of users
    res.status(200).json(users);
  } catch (err) {
    // If error, send response with status 500 and error message
    res.status(500).json({ error: err.message });
  }
};

// Controller function to create a new user
exports.createUser = async (req, res) => {
  try {
    // Extract name, email, and password from request body
    const { name, email, password } = req.body;

    // Hash password before saving it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with hashed password
    const newUser = new User({ name, email, password: hashedPassword });
    // Save the new user in the database
    await newUser.save();

    // Create JWT token for the new user
    const token = createToken(newUser._id);

    // Send response with status 201, success message, and JWT token
    res.status(201).json({ message: "User registered successfully", token: token });
  } catch (error) {
    // If error, send response with status 500 and error message
    res.status(500).json({ error: "Unable to complete registration" });
  }
};

// Controller function to handle user login
exports.login = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Find user in the database by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (user && (await bcrypt.compare(password, user.password))) {
      // If user is found and password is correct, create JWT token
      const token = createToken(user._id, user.email);

      // Send response with status 200, success message, and JWT token
      res.status(200).json({ message: "Login successful", token: token });
    } else {
      // If user does not exist or password is incorrect, send unauthorized response
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    // If error, send response with status 500 and error message
    res.status(500).json({ error: "Unable to login" });
  }
};
