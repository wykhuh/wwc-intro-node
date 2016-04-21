var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.send('hi')
})

app.get('/projects', function(req, res) {
  res.send('projects page')
})



app.listen(port, function(){
  console.log('Server is running on port: ' + port)
})
