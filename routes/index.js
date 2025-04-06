var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Bienvenue sur mon API Port de Plaisance Russel ');
});
module.exports = router;
