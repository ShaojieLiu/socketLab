var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/master', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views/master.html'));
});

router.get('/slave', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views/slave.html'));
});

module.exports = router;
