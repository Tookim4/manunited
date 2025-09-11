const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerControllers');
const {authRequire, restrictTo} = require('../middleware/authMiddleware');

// Route to create a new player
router.post('/create_player', authRequire, restrictTo('admin'), playerController.createPlayer);
// Route to get all players
router.get('/players', playerController.getAllPlayers);
// Route to get a single player by ID
router.get('/player/:id', playerController.getPlayerById);
// Route to delete a player by ID
router.delete('/player/:id', authRequire, playerController.deletePlayerById);

module.exports = router;