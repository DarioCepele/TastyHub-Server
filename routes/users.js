const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const authenticateLogin = require("../middlewares/authenticateLogin");

router.post("/", UserController.createUser);
router.post("/login", authenticateLogin, UserController.login);

module.exports = router;
