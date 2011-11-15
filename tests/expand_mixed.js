var Bitly = require(__dirname + '/../bitly');

console.log('Running test: Expand Mixed');

var bitly = new Bitly('<YOUR USERNAME>', '<YOUR API KEY>');

bitly.expand(['http://bit.ly/9lCnZ9', '6uBruH', 'http://bit.ly/bYPhxl'], function(err, result) {
  if (err) throw err;
  console.dir(result);
});