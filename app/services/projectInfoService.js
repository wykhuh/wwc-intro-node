var fs = require('fs');
var path = require('path');

var projectInfoService = function () {
  function filePath(repoName) {
    return path.join(__dirname, 'posts', repoName + '.html');
  }

  function readFile(repoName, cb) {
    return fs.readFile(filePath(repoName), function (err, data) {
      cb(err, data);
    });
  }

  function fileExists(repoName) {
    try {
      return fs.statSync(filePath(repoName)).isFile();
    } catch (err) {
      return false;
    }
  }

  return {
    readFile: readFile,
    fileExists: fileExists
  };
};

module.exports = projectInfoService();
