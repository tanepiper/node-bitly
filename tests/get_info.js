var util = require('util');
var Bitly = require(__dirname +'/../lib/bitly/Bitly').Bitly;
console.log('Running test: Info');
var bitly = new Bitly('<YOUR USERNAME>', '<YOUR API KEY>');

bitly.info(['http://bit.ly/9lCnZ9', '6uBruH', 'http://bit.ly/bYPhxl'], function(result) {
  console.log(util.inspect(result));
});

