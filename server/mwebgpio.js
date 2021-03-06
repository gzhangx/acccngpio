'use strict';

var gpio = require('onoff').Gpio,
leds = {},
led = new gpio(14, 'out'),
button = new gpio(4, 'in','both');
button.watch(function(err, value){
 console.log(value);
});

var idnames = [2,3,17,18,27];//,22,23,24];
for (var i = 0; i < idnames.length; i++) {
  var curl = new gpio(idnames[i], 'out');
  console.log('setting gpio '+idnames[i]+' to out');
  curl.writeSync(1);
  console.log('setting gpio '+idnames[i]+' to out done');
  leds['s'+idnames[i]] =(curl);
}
for (var i = 0; i < idnames.length; i++) {
  console.log('set leds '+i);
  leds['s'+idnames[i]].writeSync(1);
}
led.writeSync(1);

exports.gpioGet = function(req, rsp) {
  rsp.jsonp(idnames);
}

exports.gpioControl = function(req, rsp) {
  var query = req.query || null;
  if (query === null) {
    console.log('null request');
    return rsp.jsonp({error: 'null  request'});
  }
  console.log('req.id ' +  query.id+' stat '+ query.stat + ' ' + parseInt(query.stat));
  var gpioVal = parseInt(query.stat);
  //if (gpioVal === 0 || gpioVal === 1) {
    console.log('gpio s' + query.id);
    leds['s'+query.id].writeSync(gpioVal);
  //}
  rsp.jsonp({io: gpioVal, id: query.id});
}
