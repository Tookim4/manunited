const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
name: {
    type: String,
    required: [true, 'Player name is required'],
    trim: true,
  },
  position: {
    type: String,
    enum: ['GK', 'DF', 'MF', 'FW'], // Goalkeeper, Defender, Midfielder, Forward
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  goals: {
    type: Number,
    required: true,
  },
  appearances: {
    type: Number,
    required: true,
  },
  assists: {
    type: Number,
    required: true,
  },
  trophies: {
    type: Number,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  image: {
    type: String, 
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;