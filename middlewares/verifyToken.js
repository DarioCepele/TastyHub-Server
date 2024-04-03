const jwt = require("jsonwebtoken"); // Importing JSON Web Token module

// Middleware function to verify JWT token
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization; // Extracting token from request headers

  // Checking if token is provided
  if (!token) {
    return res.status(401).json({ error: "Token non fornito" }); // Sending error response if token is not provided
  }

  // Verifying the token
  jwt.verify(token, process.env.JWT, (err, decoded) => {
    if (err) {
      console.error("Errore nella verifica del token:", err); // Logging any errors during token verification
      return res.status(401).json({ message: "Token non valido" }); // Sending error response if token is invalid
    }

    req.user = decoded; // Storing decoded user information in request object
    next(); // Calling next middleware function
  });
};

module.exports = verifyToken; // Exporting the middleware function
