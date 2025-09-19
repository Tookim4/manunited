const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// handle errors function
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { username: '', email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'that email is not registered';
    return errors;
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'that password is incorrect';
    return errors;
  }

   // duplicate error code
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

    // error validation
  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }
}

// Function to create JWT
const maxAge = 3 * 24 * 60 * 60; // 1 day in seconds
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
};

// Register a new user
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({ username, email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, secure:true, sameSite: "none", maxAge: maxAge * 1000 });
        res.status(201).json({ user });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });// send errors object as response
    }
};

// Login an existing user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        console.log(token);
        res.cookie('jwt', token, { httpOnly: true, secure:true, sameSite: "none", maxAge: maxAge * 1000 });
        res.status(200).json({ user, token});
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });// send errors object as response
    }
}

exports.getCurrentUser = (req, res) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.status(401).json({ user: null });
            } else {
                User.findById(decodedToken.id)
                    .then(user => res.status(200).json({ user }))
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ user: null });
                    });
            }
        });
    } else {
        res.status(401).json({ user: null });
    } 
};

// Get user profile
exports.getProfile = async (req, res) => {
    res.json({user: req.user});
};

// logout user
exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    console.log('User logged out');
    // res.redirect('/');
};

