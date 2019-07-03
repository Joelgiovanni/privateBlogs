const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
var jwt = require('jsonwebtoken');
const keys = require('../config/Keys');
const saltRounds = 12;

const registerDate = require('../helpers/DateStamp');

const User = require('../models/User');
const Post = require('../models/Post');

//Validation for the login / register routes
const registerValidation = require('../validation/register');
const validateLogin = require('../validation/login');

router.post('/newpost', (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
    date: registerDate
  });
  newPost
    .save()
    .then(
      res.json({
        success: true,
        message: 'You have added a new post!'
      })
    )
    .catch(err => console.log(err));
});

// @route   POST
// @desc    Register a new user
// @access  Public
// URL: http://localhost:5000/auth/register
router.post('/register', (req, res) => {
  const { errors, isValid } = registerValidation(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const name = req.body.name;
  const email = req.body.email;

  // Check to see if the email is registered yet
  User.findOne({ email }).then(user => {
    if (user) {
      // If the user exists, send error message
      return res.status(400).json({
        email: 'Oops, That email is already registered with us!'
      });
    } else {
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          memberSince: registerDate
        });
        newUser
          .save()
          .then(() =>
            res.json({
              success: true,
              message: `Welcome ${name}. Your new account has been created!`
            })
          )
          .catch(err => console.log(err));
      });
    }
  });
});

// @route   POST
// @desc    Login user and set the JWT
// @access  Public
// URL: http://localhost:5000/auth/login
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  // Check to see if the user is registered
  User.findOne({ email }).then(user => {
    if (!user) {
      return res
        .status(400)
        .json({ email: 'That email is not registered with us!' });
    }

    // If user is found: Check that passwords match
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // The user has been matched
        // The following payload will contain whatever user data that we may want to send with the token
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          memberSince: user.memberSince
        };

        // Sign token and send it
        jwt.sign(
          payload,
          keys.secretTokenKey,
          { expiresIn: 3600 }, // 1 hour expiration time. 3600 Seconds === 1 hour.
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: 'Password is incorrect' });
      }
    });
  });
});

// @route   GET
// @desc    Use Token to retrieve current User
// @access  Private
// URL: http://localhost:5000/auth/current
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      memberSince: req.user.memberSince
    });
  }
);

module.exports = router;
