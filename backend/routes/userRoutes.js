const router = require('express').Router();
const authController = require('../controllers/authControllers');
const { authRequire } = require('../middleware/authMiddleware');

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Logout route
router.get('/logout', authController.logout);

// Get user profile route
router.get('/profile', authRequire, authController.getProfile);

router.get('/current-user', authRequire, authController.getCurrentUser);


module.exports = router;