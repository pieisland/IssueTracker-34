const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const githubOauth = require('../middleware/githubOauth');
const tokenValidator = require('../middleware/tokenValidator');

router.post('/', githubOauth, userController.login);

router.get('/', tokenValidator, userController.getAllUsers)

module.exports = router;
