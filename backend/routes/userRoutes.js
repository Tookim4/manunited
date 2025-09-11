const router = require('express').Router();
const authController = require('../controllers/authControllers');

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Logout route
router.get('/logout', authController.logout);

// router.get('/signup', authController.signup);
// router.get('/login', authController.log_in);

module.exports = router;