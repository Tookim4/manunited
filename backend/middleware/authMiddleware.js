const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authRequire = (req, res, next) => {
    const token = req.cookies.jwt;

    // check if json web token exists & is verified
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.status(401).json({ message: 'You are not authorized to access this resource' });
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'You are not authorized to access this resource' });
    }
};

//check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        req.user = null;         // attach to req
        res.locals.user = null;  // still keep for templates
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        req.user = user;          // attach to req
        res.locals.user = user;   // mirror for EJS views
        next();
      }
    });
  } else {
    req.user = null;
    res.locals.user = null;
    next();
  }
};

//restrictTo middleware- restrict access based on user roles
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'You do not have permission to perform this action' });
    }
    next();
  };
};


module.exports = {  authRequire, checkUser, restrictTo };