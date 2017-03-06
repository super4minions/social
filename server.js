var http = require('http');
var mainhandler = require('./main.js');
http.createServer(mainhandler).listen(8080,function(){
});
