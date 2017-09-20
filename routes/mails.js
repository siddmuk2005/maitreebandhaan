var express = require('express');
var app = express();
var router = express.Router();

const config = require('../config/config.js')
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
//var xoauth2 = require('xoauth2');

//localhost:8080/mails
router.get('/',function(req,res,next){
	res.send('respond from mail module');
});

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// http://localhost:8080/mails/sendMail

router.post('/sendMail', function(req, res,next){  

	var transporter = nodemailer.createTransport((smtpTransport({
		service: 'Gmail',
		secureConnection: false,
		auth: {
			user: config.fromEmailId,
			pass: config.pass
		}
	})));
	var body = req.body.name +', '+ req.body.email +', '+ req.body.mbnumber +', '+ req.body.message +'\n';
	
	var mailOptions = {
		from: 'Maitree Bandhaan' + ' &lt;' + config.fromEmailId  + '&gt;',
		to: config.toEmailId,
		subject: 'Sending Email from maitreebandhaan portal',
		html: '<h3>Dear MaitreeBandhaan</h3><p>'+ 'registration details are'+'</p> </br>'+'<p>'+body+'</p>'
	}

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log("/sendmail error \n");
			console.log(error);
			res.sendStatus(500);
			return;
		}else{
			console.log("Message sent: " + info.response);
			// if you don't want to use this transport object anymore, uncomment following line
			socketTimeout: 30 * 1000 // 0.5 min: Time of inactivity until the connection is closed
			
			if(res.statusCode == 200){
				res.write(body + '- mailed !!');
			}else{
				res.write(body + '- not mailed some error in server!');
			}
				res.end();
		}
		transporter.close(); // shut down the connection pool, no more messages
	});

});

module.exports =router 