var Bitly = require(__dirname + '/../bitly');

console.log('Running test: Expand Multiple Urls');

var bitly = new Bitly('<YOUR USERNAME>', '<YOUR API KEY>');

bitly.expand(['http://bit.ly/9lCnZ9', 'http://bit.ly/bYPhxl', 'http://bit.ly/6uBruH'], function(result) {
  console.dir(result);
});

