const router = require('express').Router();
const { signupvalidation, loginvalidation } = require('../middelware/authvalidation');
const { signup,login } = require('../controllers/authcontroller');

router.post('/login', loginvalidation , login);

router.post('/signup',signupvalidation, signup);

module.exports = router