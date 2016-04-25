var axios = require('axios');

var githubService = function () {

  function options (username) {
    return {
      headers: {
        'User-Agent': username
      }
    };
  };

  var baseUrl = 'https://api.github.com';

  function getRepos(username) {
    return axios.get(baseUrl + '/users/' + username + '/repos', options(username));
  }

  function getUser(username) {
    return axios.get(baseUrl + '/users/' + username, options(username));
  }

  function getGithubInfo(username) {
    return axios.all([getRepos(username), getUser(username)])
      .then(function (results) {
        var repos = results[0].data;
        var bio = results[1].data;
        return { bio: bio, repos: repos };
      });
  }

  return {
    getRepos: getRepos,
    getUser: getUser,
    getGithubInfo: getGithubInfo
  };
};

module.exports = githubService();
