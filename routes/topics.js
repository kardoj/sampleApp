var express = require('express');
var router = express.Router();
// Takes our schema template, which is in the database
var Topic = require('../models/topic').Topic;

// POST /api/topics/create
router.post('/create/', function(req, res, next) {

    var params = req.body;

    console.log(params);

    if(params.topicName){

        var topicObject = {
            name: params.topicName
        };

        var newTopic = new Topic(topicObject);
        newTopic.save(function(err, entry) {

            //handle saving error
            if(err){ return res.json(err); }

            //return saved entry
            res.json({"successs": entry});
        });

    }else{
        //if missing parameters returs error
        res.status(500).send({ error: 'missing parameters' });
    }

});

// GET /api/topics/single/1234
router.get('/single/:id', function(req, res, next) {

    var params = req.params;

    console.log(params);

    if(params.id){
      //for example querying one
      Topic.findById(params.id, function(err, entry) {
        next(err, entry);
      });

      // for example querying one and updating, returning updated version
      var conditions = {_id: params.id};
      var update = { $inc: { viewCount: 1 }};
      var options = {new: true};

      var query = Topic.findOneAndUpdate(conditions, update, options);
      query.select("-created -__v -_id");

      query.exec(function(err, entry) {
        if(err){ return res.json({"error":"something went wrong"}); }
        res.json({"success": entry});
      });
    }else{
        res.sendStatus(404);
    }

});

module.exports = router;
