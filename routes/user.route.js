const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

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
router.get('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const passport = req.body.passport;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found' })
        }
    })

    User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
            const token = jwt.sign(user.id, process.env.SECRET, {
                expiresIn: 604800 // 1 week
            });
            res.json({
                success: true,
                token: 'JWT ' + token,
                user: {
                    id: user_id,
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
});

//Profile
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});

module.exports = router;