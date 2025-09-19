const Player = require('../models/playerModel');

// Create a new player
exports.createPlayer = async (req, res) => {
  try {
    const {name, nationality, position, goals} = req.body;
    const image = req.file ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}` : null;


    const player = new Player({
        name,
        position,
        nationality,
        goals,
        image,
    });

    const savedPlayer = await player.save();
    res.status(201).json({savedPlayer});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// get all players
exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// get a single player by ID
exports.getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//delete a player by ID
exports.deletePlayerById = async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.status(200).json({ message: 'Player deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}