var router = require('express').Router();

router.get('/', function (req, res) {
  var myLinks = [
    { url: 'http://github.com/wykhuh', text: 'Github' },
    { url: 'http://nerdycreativity.com', text: 'Blog' },
    { url: 'https://www.linkedin.com/in/waiyinkwan', text: 'LinkedIn' }
  ];

  res.render('home', { title: 'My Site', links: myLinks });
});

module.exports = router;
