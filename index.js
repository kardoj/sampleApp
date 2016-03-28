var express = require('express');
var app = express();

app.get('/api', function(req, res){
  console.log('Somebody visited /api');
  res.json({"success": "Tere tulemast!"});
});

app.listen(3000, function(){
  console.log('App started on port 3000!');
});
