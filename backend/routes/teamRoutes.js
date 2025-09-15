const express = require('express');
const router = express.Router();
const { getMyTeam, addPlayerToTeam } = require('../controllers/teamControllers');
const { authRequire } = require('../middleware/authMiddleware');

router.get('/', authRequire, getMyTeam);
router.post('/', authRequire, addPlayerToTeam);

module.exports = router;