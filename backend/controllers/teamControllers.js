const User = require('../models/userModel');
const Player = require('../models/playerModel');

// get my team
exports.getMyTeam = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate('team');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.team);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// add player to my team
exports.addPlayerToTeam = async (req, res) => {
    try {
        const {playerId} = req.body;
        const user = await User.findById(req.user.id);

        if (user.team.includes(playerId)) {
            return res.status(400).json({ message: 'Player already in team' });
        }

        user.team.push(playerId);
        await user.save();


        const updatedUser = await User.findById(req.user.id).populate('team');
        res.status(200).json(updatedUser.team);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}