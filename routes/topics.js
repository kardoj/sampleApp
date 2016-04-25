var express = require('express');
var router = express.Router();
// Takes our schema template, which is in the database
var Topic = require('../models/topic').Topic;

// GET /api/topics/ - returns all the topics
router.get('/', function(req, res, next){
  Topic.find(function(err, topics) {
    if(err){ return res.json({error:"something went wrong"}); }
    res.json(topics);
  });
});

// POST /api/topics/ - creates a new topic from req.body (post )data
router.post('/', function(req, res, next) {

  var postData = req.body;

  console.log(postData);

  if(postData.name){

    var topicObject = {
      name: postData.name
    };

    var newTopic = new Topic(topicObject);
    newTopic.save(function(err, topic) {

      //handle saving error
      if(err){ return res.json(err); }

      //return saved entry
      res.json(topic);
    });

  }else{
    //if missing parameters returns error
    res.sendStatus(400);
  }

});

// GET /api/topics/1234 - returns a single topic
router.get('/:id', function(req, res, next) {

  var params = req.params;

  console.log(params);

  if(params.id){
    var conditions = {_id: params.id};
    var update = { $inc: { viewCount: 1 }};
    var options = {new: true};

    var query = Topic.findOneAndUpdate(conditions, update, options);

    query.exec(function(err, entry) {
      if(err){ return res.json({error:"something went wrong"}); }
      res.json(entry);
    });
  }else{
    res.sendStatus(400);
  }

});

// PUT /api/topics/:id
router.put('/:id', function(req, res, next){
  var id = req.params.id; // use the id from the route
  var params = req.body;
  if(params.name){
    var conditions = {_id: id};
    var update = {name: params.name};
    var options = {new: true};
    var query = Topic.findOneAndUpdate(conditions, update, options);
    query.exec(function(err, entry){
      if(err){ return res.json({error: "something went wrong"}); }
      res.json(entry);
    });
  } else {
    res.status(500).send({error: 'missing parameters'});
  }
});

// DELETE /api/topics/:id - mark topic as deleted (archived)
router.delete('/:id', function(req, res, next){
  var params = req.params;
  if(params.id){
    var conditions = {_id: params.id};
    var update = {deleted: new Date()};
    var options = {new: true}; // Return the new version of the object
    var query = Topic.findOneAndUpdate(conditions, update, options);
    query.exec(function(err, entry){
      if(err){ return res.json({error: "something went wrong"}); }
      res.json(entry);
    });
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
