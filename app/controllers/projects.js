var router = require('express').Router();
var githubService = require('../services/githubService.js');
var postService = require('../services/postService.js');

var username = 'wykhuh';

router.get('/projects', function (req, res) {
  githubService.getGithubInfo(username)
    .then(function (results) {
      var repos = results.repos;
      repos.forEach(function (repo, index) {
        repos[index].hasPost = postService.fileExists(repo.name);
      });
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

router.get('/projects/:id', function (req, res) {
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

module.exports = router;
