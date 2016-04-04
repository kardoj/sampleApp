var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var config = require('./config');
var mongoose = require('mongoose');


var app = express();
mongoose.connect(config.db);
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes are matched from top to bottom, 404 should be the bottom one!
var topics = require('./routes/topics');
app.use('/api/topics', topics);

app.use(function(req, res, next) {
    var err = new Error('Resource not found');
    err.status = 404;
    next(err); // Moves execution to the next error handler
});

app.use(function(err, req, res, next) {
    console.error("["+(err.status || 500)+"] "+(new Date()).toString()+" "+req.url +' '+ err);
    var message = err.status == 404 ? err.message : "Unknown error";
    res.status(err.status || 500).json({
        status: err.status || 500,
        message: message //should by default hide in production
    });
});

process.on('uncaughtException', function (err) {
    console.error((new Date()).toString() + ' uncaughtException:', err.message);
    console.error(err.stack);
    process.exit(1);
});

app.listen(3000, function(){
  console.log('App started on port 3000!');
});
