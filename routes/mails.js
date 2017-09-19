var express = require('express');
var app = express();
var router = express.Router();

const config = require('../config/config.js')
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var xoauth2 = require('xoauth2');

//localhost:8080/mails
router.get('/',function(req,res,next){
	res.send('respond from mail module');
});

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// http://localhost:8080/mails/sendMail
// send mail with defined transport object
router.get('/sendMail', function(req, res,next){  

	var transporter = nodemailer.createTransport(smtpTransport({
		service: config.server,
		auth: {
			xoauth2: xoauth2.createXOAuth2Generator({
				user: config.user, // Your email id
				clientId: config.clientId,
				clientSecret:config.clientSecret,
				refereshToken:config.refereshToken,
				accessToken:config.accessToken
			})
		},
		tls: {
			rejectUnauthorized: false
		},
		maxConnections: 5,
		maxMessages: 10

	}));


	var mailOptions = {
		from: 'Maitree Bandhaan' + ' &lt;' + config.fromEmailId  + '&gt;',
		to: config.toEmailId,
		subject: 'Sending Email from maitreebandhaan portal',
		html: '<h3>Dear MaitreeBandhaan</h3><p>'+ 'testing mailing application'+'</p>'
	}

	console.log(mailOptions);

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
				console.log("/sendmail error");
				console.log(error);
				res.sendStatus(500);
				return;
		}else{
			console.log("Message sent: " + info.response);
			// if you don't want to use this transport object anymore, uncomment following line
			socketTimeout: 30 * 1000 // 0.5 min: Time of inactivity until the connection is closed
			transporter.close(); // shut down the connection pool, no more messages
			res.sendStatus(200);
		}
		transporter.close();
	});

});

module.exports =router 