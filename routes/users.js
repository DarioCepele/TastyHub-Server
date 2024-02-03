const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/', UserController.getUsers);
router.post('/', UserController.createUser);
router.post('/login', UserController.login)
router.delete('/:userId', UserController.deleteUser);

module.exports = router;
