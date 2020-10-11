const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const passport = require('passport');

//Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register User' });
        } else {
            res.json({ success: true, msg: 'User registered' })
        }
    })
});

//Authenticate
router.post('/authenticate', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.getByEmail(email, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found' })
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({ user: user }, process.env.SECRET, {
                    expiresIn: 604800 // 1 week
                });
                res.json({
                    success: true,
                    token: 'jwt ' + token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        username: user.username
                    }
                })
            } else {
                res.json({
                    success: false,
                    msg: 'Wrong password'
                });
            }

        })
    })
});

//Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user, success: true });
});
module.exports = router;