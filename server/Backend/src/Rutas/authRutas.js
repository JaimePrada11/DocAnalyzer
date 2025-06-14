const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');

router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/verify', controller.verify);
router.get('/profile', controller.profile);

module.exports = router;
