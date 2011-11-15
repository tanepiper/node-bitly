var Bitly = require(__dirname + '/../bitly');

console.log('Running test: Pro Domain');

var bitly = new Bitly('<YOUR USERNAME>', '<YOUR API KEY>');

bitly.bitlyProDomain('nyti.ms', function(err, result) {
  if (err) throw err;
  console.dir(result);
});