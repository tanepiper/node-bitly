var Bitly = require(__dirname + '/../bitly');

console.log('Running test: Shorten Url');

var bitly = new Bitly('<YOUR USERNAME>', '<YOUR API KEY>');

bitly.shorten('http://tanepiper.com', function(err, result) {
  if (err) throw err;
  console.dir(result);
});

