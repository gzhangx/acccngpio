var express = require('express');
var app = express();

var webGpio = require('./server/mwebgpio');
app.get('/', function(req,res){
  res.send('test');
});

app.get('/gpio/all', webGpio.gpioGet);
app.get('/gpio/ctrl', webGpio.gpioControl);
app.use('/public',express.static('public'));

var server = app.listen(3001, function(){
  host = server.address().address;
  var port = server.address().port;
  console.log('app started at %s %s', host,port);
});

console.log('server.js end');
//var fs = require('fs');
//fs.readFile('public/head.html','utf8', function(err,data){
//console.log('read err='+err);
//console.log('read data='+data);
//});
