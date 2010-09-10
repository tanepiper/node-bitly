var sys = require('sys');
var Bitly = require(__dirname +'/../lib/bitly/Bitly').Bitly;
console.log('Running test: Expand Multiple Urls');
var bitly = new Bitly('<YOUR USERNAME>', '<YOUR API KEY>');

bitly.expand(['http://bit.ly/9lCnZ9', 'http://bit.ly/bYPhxl', 'http://bit.ly/6uBruH'], function(result) {
  console.log(sys.inspect(result));
});

