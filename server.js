var express = require('express');
var exphbs = require('express-handlebars');
var axios = require('axios');
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
  var myLinks = [
    { url: 'http://github.com/wykhuh', text: 'Github' },
    { url: 'http://nerdycreativity.com', text: 'Blog' },
    { url: 'https://www.linkedin.com/in/waiyinkwan', text: 'LinkedIn' }
  ];

  res.render('home', { title: 'My Site', links: myLinks });
});

app.get('/projects', function (req, res) {
  var options = {
    headers: {
      'User-Agent': 'wykhuh'
    }
  };

  axios.get('https://api.github.com/users/wykhuh', options)
    .then(function (results) {
      console.log(results);
    })
    .catch(function (err) {
      console.log(err);
    });

  axios.get('https://api.github.com/users/wykhuh/repos', options)
    .then(function (results) {
      console.log(results);
    })
    .catch(function (err) {
      console.log(err);
    });

  res.render('projects', { title: 'My Projects' });
});

// =======================
// server
// =======================

app.listen(port, function(){
  console.log('Server is running on port: ' + port)
})
