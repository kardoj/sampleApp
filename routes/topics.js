var express = require('express');
var router = express.Router();

// POST /api/topics/create
router.post('/create/', function(req, res, next) {

    var params = req.body;

    console.log(params);

    if(params.topicName){
        res.json({'success': 'successfully got topicName:' + params.topicName});
    }else{
        res.status(500).send({ error: 'missing parameters' });
    }

});

// GET /api/topics/single/1234
router.get('/single/:id', function(req, res, next) {

    var params = req.params;

    console.log(params);

    if(params.id){
        res.json({'success': 'successfully got id:' + params.id});
    }else{
        res.sendStatus(404);
    }

});

module.exports = router;
