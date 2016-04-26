var fs = require('fs');
var path = require('path');

var projectInfoService = function () {
  function readFile(repoName, cb) {
    var filePath = path.join(__dirname, 'posts', repoName + '.html');

    return fs.readFile(filePath, { encoding: 'utf8' }, function (err, data) {
      cb(err, data);
    });
  }

  return {
    readFile: readFile
  };
};

module.exports = projectInfoService();
