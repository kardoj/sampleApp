var express = require('express');
var router = express.Router();

var User = require('../models/user').User;

var cryptService = require('../utils/cryptService.js');
var jwt = require('jsonwebtoken');
var config = require('../config');
var expressJwt = require('express-jwt');
var validateJwt = expressJwt({
    secret: config.secret
});


// GET /api/users/me
// Kõikidele route'dele saab validateJwt vahele panna, et kontrollida, kas kasutaja on sisse loginud
router.get('/me', validateJwt, function(req, res, next) {

    //return single user data
    User.findById(req.user.id).select('-password').exec(function(err, user) {
        if (err) {
            return res.json({
                error: err
            });
        }
        if (user) {

            var response = {
                user: user
            };

            // UPDATE EXPIRED TOKEN LATER
            var timeDiffInSeconds = (new Date().getTime() / 1000).toFixed() - req.user.iat;
            if (timeDiffInSeconds > 10 && timeDiffInSeconds < config.token_expires) {

                console.log('token updated');
                response.token = jwt.sign({
                    id: user.id
                }, config.secret, {
                    expiresIn: config.token_expires
                });

            } else if (timeDiffInSeconds > 10) {

                console.log('token expired completely, delete token client side');
                return res.status(403).send({
                    error: 'Unauthorized'
                });

            }

            return res.json(response);
        }
        return res.status(401).send({
            error: 'Unauthorized'
        });

    });

});

// POST /api/users/signup
router.post('/signup', function(req, res, next) {

    var postData = req.body;

    if (postData.email && postData.password) {

        // no server side validating for now

        //check if already exists
        User.findOne({
            email: postData.email
        }).exec(function(err, user) {
            if (err) {
                return res.status(500).json(err);
            }
            if (user) {
                return res.status(400).json({
                    message: 'already exists'
                });
            }

            // Hash
            cryptService.cryptPassword(postData.password, function(err, hashedPassword) {

                var userObject = {
                    email: postData.email,
                    password: hashedPassword
                };

                var newUser = new User(userObject);
                newUser.save(function(err, user) {

                    //handle saving error
                    if (err) {
                        console.error(err);
                        return res.status(500).json(err);
                    }

                    console.log(user);

                    user.password = undefined; // võtab objektist selle omaduse ära

                    res.json(user);
                });

            });

        });

    } else {
        //if missing parameters returns error
        res.sendStatus(400);
    }

});

// POST /api/users/login
router.post('/login', function(req, res, next) {

    var postData = req.body;

    if (postData.email && postData.password) {

        var findOptions = {
            email: postData.email
        };

        User.findOne({
            email: postData.email
        }).exec(function(err, user) {
            if (err) {
                return res.status(500).json(err);
            }
            if (!user) {
                return res.status(401).json({
                    message: "no such email"
                });
            }
            console.log(user.password);

            cryptService.comparePassword(postData.password, user.password, function(err, match) {

                if (!match) {
                    return res.status(401).json({
                        message: "wrong credentials"
                    });
                }

                user.password = undefined;
                var response = {
                    user: user
                };

                // RETURN USER AND TOKEN LATER
                response.token = jwt.sign({
                    id: user.id
                }, config.secret, {
                    expiresIn: config.token_expires
                });

                return res.json(response);

            });

        });

    } else {
        //if missing parameters returns error
        res.sendStatus(400);
    }

});

module.exports = router;
