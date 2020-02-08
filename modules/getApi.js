const fs = require('fs');
var moment = require('moment');
var  getNumber = require("../saveNo.json");
var request = require("request");

exports.GetNumber = function (req,body,callback) {
    var getToday = moment().day();
    var lastWeek = getNumber.Date;
  
    //몇주가 지났나
    var dateInterval = Number.parseInt(moment().diff(moment(lastWeek),"days")/7);
  
    //토요일인 경우
    if(getToday == 6){
      var checkTime = moment().format('YYYY-MM-DD') +" 21:00";
      var drawTime = Number.parseInt(moment().diff(moment(checkTime)));
       ////토요일이지만 21시가 안되었을 경우 -1
      if(drawTime < 0){
        dateInterval -= 1;
       }
    }
  
    //업데이트 할 내용이 있는경우만
    if(dateInterval >0){
      var momentLastWeek = moment(lastWeek);
      var updateLastWeek = momentLastWeek.add(7*dateInterval,'days').format('YYYY-MM-DD');
      var updateGetNumber = "{" + "\"No\"" +" : "+ (getNumber.No+dateInterval) +", "+ "\"Date\""+" : \""+ updateLastWeek+"\"}";
       
      fs.writeFileSync("saveNo.json", updateGetNumber, { encoding: 'utf8' });
    }
  
  
  var thisWeekNo = (getNumber.No+dateInterval);
    var u = "https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=";
    request(u+thisWeekNo, function(error, response, html){    
        var result = JSON.parse(html);
        //가져오기 실패 시 -1
        if(result.returnValue == "fail"){
          thisWeekNo -= 1;
          request(u+thisWeekNo, function(error, response, html){            
          return callback(null,html);     
        });
        }
        return callback(null,html);     
    });
};

