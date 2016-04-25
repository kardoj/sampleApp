var express = require('express');
var router = express.Router();

var User = require('../models/user').User;

var config = require('../config');

// POST /api/users/signup
router.post('/signup', function(req, res, next) {

    var postData = req.body;

    if(postData.email && postData.password){

        // no server side validating for now

        //check if already exists
        User.findOne({email: postData.email}).exec(function(err, user) {
            if (err) { return res.status(500).json(err); }
            if(user){
                return res.status(400).json({message: 'already exists'});
            }

            var userObject = {
                email: postData.email,
                password: postData.password
            };

            var newUser = new User(userObject);
            newUser.save(function(err, user) {

                //handle saving error
                if(err){
                    console.error(err);
                    return res.status(500).json(err);
                }

                console.log(user);

                user.password = undefined; // võtab objektist selle omaduse ära

                res.json(user);
            });

        });

    }else{
        //if missing parameters returns error
        res.sendStatus(400);
    }

});

// POST /api/users/login
router.post('/login', function(req, res, next) {

    var postData = req.body;

    if(postData.email && postData.password){

        var findOptions = {
            email: postData.email
        };

        User.findOne({email: postData.email}).exec(function(err, user) {
            if (err) { return res.status(500).json(err); }
            if (!user){
                return res.status(401).json({message: "no such email"});
            }
            console.log(user.password);

            if(user.password != postData.password){
                return res.status(401).json({message: "wrong credentials"});
            }

            user.password = undefined;
            var response = {
                user: user
            };

            return res.json(response);

        });

    }else{
        //if missing parameters returns error
        res.sendStatus(400);
    }

});

module.exports = router;
