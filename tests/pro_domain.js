var Bitly = require(__dirname + '/../bitly');

console.log('Running test: Pro Domain');

var bitly = new Bitly('bitlynodejs', 'R_8a2a91d31932dc7fda5468033dfe3c15');

bitly.bitlyProDomain('nyti.ms', function(err, result) {
  if (err) throw err;
  console.dir(result);
});
