const express = require('express');
const router = express.Router();
const { getMyTeam, addPlayerToTeam, removePlayerFromTeam } = require('../controllers/teamControllers');
const { authRequire } = require('../middleware/authMiddleware');

router.get('/', authRequire, getMyTeam);
router.post('/', authRequire, addPlayerToTeam);
router.delete('/:playerId', authRequire, removePlayerFromTeam);

module.exports = router;