var express = require('express');
var router = express.Router();
const fs = require('fs');
var getApi = require("../modules/getApi");


router.get('/', function (req, res, next) {

  getApi.GetNumber(req, res, function (err, docs) {
    //number.json 파일 없으면 생성해줘야함
    fs.exists('number.json', function (exists) {
      if (exists) {
        const article = fs.readFileSync("number.json").toString();
        res.render('index', { info: article, weekNo: docs });
      } else {
        res.render('index', { info: "undefined", weekNo: docs });
      }
    });

  })
});

router.post('/GetNumber', function (req, res, next) {

  var GetNumber = req.param("data");
  const text = JSON.stringify(GetNumber);

  fs.writeFileSync("number.json", text, { encoding: 'utf8' });
  res.send("true");
});

module.exports = router;