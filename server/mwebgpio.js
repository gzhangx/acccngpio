'use strict';

var gpio = require('onoff').Gpio,
led = new gpio(14, 'out'),
button = new gpio(4, 'in','both');
button.watch(function(err, value){
 console.log(value);
});

led.writeSync(1);

exports.gpioControl = function(req, rsp) {
  var query = req.query || null;
  if (query === null) {
    console.log('null request');
    return rsp.jsonp({error: 'null  request'});
  }
  console.log('req.id ' +  query.id+' stat '+ query.stat + ' ' + parseInt(query.stat));
  var gpioVal = parseInt(query.stat);
  if (gpioVal === 0 || gpioVal === 1) {
    console.log('gpio ' + gpioVal);
    led.writeSync(gpioVal);
  }
  rsp.jsonp({io: gpioVal, id: query.id});
}
