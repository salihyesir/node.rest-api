var express	 	= require('express');
var router 		= express.Router();
var request = require('request');

//https://enable-cors.org/server_expressjs.html
//https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', function (req, res, next) {
    request('http://localhost:3000/restapi/notes',function(error,response,body){
        var data = JSON.parse(body);
        res.render('note.ejs',{data});
    });
});
module.exports = router;