var Bitly = require(__dirname + '/../bitly');

console.log('Running test: Lookup');

var bitly = new Bitly('bitlynodejs', 'R_8a2a91d31932dc7fda5468033dfe3c15');

bitly.lookup(['http://tanepiper.com', 'http://node.js'], function(err, result) {
  if (err) throw err;
  console.dir(result);
});
