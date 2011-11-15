var Bitly = require(__dirname + '/../bitly');

console.log('Running test: Expand Multiple Urls');

var bitly = new Bitly('bitlynodejs', 'R_8a2a91d31932dc7fda5468033dfe3c15');

bitly.expand(['http://bit.ly/9lCnZ9', 'http://bit.ly/bYPhxl', 'http://bit.ly/6uBruH'], function(err, result) {
  if (err) throw err;
  console.dir(result);
});
