const { body } = require('express-validator');

const LoginValidator = [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')

]

module.exports = LoginValidator;