const express = require('express');
const router = express.Router();
const authController = require('../Controller/authController');
const { validate } = require('../middlewares/validate');
const { verifyToken } = require('../middlewares/authJwt');
const loginValidator = require('../validators/authValidator');


router.post('/register', authController.register );
router.post('/login', validate, loginValidator, authController.login );
router.post('/refresh-token', authController.refreshToken);
router.post('/verify', verifyToken, authController.verify);

module.exports = router;