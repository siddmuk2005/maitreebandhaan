var express = require('express');
var app = express();
var router = express.Router();
var fs=require('fs');
var csv = require('ya-csv');
    
var filepath='./write.csv';

const config = require('../config/config.js')

//localhost:8080/writeData
router.get('/',function(req,res,next){
	res.send('respond from file writing module');
});

//localhost:8080/writeData/submitForm
router.post('/submitForm', function(req, res,next){  

	var body = req.body.name +', '+ req.body.email +', '+ req.body.mbnumber +', '+ req.body.message +' |';
	console.log(body);
	
	var writer = csv.createCsvStreamWriter(fs.createWriteStream('./sharad_samman.csv', {'flags': 'a'})); 
	
	writer.writeRecord([req.body.name, req.body.email, req.body.mbnumber,req.body.message]);  
	
	fs.appendFile(filepath , body ,function(err) {
		if (err) 
			console.log(err);;
		res.write(body + '- saved');
		res.end();
    });
    
});

//localhost:8080/writeData
router.get('/readFormDatas',function(req,res,next){
	
	fs.readFile('./sharad_samman.csv' , 'utf8', function (err,data) {
	  if (err) {
		return console.log(err);
	  }
	  console.log(data);
	  res.write(data);
	  res.end();
	});
});

module.exports =router ;