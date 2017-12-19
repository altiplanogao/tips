#!/usr/bin/env node

var request = require('request');
var dateformat = require('dateformat');
var mongodb = require('mongodb')
var Db = mongodb.Db
var Connection = mongodb.Connection
var Server = mongodb.Server

var period = 10000

// var MongoClient = mongodb.MongoClient;
// var mgurl = "mongodb://localhost:27017/mydb";
// MongoClient.connect(mgurl, function(err, db) {
//   if (err) throw err;
//   console.log("数据库已创建!");
//   db.createCollection("goldprice", function(err, res) {
//     if (err) throw err;
//     console.log("创建集合!");
//     db.close();
//   });
// });

// var  headers = [
//     ('User-Agent','Mozilla/5.0 (Windows NT 6.1; rv:5.0) Gecko/20100101 Firefox/5.0'),
//     ("Accept-Language","zh-cn,zh;q=0.5")
// ]

var options = {
  url: 'https://data-asg.goldprice.org/dbXRates/USD,USD,USD,CNY,USD,USD',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; rv:5.0) Gecko/20100101 Firefox/5.0'
  }
}

function getGpAuPrice(){
  // console.log("on Enter getGpAuPrice")
  var firems = new Date().getTime()
  request(options, (error, response, body) => {
  	// console.log('error: ' + error)
  	// console.log('response: ' + response)
  	// console.log('body: ' + body)
    if (!error && response.statusCode == 200) {
      var shot_ms = new Date().getTime()
      var info = JSON.parse(body);
      var ts = info.ts
      var tsj = info.tsj
      var j = ts - tsj
      var cnp = info.items[0].xauPrice
      var format="hh:MM:ss.l"
      console.log("price: " + cnp + ", " + ts + ", \t" + dateformat(new Date(firems), format) + "    " + dateformat(new Date(tsj), format) + "-" 
      					+ dateformat(new Date(ts), format) + ", " +0.001*j + " fly:" + 0.001*(shot_ms - firems));
      setTimeout(getGpAuPrice, period)
    }
    // console.log(response)
  });
  // console.log("on Leave getGpAuPrice")
}


var gonghang_options = {
  url: 'https://mybank.icbc.com.cn/servlet/AsynGetDataServlet',
  method: 'POST',
  headers: {
  	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },
  body: 'Area_code=0200&trademode=1&tranCode=A00462'
}

function getGongHangAuPrice(){
  // console.log("on Enter getGongHangAuPrice")
  var firems = new Date().getTime()
  request(gonghang_options, (error, response, body) => {
  	// console.log('error: ' + error)
  	// console.log('response: ' + response)
  	// console.log('body: ' + body)
    if (!error && response.statusCode == 200) {
      // var shot_ms = new Date().getTime()
      var info = JSON.parse(body);
      // var ts = info.ts
      // var tsj = info.tsj
      // var j = ts - tsj
      // var cnp = info.items[0].xauPrice
      // var format="hh:MM:ss.l"
      console.log("price: " + info);
      setTimeout(getGongHangAuPrice, period)
    }
    // console.log(response)
  });
  // console.log("on Leave getGongHangAuPrice")
}


function printHello(){
   console.log( "Hello, World!");
}

printHello()
getGpAuPrice()
getGongHangAuPrice()
