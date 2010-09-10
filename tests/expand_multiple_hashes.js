var sys = require('sys');
var Bitly = require(__dirname +'/../lib/bitly/Bitly').Bitly;
console.log('Running test: Expand Multiple Hashes');
var bitly = new Bitly('<YOUR USERNAME>', '<YOUR API KEY>');

bitly.expand(['9lCnZ9', 'bYPhxl', '6uBruH'], function(result) {
  console.log(sys.inspect(result));
});

