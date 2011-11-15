var Bitly = require(__dirname + '/../bitly');

console.log('Running test: Expand One Hash');

var bitly = new Bitly('bitlynodejs', 'R_8a2a91d31932dc7fda5468033dfe3c15');

bitly.expand(['9lCnZ9'], function(err, result) {
  if (err) throw err;
  console.dir(result);
});
