const express = require('express');
const router = express.Router();

const authController = require('../Controllers/authController');

//Regisetr Route
router.post('/register',authController.userRegister);
router.post('/login',authController.login);

module.exports = router;