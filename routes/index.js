var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/', function (req, res, next) {

  const article = fs.readFileSync("number.json");
  res.render('index', { info: article });

});

router.post('/GetNumber', function (req, res, next) {

  var GetNumber = req.param("data");
  const text = JSON.stringify(GetNumber);

  fs.writeFileSync("number.json", text, { encoding: 'utf8' });
  res.send("true");
});

module.exports = router;