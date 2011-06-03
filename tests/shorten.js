var util = require('util');
var Bitly = require(__dirname +'/..').Bitly;
console.log('Running test: Shorten Url');
var bitly = new Bitly({login:'bitlynodejs', api_key:'R_8a2a91d31932dc7fda5468033dfe3c15'});

bitly.shorten('http://tanepiper.com', function(result) {
  console.log(util.inspect(result));
});

