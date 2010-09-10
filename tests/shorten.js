var sys = require('sys');
var Bitly = require(__dirname +'/../lib/bitly/Bitly').Bitly;
console.log('Running test: Shorten Url');
var bitly = new Bitly('<YOUR USERNAME>', '<YOUR KEY>');

bitly.shortenUrl('http://tanepiper.com', function(result) {
  console.log(sys.inspect(result));
});

