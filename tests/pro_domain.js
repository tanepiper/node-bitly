var sys = require('sys');
var Bitly = require(__dirname +'/../lib/bitly/Bitly').Bitly;
console.log('Running test: Pro Domain');
var bitly = new Bitly('<YOUR USERNAME>', '<YOUR API KEY>');

bitly.bitlyProDomain('nyti.ms', function(result) {
  console.log(sys.inspect(result));
});

