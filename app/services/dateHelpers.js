var moment = require('moment');

var dateHelpers = function () {
  function formatDate(date, format) {
    return moment(date).format(format);
  }

  return {
    formatDate: formatDate
  };
};

module.exports = dateHelpers();
