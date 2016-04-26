var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var githubService = require('./services/githubService.js');
var postService = require('./services/postService.js');

var username = 'wykhuh';

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
    json: function(context) {
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

app.get('/', function (req, res) {
  var myLinks = [
    { url: 'http://github.com/wykhuh', text: 'Github' },
    { url: 'http://nerdycreativity.com', text: 'Blog' },
    { url: 'https://www.linkedin.com/in/waiyinkwan', text: 'LinkedIn' }
  ];

  res.render('home', { title: 'My Site', links: myLinks });
});

app.get('/projects', function (req, res) {
  githubService.getGithubInfo(username)
    .then(function (results) {
      var repos = results.repos;
      repos.forEach(function(repo, index){
        repos[index].hasPost = postService.fileExists(repo.name)
      })
      res.render('projects', {
        title: 'My Projects',
        bio: results.bio,
        repos: results.repos
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get('/projects/:id', function (req, res) {
  var currentProjectName = req.params.id;

  postService.readFile(currentProjectName, function (err, results) {
    var currentProject = {
      name: currentProjectName,
      post: results,
      url: 'https://github.com/' + username + '/' + currentProjectName
    };

    res.render('project', {
      title: 'My Project: ' + currentProjectName,
      project: currentProject
    });
  });
});

module.exports = app;
