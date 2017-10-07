var express = require('express');
var app = express();
var router = express.Router();
var fs=	     require('fs');
var http =   require('http');
var csv = require('ya-csv');
const config = require('../config/config.js')
var request = require('request');
var filepath='./sharad_samman_another_backup.csv';

var filepath2='./sharad_samman.csv';

//localhost:8080/writeData
router.get('/',function(req,res,next){
	res.send('respond from file writing module');
});

//localhost:8080/writeData/submitForm
router.post('/submitForm', function(req, res,next){  

	var body = req.body.name +', '+ req.body.email +', '+ req.body.mbnumber +', '+ req.body.message +'\n';
	console.log(body);
	
	var writer = csv.createCsvStreamWriter(fs.createWriteStream(filepath2, {'flags': 'a'})); 
	
	writer.writeRecord([req.body.name, req.body.email, req.body.mbnumber,req.body.message]);  
	
	fs.appendFile(filepath , body ,function(err) {
		if (err) 
			console.log(err);;
    });
    
	if(res.statusCode == 200){
		res.write(body + '- saved !!');
	}else{
		res.write(body + '- not saved some error in server!');
	}
	res.end();

});

module.exports =router ;