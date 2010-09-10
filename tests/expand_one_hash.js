var sys = require('sys');
var Bitly = require(__dirname +'/../lib/bitly/Bitly').Bitly;
console.log('Running test: Expand One Hash');
var bitly = new Bitly('<YOUR USERNAME>', '<YOUR KEY>');

bitly.expandUrl('9lCnZ9', function(result) {
  console.log(sys.inspect(result));
});

