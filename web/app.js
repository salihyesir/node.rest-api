var express = require('express');
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    port= process.env.PORT || 8080;
    
    http://pasali.me/2016/02/13/cross-origin-resource-sharing-(cors)-nedir.html
//https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
var cors = require('cors');
app.use(cors());

var routes = require('./routes');
process.title = "node-web";

// View engine ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', routes);

  
io.on('connection', function(socket){
    console.log('a user connected');
});
  
http.listen(8080, function(){
    console.log('listening on *:8080');
});