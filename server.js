var express = require('express');
var app = express();
var router = express.Router();
app.use(router)

var path = require('path')
var http = require('http')
var nodemailer = require('nodemailer');
var formidable = require("formidable");
var util = require('util');
var cookieParser = require('cookie-parser')
var session = require('express-session')
app.set('trust proxy', 1) // trust first proxy 

var routes=require('./routes/index');
var mails=require('./routes/mails');
var writeToFile=require('./routes/write_append');
var config = require('./config/config')

router.use(session({
    secret: 'cookie_secret',
    name: 'cookie_name',
    //store: 'hello', // connect-mongo session store
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

app.set('port',process.env.PORT||8080);
app.set('views',__dirname + '/views');
app.set('view engine', 'jade');
router.use(cookieParser());
router.use(session({secret:"xyzlmnt"}));
router.use(express.static(path.join(__dirname, 'public')));

var bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


var server = http.createServer(app).listen(app.get('port' ), function () {
   var host = server.address().address ;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port);
   console.log("its working");
   
});

server.on('error',onError);
server.on('listening',onListening);

router.get('/*.txt',function(req,res){
	res.send("i am not a file ");
	
});
router.get('/maitreebandhaan', function(req, res) {
    res.sendFile('/index.html', {root: __dirname });
	console.log(req.cookie);
});

router.use("/",routes);
router.use("/mails",mails);
router.use("/writeData",writeToFile);

router.use('/gallery', require('node-gallery')({
  staticFiles : 'public/img/mb_meetings',
  urlRoot : 'gallery', 
  title : 'MaitreeBandhaan Gallery',
  render : false
}), function(req, res, next){
  /*
   We MUST add another middleware function to the chain when render is false. 
   just return the raw HTML data - we could partial into another template here,
   pass the JSON data into a template
   */
  return res.send(req.html);
});

function onError(error){
	console.log("onError");
	if(error.sysCall!=='listen'){
		throw error;
	}
}

function onListening(){
	console.log("onListening");
}

module.exports = router;