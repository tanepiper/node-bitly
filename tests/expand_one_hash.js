var Bitly = require(__dirname + '/../bitly');

console.log('Running test: Expand One Hash');

var bitly = new Bitly('<YOUR USERNAME>', '<YOUR API KEY>');

bitly.expand(['9lCnZ9'], function(err, result) {
  if (err) throw err;
  console.dir(result);
});