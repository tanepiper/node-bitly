var sys = require('sys');
var Bitly = require(__dirname +'/../lib/bitly/Bitly').Bitly;
console.log('Running test: Expand Mixed');
var bitly = new Bitly('<YOUR USERNAME>', '<YOUR KEY>');

bitly.expandMixed({
    shortUrl : ['http://bit.ly/9lCnZ9', 'http://bit.ly/bYPhxl'],
    hash     : ['6uBruH']
  }, function(result) {
    console.log(sys.inspect(result));
  }
);

