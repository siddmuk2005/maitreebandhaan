'use strict';

var express = require('express');
var fs = require('fs');
var compress = require('compression');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();
app.use(router)

router.use(bodyParser.json({ limit: '1mb' }));
router.use(compress());

var filepath='sharad_samman_another_backup.csv';

var filepath2='sharad_samman.csv';


//localhost:8080/readData
router.get('/',function(req,res,next){
	res.send('respond from reading module');
});

router.use(function (req, res, next) {
    req.setTimeout(3600000)
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,' + Object.keys(req.headers).join());

    if (req.method === 'OPTIONS') {
        res.write(':)');
        res.end();
    } else next();
});

function readApp(req,res) {
  var file = req.originalUrl == "/downloadCsv" ? filepath2 : filepath,
      filePath = "./";
	  
  fs.exists(filePath, function(exists){
      if (exists) {     
        res.writeHead(200, {
          "Content-Type": "application/octet-stream",
          "Content-Disposition" : "attachment; filename=" + file}
		  );
        fs.createReadStream(filePath + file).pipe(res);
      } else {
        res.writeHead(400, {"Content-Type": "text/plain"});
        res.end("ERROR File does NOT Exists.ipa");
      }
    });  
}

//localhost:8080/readData/downloadCsv
router.get('/downloadCsv', function(req, res) {
    var url = {"originalUrl":req.url};
	console.log(url)
    readApp(url,res) 
});
//localhost:8080/readData/downloadCsv2
router.get('/downloadCsv2', function(req, res) {
    var url = {"originalUrl":req.url};
	console.log(url)
    readApp(url,res) 
});

module.exports =router ;