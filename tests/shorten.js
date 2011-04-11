var util = require('util');
var Bitly = require(__dirname +'/../lib/bitly/Bitly').Bitly;
console.log('Running test: Shorten Url');
var bitly = new Bitly('<YOUR USERNAME>', '<YOUR API KEY>');

bitly.shorten('http://tanepiper.com', function(result) {
  console.log(util.inspect(result));
});

