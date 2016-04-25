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

  return {
    getRepos: getRepos,
    getUser: getUser
  };
};

module.exports = githubService();
