const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Central error handler
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { username: '', email: '', password: '' };

  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  if (err.code === 11000) {
    errors.email = 'That email is already registered';
  }

  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// JWT setup
const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

// Register
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });
    const token = createToken(user._id);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: 'lax',
      secure: false
    });

    const { password: pw, ...safeUser } = user._doc;
    res.status(201).json({ user: safeUser });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: 'lax',
      secure: false
    });

    const { password: pw, ...safeUser } = user._doc;
    res.status(200).json({ user: safeUser, token });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

// Current user (requires middleware to attach req.user)
exports.getCurrentUser = (req, res) => {
  res.status(200).json({ user: req.user });
};

// Profile
exports.getProfile = (req, res) => {
  res.json({ user: req.user });
};

// Logout
exports.logout = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    maxAge: 1,
    sameSite: 'lax',
    secure: false
  });
  console.log('User logged out');
  res.status(200).json({ message: 'Logged out successfully' });
};
