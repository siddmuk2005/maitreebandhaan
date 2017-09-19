var express = require('express');
var app = express();
var router = express.Router();

//localhost:8080/
router.get('/',function(req,res,next){
	res.render('index');
});
module.exports=router;