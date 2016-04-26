var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var homeController = require('./controllers/home.js');
var projectsController = require('./controllers/projects.js');

// =======================
// middleware
// =======================

// set the folder for the views
app.set('views', './app/views');

// set up templating engine
app.engine('hbs', exphbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: './app/views/layouts',
  helpers: {
    json: function (context) {
      return JSON.stringify(context);
    }
  }
}));
app.set('view engine', 'hbs');

// set public static folder
app.use(express.static('app/public'));

// =======================
// routes
// =======================

app.use('/', homeController);
app.use('/', projectsController);

module.exports = app;
