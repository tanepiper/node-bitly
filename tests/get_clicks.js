var Bitly = require(__dirname + '/../bitly');

console.log('Running test: Clicks');

var bitly = new Bitly('<YOUR USERNAME>', '<YOUR API KEY>');

bitly.clicks(['http://bit.ly/9lCnZ9', '6uBruH', 'http://bit.ly/bYPhxl'], function(result) {
  console.dir(result);
});

