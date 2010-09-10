var sys = require('sys');
var Bitly = require(__dirname +'/../lib/bitly/Bitly').Bitly;
console.log('Running test: Lookup');
var bitly = new Bitly('<YOUR USERNAME>', '<YOUR API KEY>');

bitly.lookup(['http://tanepiper.com', 'http://node.js'], function(result) {
  console.log(sys.inspect(result));
});

