var Bitly = require(__dirname + '/../bitly');

console.log('Running test: Shorten Url');

var bitly = new Bitly('bitlynodejs', 'R_8a2a91d31932dc7fda5468033dfe3c15');

bitly.shorten('http://tanepiper.com', function(err, result) {
  if (err) throw err;
  console.dir(result);
});
