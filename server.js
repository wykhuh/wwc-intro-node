var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var port = process.env.PORT || 3000;

// =======================
// middleware
// =======================

// set the folder for the views
app.set('views', './app/views');

// set up templating engine
app.engine('hbs', exphbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: './app/views/layouts'
}));
app.set('view engine', 'hbs');

// set public static folder
app.use(express.static('app/public'));

// =======================
// routes
// =======================

app.get('/', function (req, res) {
  res.render('home', { title: 'My Site' });
});

app.get('/projects', function (req, res) {
  res.render('projects', { title: 'My Projects' });
});

// =======================
// server
// =======================

app.listen(port, function(){
  console.log('Server is running on port: ' + port)
})
