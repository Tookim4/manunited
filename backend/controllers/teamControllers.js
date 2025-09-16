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
    const { playerId } = req.body;
    // use $addToSet to avoid duplicates and don't load/save entire user doc
    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { team: playerId } }, // only touches team
      { new: true }
    ).populate('team');

    return res.status(200).json({ team: updated.team });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
}
}

// remove player from my team
exports.removePlayerFromTeam = async (req, res) => {
    try {
    const userId = req.user.id;
    const { playerId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.team = user.team.filter(
      (player) => player.toString() !== playerId
    );
    
    await user.save();

    return res.status(200).json({ team: user.team });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}