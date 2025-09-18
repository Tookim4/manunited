const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerControllers');
const {authRequire, restrictTo} = require('../middleware/authMiddleware');
const upload = require("../middleware/uploadMiddleware")

// Route to create a new player
router.post('/create_player', authRequire, restrictTo('admin'), upload.single("image"), playerController.createPlayer);
// Route to get all players
router.get('/get_players', playerController.getAllPlayers);
// Route to get a single player by ID
router.get('/get_player/:id', playerController.getPlayerById);
// Route to delete a player by ID
router.delete('/delete_player/:id', authRequire, restrictTo('admin'), playerController.deletePlayerById);

module.exports = router;