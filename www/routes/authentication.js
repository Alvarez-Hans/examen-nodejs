const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');

// SIGNUP
router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));

// SINGIN
router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/login', (req, res, next) => {
  req.check('username', 'El usuario es obligatorio').notEmpty();
  req.check('password', 'El password es obligatorio').notEmpty();
  const errors = req.validationErrors();
  if (errors.length > 0) {
    req.flash('message', errors[0].msg);
    res.redirect('/login');
  }
  passport.authenticate('local.signin', {
    successRedirect: '/usuarios',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});


router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
}); 

module.exports = router;
