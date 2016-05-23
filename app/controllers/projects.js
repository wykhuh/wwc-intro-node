var router = require('express').Router();
var githubService = require('../services/githubService.js');
var projectInfoService = require('../services/projectInfoService.js');
var pagination = require('../services/paginationHelper.js');

var username = 'wykhuh';

router.get('/projects', function (req, res) {
  var currentPage = req.query.page || 1;

  githubService.getGithubInfo(username)
    .then(function (results) {
      var repos = results.repos;
      var options = {
        total: results.bio.public_repos,
        perPage: 30,
        url: '/projects?page=',
        currentPage: currentPage
      };

      repos.forEach(function (repo, index) {
        repos[index].hasPost = projectInfoService.fileExists(repo.name);
      });

      res.render('projects', {
        title: 'My Projects',
        bio: results.bio,
        repos: results.repos,
        paginationLinks: pagination.getLinks(options)
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});

router.get('/projects/:id', function (req, res) {
  var currentProjectName = req.params.id;

  projectInfoService.readFile(currentProjectName, function (err, results) {
    var currentProject = {};

    if (err) {
      currentProject = {
        post: currentProjectName + ' is invalid project name.'
      };
    } else {
      currentProject = {
        name: currentProjectName,
        post: results,
        url: 'https://github.com/wykhuh/' + currentProjectName
      };
    }

    res.render('project', {
      title: 'My Project: ' + currentProjectName,
      project: currentProject
    });
  });
});

module.exports = router;
