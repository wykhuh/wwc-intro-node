var app = require('./app');
var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Server is running on port: ' + port);
});
